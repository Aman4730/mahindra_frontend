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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [
    { id: "name", label: "Recent File/Folder" },
    { id: "createdBy", label: "Created By" },
    { id: "workspace_name", label: "WorkSpace" },
    { id: "Size", label: "Size" },
    { id: "updatedAt", label: "Updated D/T" },
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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  function getFileIconByExtension(filename) {
    switch (filename) {
      case ("doc", "docx"):
        return "docx.svg";
      case "png":
        return "jpeg.svg";
      case "pdf":
        return "pdf.svg";
      case "ppt":
        return "pptx.svg";
      case "txt":
        return "txt.svg";
      case "video":
        return "video.png";
      case "xlsx":
        return "xlsx.svg";
      case "csv":
        return "csv.svg";
      case "zip":
        return "zip.svg";
      default:
        return "default.svg";
    }
  }
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Paper>
        <TableContainer
          style={{
            height: "260px",
            width: "66vw",
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
              {tableData?.map((data, index) => {
                const isItemSelected = isSelected(data.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                const options = {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                };
                const updateAt = new Date(data.updatedAt);
                const updateAtdate = updateAt.toLocaleTimeString(
                  "en-US",
                  options
                );

                const createdAt = new Date(data.createdAt);
                const createdAted = createdAt.toLocaleTimeString(
                  "en-US",
                  options
                );
                const isEvenRow = index % 2 === 1; // Check if it's an even row
                function formatFileSize(sizeInBytes) {
                  if (sizeInBytes < 1024) {
                    return sizeInBytes + " B";
                  } else if (sizeInBytes < 1024 * 1024) {
                    return (sizeInBytes / 1024).toFixed(2) + " KB";
                  } else if (sizeInBytes < 1024 * 1024 * 1024) {
                    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
                  } else {
                    return (
                      (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"
                    );
                  }
                }
                const fileSizeInBytes = data?.file_size || data?.folder_size;
                const formattedSize = formatFileSize(fileSizeInBytes);
                return (
                  <TableRow
                    key={data.id}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: isEvenRow ? "#F4F6F6 " : "transparent", // Apply grey background to even rows
                    }}
                  >
                    <TableCell
                      className="tablefont"
                      style={{
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "200px",
                        transition: "background-color 0.3s ease", // Add transition for hover effect
                      }}
                    >
                      <img
                        src={
                          data?.file_name
                            ? getFileIconByExtension(data.file_type)
                            : data?.folder_name
                            ? "/folder.png"
                            : ""
                        }
                        alt="File Icon"
                        height="22px"
                        style={{ marginRight: "10px", marginBottom: "2px" }}
                      />
                      {data?.file_name || data?.folder_name}
                    </TableCell>

                    <TableCell>{data.email}</TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {data.workspace_name}
                    </TableCell>

                    <TableCell>{formattedSize}</TableCell>
                    <TableCell>{updateAtdate}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
