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
  const {
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showPassword,
    setShowPassword,
    loginEnabled,
    loading,
    emailValid,
    passwordValid,
    passwordStrength,
    handleSubmit,
  } = useLogin();

  return (
    <form
      className="flex flex-col items-center bg-white justify-center min-w-[20vw] h-full w-full rounded-2xl p-8 gap-4"
      onSubmit={handleSubmit}
      data-testid="login-form"
      autoComplete="off"
    >
      <TextField
        label="Username (Email)"
        variant="standard"
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!username && !emailValid}
        helperText={
          !!username && !emailValid ? "Enter a valid email address" : " "
        }
        fullWidth
      />

      <Tooltip
        title={
          password
            ? passwordStrength < 2
              ? "Weak password"
              : passwordStrength < 4
              ? "Medium strength"
              : "Strong password"
            : ""
        }
        arrow
      >
        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!password && !passwordValid}
          helperText={
            !!password && !passwordValid
              ? "Min 8 chars, at least 1 letter & 1 number"
              : " "
          }
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>

      {password && (
        <LinearProgress
          variant="determinate"
          data-testid="password-strength-bar"
          value={(passwordStrength / 4) * 100}
          sx={{
            width: "100%",
            height: 8,
            borderRadius: 5,
            backgroundColor: "#eee",
            "& .MuiLinearProgress-bar": {
              backgroundColor:
                passwordStrength < 2
                  ? "#f87171"
                  : passwordStrength < 4
                  ? "#fbbf24"
                  : "#4ade80",
            },
          }}
        />
      )}

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Remember Me"
        />
      </FormGroup>

      <Button
        variant="contained"
        type="submit"
        disabled={!loginEnabled || loading}
        sx={{ width: "100%", mt: 2 }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Link href="#" underline="hover" sx={{ mt: 1 }}>
        Forgot Password?
      </Link>
    </form>
  );
}

export default LoginForm;
