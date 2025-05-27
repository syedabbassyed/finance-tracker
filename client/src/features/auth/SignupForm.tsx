import { useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link } from "react-router";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../graphql/mutations/auth.mutation";

const SignupForm = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [signup] = useMutation(SIGNUP_MUTATION);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const res = await signup({
                variables: {
                    name,
                    email, 
                    password
                }
            });

            const token = res.data.login.token;

            localStorage.setItem("token", token);


        } catch (err) {
            console.error("Login Error", err)
        }
    }

    return (
        <form className="w-full" onSubmit={submitForm}>
            <div className="w-full  mb-6">
                <InputField 
                    label="Name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    required={true}
                    onChange={onNameChange}
                />
            </div>
            <div className="w-full  mb-6">
                <InputField 
                    label="Email Address"
                    type="email"
                    placeholder="johndoe@email.com"
                    value={email}
                    required={true}
                    onChange={onEmailChange}
                />
            </div>
            <div className="w-full mb-8">
                <InputField 
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    required={true}
                    onChange={onPasswordChange}
                />
                
            </div>
            <div className="mt-4 mb-6">
                <Button
                    text="Sign up"
                    type="submit"
                />
            </div>
            <Link
                to="/login"
                className="w-full text-primary block text-center font-semibold font-inter text-[16px] leading-6 hover:underline "
            >Login</Link>
        </form>
    )
}

export default SignupForm;