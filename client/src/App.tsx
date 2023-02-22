import { useState } from "react";

import AppBar from "src/components/AppBar";
import AppTab from "src/components/AppTab";
import { EditAttributeModal, EditStudentModal } from "src/components/modals";
import { Tabs } from "./types";

function App() {
  const columnsByTab: Record<string, string[]> = {
    students: ["id", "name", "age"],
    attributes: ["id", "name"],
  };
  const [selectedTab, setSelectedTab] = useState(Tabs.STUDENTS);
  return (
    <>
      <AppBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <AppTab
        tab={selectedTab}
        tableColumns={columnsByTab[selectedTab]}
        EditModal={
          selectedTab === "students" ? EditStudentModal : EditAttributeModal
        }
      />
    </>
  );
}

export default App;
