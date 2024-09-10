import React, {useState, useEffect} from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

function UserGrowthChart() {

  const [userGrowthData, setUserGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/userGrowth')
      .then((res) => {
        setUserGrowthData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      })
  }, [])

  const tData = userGrowthData.map(data => data.totalUsers);
  const pData = userGrowthData.map(data => data.activeUsers);
  const xLabels = userGrowthData.map(data => data.month);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  // Dynamic width based on screen size
  const chartWidth = isSmallScreen ? 400 : isMediumScreen ? 550 : isLargeScreen ? 800 : 550;

  if (loading) {
    return (
      <Card>
        <Typography sx={{ marginLeft: '15px', marginTop: '10px' }}>User Growth</Typography>
        <Skeleton variant='rectangular' width={chartWidth} height={350} />
      </Card>
    );
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  if (!loading && userGrowthData.length === 0) {
    return (
      <Card>
        <Typography>No data available.</Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Typography sx={{marginLeft: '15px', marginTop: '10px'}}>
        User Growth
      </Typography>
      <LineChart
        width={chartWidth}
        height={350}
        series={[
          { data: tData, label: 'Total users' },
          { data: pData, label: 'Active users' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        sx={{paddingLeft: 3}}
      />
    </Card>
  )
}

export default UserGrowthChart