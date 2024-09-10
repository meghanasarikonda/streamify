import React, {useState, useEffect, lazy, Suspense} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';

// Lazy load icons
const PeopleAltIcon = lazy(() => import('@mui/icons-material/PeopleAlt'));
const MonetizationOnIcon = lazy(() => import('@mui/icons-material/MonetizationOn'));
const PeopleIcon = lazy(() => import('@mui/icons-material/People'));
const MusicNoteIcon = lazy(() => import('@mui/icons-material/MusicNote'));
const BarChartIcon = lazy(() => import('@mui/icons-material/BarChart'));

// function to get lazy-loaded icon
const getIcon = (title) => {
  switch (title) {
    case 'Total Users':
      return <PeopleAltIcon fontSize="large" color="primary" />;
    case 'Total Revenue':
      return <MonetizationOnIcon fontSize="large" sx={{ color: '#FFD700' }} />;
    case 'Active Users':
      return <PeopleIcon fontSize="large" sx={{ color: '#138808' }} />;
    case 'Total Streams':
      return <MusicNoteIcon fontSize="large" sx={{ color: '#A020F0' }} />;
    case 'Top Artist':
      return <BarChartIcon fontSize="large" sx={{ color: '#D10000' }} />;
    default:
      return null;
  }
};


function KeyMetrics() {
  const [cardContents, setCardContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/metrics')
    .then((res) => {
      setCardContents(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.err('error loading data:', err);
      setLoading(false)
    });
  }, [])

  return (
    <>
    {loading 
      ? Array.from(new Array(5)).map((_, index) => ( // Create 5 skeletons
        <Grid item key={index} xs={12} sm={6} md={6} lg={2.4}>
          <Card
            sx={{
              width: {
                xs: 400,
                sm: 200,
                md: 300,
                lg: 180,
                xl: 180,
              },
              height: {
                xs: 100,
                sm: 100,
                md: 100,
                lg: 100,
                xl: 100,
              },
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Typography>
                  <Skeleton variant="text" width={120} />
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  <Skeleton variant="text" width={80} />
                </Typography>
              </div>
              <div>
                <Skeleton variant="circular" width={40} height={40} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))
      :cardContents.map((card, index) => (
      <Grid item key={index} xs={12} sm={6} md={6} lg={2.4}>
        <Card
          sx={{
            width: {
              xs: 400,
              sm: 200,
              md: 300,
              lg: 180,
              xl: 180,
            },
            height: {
              xs: 100,
              sm: 100,
              md: 100,
              lg: 100,
              xl: 100,
            }
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
              <Typography gutterBottom>{card.title}</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {card.value}
              </Typography>
            </div>
            {/* Display icon */}
            <Suspense fallback={<Skeleton variant="circular" width={35} height={35} />}>
              <div>{getIcon(card.title)}</div>
            </Suspense>
          </CardContent>
        </Card>
      </Grid>
    ))}
    </>
  )
}

export default KeyMetrics