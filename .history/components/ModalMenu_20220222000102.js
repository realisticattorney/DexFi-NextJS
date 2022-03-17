import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
      width: "20px"
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(10),
    minWidth: 140,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
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
        ></CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ModalMenu;
