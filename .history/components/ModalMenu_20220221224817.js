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

export const theme = createTheme({
  overrides: {
    // For label
    MuiCard: {
      root: {
        '& .hidden-button': {
          display: 'none',
        },
        '&:hover .hidden-button': {
          display: 'flex',
        },
      },
    },
  },
});

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className="hidden-button">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
