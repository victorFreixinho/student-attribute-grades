import React, { useState, useEffect } from "react";

import { TextField, Button, Stack, Box, Modal } from "@mui/material";
import { grey } from "@mui/material/colors";

import { Attribute } from "./types";

type EditAttributeModalProps = {
  objToEdit: Attribute | null;
  open: boolean;
  setOpen: (o: boolean) => void;
  onSave: (attr: Partial<Attribute>) => void;
  fields: string[];
};

function EditAttributeModal({
  objToEdit,
  open,
  setOpen,
  onSave,
  fields,
}: EditAttributeModalProps) {
  const [obj, setObj] = useState<Partial<Attribute>>(objToEdit || {});
  const handleClose = () => setOpen(false);

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

export default EditAttributeModal;
