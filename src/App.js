import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LoginLogo from "./components/LoginLogo";
import LoginForm from "./components/LoginForm";
function App() {
    return (_jsxs("div", { className: "min-h-[48vh]  md:lg:w-[40vw] w-screen rounded-2xl m-auto border-2 border-gray-700 bg-black grid grid-cols-1 md:grid-cols-2", children: [_jsx(LoginLogo, {}), _jsx(LoginForm, { "data-testid": "login-form" })] }));
}
export default App;
