import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAdd from '@material-ui/icons/PersonAdd';
import GroupAdd from '@material-ui/icons/GroupAdd';
import Dashboard from '@material-ui/icons/Dashboard';
import ViewWeek from '@material-ui/icons/ViewWeek';
import Class from '@material-ui/icons/Class';
import ViewModule from '@material-ui/icons/ViewModule';
import Shop from '@material-ui/icons/Shop';
import { Link } from 'react-router-dom';


export const mainListItem = (
    <div>
        <Link to='/dashboard' style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon>
                    <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
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
        <Link to='/store' style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon>
                    <Shop />
                </ListItemIcon>
                <ListItemText primary="Store de jeux" />
            </ListItem>
        </Link>
    </div>
);

export const SecondaryListItem = (props) =>
    <div>
        <Link  to='/cours' style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon>
                    <Class />
                </ListItemIcon>
                <ListItemText primary="Gerer mes cours" />
            </ListItem>
        </Link>
        {props.director === true ?
        <Link  to='/add-professor' style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon>
                    <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Ajouter un professeur" />
            </ListItem>
        </Link>
            : ''}
        <Link  to='/add-student' style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon>
                    <GroupAdd />
                </ListItemIcon>
                <ListItemText primary="Ajouter des éleves" />
            </ListItem>
        </Link>
    </div>

export const ThirdListItem = (props) =>
    <div>
        {props.director === true ?
            <Link  to='/abonnements' style={{textDecoration: 'none'}}>
                <ListItem button>
                    <ListItemIcon>
                        <ViewWeek />
                    </ListItemIcon>
                    <ListItemText primary="Gestion d'abonnements" />
                </ListItem>
            </Link>
            : ''}
    </div>
