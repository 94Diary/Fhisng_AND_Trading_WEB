
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'checkIn' | 'profileCom' | 'logout' | 'history' | 'create' | 'login' | 'register' | 'back' ;
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
                bg-white text-black border-black-2xl  
                hover:bg-black hover:border-white hover:scale-105 hover:text-white
                shadow-2xl shadow-black hover:shadow-xl transition duration-300  cursor-pointer
                active:scale-50 active:transition active:bg-gray-700
            `;
            break;

        case 'profileCom':
            variantStyles = `
                bg-white text-black w-full  rounded-lg font-[700]
                hover:bg-black hover:border-white hover:scale-105 hover:text-white  transition 
                hover:shadow-lg shadow-lg shadow-black hover:shadow-purple-400 cursor-pointer
                active:scale-50 active:transitive
            `;
            break;  
        
        case 'logout':
            variantStyles = `
                bg-red-500 px-4 py-2 w-full rounded-lg mt-auto font-[700]
                hover:bg-red-800 hover:scale-105
                shadow-lg shadow-black hover:shadow-black transition cursor-pointer
                active:scale-50 active:transitive
            `;
            break;  

        case 'create':
            variantStyles = ` 
                bg-green-500 px-6 py-3 rounded-lg text-lg font-[700]  
                hover:bg-black hover:border-white hover:scale-105 hover:text-white  transition
                shadow-lg shadow-black hover:shadow-black transition cursor-pointer
                active:scale-50 active:transitive
            `;
            break;
        
        case 'login':
            variantStyles = `
                bg-white text-black pt-0 pb-0 pl-0 pr-0 h-10 w-full rounded-2lg font-[700]
                hover:bg-black hover:border-white hover:scale-105 hover:text-white  transition
                hover:shadow-lg shadow-lg shadow-black hover:shadow-purple-400 cursor-pointer
                active:scale-50 active:transitive
            `;
            break;

        case 'back' : 
            variantStyles = `
                bg-red-500 px-6 py-3 rounded-lg text-lg font-[700]  
                hover:bg-black hover:border-white hover:scale-105 hover:text-white  transition
                shadow-lg shadow-black hover:shadow-black transition cursor-pointer
                active:scale-50 active:transitive
            `;
            break;

        case 'register':
            variantStyles = `
                bg-white text-black w-full rounded-lg font-[700]
                hover:bg-black hover:border-white hover:scale-105 hover:text-white  transition
                hover:shadow-lg shadow-lg shadow-black hover:shadow-purple-400 cursor-pointer
                active:scale-50 active:transitive
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