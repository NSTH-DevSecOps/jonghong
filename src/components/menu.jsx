import { NavLink } from "react-router-dom";

// Data display
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// Layout
import Box from "@mui/material/Box";

export default function Menu() {
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="sm1">
              <ListItemText primary="Small Meeting 1" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="sm2">
              <ListItemText primary="Small Meeting 2" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="bm1">
              <ListItemText primary="Big Meeting 1" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="bm2">
              <ListItemText primary="Big Meeting 2" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="tr1">
              <ListItemText primary="Training 1" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
