import React from 'react';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionsArea from '@mui/material/CardActionsArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => ({
    card: {
        // some styles
    },
    cardAction: {
        position: "relative"
    },
    media: {
        // some styles
    },
    overlay: {
        position: "absolute",
        top: "85px"
    }
}));

const App = () => {
    const classes = useStyles();
    const [show, setShow] = React.useState(false);
    const handleMouseOver = () => {
        setShow(true);
    };
    const handleMouseOut = () => {
        setShow(false);
    };
    return (
      <Card>
          <CardActionsArea
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} className={classes.card} >
              <CardContent className={classes.overlay} style={{ display: show ? 
               'block' : 'none' }>
                  <Typography variant="h5" component="h2"> Hello World </Typography>
               </CardContent>
             </CardActionsArea>
              <CardMedia className={classes.media} component="img" >
              // some content
              </CardMedia>
      </Card>
    );
}