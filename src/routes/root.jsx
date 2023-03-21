import { Outlet } from "react-router-dom";

// Layout
import Grid from "@mui/material/Unstable_Grid2";

// Custom components
import Header from "../components/header";
import Menu from "../components/menu";
import Footer from "../components/footer";

export default function Root() {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      <Grid container>
        {/* Menu */}
        <Grid item xs={1}>
          <Menu />
        </Grid>
        {/* Menu */}

        {/* Main */}
        <Grid item xs={11}>
          <Outlet />
        </Grid>
        {/* Main */}
      </Grid>

      {/* Footer */}
      <Footer />
      {/* Footer */}
    </>
  );
}
