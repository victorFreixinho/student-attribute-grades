import { AppBar as MuiAppBar, Toolbar, Button } from "@mui/material";
import { Tabs } from "src/types";

type AppBarProps = {
  selectedTab: Tabs;
  setSelectedTab: (tab: Tabs) => void;
};

function AppBar({ selectedTab, setSelectedTab }: AppBarProps) {
  return (
    <MuiAppBar position="static">
      <Toolbar color="secondary">
        {Object.values(Tabs)?.map((tab) => (
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
    </MuiAppBar>
  );
}

export default AppBar;
