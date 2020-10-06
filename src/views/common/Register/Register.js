/* eslint-disable quotes */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, makeStyles, Typography, Button, Box, Grid, Paper, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { notify, Card, RegularButton, CustomInput } from "components";
import { LayoutConfig } from "configurations";
//import { DevModeConfig } from 'configurations';
//import { LoginContext } from 'contexts'; 
import { API } from 'helpers';

import AppBadge from '../../../images/app-badge.png';


const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(6),
    // display: "flex",
    alignItems: "center",
    // padding: theme.spacing(3),
    backgroundColor: "transparent",
    width: "50%"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  registerBox: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttons: {
    marginTop: theme.spacing(2),
    backgroundColor:"#1ed69e",
    color:"#ffffff",
    borderRadius: "0.5rem",
    fontSize: 18
  },
  developMessage: {
    position: "absolute",
    bottom: "1vh"
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
      fontSize: 16,
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

export const Register = () => {
  const classes = useStyles();
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  //Function for the Registeration Logic
  const register = () => {
    let registerationDetails = {
      firstName: firstName,
      lastName : lastName,
      emailId : emailId,
      password : password
    };

    API.registerUser(registerationDetails, function(data) {
      notify("Registeration Successful");
      console.log(data);
    });
  };
  const validationCheck = () => {
    if (emailId.length < 0 || password.length < 0 || confirmPassword.length < 0 || firstName.length < 0 || lastName.length < 0
      || emailId === '' || password === '' || confirmPassword === '' || firstName === '' || lastName === '') {
      return notify("Please fill in all the details.");
    }
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailPatternTest = emailPattern.test(emailId);
    if (!emailPatternTest) {
      notify('Email not in proper format');
    }
    if (password !== confirmPassword) {
      return notify("Passwords don't match.");
    }
    if (emailPatternTest) {
      return register();
    }
  };

  let content = (
    <MuiThemeProvider theme={applicationTheme}>
      <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop:"200px"}} >
        <Grid 
          container
          direction="column"
          justify="center"
          alignItems="center"
          xs={12}
          sm={6}
          >
          <img src={AppBadge} alt="App badge"/>
          <Typography variant="h3" component="h1" style={{ fontWeight: "bold", color: "#ffffff" }}>
            REGISTER
          </Typography>
          <Typography variant="h5" style={{ fontWeight: "bold", color: "#96a7af" }}>
            Create an account
          </Typography>
        </Grid>

        <Grid className={classes.registerBox} 
          // item xs={10} sm={6} md={4} lg={3} xl={2}
          xs={12}
          sm={6}
          container
          direction="column"
          justify="center"
          alignItems="center"
          >
          <Paper className={classes.paper} elevation={0}>
            <Grid container justify="center">        
            
              <Grid item xs={11}>
                <form noValidate>
                  <TextField variant="outlined" margin="normal" required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="firstName" onChange={e => setFirstName(e.target.value)} autoFocus />
                  <TextField variant="outlined" margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lastName" onChange={e => setLastName(e.target.value)} />
                  <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={e => setEmailId(e.target.value)} />
                  <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                  <TextField variant="outlined" margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} autoComplete="current-password" />
                  <Button round="true" fullWidth variant="contained" color="default" className={classes.buttons} onClick={validationCheck}>Register</Button>
                  <Button round="true" fullWidth variant="contained" color="default" className={classes.buttons} component={Link} to='/login'>Back</Button>
                </form>
              </Grid>
            </Grid>
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
