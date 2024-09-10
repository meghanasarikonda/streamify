import { Typography } from '@mui/material';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div style={{ margin: '30px' }}>
      <Typography align='center' sx={{marginBottom: '25px', fontSize: '30px', fontFamily: 'monospace'}}>
        Streamify Dashboard
      </Typography>
      <Dashboard/>
      </div>
  )
}

export default App