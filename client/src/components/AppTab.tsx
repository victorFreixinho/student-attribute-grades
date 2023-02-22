import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import api from "src/services";
import Table from "./Table";
import { Student, Attribute } from "../types";
import { Tabs } from "src/types";

type AppTabProps = {
  tab: Tabs;
  tableColumns: string[];
  EditModal: (props: any) => React.ReactElement;
};

type Data = Attribute | Student;

function AppTab({ tab, tableColumns, EditModal }: AppTabProps) {
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

  const onEdit = async (objToEdit: Data) => {
    let result;

    if (objToEdit?.id)
      result = await api[tab].update(objToEdit.id, objToEdit as any);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    else result = await api[tab].create(objToEdit as any);

    // const editedObj: Data | null = result.data;

    // if (result?.success && editedObj) {
    //   setData((state) =>
    //     objToEdit?.id
    //       ? state.map((d) => (d.id === editedObj.id ? editedObj : d))
    //       : [...(state || []), editedObj]
    //   );
    // }

    finishAction();
  };

  const onDelete = async (objToDelete: Data | null) => {
    if (objToDelete?.id) {
      const result = await api[tab].del(objToDelete.id);
      if (result?.success) {
        setData((state) => state?.filter((d) => d.id !== objToDelete.id) || []);
      }
    }
    finishAction();
  };

  useEffect(() => {
    api[tab].fetchAll().then((d) => setData(d.data));
  }, [tab]);

  return (
    <>
      <Table
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

export default AppTab;
