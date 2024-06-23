"use client";
import React, { useCallback, useEffect, useState } from 'react';

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
    secondaryLabel?: string;  // Optional label for the secondary action button
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
    secondaryLabel,
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

    return (
        <div>
            
        </div>
    );
}

export default Modal;
