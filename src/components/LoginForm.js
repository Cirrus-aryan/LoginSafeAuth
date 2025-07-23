import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/LoginForm.tsx
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import useLogin from "../customhooks/useLogin";
function LoginForm() {
    const { username, setUsername, password, setPassword, rememberMe, setRememberMe, showPassword, setShowPassword, loginEnabled, loading, emailValid, passwordValid, passwordStrength, handleSubmit, } = useLogin();
    return (_jsxs("form", { className: "flex flex-col items-center bg-white justify-center min-w-[20vw] h-full w-full rounded-2xl p-8 gap-4", onSubmit: handleSubmit, "data-testid": "login-form", autoComplete: "off", children: [_jsx(TextField, { label: "Username (Email)", variant: "standard", type: "email", value: username, onChange: (e) => setUsername(e.target.value), error: !!username && !emailValid, helperText: !!username && !emailValid ? "Enter a valid email address" : " ", fullWidth: true }), _jsx(Tooltip, { title: password
                    ? passwordStrength < 2
                        ? "Weak password"
                        : passwordStrength < 4
                            ? "Medium strength"
                            : "Strong password"
                    : "", arrow: true, children: _jsx(TextField, { type: showPassword ? "text" : "password", label: "Password", variant: "standard", value: password, onChange: (e) => setPassword(e.target.value), error: !!password && !passwordValid, helperText: !!password && !passwordValid
                        ? "Min 8 chars, at least 1 letter & 1 number"
                        : " ", fullWidth: true, InputProps: {
                        endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: () => setShowPassword((show) => !show), edge: "end", children: showPassword ? _jsx(VisibilityOffIcon, {}) : _jsx(VisibilityIcon, {}) }) })),
                    } }) }), password && (_jsx(LinearProgress, { variant: "determinate", "data-testid": "password-strength-bar", value: (passwordStrength / 4) * 100, sx: {
                    width: "100%",
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: "#eee",
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: passwordStrength < 2
                            ? "#f87171"
                            : passwordStrength < 4
                                ? "#fbbf24"
                                : "#4ade80",
                    },
                } })), _jsx(FormGroup, { children: _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: rememberMe, onChange: (e) => setRememberMe(e.target.checked) }), label: "Remember Me" }) }), _jsx(Button, { variant: "contained", type: "submit", disabled: !loginEnabled || loading, sx: { width: "100%", mt: 2 }, children: loading ? "Logging in..." : "Login" }), _jsx(Link, { href: "#", underline: "hover", sx: { mt: 1 }, children: "Forgot Password?" })] }));
}
export default LoginForm;
