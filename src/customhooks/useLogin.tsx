import {useEffect,useState} from "react";
import { mockUsers } from "../assets/examplelogin";

function useLogin(){
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [rememberMe, setRememberMe] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [loginEnabled, setLoginEnabled] = useState(false);
      const [loading, setLoading] = useState(false);
      const [emailValid, setEmailValid] = useState(false);
      const [passwordValid, setPasswordValid] = useState(false);
      const [passwordStrength, setPasswordStrength] = useState(0);
      // Real-time validation
    
    function validateEmail(email: string) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
    
    function validatePassword(password: string) {
      return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    }
    
    function getPasswordStrength(password: string) {
      if (password.length < 8) return 0;
      let strength = 0;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[a-z]/.test(password)) strength += 1;
      if (/\d/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      return strength;
    }
     function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!emailValid) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!passwordValid) {
      alert(
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if(mockUsers.some(user => user.username === username && user.password === password)) {
        alert("Login successful!");
      } else {
        alert("Invalid username or password.");
      }
    }, 1200);
  }

    return {
      validateEmail,
      validatePassword,
      getPasswordStrength,
      username, setUsername,
      password, setPassword,
        rememberMe, setRememberMe,
        showPassword, setShowPassword,
        loginEnabled, setLoginEnabled,
        loading, setLoading,
        emailValid, setEmailValid,
        passwordValid, setPasswordValid,
        passwordStrength, setPasswordStrength,
        handleSubmit
    };
}
export default useLogin;