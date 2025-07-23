import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Avatar from "@mui/material/Avatar";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
function LoginLogo() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center  md:flex", children: [_jsx(Avatar, { sx: { m: 1, bgcolor: "secondary.main", width: 80, height: 80 }, children: _jsx(LockOutlineIcon, { fontSize: "large" }) }), _jsx("h1", { className: "text-center text-5xl text-white font-bold mt-4", children: "Login" }), _jsx("p", { className: "text-gray-300 mt-2 text-center", children: "Welcome back! Please login to your account." })] }));
}
export default LoginLogo;
