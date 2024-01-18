// import * as React from "react";
// import Box from "@mui/material/Box";
// import { Switch } from "@mui/material";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import { Tooltip } from "@mui/material";
// import { visuallyHidden } from "@mui/utils";
// import TableRow from "@mui/material/TableRow";
// import TableHead from "@mui/material/TableHead";
// import TableBody from "@mui/material/TableBody";
// import EditIcon from "@mui/icons-material/Edit";
// import TableCell from "@mui/material/TableCell";
// import DeleteIcon from "@mui/icons-material/Delete";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import TableContainer from "@mui/material/TableContainer";

// function EnhancedTableHead(props) {
//   const { order, orderBy, onRequestSort } = props;

//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };
//   const headCells = [
//     { id: "Profile_Id", label: "Profile_Id" },
//     { id: "Email_Id", label: "Email_Id" },
//     { id: "Authentication", label: "Authentication" },
//     { id: "Security", label: "Security" },
//     { id: "Server IP / Url", label: "Server/Name" },
//     { id: "Action", label: "Action" },
//   ];
//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             padding={"normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//             style={{
//               backgroundColor: "#FFFFCC",
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//             }}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//               style={headCell.style}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// export default function SmtpMainTable({ tableData, getSmpt }) {
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("name");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };
//   const isSelected = (name) => selected.indexOf(name) !== -1;
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   return (
//     <Box>
//       <Paper>
//         <TableContainer
//           style={{
//             height: "260px",
//             borderRadius: "10px",
//           }}
//         >
//           <Table aria-labelledby="tableTitle" size={"small"}>
//             <EnhancedTableHead
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//             />
//             <TableBody>
//               {getSmpt?.map((data, index) => {
//                 console.log(data, "kjhbfkjdf");
//                 const isItemSelected = isSelected(data.name);
//                 const options = {
//                   year: "numeric",
//                   month: "2-digit",
//                   day: "2-digit",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                   hour12: false,
//                 };
//                 const updateAt = new Date(data.updatedAt);
//                 const updateAtdate = updateAt.toLocaleTimeString(
//                   "en-US",
//                   options
//                 );
//                 const isEvenRow = index % 2 === 1; // Check if it's an even row
//                 function formatFileSize(sizeInBytes) {
//                   if (sizeInBytes < 1024) {
//                     return sizeInBytes + " B";
//                   } else if (sizeInBytes < 1024 * 1024) {
//                     return (sizeInBytes / 1024).toFixed(2) + " KB";
//                   } else if (sizeInBytes < 1024 * 1024 * 1024) {
//                     return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
//                   } else {
//                     return (
//                       (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"
//                     );
//                   }
//                 }
//                 const fileSizeInBytes = data?.file_size || data?.folder_size;
//                 const formattedSize = formatFileSize(fileSizeInBytes);
//                 return (
//                   <TableRow
//                     key={index}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     selected={isItemSelected}
//                     sx={{
//                       cursor: "pointer",
//                       backgroundColor: isEvenRow ? "#F4F6F6 " : "transparent",
//                     }}
//                   >
//                     <TableCell
//                       className="tablefont"
//                       style={{
//                         fontSize: "13px",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         maxWidth: "200px",
//                         transition: "background-color 0.3s ease",
//                       }}
//                     >
//                       {data?.id}
//                     </TableCell>

//                     <TableCell>{data.email}</TableCell>
//                     <TableCell style={{ fontSize: "13px" }}>
//                       {data.authentication}
//                     </TableCell>

//                     <TableCell>{data.security}</TableCell>
//                     <TableCell>{data.from_name}</TableCell>
//                     <TableCell>
//                       <Tooltip title="Edit">
//                         <EditIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <DeleteIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
//                       </Tooltip>
//                       <Switch
//                         checked={data.user_status === "true"}
//                         size="small"
//                       />
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//               {getSmpt?.length > 0 ? (
//                 ""
//               ) : (
//                 <TableRow
//                   style={{
//                     height: 53,
//                   }}
//                 >
//                   <TableCell colSpan={5} align="center">
//                     No data available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Tooltip } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useHistory } from "react-router-dom";
import SmsIcon from "@mui/icons-material/Sms";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TablePagination from "@mui/material/TablePagination";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SportsVolleyballRoundedIcon from "@mui/icons-material/SportsVolleyballRounded";
import EditIcon from "@mui/icons-material/Edit";
import { Switch } from "@mui/material";
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [
    { id: "Profile_Id", label: "Id" },
    { id: "Email_Id", label: "Email Id" },
    { id: "Authentication", label: "Authentication" },
    { id: "Security", label: "Security" },
    { id: "Server IP / Url", label: "Server IP/Url" },
    { id: "Action", label: "Action", style: { marginLeft: "23px" } },
  ];
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ backgroundColor: "#FFFFCC" }}
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

export default function SmtpMainTable({
  rows,
  isLogin,
  callApi,
  headCells,
  propertys,
  openModal,
  searchTerm,
  setPropertys,
  allfolderlist,
  openFileUpload,
  onFileDownload,
  handleClickMove,
  PermissionPolicy,
  onDownloadfolders,
  handleClickLinkOpen,
  handleOpenDeleteFile,
  handleClickOpenCommets,
  handleClickVersionOpen,
  handleClickOpenProperties,
  getSmpt,
  onEditClick,
  onBlockClick,
}) {
  console.log(getSmpt, "getSmpt");
  const property = PermissionPolicy?.map((data) => {
    setPropertys(data);
  });
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
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage) : 0;
  // const [data1, setData1] = React.useState([
  //   { id: 1, smtp_status: "true" },
  //   { id: 2, smtp_status: "false" },
  //   // Add more data as needed
  // ]);
  // console.log(data1, "dataaa");
  // // Function to handle switch toggle
  // const onBlockClick1 = (id, checked) => {
  //   console.log(id, checked, "ivifvghu");
  //   // Update the data array based on the id
  //   setData1((prevData) =>
  //     prevData.map((item) =>
  //       item.id === id ? { ...item, smtp_status: checked.toString() } : item
  //     )
  //   );
  // };
  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {getSmpt
                // ?.filter((data) =>
                //   data.email?.toLowerCase().includes(searchTerm?.toLowerCase())
                // )
                .map((data, index) => {
                  console.log(data, "jhjhkgk");
                  const isItemSelected = isSelected(data.name);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        className="tablefont"
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        {data?.id}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "180px",
                        }}
                      >
                        {data.username}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {data.authentication}
                      </TableCell>
                      <TableCell>{data.security}</TableCell>
                      <TableCell>{data.host_serverip}</TableCell>
                      <TableCell
                        style={{
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                      >
                        <Switch
                          checked={data.smtp_status === true}
                          size="small"
                          onChange={(event) =>
                            onBlockClick(data.id, event.target.checked)
                          }
                          disabled={data.smtp_status ? true : false}
                        />
                        <Tooltip
                          title="Edit"
                          onClick={() => onEditClick(data.id)}
                        >
                          <EditIcon sx={{ mr: 1 }} fontSize="small" />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteIcon sx={{ ml: 1, mr: 1 }} fontSize="small" />
                        </Tooltip>
                      </TableCell>
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
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={getSmpt.length}
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
