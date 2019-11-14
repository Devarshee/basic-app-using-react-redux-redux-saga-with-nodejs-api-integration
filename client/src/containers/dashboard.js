import React, { Component } from "react";
import EnhancedTable from "../components/table";
import HeaderBar from "../components/header";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EditDeleteItems from "../components/editItems";
import AddItems from '../components/addItems';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as actionTypes from "../actions/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      isPanelOpen: false,
      sortBy: "date",
      isSearchUser: false
    };
  }

  handleOnChangeSearchbar = e => {
    this.setState({
      userId: e.target.value,
        isPanelOpen: false
    });
  };

  handleOnKeyPress =(e)=>{
    debugger
    if (e.key === "Enter") {
      this.props.fetchOrdersByUser(this.state.userId);
      if (this.state.userId) {
        this.setState({
          isSearchUser: true
        });
      } else {
        this.setState({
          isSearchUser: false
        });
      }
    }
  }

  handleOnClick = (e, id) => {
    if (id) {
      this.props.orderId(id);
    }
    this.setState({
      isPanelOpen: true,
    });
    this.props.history.push('/showItems');
  };

  handleChange = event => {
    this.setState({ sortBy: event.target.value });
  };

  render() {
    const { classes, usersData } = this.props;

    const rows = [
      {
        label: "Order No",
        field: "orderNumber",
        width: 150
      },
      {
        label: "Date",
        field: "date",
        width: 270
      },
      {
        label: "Zip",
        field: "zip",
        width: 200
      },
      {
        label: "St",
        field: "st",
        width: 100
      },
      {
        label: "Created By",
        field: "createdBy",
        width: 150
      },
      {
        label: "Picked",
        field: "picked",
        width: 100
      },
      {
        label: "Shipped",
        field: "shipped",
        width: 100
      }
    ];

    return (
      <div>
        <HeaderBar
          title={usersData ? usersData.name : 'Customer Name'}
          onChange={this.handleOnChangeSearchbar}
          onKeyPress={this.handleOnKeyPress}
        />
        <div className={classes.root}>
          <FormControl className={classes.margin}>
            <InputLabel
              className={classes.bootstrapFormLabel}
            >
              Sort By
            </InputLabel>
            <NativeSelect
              value={this.state.sortBy}
              onChange={this.handleChange}
              input={<BootstrapInput name="sortBy" id="sortBy" />}
            >
              <option value="date">Date</option>
              <option value="name">OrderId</option>
            </NativeSelect>
          </FormControl>
        </div>
        <Grid container>
          <Grid item xs={this.state.isPanelOpen ? 9 : 12}>
          {usersData && (
              <EnhancedTable
                data={usersData.order}
                rows={rows}
                order="asc"
                orderBy={this.state.sortBy}
                onClick={this.handleOnClick}
              />
            )}
            {!usersData && this.state.isSearchUser && (
              <h3>User does not exist!!!</h3>
            )}
            {!usersData && (
              <EnhancedTable
                data={this.props.orderData}
                rows={rows}
                order="asc"
                orderBy={this.state.sortBy}
                onClick={this.handleOnClick}
              />
            )}
          </Grid>
          <Grid item xs={3}>
            {this.state.isPanelOpen?<>
                <Route path='/addItems' component={AddItems}></Route>
                <Route path='/showItems' component={EditDeleteItems}></Route>
                </>:''}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = props => {
  return { 
    orderData: props.order.orders,
    usersData: props.userData.ordersByUser
   };
};

const mapDispatchToProps = dispatch => {
  debugger;
  return {
    fetchOrders: () => dispatch({ type: actionTypes.FETCH_ORDER_REQUEST }),
    fetchOrdersByUser: (id) => dispatch({ type: actionTypes.FETCH_ORDER_BY_USER_REQUEST, id }),
    orderId: id => dispatch({ type: actionTypes.FETCH_ORDER_BY_ORDER_ID, id })
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard)));
