import { useState } from "react";

type InputFieldProps = {
    label: string;
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean
}

const InputField = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = true
}: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="flex flex-col gap-1 font-inter">
            <label className="font-medium text-sm leading-6 text-[16px] text-input-label">{label}</label>
            <div className="relative">
                <input
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-input-border"
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default InputField;