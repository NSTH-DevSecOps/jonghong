import { Outlet, NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';

export default function Root() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label='main mailbox folders'>
              <List>
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to='sm1'>
                    <ListItemText primary='Small Meeting 1' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to='sm2'>
                    <ListItemText primary='Small Meeting 2' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to='bm1'>
                    <ListItemText primary='Big Meeting 1' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to='bm2'>
                    <ListItemText primary='Big Meeting 2' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to='tr1'>
                    <ListItemText primary='Training 1' />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ width: '80%' }}>
            <div id='detail'>
              <Outlet />
            </div>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <Typography variant='subtitle1' component='div'>
          Date:{' '}
          {format(Date.now(), 'PPPP, H:m:s X', {
            locale: th,
          })}
        </Typography>
      </Grid>
    </>
  );
}
