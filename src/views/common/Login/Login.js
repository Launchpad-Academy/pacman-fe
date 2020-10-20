
import React, { useState, useContext } from "react";

import RightArrowIcon from '../../../images/right-arrow.png';
import AppBadge from '../../../images/app-badge.png';
import MailIcon from '../../../images/mail-icon.png';
import PadlockIcon from '../../../images/padlock-icon.png';

import { Link } from "react-router-dom";
import {
  TextField,
  Paper,
  makeStyles,
  Typography,
  Box,
  Grid,
  InputAdornment
} from "@material-ui/core";
import { LoginContext } from "contexts";
import { notify } from "components";
import { DevModeConfig } from "configurations";
import { API, useKeyPress } from "helpers";
import { RegularButton, CustomInput } from "components";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { LayoutConfig } from "configurations";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.dark
    }
  },
  paper: {
    alignItems: "center",
    backgroundColor: "transparent",
    width: "50%",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    overflow: "auto",
    margin: "auto",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  loginBox: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttons: {
    marginTop: theme.spacing(2),
    backgroundColor:"#1ed69e",
    color:"#ffffff",
    borderRadius: "0.5rem",
    fontSize: 16,
    overflow: "auto"
  },
  developMessage: {
    position: "absolute",
    bottom: "2vh"
  },
  icons: {
    width: 36,
    height: 36,
    marginTop: theme.spacing(4)
  }
}));
let applicationTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main:
        LayoutConfig.theme !== undefined
          ? LayoutConfig.theme.colors !== undefined
            ? LayoutConfig.theme.colors.primary !== undefined
              ? LayoutConfig.theme.colors.primary
              : null
            : null
          : null
    },
    secondary: {
      main:
        LayoutConfig.theme !== undefined
          ? LayoutConfig.theme.colors !== undefined
            ? LayoutConfig.theme.colors.secondary !== undefined
              ? LayoutConfig.theme.colors.secondary
              : null
            : null
          : null
    }
  },
  typography: {
    h6: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 18,
      color: "white"
    },
    body1: {
      fontFamily: "Arial Unicode MS, Helvetica, sans-serif",
      fontSize: 18,
      color: "#d0d0d0"
    },
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
    caption: {
      color: "#d0d0d0 ",
      fontSize: "12px ",
      fontFamily: "Helvetica, sans-serif"
    },
    h5: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 21,
      color: "#00acc1"
    },
    subtitle1: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 10,
      color: "white"
    }
  }
});
export const Login = () => {
  const classes = useStyles();
  const [pageHeading] = useState("Login");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const { devMode, loginStatus, setLoginStatus, setAccessToken } = useContext(
    LoginContext
  );
  const performLogin = () => {
    if (DevModeConfig.bypassBackend) {
      setLoginStatus(true);
      setAccessToken("dummyToken");
    } else {
      let details = {
        emailId: devMode
          ? DevModeConfig.devDetails !== undefined
            ? DevModeConfig.devDetails.user
            : ""
          : emailId,
        password: devMode
          ? DevModeConfig.devDetails !== undefined
            ? DevModeConfig.devDetails.password
            : ""
          : password
      };
      
      API.login(details, (res ,status) =>{
        setLoginStatus(status);
        setAccessToken(res.data.data.accessToken);
      });
    }
  };

  const validationCheck = () => {
    if (devMode) {
      return performLogin();
    }
    if (!loginStatus) {
      const email = emailId;
      const pwd = password;
      let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailPatternTest = emailPattern.test(email);
      if (emailPatternTest && pwd) {
        performLogin();
        return true;
      } else if (emailPatternTest === undefined && pwd === undefined) {
        notify("Email or password must not be empty!");
        return false;
      } else if (!emailPatternTest) {
        notify("Email must not be empty!");
        return false;
      } else if (!emailPatternTest && email.length > 0) {
        notify("Invalid email!");
        return false;
      } else if (!pwd) {
        notify("Password must not be empty!");
        return false;
      }
    }
  };
  useKeyPress("Enter", () => {
    validationCheck();
  });

  let content = (
    <MuiThemeProvider theme={applicationTheme}>
      <Grid container direction="row" justify="space-around" alignItems="center" className={classes.wrapper}>
        <Grid 
          container
          direction="column"
          justify="center"
          alignItems="center"
          >
          <img src={AppBadge} alt="App badge"/>
          <Typography variant="h3" component="h1" style={{ fontWeight: "bold", color: "#ffffff" }}>
            WELCOME!
          </Typography>
          <Typography variant="h5" style={{ fontWeight: "bold", color: "#96a7af" }}>
            Log in to continue
          </Typography>
        </Grid>

        <Grid
          className={classes.loginBox}
          container
          direction="column"
          justify="center"
          alignItems="center"
          >
          <Paper className={classes.paper} elevation={0}>
            <form noValidate>
            <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <img src={MailIcon} alt="Custom mail icon" className={classes.icons} />
              </Grid>
              <Grid item xs={10}>
                <CustomInput
                  id="emailId"
                  labelText= "Email*"
                  required
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                    placeholder: "Email",
                    type: "email",
                    name: "email",
                    onChange: e => setEmailId(e.target.value)
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </Grid>
              
              <Grid item xs={2}>
                <img src={PadlockIcon} alt="Custom padlock icon" className={classes.icons} />
              </Grid>
              <Grid item xs={10}>
                <CustomInput
                  id="password"
                  labelText= "Password*"
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                    placeholder: "Password",
                    type: "password",
                    name: "password",
                    onChange: e => setPassword(e.target.value)
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </Grid>
            </Grid>
            
            
              
               
              {/* <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmailId(e.target.value)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              /> */}
              <RegularButton
                fullWidth
                variant="contained"
                className={classes.buttons}
                onClick={validationCheck}
              >
                Login
                <img style={{width: 20, height: 20, marginLeft:"15px", marginBottom:"2px"}} src={RightArrowIcon} alt="right arrow icon"/>
              </RegularButton>
              <RegularButton fullWidth variant="contained" className={classes.buttons} component={Link} to='/register'>Create An Account</RegularButton>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.developMessage}>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
                
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
  return content;
};
