import React, {useState, useEffect} from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

function revenueDistributionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/revenueSources')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      })
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  // Dynamic width based on screen size
  const chartWidth = isSmallScreen ? 400 : isMediumScreen ? 550 : isLargeScreen ? 800 : 550;
  const fontSize = isSmallScreen ? 10 : 14;

  if (loading) {
    return (
      <Card>
        <Typography sx={{marginLeft: '15px', marginTop: '10px'}}>Revenue Distribution</Typography>
        <Skeleton variant='rectangular' width={chartWidth} height={350}></Skeleton>
      </Card>
    )
  }

  if(error) {
    return (
      <Card>
        <Typography color='error'>{error}</Typography>
      </Card>
    )
  }

  if (!loading && data.length === 0) {
    return (
      <Card>
        <Typography>No data available.</Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Typography sx={{marginLeft: '15px', marginTop: '10px'}}>
        Revenue Distribution
      </Typography>
      <PieChart
      series={[
        {
          data,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -5, color: 'gray' },
          outerRadius: '80%'
        },
      ]}
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: fontSize
          },
        },
      }}
      height={350}
      width={chartWidth}
      />
    </Card>
  )
}

export default revenueDistributionChart