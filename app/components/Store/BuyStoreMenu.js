import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Star from '@material-ui/icons/Star';
import Mood from '@material-ui/icons/Mood';
import NewReleases from '@material-ui/icons/NewReleases';
import Category from '@material-ui/icons/Category';
import Update from '@material-ui/icons/Update';
import Medias from '@material-ui/icons/PermMedia';
import React from 'react';
import PropTypes from 'prop-types';


function MenuStore(classes) {
  return (
    <MenuList>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <Star />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Decouvrir" />
      </MenuItem>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <NewReleases />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Nouvautes" />
      </MenuItem>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <Mood />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Divertissement" />
      </MenuItem>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <Category />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Categories" />
      </MenuItem>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <Update />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Mises a jour" />
      </MenuItem>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <Medias />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Medias" />
      </MenuItem>
    </MenuList>
  );
}

MenuStore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MenuStore;
