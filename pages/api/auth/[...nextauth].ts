import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password){
                    throw new Error ('Invalid Credentials');
                }

                //finding whether user uses the credentils email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword){
                    throw new Error ('Invalid Credentials');
                }

                //checking whether the password is correct
                const isCorrrectPassword = await bcrypt.compare(
                    //comparing credentials password with the hashed passwortd of the registered user
                    credentials.password,
                    user.hashedPassword
                );

                //if the password is not correct
                if (!isCorrrectPassword) {
                    throw new Error ('Invalid Credentials');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    //need to enable debug if it is under development
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions)