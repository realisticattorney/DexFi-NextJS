import React from 'react';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from "react"
import { Card, CardActionArea, CardContent, CardMedia } from "@material- 
       ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
          <CardActionArea
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} className={classes.card} >
              <CardMedia className={classes.media} component="img" >
              // some content
              </CardMedia>
              <CardContent className={classes.overlay} style={{ display: show ? 
               'block' : 'none' }>
               // some content
              </CardContent>
           </CardActionArea>
      </Card>
  );
}