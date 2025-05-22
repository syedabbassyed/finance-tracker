import Brand from "./Brand";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <div className="flex justify-center items-center h-dvh">
            <div className="w-[400px] flex flex-col items-center">
                <Brand />
                <LoginForm />
                
            </div>
            
        </div>
    );
};
  
export default LoginPage;
  