"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
    isOpen?: boolean;  // Optional prop indicating if the modal is open
    onClose: () => void;  // Required prop: function to call when closing the modal
    onSubmit: () => void;  // Required prop: function to call when submitting the modal
    title?: string;  // Optional title for the modal
    body?: React.ReactElement;  // Optional React element for the body of the modal
    footer?: React.ReactElement;  // Optional React element for the footer of the modal
    actionLabel: string;  // Required label for the action button
    disabled?: boolean;  // Optional prop to disable the action button
    secondaryAction?: () => void;  // Optional secondary action function
    secondaryActionLabel?: string;  // Optional label for the secondary action button
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled = false,
    secondaryAction,
    secondaryActionLabel,
}) => {

    const [showModal, setShowModal] = useState(isOpen); //initial state of showModal is set based on the value of the isOpen prop when the component is first rendered

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen] ) //The dependency array [isOpen] ensures that the effect runs only when isOpen changes.

    //The useCallback hook is used to memoize the handleClose function. This means the function reference will only change if the dependencies (disabled and onClose) change.
    //Memoizing the function can improve performance by preventing unnecessary re-renders and re-creating the function on each render, which is particularly useful when passing the function to child components that might optimize rendering based on prop changes.

    const handleClose = useCallback (() => {
        if(disabled){  //if disabled is true, 
            return;
        }
        
        setShowModal(false);
        setTimeout(() => {
            onClose();
        },300); //A setTimeout is used to delay the execution of the onClose callback by 300 milliseconds. 
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if(disabled){
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]); 

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction])

    if (!isOpen){
        return null;
    }

    return (
        <>
            <div
                className='
                    justify-center
                    items-center
                    flex
                    overflow-x-hidden
                    overflow-y-auto
                    fixed
                    inset-0
                    z-50
                    outline-none
                    focus:outline-none
                    bg-neutral-800/70
                '
            >
                <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
                    {/* Content */}
                    <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}  `}>
                        <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                            {/* Header */}
                            <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]' >
                                <button className='p-1 border-0 hover:opacity-70 transition absolute left-9'>
                                    <IoMdClose size={18} onClick={handleClose}/>
                                </button>
                                <div className='text-lg font-semibold'>
                                    {title}
                                </div>
                            </div>
                            {/* Body */}
                            <div className='relative p-6 flex-auto'>
                                {body}
                            </div>
                            {/* Footer */}
                            <div className='flex flex-col gap-2 p-6 '>
                                <div className='flex flex-row items-center gap-4 w-full'>
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button 
                                            outline
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                    />
                                    )}
                                    
                                    <Button 
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;