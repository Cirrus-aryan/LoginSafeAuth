
import React from "react";
import useLogin from "./customhooks/useLogin";
import LoginLogo from "./components/LoginLogo";
import LoginForm from "./components/LoginForm";

function App() {
  const {
    validateEmail,
    validatePassword,
    getPasswordStrength,
    username,
    password,
    setLoginEnabled,
    setEmailValid,
    setPasswordValid,
    setPasswordStrength,
  } = useLogin();
  React.useEffect(() => {
    const emailValid = validateEmail(username);
    const passwordValid = validatePassword(password);
    const passwordStrength = getPasswordStrength(password);
    setEmailValid(emailValid);
    setPasswordValid(passwordValid);
    setPasswordStrength(passwordStrength);
    console.log("Email Valid:", emailValid);
    console.log("Password Valid:", passwordValid);
    console.log("Password Strength:", passwordStrength);
    // Enable login button if both fields are valid
    setLoginEnabled(emailValid && passwordValid);
  }, [username, password]);
  return (
    <div className="min-h-[48vh]  md:lg:w-[40vw] w-screen rounded-2xl m-auto border-2 border-gray-700 bg-black grid grid-cols-1 md:grid-cols-2">
      <LoginLogo/>
      <LoginForm data-testid="login-form"/>
    </div>
  );
}

export default App;
