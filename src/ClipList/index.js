import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment-duration-format";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AssetDao from "../AssetDao/AssetDao";

function formattedDuration(clip) {
  const duration = moment.duration(clip.available_versions.version[0].duration);
  return duration.format("hh:mm:ss", { trim: false });
}

export default function ClipList({
  sid,
  type,
  page = 0,
  rowsPerPage = 5,
  onAddClicked = function() {
    console.log("add clicked");
  },
  onPageLoaded = function(page, rowsPerPage, total) {
    console.log("page changed", page, rowsPerPage, total);
  },
  sort,
  sort_direction
}) {
  const [currentPage, setCurrentPage] = React.useState(-1);
  const [currentRowsPerPage, setCurrentRowsPerPage] = React.useState(5);
  const [currentType, setcurrentType] = React.useState("web");
  const [currentSortDirection, setcurrentSortDirection] = React.useState(
    "desc"
  );
  const [rows, setRows] = React.useState([]);

  // statements in the body of the function are called on rendering!!!

  if (
    page === currentPage &&
    rowsPerPage === currentRowsPerPage &&
    sort_direction == currentSortDirection &&
    type == currentType
  ) {
    console.log("cliplist no change", page, rowsPerPage);
  } else {
    console.log("cliplist fetching", page, rowsPerPage);

    AssetDao.getClips(
      sid,
      type,
      page, // nitro is one-based
      rowsPerPage,
      response => {
        let items = response.data.items;
        console.log("updated", items);
        let total = response.data.total;
        console.log("got clip data for", type);
        setRows(items);
        onPageLoaded(currentPage, currentRowsPerPage, total);
      },
      sort,
      sort_direction
    );
    setCurrentPage(page);
    setCurrentRowsPerPage(rowsPerPage);
    setcurrentSortDirection(sort_direction);
    setcurrentType(type);
  }

  return (
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.pid} className={row.insertionType}>
          <TableCell component="th" scope="row">
            <div className="tooltip">
              {" "}
              {row.title === undefined ? row.presentation_title : row.title}
              <span className="tooltiptext">PID = {row.pid}</span>
            </div>
          </TableCell>
          <TableCell align="right">{row.pid}</TableCell>
          <TableCell align="right">{formattedDuration(row)}</TableCell>
          <TableCell align="right">
            <button
              className="ui compact icon button"
              onClick={() => {
                onAddClicked(AssetDao.clip2Item(row));
              }}
            >
              <i className="plus icon"></i>
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

ClipList.propTypes = {
  page: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.func.isRequired
};
