import Brand from "./Brand";
import SignupForm from "./SignupForm";

const SignupPage = () => {
    return (
        <div className="flex justify-center items-center h-dvh">
            <div className="w-[400px] flex flex-col items-center">
                <Brand />
                <SignupForm /> 
            </div>
            
        </div>
    );
};
  
export default SignupPage;
  