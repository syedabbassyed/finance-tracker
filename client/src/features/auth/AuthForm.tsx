import { useState } from "react";
import InputField from "../../components/InputField";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { Link, useLocation } from "react-router";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../graphql/mutations/auth.mutation";
import { useAppDispatch } from "../../app/hooks";
import { loginFailure, loginStart, loginSuccess } from "./authSlice";

const AuthForm = () => {
    const location = useLocation();
    const isLogin = location.pathname === "/login";

    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [keepSignedIn, setKeepSignedIn] = useState<boolean>(false);

    const [authMutation] = useMutation(isLogin ? LOGIN_MUTATION : SIGNUP_MUTATION);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(loginStart());

        try {
            const variables = isLogin ? { email, password } : { name, email, password };
            const res = await authMutation({ variables });

            const { token, user } = res.data.login; 

            localStorage.setItem("token", token);
            dispatch(loginSuccess({ token, user }));

        } catch (err) {
            console.error("Auth Error", err);
            dispatch(loginFailure(isLogin ? "Login failed" : "Signup failed"));
        }
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            {!isLogin && (
                <div className="w-full mb-6">
                    <InputField
                        label="Name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            )}

            <div className="w-full mb-6">
                <InputField
                    label="Email Address"
                    type="email"
                    placeholder="johndoe@email.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="w-full mb-8">
                <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {isLogin && (
                <Checkbox
                    label="Keep me signed in"
                    checked={keepSignedIn}
                    onChange={setKeepSignedIn}
                />
            )}

            <div className="mt-4 mb-6">
                <Button text={isLogin ? "Login" : "Sign up"} type="submit" />
            </div>

            <Link
                to={isLogin ? "/signup" : "/login"}
                className="w-full text-primary block text-center font-semibold font-inter text-[16px] leading-6 hover:underline"
            >
                {isLogin ? "Create an account" : "Login"}
            </Link>
        </form>
    );
};

export default AuthForm;
