import React, { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Stack,
  OutlinedInput,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Modal,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import mock from "./mock.json";
import { Student } from "./types";

type EditStudentModalProps = {
  objToEdit: Student | null;
  open: boolean;
  setOpen: (o: boolean) => void;
  onSave: (s: Partial<Student>) => void;
  fields: string[];
};

function EditStudentModal({
  objToEdit,
  open,
  setOpen,
  onSave,
  fields,
}: EditStudentModalProps) {
  const [obj, setObj] = useState<Partial<Student>>(objToEdit || {});
  const handleClose = () => setOpen(false);
  const attributeOptions = mock.attributes;

  useEffect(() => {
    setObj(objToEdit || {});
  }, [objToEdit]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Stack spacing={2}>
            {fields?.map((field) => (
              <TextField
                id={field}
                label={field.toUpperCase()}
                variant="outlined"
                value={(obj as any)[field] || ""}
                onChange={(event) =>
                  setObj((o) => ({
                    ...(o ?? {}),
                    [field]: event?.target?.value || null,
                  }))
                }
              />
            ))}
            <FormControl>
              <InputLabel id="multiple-chip-label">Attributes</InputLabel>
              <Select
                labelId="multiple-chip-label"
                id="multiple-chip"
                multiple
                value={obj?.attributes || []}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setObj((o) => ({
                    ...o,
                    attributes:
                      typeof value === "string"
                        ? value.split(",")
                        : value || [],
                  }));
                }}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Attributes" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {attributeOptions.map((attr) => (
                  <MenuItem key={attr.name} value={attr.name}>
                    {attr.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button sx={{ color: grey[500] }} onClick={handleClose}>
                cancel
              </Button>
              <Button variant="contained" onClick={() => onSave(obj)}>
                save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default EditStudentModal;
