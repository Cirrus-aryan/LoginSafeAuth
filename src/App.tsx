
import LoginLogo from "./components/LoginLogo";
import LoginForm from "./components/LoginForm";

function App() {
  
  return (
    <div className="min-h-[48vh]  md:lg:w-[40vw] w-screen rounded-2xl m-auto border-2 border-gray-700 bg-black grid grid-cols-1 md:grid-cols-2">
      <LoginLogo/>
      <LoginForm data-testid="login-form"/>
    </div>
  );
}

export default App;
