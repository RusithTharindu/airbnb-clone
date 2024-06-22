"use client";

import { Children, useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
}

//to check whether we are on server side rendering or not
//we use this to protect children elements from hydration errors occured while loading

const ClientOnly: React.FC<ClientOnlyProps> = ( {children} ) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if(!hasMounted) {
        return null;
    }
    
    return ( 
        <>
            {children}
        </>
     );
}
 
export default ClientOnly;