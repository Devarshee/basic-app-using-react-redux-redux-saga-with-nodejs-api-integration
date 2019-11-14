import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import RightPanel from "./right-panel";
import Grid from "@material-ui/core/Grid";
import * as actionTypes from "../actions/actions";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    maxHeight: "115vh",
    overflow: "auto"
  },
});

class AddItems extends React.Component {
  state = {
    checked: []
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  handleSaveButtonClick = () => {
    debugger
    const itemOrder = {
        items: this.state.checked,
        orderId: this.props.ordersId
      };
    this.props.addItems(itemOrder)
    this.props.history.replace('/showItems');
  }
  
  contentRenderer = () => {
    const { classes } = this.props;
    const header = {
      itemLabel: "Item Name",
      descriptionLable: "Description"
    };

    return (
      <List className={classes.root}>
        <ListItem>
          <ListItemText secondary={header.itemLabel} />
          <ListItemText secondary={header.descriptionLable} />
        </ListItem>
        {this.props.itemData
          ? this.props.itemData.map(value => (
            <Grid key={value.itemId}>
              <ListItem
                role={undefined}
                dense
                button
                onClick={this.handleToggle(value._id)}
              >
              <Grid item style={{display: "inline-flex", alignItems: "center"}} xs={6}>
                <Checkbox
                  checked={this.state.checked.indexOf(value._id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={value.itemName} style={{padding: 0}}/>
              </Grid>
              <Grid item xs={6}>
                <ListItemText primary={value.description} />
              </Grid>
              </ListItem>
              </Grid>
            ))
          : null}
      </List>
    );
  };
  render() {
    return (
      <Grid>
        <RightPanel
          buttonName="SAVE"
          title="Details Line - Items"
          {...this.props}
          contentRenderer={this.contentRenderer}
          onButtonClick={this.handleSaveButtonClick}
        />
      </Grid>
    );
  }
}

AddItems.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = props => {
  debugger;
  return { 
    itemData: props.items.items,
    ordersId: props.order.orderId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () =>
      dispatch({ type: actionTypes.FETCH_ITEM_TO_ORDER_REQUEST }),
    addItems: itemOrder =>
      dispatch({
        type: actionTypes.ADD_ITEM_TO_ORDER_REQUEST,
        orderItem: itemOrder
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddItems));
