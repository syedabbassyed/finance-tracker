type ButtonProps =  {
    text: string;
    type?: 'button' | 'submit'
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick, type = 'button' }: ButtonProps) => {
    return (
        <button className="w-[100%] bg-primary text-primary-text p-3" type={type} onClick={onClick}>
            {text}
        </button>
    )
};

export default Button;