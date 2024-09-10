import React from 'react';
import KeyMetrics from './KeyMetrics';
import RecentStreamsTable from './RecentStreamsTable';
import RevenueDistributionChart from './RevenueDistributionChart';
import TopSongsBar from './TopSongsBar';
import UserGrowthChart from './UserGrowthChart';
import Grid from '@mui/material/Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.2)', 
          borderRadius: '8px',                          
        },
      },
    },
  },
});

function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
    <Grid container justifyContent='space-around' alignItems='center' spacing={4}>
      <KeyMetrics/>
      <Grid item xs={12} sm={6}>
        <UserGrowthChart/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <RecentStreamsTable/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <RevenueDistributionChart/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TopSongsBar/>
      </Grid>
    </Grid>
    </ThemeProvider>
  )
}

export default Dashboard