import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Avatar,
  Link,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import googleIcon from "../assets/google-icon.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StyledGoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#353535",
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .2)",
  margin: "15px 0 0 0",
  width: "400px",
  fontFamily: "Poppins, sans-serif",
  height: "50px",
  borderRadius: "25px",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#353535",
  },
}));

const ModalBox = styled(Box)({
  width: 520,
  padding: "5px 5px 50px 5px", // Adjusted the padding-bottom to 50px
  paddingTop: 100, // Retaining the top padding to account for logo position
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative", // This allows for positioning the logo relative to the box
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundImage: "linear-gradient(45deg, #FFA07A 20%, #D49CDA 100%)",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  margin: "15px 0",
  height: "50px",
  width: "400px",
  borderRadius: "25px",
}));

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <ModalBox>
        <Avatar
          src={logo}
          style={{
            margin: "5px 0",
            width: 200,
            height: 200,
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Typography
          variant="h3"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            margin: "20px 0",
          }}
        >
          Welcome Back!
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          placeholder="Email Address"
          style={{
            width: "400px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.1rem",
          }}
          InputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontSize: "1.1rem" },
            inputProps: { placeholder: "Email Address" },
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          style={{
            width: "400px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.1rem",
          }}
          InputProps={{
            style: { fontFamily: "Poppins, sans-serif", fontSize: "1.1rem" },
            inputProps: { placeholder: "Password" },
            endAdornment: (
              <IconButton onClick={handlePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          width="400px"
          margin="10px 0"
          alignItems="center"
        >
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={
              <Typography
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "1.1rem",
                }}
              >
                Remember me
              </Typography>
            }
          />

          <Typography
            variant="body1"
            onClick={() => navigate("/forgot-password")}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "1.1rem",
              cursor: "pointer",
              color: "#007BFF", // This is a typical blue color used for links
            }}
          >
            Forgot Password?
          </Typography>
        </Box>

        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.1rem" }}
        >
          Sign In
        </StyledButton>
        <StyledGoogleButton
          startIcon={
            <img
              src={googleIcon}
              alt="Google Icon"
              style={{ width: "24px", height: "24px" }}
            />
          }
        >
          Or continue with Google
        </StyledGoogleButton>

        <Typography
          variant="body1"
          style={{
            fontFamily: "Poppins, sans-serif",
            marginTop: 20,
            fontSize: "1.1rem",
          }}
        >
          New to Sunny Smiles?{" "}
          <Link
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            Join now
          </Link>
        </Typography>
      </ModalBox>
    </Box>
  );
}

export default Login;
