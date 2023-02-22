import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField, Button, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";

const style = {
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

function EditModal({ objToEdit, open, setOpen, onSave, fields }) {
  const [obj, setObj] = React.useState(objToEdit || {});
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
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
        <Box sx={style}>
          <Stack spacing={2}>
            {fields?.map((field) => (
              <TextField
                id={field}
                label={field.toUpperCase()}
                variant="outlined"
                value={obj[field] || ""}
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

export default EditModal;
