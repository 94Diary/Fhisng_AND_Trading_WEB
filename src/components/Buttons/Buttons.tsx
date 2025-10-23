import React, { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'checkIn' | 'profileCom' | 'logout' | 'history' | 'create' | 'login' | 'register' ;
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    to?: string
}

const Buttons: React.FC<ButtonProps> = ({
    children,
    variant = 'checkIn',
    size = 'md',
    className,
    disabled,
    to,
    ...props
}) => {

    const baseStyles: string = `
        font-semibold rounded-lg focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75
        transition-all duration-150 ease-in-out
        border
        disabled:opacity-60 disabled:cursor-not-allowed
    `;

    let variantStyles: string = '';
    switch (variant) {
        case 'checkIn':
            variantStyles = `
                bg-green-600 text-white border-white
                hover:bg-red-700 hover:border-black-500 hover:scale-110 hover:rotate-12
                focus:ring-4 focus:ring-green-300 focus:ring-opacity-50
                shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
            `;
            break;

        case 'profileCom':
            variantStyles = `
                bg-white text-black px-4 py-2 w-full rounded-lg font-[700]
                hover:bg-gray-700 hover:scale-110  transition 
                hover:shadow-lg shadow-lg shadow-black hover:shadow-purple-400 cursor-pointer
            `;
            break;  
        
        case 'logout':
            variantStyles = `
                bg-red-600 px-4 py-2 w-full rounded-lg mt-auto font-[700]
                hover:bg-red-800 hover:scale-110
                shadow-lg shadow-black hover:shadow-red-500 transition cursor-pointer
            `;
            break;  

        case 'history':
            variantStyles = ` 
                bg-purple-600 px-6 py-3 rounded-lg text-lg font-[700]  
                hover:bg-gray-700 hover:scale-110  transition 
                shadow-lg shadow-black hover:shadow-purple-900 transition cursor-pointer
            `;
            break;

        case 'create':
            variantStyles = ` 
                bg-green-500 px-6 py-3 rounded-lg text-lg font-[700]  
                hover:bg-gray-700 hover:scale-110  transition
                shadow-lg shadow-black hover:shadow-green-900 transition cursor-pointer
            `;
            break;
        
        case 'login':
            variantStyles = `
                bg-green-500 text-black px-4 py-2 w-[70%] rounded-lg font-[700]
                hover:bg-gray-700 hover:scale-110  transition
                hover:shadow-md shadow-md shadow-black hover:shadow-green-900 cursor-pointer
            `;
            break;

        case 'register':
            variantStyles = `
                bg-blue-500 text-black px-4 py-2 w-[70%] rounded-lg font-[700]
                hover:bg-gray-700 hover:scale-110  transition
                hover:shadow-md shadow-md shadow-black hover:shadow-blue-900 cursor-pointer
            `;
            break;

        default:
            break;
        

    }

    let sizeStyles: string = '';
    switch (size) {
        case 'sm':
            sizeStyles = 'px-3 py-1.5 text-sm';
            break;
        case 'md':
            sizeStyles = 'px-4 py-2 text-base';
            break;
        case 'lg':
            sizeStyles = 'px-6 py-3 text-lg'
            break;
        default:
            sizeStyles = 'px-4 py-2 text-base'; 
            break;
            
    }

    const combinedClassName: string = `
        ${baseStyles}
        ${variantStyles}
        ${sizeStyles}
        ${className || ''}
    `.replace(/\s+/g, ' ').trim(); 

    return (
        <button
            type = "button"
            className={combinedClassName}
            disabled = {disabled}
            {...props}
        >
            {children}
        </button>
    );
};


export default Buttons;