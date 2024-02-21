import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { visuallyHidden } from "@mui/utils";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import "./style.css";
import { TablePagination } from "@mui/material";

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [
    { id: "Sites", label: "Sites" },
    { id: "Capacity", label: "Capacity" },
    { id: "Status", label: "Status" },
    // { id: "Last_Event", label: "Last Event" },
    // { id: "Power_Generation", label: "Power Generation" },
    { id: "GHI", label: "GHI" },
    { id: "GTI", label: "GTI" },
    { id: "Module Temp", label: "Module Temp" },
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

export default function DataGridCard({ tableData }) {
  console.log(tableData, "tableData");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allfolderlist.length) : 0;
  const tableData1 = [
    {
      site: "aspl",
      capacity: "40",
      gti: "182.90577697753906",
      ghi: "30.149999618530273",
      module_temperature: "46.83300018310547",
    },
  ];
  return (
    <Box>
      <Paper>
        <TableContainer
          style={{
            borderRadius: "10px",
          }}
        >
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {tableData1?.map((data, index) => {
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
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "200px",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {data?.site}
                    </TableCell>
                    <TableCell className="tableTextSize">
                      {data.capacity}
                    </TableCell>
                    <TableCell className="tableTextSize">Active</TableCell>
                    <TableCell className="tableTextSize">
                      {Math.floor(data?.ghi * 100) / 100}
                    </TableCell>
                    <TableCell className="tableTextSize">
                      {Math.floor(data?.gti * 100) / 100}
                    </TableCell>
                    <TableCell className="tableTextSize">
                      {Number(data?.module_temperature).toFixed(2) + "°C"}
                    </TableCell>
                  </TableRow>
                );
              })}
              {tableData1.length > 0 ? (
                ""
              ) : (
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
          count={tableData.length}
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
    </Box>
  );
}
