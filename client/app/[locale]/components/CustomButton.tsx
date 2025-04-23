import React from 'react'
type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton: React.FC<CustomButtonProps> = (props) => {
    return (
        <button
            {...props}
            className='flex flex-row text-white text-xl justify-center items-center rounded-[100px] h-14 px-7 py-4 p-2 my-10 gap-2 w-full '
            style={{
                background: 'linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)',
                boxShadow: '0px 8px 23px 0px #4184F73D'
            }}
        >
            {props.children}
        </button>
    );
};

export default CustomButton;