import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { Card, TablePagination } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import CloseIcon from "@mui/icons-material/Close";
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [
    { id: "Parameters", label: "Parameters" },
    { id: "Inv 1", label: "Inv 1" },
    { id: "Inv 2", label: "Inv 2" },
    // { id: "Last_Event", label: "Last Event" },
    // { id: "Power_Generation", label: "Power Generation" },
    { id: "Inv 3", label: "Inv 3" },
    { id: "Inv 4", label: "Inv 4" },
    { id: "Inv 5", label: "Inv 5" },
    { id: "Inv 6", label: "Inv 6" },
  ];
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              backgroundColor: "#FFFFCC",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={headCell.style}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function InverterValues({ tableGrid, values }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const tableData1 = [
    {
      parameter: "L1 I",
      Inv1: "1820.19",
      Inv2: "106.40",
      Inv3: "216.90",
      Inv4: "315.98",
      Inv5: "209.60",
      Inv6: "203.95",
    },
    {
      parameter: "L1 II",
      Inv1: "1420.90",
      Inv2: "1406.40",
      Inv3: "2816.50",
      Inv4: "3015.68",
      Inv5: "2909.10",
      Inv6: "2603.45",
    },
    {
      parameter: "L1 III",
      Inv1: "1620.70",
      Inv2: "1806.40",
      Inv3: "2816.50",
      Inv4: "3015.68",
      Inv5: "2909.10",
      Inv6: "2603.45",
    },
    {
      parameter: "Frequency",
      Inv1: "172.60",
      Inv2: "166.40",
      Inv3: "26.50",
      Inv4: "705.68",
      Inv5: "909.10",
      Inv6: "203.45",
    },
    {
      parameter: "DC I",
      Inv1: "120.40",
      Inv2: "406.40",
      Inv3: "816.50",
      Inv4: "015.68",
      Inv5: "909.10",
      Inv6: "29.45",
    },
    {
      parameter: "DC V",
      Inv1: "1200.10",
      Inv2: "1406.40",
      Inv3: "2816.50",
      Inv4: "3015.68",
      Inv5: "2909.10",
      Inv6: "2603.45",
    },
    {
      parameter: "Active Power",
      Inv1: "1220.10",
      Inv2: "1406.40",
      Inv3: "2916.50",
      Inv4: "3015.68",
      Inv5: "2909.10",
      Inv6: "2603.45",
    },
    {
      parameter: "DC Power",
      Inv1: "1420.10",
      Inv2: "1106.40",
      Inv3: "2816.50",
      Inv4: "3015.68",
      Inv5: "2909.10",
      Inv6: "2603.45",
    },
  ];
  const history = useHistory();
  const navigate = (boxData) => {
    history.push("/sitesBoxes", { boxData: boxData });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData1.length) : 0;

  return (
    <Card elevation={6}>
      <Paper>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {values
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, index) => {
                  const isItemSelected = isSelected(data.name);
                  const isEvenRow = index % 2 === 1;
                  return (
                    <TableRow
                      key={index}
                      role="checkbox"
                      tabIndex={-1}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: isEvenRow ? "#F4F6F6 " : "transparent",
                      }}
                    >
                      <TableCell
                        className="tableTextSize"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                          transition: "background-color 0.3s ease",
                        }}
                        onClick={() => navigate(boxData)}
                      >
                        {data?.heading}
                      </TableCell>
                      {data.inv1 ? (
                        <TableCell className="tableTextSize">
                          {data.inv1}
                        </TableCell>
                      ) : (
                        <TableCell className="tableTextSize">
                          <CloseIcon fontSize="small" />
                        </TableCell>
                      )}
                      {data.inv2 ? (
                        <TableCell className="tableTextSize">
                          {data.inv2}
                        </TableCell>
                      ) : (
                        <TableCell className="tableTextSize">
                          <CloseIcon fontSize="small" />
                        </TableCell>
                      )}
                      {data.inv3 ? (
                        <TableCell className="tableTextSize">
                          {data.inv3}
                        </TableCell>
                      ) : (
                        <TableCell className="tableTextSize">
                          <CloseIcon fontSize="small" />
                        </TableCell>
                      )}
                      {data.inv4 ? (
                        <TableCell className="tableTextSize">
                          {data.inv4}
                        </TableCell>
                      ) : (
                        <TableCell className="tableTextSize">
                          <CloseIcon fontSize="small" />
                        </TableCell>
                      )}
                      {data.inv5 ? (
                        <TableCell className="tableTextSize">
                          {data.inv5}
                        </TableCell>
                      ) : (
                        <TableCell className="tableTextSize">
                          <CloseIcon fontSize="small" />
                        </TableCell>
                      )}
                      {data.inv6 ? (
                        <TableCell className="tableTextSize">
                          {data.inv6}
                        </TableCell>
                      ) : (
                        <TableCell className="tableTextSize">
                          <CloseIcon fontSize="small" />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              {tableData1.length > 0 ? null : (
                <TableRow
                  style={{
                    height: 53,
                  }}
                >
                  <TableCell colSpan={8} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={tableData1.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
            style: {
              marginBottom: "13px",
            },
          }}
          nextIconButtonProps={{
            style: {
              marginBottom: "12px",
              color: "green",
            },
            tabIndex: -1,
          }}
          backIconButtonProps={{
            style: {
              marginBottom: "12px",
              color: "green",
            },
            tabIndex: -1,
          }}
          style={{
            height: "40px",
            overflow: "hidden", // Hide any overflow content
          }}
        />
      </Paper>
    </Card>
  );
}
