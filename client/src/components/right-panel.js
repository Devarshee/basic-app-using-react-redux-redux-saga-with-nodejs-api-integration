import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    borderLeft: "1px solid black",
    marginTop: '-80px'
  },
  paper: {
    margin: 'auto',
  },
  bootstrapRoot: {},
  bootstrapInput:{},
  bootstrapFormLabel:{},
  margin:{
    marginBottom: '10px'
  },
});

function RightPanel(props) {
  const { classes, title, buttonName, onButtonClick, contentRenderer } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
            <Grid item xs={7} style={{paddingTop: '15px'}}>
                <Typography gutterBottom variant="title">
                {title}
                </Typography>
            </Grid>
            <Grid item xs={5} style={{paddingTop: '10px'}}> 
            <Button variant="contained" size="medium" color="primary" className={classes.margin} onClick={onButtonClick}>
                {buttonName}
            </Button>
            </Grid>
            {contentRenderer()}
        </Grid>
      </Paper>
    </div>
  );
}

RightPanel.defaultProps = {
    contentRenderer: () => <div />
}

RightPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  onButtonClick: PropTypes.func,
  contentRenderer: PropTypes.func
};

export default withStyles(styles)(RightPanel);