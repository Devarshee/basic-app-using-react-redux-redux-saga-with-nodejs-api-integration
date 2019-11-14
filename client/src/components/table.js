import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import InfiniteScroll from "react-bidirectional-infinite-scroll";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class TableHeader extends React.Component {
  render() {
    const { order, orderBy, rows } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.field}
                sortDirection={orderBy === row.field ? order : false}
              >
                <TableSortLabel
                  active={orderBy === row.field}
                  direction={order}
                  style={{ cursor: "default" }}
                >
                  {row.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

TableHeader.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rows: PropTypes.array
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020,
    // height: "100vh"
  },
  tableWrapper: {
    overflowX: "auto",
    height: "100vh"
  }
});

class EnhancedTable extends React.Component {
  handleOnScroll = (position, previousPosition) => {
    const diffScroll = position - previousPosition;
    const direction = diffScroll > 0 ? "down" : "up";
  };

  handleScrollUp = () => {
    const items = this.props.data;
    setTimeout(() => items, 20000);
  };

  handleScrollDown = () => {
    const items = this.props.data;
    setTimeout(() => items, 20000);
  };

  render() {
    const { classes, data, order, orderBy, onClick, rows } = this.props;

    return (
      <Paper className={classes.root}>
        <div
          className={classes.tableWrapper}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <InfiniteScroll
            onReachBottom={this.handleScrollDown}
            onReachTop={this.handleScrollUp}
            onScroll={this.handleOnScroll}
            position={10}
          >
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableHeader order={order} orderBy={orderBy} rows={rows} />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice()
                  .map(n => {
                    return (
                      <TableRow
                        onClick={e => onClick(e, n._id)}
                        key={n._id}
                        style={{ cursor: "pointer" }}
                        hover
                      >
                        <TableCell>{n.orderNumber}</TableCell>
                        <TableCell>{n.date}</TableCell>
                        <TableCell>{n.zip}</TableCell>
                        <TableCell>{n.st}</TableCell>
                        <TableCell>{n.createdBy}</TableCell>
                        <TableCell>{n.picked}</TableCell>
                        <TableCell>{n.shipped}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(EnhancedTable);
