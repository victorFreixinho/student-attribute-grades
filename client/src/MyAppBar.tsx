import React from "react";

import { AppBar, Toolbar, Button } from "@mui/material";

type MyAppBarProps = {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

function MyAppBar({ tabs, selectedTab, setSelectedTab }: MyAppBarProps) {
  return (
    <AppBar position="static">
      <Toolbar color="secondary">
        {tabs?.map((tab) => (
          <Button
            key={tab}
            color="inherit"
            onClick={() => setSelectedTab(tab)}
            sx={
              tab === selectedTab
                ? { fontWeight: 800, border: "solid 2px white" }
                : {}
            }
          >
            {tab}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
