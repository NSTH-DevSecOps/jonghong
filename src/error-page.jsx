import { useRouteError } from "react-router-dom";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" component="div">
        {" "}
        Oops!
      </Typography>
      <Typography variant="subtitle2" component="div">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="subtitle1" component="div">
        <i>{error.statusText || error.message}</i>
      </Typography>
      <img src="https://http.cat/418.jpg"></img>
    </Box>
  );
}
