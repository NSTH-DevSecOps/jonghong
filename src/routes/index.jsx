import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

export default function Index() {
  return (
    <>
      <Grid container justifyContent='center'>
        <Typography variant='subtitle1' component='div'>
          <p id='zero-state'>
            This is a demo for React Router.
            <br />
            Check out{' '}
            <a href='https://reactrouter.com'>the docs at reactrouter.com</a>.
          </p>
        </Typography>
      </Grid>
    </>
  );
}
