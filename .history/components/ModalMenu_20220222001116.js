import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Link from 'next/link';
import { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@mui/material';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  card: {
    // width: '80px',
  },
  cardAction: {
    position: 'relative',
  },
  media: {
    // some styles
  },
  overlay: {
    position: 'absolute',
    zIndex: '1400',
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
        <Typography>asdfsaf</Typography>
        <CardMedia className={classes.media} component="img"><Image src={/} alt="" /></CardMedia>
        <CardContent
          className={classes.overlay}
          style={{ display: show ? 'block' : 'none' }}
        >
          <Typography>asdfsaf</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ModalMenu;
