import React from 'react';
import { List, Icon, ListItem, ListItemText, ListSubheader, Divider, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { LayoutConfig } from 'configurations';
import { API } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    backgroundColor: theme.palette.grey,
  },
  menu: {
    width: '100%',
    height: '100%'
  },
  menuMobile: {
    width: '100%'
  },
  menuItemText: {
    marginLeft: '5vw'
  },
  menuTitle: {
    paddingTop: '5vh',
    paddingBottom: '5vh',
    backgroundColor: 'transparent',
    color: '#ffffff',
    boxShadow: '0 1px rgba(76,45,45,0.80)'
  },
  logoutButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    paddingLeft: '5vw',
    paddingRight: '5vw'
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: '5vw',
    paddingRight: '5vw'
  }
}));

export const MobileMenu = () => {
  const classes = useStyles();
  const items = LayoutConfig.menuItems;
  let menuButtonLabel = (LayoutConfig.menuButtonLabel !== undefined ?
    LayoutConfig.menuButtonLabel !== '' ? LayoutConfig.menuButtonLabel : 'menu'
    : 'menu');

  let logoutButton = (data, key) => {
    return (<div key={'menu_button' + key}>
      {items.length > 0 ? <Divider /> : null}
      <ListItem onClick={() => { API.logoutUser();}} button className={classes.logoutButton} >
        <Icon>
          {data.icon !== undefined ? data.icon : 'logout'}
        </Icon>
        <ListItemText className={classes.menuItemText} primary={data.name !== undefined ? data.name : 'logout'} />
      </ListItem>
    </div >);
  };
  
  let isItDesktop = useMediaQuery('(min-width:600px) or (min-height:600px)');
  if (isItDesktop)
    return <Redirect to='/' />;
  let content = (
    <div className={classes.root}>
      <List disablePadding
        className={LayoutConfig.displayMobileHeader ? classes.menuMobile : classes.menu}
        component="nav"
        subheader={
          LayoutConfig.displayMobileHeader ? null : (<ListSubheader className={classes.menuTitle} component="div" id="menuTitle">
            <Typography variant="h5">
              {menuButtonLabel}
            </Typography>
          </ListSubheader>)
        }>
        {LayoutConfig.displayMobileHeader ? null : <Divider className={classes.menuTitleDivider} />}
        {
          items.map((value, i) => {
            if (!value.isFavourite) {
              if (value.type === 'logout')
                return logoutButton(value, i);
              return (
                <div key={'menu_button' + i}>
                  <ListItem button component={Link} className={classes.listItem} to={value.controller}>
                    <Icon>
                      {value.icon}
                    </Icon>
                    <ListItemText className={classes.menuItemText} primary={value.name} />
                  </ListItem>
                  <Divider />
                </div>
              );
            }
            return null;
          })
        }
      </List>
    </div>
  );
  return content;
};
