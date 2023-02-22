import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

function MyAppBar({ tabs, selectedTab, setSelectedTab }) {
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
