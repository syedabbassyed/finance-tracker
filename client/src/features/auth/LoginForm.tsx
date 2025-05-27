import { useState } from "react";
import InputField from "../../components/InputField"
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { Link } from "react-router";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations/auth.mutation";

const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [keepSignedIn, setKeepSignedIn] = useState<boolean>(false);

    const [login] = useMutation(LOGIN_MUTATION);

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
            const res = await login({
                variables: {
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
            <Checkbox
                label="Keep me signed in"
                checked={keepSignedIn}
                onChange={setKeepSignedIn}
            />
            <div className="mt-4 mb-6">
                <Button
                    text="Login"
                    type="submit"
                />
            </div>
            <Link
                to="/signup"
                className="w-full text-primary block text-center font-semibold font-inter text-[16px] leading-6 hover:underline "
            >Create an account</Link>
        </form>
    )
}

export default LoginForm;