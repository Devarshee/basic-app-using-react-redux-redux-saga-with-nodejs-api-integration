import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import RightPanel from "./right-panel";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { connect } from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import * as actionTypes from "../actions/actions";
import { withRouter } from "react-router";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    maxHeight: "115vh",
    overflow: "auto"
  },
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    color: "black",
    fontSize: "1rem",
    fontWeight: 400,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    lineHeight: "1.5em",
    fontSize: "20px"
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class EditDeleteItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      itemId: "",
      units: "",
      isDeleted: false,
    };
  }

  handleEditItems = id => {
    this.setState({
      isEdit: true,
      itemId: id,
      isDeleted: false
    });
  };

  handleOnUnitChange = e => {
    this.setState({
      units: e.target.value
    });
  };

  handleOnUpdate = id => {
    debugger
    this.props.updateItem(id, this.state.units);
    this.setState({
      isEdit: false
    });
  };

  handleOnEditCancel = () => {
    this.setState({
      isEdit: false
    });
  };

  handleOnDeleteCancel = () => {
    this.setState({
      isDeleted: false
    })
  }

  handleOnAddButtonClick = () => {
    this.props.fetchItems();
    this.props.history.push('/addItems');
  }

  handleDeleteItems = id => {
    this.setState({
      isDeleted: true,
      itemId: id,
      isEdit: false
    });
  }
  componentDidUpdate() {
      this.props.orderId(this.props.ordersId);
  }

  contentRenderer = () => {
    const { classes, orderItems } = this.props;
    const { isEdit, itemId, isDeleted } = this.state;

    if (orderItems)
      return orderItems.items.map((data, index) => {
        return (
          <List className={classes.root} key={index}>
            <ListItem
              alignItems="flex-start"
              style={{ backgroundColor: "#e0e0e0" }}
            >
              <ListItemText primary={data.itemName} />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  onClick={() => this.handleDeleteItems(data._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="Edit"
                  color="primary"
                  onClick={() => this.handleEditItems(data._id)}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="UOM" secondary={data.uom} />
            </ListItem>
            <ListItem>
              <ListItemText primary="COST" secondary={data.cost} />
            </ListItem>
            <ListItem>
              {isEdit && data._id === itemId  && !isDeleted ? (
                <FormControl>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    className={classes.bootstrapFormLabel}
                  >
                    Units
                  </InputLabel>
                  <InputBase
                    id="bootstrap-input"
                    placeholder="Enter Units"
                    name="units"
                    value={this.state.units}
                    classes={{
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput
                    }}
                    onChange={this.handleOnUnitChange}
                  />
                </FormControl>
              ) : (
                <ListItemText primary="Units" secondary={data.quantity} />
              )}
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Description"
                secondary={data.description}
              />
            </ListItem>
            {isEdit && data._id === itemId && !isDeleted? (
              <ListItem>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={() => this.handleOnUpdate(data._id)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  color="default"
                  className={classes.margin}
                  onClick={this.handleOnEditCancel}
                >
                  Cancel
                </Button>
              </ListItem>
            ) : (
              ""
            )}
            {isDeleted && data._id === itemId ? (
              <ListItem>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={() => this.props.deleteItem(data._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  color="default"
                  className={classes.margin}
                  onClick={this.handleOnDeleteCancel}
                >
                  Cancel
                </Button>
              </ListItem>
            ) : (
              ""
            )}
          </List>
        );
      });
  };
  render() {
    return (
      <Grid>
        <RightPanel
          buttonName="Add"
          title="Details Line - Items"
          {...this.props}
          contentRenderer={this.contentRenderer}
          onButtonClick={this.handleOnAddButtonClick}
        />
      </Grid>
    );
  }
}

EditDeleteItems.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  debugger;
  return {
    orderItems: store.order.orderById,
    ordersId: store.order.orderId
  };
};

const mapDispatchToProps = dispatch => {
  debugger;
  return {
    updateItem: (id, units) =>
      dispatch({ type: actionTypes.UPDATE_ITEM_REQUEST, id, units }),
    orderId: id => dispatch({ type: actionTypes.FETCH_ORDER_BY_ORDER_ID, id }),
    fetchItems: () => dispatch({type: actionTypes.FETCH_ITEM_TO_ORDER_REQUEST}),
    deleteItem: itemId =>
      dispatch({ type: actionTypes.DELETE_ITEM_REQUEST, itemId: itemId })
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditDeleteItems)));
