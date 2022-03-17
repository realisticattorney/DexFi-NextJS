import React from "react";
import {
  makeStyles,
  createTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from '@mui/material/Paper';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const theme = createTheme({
  overrides: {
    // For label
    MuiCard: {
      root: {
        "& .hidden-button": {
          display: "none"
        },
        "&:hover .hidden-button": {
          display: "flex"
        }
      }
    }
  }
});

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  }
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
