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

const useStyles = makeStyles((theme) => ({
  card: {
    width: '20px',
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
        <Typography>asdfsaf</Typography>
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
