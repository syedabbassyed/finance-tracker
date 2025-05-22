type ButtonProps =  {
    text: string;
    type?: 'button' | 'submit';
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick, type = 'button' }: ButtonProps) => {
    return (
        <button className="w-full bg-primary text-primary-text p-3 cursor-pointer text-[16px] font-semibold leading-6 rounded-sm" type={type} onClick={onClick}>
            {text}
        </button>
    )
};

export default Button;