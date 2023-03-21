import { format } from "date-fns";
import { th } from "date-fns/locale";

// Data Display
import Typography from "@mui/material/Typography";

// Layout
import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="subtitle2" align="center">
          Last Update:{" "}
          {format(Date.now(), "PPPP, H:mm:ss X", {
            locale: th,
          })}
        </Typography>
      </Box>
    </>
  );
}
