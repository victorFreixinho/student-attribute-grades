import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { Student, Attribute } from "src/types";

type TableProps = {
  data: Student[] | Attribute[];
  columns: string[];
  onEdit: (obj: Student | Attribute) => void;
  onDelete: (obj: Student | Attribute) => void;
};

function Table({ data, columns, onEdit, onDelete }: TableProps) {
  return (
    <TableContainer component={Paper}>
      {data?.length ? (
        <MuiTable sx={{ minWidth: 650 }} aria-label="my generic table">
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
                  <TableCell key={c}>{(d as any)[c]}</TableCell>
                ))}
                <TableCell align="right" sx={{ width: "80px" }}>
                  <IconButton aria-label="edit" onClick={() => onEdit(d)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => onDelete(d)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      ) : (
        <InputLabel sx={{ textAlign: "center" }}>Empty data</InputLabel>
      )}
    </TableContainer>
  );
}

export default Table;
