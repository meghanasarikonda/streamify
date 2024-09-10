import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

const paginationModel = { page: 0, pageSize: 5 };

function RecentStreamsTable() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/streams')
      .then((res) => {
        setStreams(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      })
  }, []);
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  // Dynamic width based on screen size
  const tableWidth = isSmallScreen ? 400 : isMediumScreen ? 550 : isLargeScreen ? 800 : 550;

  // set column percentages
  const columnWidths = {
    songName: 0.3,  // 30%
    artist: 0.2,    // 20%
    dateStreamed: 0.25,  // 20%
    streamCount: 0.15,   // 20%
    id: 0.1,        // 10%
  };

  const columns = [
    { field: 'songName', headerName: 'Song Name', width: tableWidth * columnWidths.songName },
    { field: 'artist', headerName: 'Artist', width: tableWidth * columnWidths.artist },
    { field: 'dateStreamed', headerName: 'Date Streamed', width: tableWidth * columnWidths.dateStreamed },
    { field: 'streamCount', headerName: 'Count', type: 'number', width: tableWidth * columnWidths.streamCount },
    { field: 'id', headerName: 'ID', width: tableWidth * columnWidths.id, sortable: false },
  ];

  if (loading) {
    return (
      <Card>
        <Typography sx={{marginLeft: '15px', marginTop: '10px', fontWeight: 1}}>Top Songs</Typography>
        <Skeleton variant='rectangular' width={tableWidth} height={350}></Skeleton>
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

  if (!loading && streams.length === 0) {
    return (
      <Card>
        <Typography>No data available.</Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Typography sx={{marginLeft: '15px', marginTop: '10px', fontWeight: 1}}>
        Recent Streams...
      </Typography>
      <div style={{height:350, width: tableWidth}}>
      <DataGrid
        rows={streams}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{
          border: '0px',
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          paddingLeft: 1
        }}
        height={350}
      />
      </div>
    </Card>
  );
}

export default RecentStreamsTable