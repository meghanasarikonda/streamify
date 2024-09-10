import React, {useState, useEffect} from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

function TopSongsBar() {
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/topSongs')
      .then((res) => {
        setTopSongs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      })
  }, []);
  
  // Sort and slice songs data
  const sortedTopSongs = [...topSongs].sort((a,b) => b.streamCount - a.streamCount).slice(0,5);
  

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  // Dynamic width based on screen size
  const chartWidth = isSmallScreen ? 400 : isMediumScreen ? 550 : isLargeScreen ? 800 : 550;

  if (loading) {
    return (
      <Card>
        <Typography sx={{marginLeft: '15px', marginTop: '10px'}}>Top Songs</Typography>
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

  if (!loading && topSongs.length === 0) {
    return (
      <Card>
        <Typography>No data available.</Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Typography sx={{marginLeft: '15px', marginTop: '10px'}}>
        Top Songs
      </Typography>
      <BarChart
        dataset={sortedTopSongs}
        yAxis={[{dataKey: 'songName', scaleType: 'band'}]}
        xAxis={[
          {
            label: 'Stream Count',
          },
        ]}
        series={[
          {dataKey: 'streamCount', label: 'stream count'}
        ]}
        layout='horizontal'
        margin={{ left: 150 }}
        slotProps={{ legend: { hidden: true } }}
        width={chartWidth}
        height={350}
      />
    </Card>
  )
}

export default TopSongsBar;