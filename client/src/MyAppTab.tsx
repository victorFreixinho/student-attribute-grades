import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import mock from "./mock.json";
import MyTable from "./MyTable";
import { Student, Attribute } from "./types";

type MyAppTabProps = {
  tab: string;
  tableColumns: string[];
  EditModal: (props: any) => React.ReactElement;
};

type Data = Student | Attribute;

function MyAppTab({ tab, tableColumns, EditModal }: MyAppTabProps) {
  const [data, setData] = useState<Data[]>([]);

  const [action, setAction] = useState<string | null>(null);
  const [obj, setObj] = useState<Data | null>(null);

  const startAction = (act: string, o: Data | null = null) => {
    setObj(o);
    setAction(act);
  };

  const finishAction = () => {
    setObj(null);
    setAction(null);
  };

  const onEdit = (objToEdit: Data | null) => {
    if (!objToEdit?.id) {
      // TODO: call create obj service method
      const id = String(
        data?.length && data[data.length - 1].id
          ? data[data.length - 1].id + 1
          : 0
      );
      setData((state) => [
        ...(state || []),
        { ...(objToEdit || ({} as Data)), id },
      ]);
    } else if (objToEdit.id === obj?.id) {
      // TODO: call update obj service method
      setData((state) =>
        state.map((d) => (d.id === objToEdit.id ? objToEdit : d))
      );
    }
    finishAction();
  };

  const onDelete = (objToDelete: Data | null) => {
    if (objToDelete?.id) {
      // TODO: call delete obj service method
      setData((state) => state?.filter((d) => d.id !== objToDelete.id) || []);
    }
    finishAction();
  };

  useEffect(() => {
    // TODO: fetch data
    setData((mock as any)[tab]);
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
          open={action === "create" || (action === "edit" && !!obj)}
          setOpen={(open: boolean) => !open && finishAction()}
          fields={tableColumns?.filter((c) => c.toLowerCase() !== "id") || []}
        />
      )}
    </>
  );
}

export default MyAppTab;
