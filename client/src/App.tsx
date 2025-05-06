import Button from "./components/Button";
import InputField from "./components/InputField";


function App() {
  

  return <div className="font-poppins">
    <p> Hello World</p>
    <InputField 
      label="Name"
      onChange={() => {}}
      value=""
      required={false}
    />
    <Button
      text="Login"
      onClick={() => {}}
    />
  </div>;
}
export default App
