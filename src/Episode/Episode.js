import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import "moment-duration-format";
import { TablePaginationActionsWrapped } from "../TablePaginationActions/TablePaginationActions";
import EpisodeList from "../EpisodeList";

export const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 250
  },
  tableWrapper: {
    overflowX: "hidden"
  }
});

/*
 * Note: material-ui TablePagination is zero based. 
 * Nitro and therefore our current API is one based.
*/

export class Episode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      totalRows: 0,
      rows: [],
      page: 0, // zero based current page
      rowsPerPage: 5,
      sid: "",
      date: moment().utc().format()
    };
  }

  onPageChange = (page, rowsPerPage, totalRows) => {
    this.setState({
      page, rowsPerPage, totalRows
    });
  }

  componentDidMount = () => {
    this.setState({
      sid: this.props.sid,
      date: this.props.date
    });
  };

  componentDidUpdate(prevProps) {
    console.log(
      "Episode: %s %s want page %d items per page %d",
      this.props.sid,
      this.props.availability,
      this.state.page,
      this.state.rowsPerPage
    );
  }

  handleChangePage = (_event, page) => {
    this.setState({ page: parseInt(page) });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value) });
  };

  onPageLoaded = (_page, _rowsPerPage, totalRows) => {
    this.setState({totalRows});
  };

  render() {
    const { classes } = this.props;
    let { rowsPerPage, page, totalRows } = this.state;

    return (
      <div>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Add</TableCell>
                </TableRow>
              </TableHead>
              <EpisodeList
                sid={this.props.sid} availability={this.props.availability}
                page={this.state.page} rowsPerPage={this.state.rowsPerPage}
                onPageLoaded={this.onPageLoaded}
                onAddClicked={this.props.handleClick}
              />
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{ native: true }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

Episode.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Episode);
