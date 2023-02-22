import { useEffect, useState } from "react";
import mock from "./mock.json";
import MyTable from "./MyTable";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function MyAppTab({ tab, tableColumns, EditModal }) {
  const [data, setData] = useState(null);

  const [action, setAction] = useState(null);
  const [obj, setObj] = useState(null);

  const startAction = (act, attr = null) => {
    setObj(attr);
    setAction(act);
  };

  const finishAction = () => {
    setObj(null);
    setAction(null);
  };

  const onEdit = (objToEdit) => {
    if (!objToEdit.id) {
      // TODO: call create obj service method
      const id =
        data?.length && data[data.length - 1].id
          ? data[data.length - 1].id + 1
          : 0;
      setData((state) => [...(state || []), { ...(objToEdit || {}), id }]);
    } else if (objToEdit.id === obj.id) {
      // TODO: call update obj service method
      setData((state) =>
        state.map((d) => (d.id === objToEdit.id ? objToEdit : d))
      );
    }
    finishAction();
  };

  const onDelete = (objToDelete) => {
    if (objToDelete.id) {
      // TODO: call delete obj service method
      setData((state) => state.filter((d) => d.id !== objToDelete.id));
    }
    finishAction();
  };

  useEffect(() => {
    // TODO: fetch data
    setData(mock[tab]);
  }, [tab]);

  return (
    <>
      <MyTable
        data={data || []}
        columns={tableColumns}
        onEdit={(d) => startAction("edit", d)}
        onDelete={(d) => onDelete(d)}
      />
      <Button
        onClick={() => startAction("create")}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          position: "fixed",
          bottom: "7px",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        Add
      </Button>
      {(action === "create" || (action === "edit" && obj)) && (
        <EditModal
          objToEdit={obj}
          onSave={onEdit}
          open={action === "create" || (action === "edit" && obj)}
          setOpen={(open) => !open && finishAction()}
          fields={tableColumns?.filter((c) => c.toLowerCase() !== "id") || []}
        />
      )}
    </>
  );
}

export default MyAppTab;
