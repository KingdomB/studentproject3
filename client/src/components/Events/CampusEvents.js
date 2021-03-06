import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';

const messages = [
  {
    id: 1,
    primary: 'Brunch this week',
    secondary:
      'We wil be holding our monthly brunch this Sunday at Fredom hall from 11:00 AM until 3:00 PM. Make your reservations by Thursday'
  },
  {
    id: 2,
    primary: 'Cheer for our Soccer team',
    secondary: `Come today and cheer for our soccer team at the Bobby Stadium. Let's cheer them on to win against Acme University`
  },
  {
    id: 3,
    primary: 'Chili Cook Off Competition',
    secondary:
      'Come try your cooking skills. Registration for cook of is Monday. Pick up your registration forms from Cafeteria.'
  },
  {
    id: 4,
    primary: 'Play Tennis',
    secondary:
      'Tennis team is holding a try out Next Tuesday at 4 pm. Come and showcase your athletic abilities and join our tennis team.'
  },
  {
    id: 5,
    primary: 'Debate Team',
    secondary:
      'Debate team is looking fro additional members. If you are interested in joining out debate team, please pick up your registration forms from English department.'
  },
  {
    id: 6,
    primary: 'Graduation',
    secondary: `Our graduation party will be on August 24 at 10:30 A.M. Bring your familya and friends to cheer you on.`
  },
  {
    id: 7,
    primary: 'Summer BBQ',
    secondary: `Who wants to have a cookout this weekend? Bring your ingredients and your friends. Grills are provided and are ready for your masterpieces.`
  }
];

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: 'auto',
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
}));

function CampusEvents() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper
        square
        className={classes.paper}
        style={{ backgroundColor: '#86a3c3' }}
      >
        <Typography
          className={classes.text}
          variant="h5"
          gutterBottom
          style={{ color: '	#960505' }}
        >
          Current Events Around The Campus
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary }) => (
            <React.Fragment key={id}>
              <ListItem button>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}

export default CampusEvents;
