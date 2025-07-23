import {useState} from "react";
import { mockUsers } from "../assets/examplelogin";
import  { useEffect } from "react";

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

    function validateEmail(email: string) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    function validatePassword(password: string) {
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
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

    // This useEffect is crucial for validating and updating login state
   useEffect(() => {
        // These lines calculate the validation and strength
        const isEmailValid = validateEmail(username);
        const isPasswordValid = validatePassword(password);
        const currentPasswordStrength = getPasswordStrength(password);

        // These lines update the state variables that your LoginForm component uses
        setEmailValid(isEmailValid);
        setPasswordValid(isPasswordValid);
        setPasswordStrength(currentPasswordStrength);

        // This line enables/disables the login button
        setLoginEnabled(isEmailValid && isPasswordValid);

        // You can keep these console logs for debugging, but they aren't the issue
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Email Valid (derived):", isEmailValid);
        console.log("Password Valid (derived):", isPasswordValid);
        console.log("Password Strength (derived):", currentPasswordStrength);
        console.log("Login Enabled (derived):", isEmailValid && isPasswordValid);

    }, [username, password]); // This ensures the effect runs whenever username or password changes

    return {
      validateEmail,
      validatePassword,
      getPasswordStrength,
      username, setUsername,
      password, setPassword,
      rememberMe, setRememberMe,
      showPassword, setShowPassword,
      loginEnabled, // now correctly updated
      setLoginEnabled, // might not need to export if only updated internally
      loading, setLoading,
      emailValid, // now correctly updated
      setEmailValid, // might not need to export
      passwordValid, // now correctly updated
      setPasswordValid, // might not need to export
      passwordStrength, // now correctly updated
      setPasswordStrength, // might not need to export
      handleSubmit
    };
}

export default useLogin;