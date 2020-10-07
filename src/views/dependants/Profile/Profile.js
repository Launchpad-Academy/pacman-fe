import React, {useEffect, useRef, useState} from 'react';
import { Paper, Typography, Grid, ButtonBase, makeStyles } from '@material-ui/core';
//import { LoginContext } from 'contexts';
//import { Image } from 'components';
import { API } from 'helpers';
import UserDemo from '../../../images/demoUser.png';
import { LoadingScreen } from 'components';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { LayoutConfig } from "configurations";
import FlagIcon from '../../../images/flag.png';
import BattleIcon from '../../../images/battle.png';
import TrophyIcon from '../../../images/topranking-grey.png';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '20px'
  },
  '@global': {
    body: {
      backgroundColor: theme.palette.common.dark
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    backgroundColor: "transparent",
    margin: 'auto',
    maxWidth: 500,
  },
  userPaper: {
    backgroundColor: "#21243f",
    borderRadius: "1rem",
    display: "flex",
    margin: "auto",
    alignItems: "center",
    width: "100%"
  },
  matchesPaper: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#227966",
    width: "100%",
    height: "100%",
    display: "flex",
    margin: "auto",
    alignItems: "center"
  },
  wonPaper: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#2c157b",
    width: "100%",
    height: "100%",
    display: "flex",
    margin: "auto",
    alignItems: "center"
  },
  image: {
    display: "flex",
    margin: "auto",
    alignItems: "center",
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 88,
    height: 88
  },
  battleIcon: {
    width: 64,
    height: 64,
    display: "flex",
    margin: "auto",
    alignItems: "center"
  },
  trophyIcon: {
    width: 72,
    height: 72,
    display: "flex",
    margin: "auto",
    alignItems: "center"
  },
  border: {
    borderLeft: "2px solid #1ed69e"
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
      fontWeight: "light",
      fontSize: 14,
      color: "#1ed69e"
    },
    body1: {
      fontFamily: "Helvetica, sans-serif", 
      fontSize: 46, 
      fontWeight: "bold", 
      color:'#4824ba',
      textAlign: "center"
    },
    body2: { 
      fontFamily: "Helvetica, sans-serif", 
      fontSize: 46, 
      fontWeight: "bold", 
      color:'#1ed69e' ,
      textAlign: "center"
    },
    caption: {
      color: "#ffffff",
      fontSize: 24,
      fontFamily: "Helvetica, sans-serif"
    },
    h4: {
      fontFamily: "Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 28,
      color: "#ffffff"
    },
    subtitle1: {
      color: "#ffffff",
      fontSize: 18,
      fontFamily: "Helvetica, sans-serif"
    }
  }
});


export const Profile = () => {

  const classes = useStyles();
  //const {accessToken} = useContext(LoginContext);
  const headerRef = useRef();
  const matchesPlayedRef = useRef();
  const matchesWonRef = useRef();
  const highestScoreRef = useRef();
  let [isLoading,setIsLoading] = useState(true);
  const [heightContract, setHeightContract] = useState("0vh");
  const [paddingContract, setPaddingContract] = useState("0vh 0vw");
  
  useEffect(()=>{
    API.getUserDetails((res)=>{
      headerRef.current.innerHTML= res.data.data.customerData.firstName;
      matchesPlayedRef.current.innerHTML = res.data.data.customerAdditionalData.matchesPlayed;
      matchesWonRef.current.innerHTML = res.data.data.customerAdditionalData.matchesWon;
      highestScoreRef.current.innerHTML = res.data.data.customerAdditionalData.highestScore;
      setIsLoading(false);
    });
  },[]);
  
  return(<MuiThemeProvider theme={applicationTheme}>
    {isLoading && <LoadingScreen loadingText="Fetching Your Profile"></LoadingScreen>}
    <div className={classes.root}>  
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs={12} sm container direction="row" alignItems="center">

              <Grid item xs container direction="row" alignItems="center" style={{margin:"auto", padding: 8}}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Welcome Back!</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h4" ref={headerRef}/>
                </Grid>

                <Grid item xs={12}>
                  <img src={FlagIcon} alt="flag icon" width={19} height={19} style={{ marginRight:7}} />
                  <Typography variant="caption" ref={highestScoreRef}/>
                </Grid>
              </Grid>

              <Grid item xs={6} alignItems="center" className={classes.border}>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={UserDemo} />
                </ButtonBase>
              </Grid>

            </Grid>
          </Grid>

          
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} >
              <Typography variant="subtitle1">Overview</Typography>
            </Grid>
            
            <Grid item xs={6} container >
              <Paper className={classes.matchesPaper}>
                <Grid item container justify="center">
                  <Grid item xs={6}>
                    <img src={BattleIcon} alt="Battle icon" className={classes.battleIcon} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" ref={matchesPlayedRef}/>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={6} container >

              <Paper className={classes.wonPaper}>
                <Grid item container justify="center">
                  <Grid item xs={6}>
                    <img src={TrophyIcon} alt="Trophy icon" className={classes.trophyIcon} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" ref={matchesWonRef}/>
                  </Grid>
                </Grid>
              </Paper>

            </Grid>
          </Grid>
        </Grid>

        
      </Paper>
    </div>
  </MuiThemeProvider>
  );
};
