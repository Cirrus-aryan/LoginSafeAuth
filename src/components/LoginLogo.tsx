import Avatar from "@mui/material/Avatar";
import LockOutlineIcon from "@mui/icons-material/LockOutline";

function LoginLogo() {
  return (
<div className="flex flex-col items-center justify-center  md:flex">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 80, height: 80 }}>
          <LockOutlineIcon fontSize="large" />
        </Avatar>
        <h1 className="text-center text-5xl text-white font-bold mt-4">
          Login
        </h1>
        <p className="text-gray-300 mt-2 text-center">
          Welcome back! Please login to your account.
        </p>
      </div>  )
}

export default LoginLogo