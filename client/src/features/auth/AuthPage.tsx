import AuthForm from "./AuthForm";
import Brand from "./Brand";

const AuthPage = () => {
    return (
        <div className="flex justify-center items-center h-dvh">
            <div className="w-[400px] flex flex-col items-center">
                <Brand />
                <AuthForm />
            </div>
            
        </div>
    );
};
  
export default AuthPage;