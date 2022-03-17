import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    // some styles
  },
  cardAction: {
    position: 'relative',
  },
  media: {
    // some styles
  },
  overlay: {
    position: 'absolute',
    top: '85px',
  },
}));

const ModalMenu = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
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
        onMouseOut={handleMouseOut}
        className={classes.card}
      >
        <CardMedia className={classes.media} component="img"></CardMedia>
        <CardContent
          className={classes.overlay}
          style={{ display: show ? 'block' : 'none' }}
        >
          <Typography>sdfsd</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export 