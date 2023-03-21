// Inputs
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

// Data Display
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";

// Surfaces
import Toolbar from "@mui/material/Toolbar";

export default function Header() {
  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          NSTH Room Reservation
        </Typography>
        <Button variant="outlined">Login</Button>
      </Toolbar>
    </>
  );
}
