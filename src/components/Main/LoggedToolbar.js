import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

export default LoggedToolbar =
<div>
    <IconButton onClick={onOpenDrawer} className={classes.menuButton} color="inherit" aria-label="Open drawer">
        <MenuIcon />
    </IconButton>

    <div className={classes.grow} />
    <div className={classes.sectionDesktop}>
        <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={4} color="secondary">
                <MailIcon />
            </Badge>
        </IconButton>
        <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={17} color="secondary">
                <NotificationsIcon />
            </Badge>
        </IconButton>
        <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
    </div>
    <div className={classes.sectionMobile}>
        <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
            <MoreIcon />
        </IconButton>
    </div>
</div>;