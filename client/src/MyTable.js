import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, InputLabel } from "@mui/material";

function MyTable({ data, columns, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      {data?.length ? (
        <Table sx={{ minWidth: 650 }} aria-label="my generic table">
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c} sx={{ fontWeight: 600 }}>
                  {c.toUpperCase()}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 600 }} align="center">
                actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow
                key={d.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((c) => (
                  <TableCell key={c}>{d[c]}</TableCell>
                ))}
                <TableCell align="right" sx={{ width: "80px" }}>
                  <IconButton aria-label="edit" onClick={() => onEdit(d)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => onDelete(d)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <InputLabel align="center"> Empty data </InputLabel>
      )}
    </TableContainer>
  );
}

export default MyTable;
