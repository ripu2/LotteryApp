import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const [truncatedAccount, setTruncatedAccount] = React.useState(undefined)
  const globalState = useSelector((state) => state.global)

  React.useEffect(() => {
    const acc = `${globalState.activeAccount ? globalState.activeAccount.substring(0,5): ''}` + '.....' + `${globalState.activeAccount ? globalState.activeAccount.substring(globalState.activeAccount.length, globalState.activeAccount.length-4): ''}`
    setTruncatedAccount(acc)
    console.log('accc', acc)
  }, [ globalState.activeAccount ] )


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Lottery 🍀`}
          </Typography>
          <Button color="inherit">{`Active Account - ${truncatedAccount}`}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
