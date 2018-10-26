import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupAdd from '@material-ui/icons/GroupAdd';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BarChart from '@material-ui/icons/BarChart';
import ViewModule from '@material-ui/icons/ViewModule';
import Shop from '@material-ui/icons/Shop';
import { Link } from 'react-router-dom';


export const mainListItem = (
    <div>
        <Link to='/professor' style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Mon espace professeur" />
            </ListItem>
        </Link>
        <Link to='/follow' style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon>
                    <BarChart />
                </ListItemIcon>
                <ListItemText primary="Suivi" />
            </ListItem>
        </Link>
        <Link to='/students' style={{textDecoration: 'none'}}>
            <ListItem button >
                <ListItemIcon>
                    <ViewModule />
                </ListItemIcon>
                <ListItemText primary="Trombinoscope" />
            </ListItem>
        </Link>
        <Link to='' style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon>
                    <Shop />
                </ListItemIcon>
                <ListItemText primary="Store de jeux" />
            </ListItem>
        </Link>
    </div>
);

export const secondaryListItem = (
    <div>
        <Link  to='/add-professor' style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon>
                    <GroupAdd />
                </ListItemIcon>
                <ListItemText primary="Ajouter un professeur" />
            </ListItem>
        </Link>
    </div>
);