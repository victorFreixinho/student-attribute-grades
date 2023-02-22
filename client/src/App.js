import { useState } from "react";

import MyAppBar from "./MyAppBar";
import MyAppTab from "./MyAppTab";

function App() {
  const tabs = ["students", "attributes"];
  const columnsByTab = {
    students: ["id", "name", "age"],
    attributes: ["id", "name"],
  };
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <>
      <MyAppBar
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <MyAppTab tab={selectedTab} tableColumns={columnsByTab[selectedTab]} />
    </>
  );
}

export default App;
