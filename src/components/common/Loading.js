import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid, Paper, makeStyles } from '@material-ui/core';
import AppBadge from '../../images/app-badge.png';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    color: "#ffffff",
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
  badge: {
    alignItems: "center",
    position: "absolute"
  },
  loadingText: {
    marginTop: 150,
    position: "absolute",
    color:"white"
  },
  pacman: {
    position: 'relative',
    marginTop: 150
  },
  pacman___div_nth_child_1: {
    width: '0',
    height: '0',
    border: '37.5px solid #00acc1',
    borderRightColor: 'transparent',
    borderRadius: '50%',
    left: '-20px',
    position: 'relative'
  },
  pacman___div_nth_child_2: {
    marginTop: '-75px'
  },
  pacman___div_nth_child_3: {
    backgroundColor: '#ff9800',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    position: 'absolute',
    top: '25px',
    left: '55px'
  }
}));
export const LoadingScreen = (props) => {
  let classes = useStyles();
  return (
      <Grid container spacing={0} direction={'column'} justify="center" alignItems="center" className={classes.root} >
      
        <img src={AppBadge} alt="app badge"/>
        <CircularProgress/>
        {props.loadingText}

      </Grid >
  );
};

LoadingScreen.propTypes = {
  loadingText: PropTypes.string
};
