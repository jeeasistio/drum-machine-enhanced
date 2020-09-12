import React,  { useState } from 'react';
import ReactDOM from 'react-dom';
import PadItem from './PadItem.jsx';
import {
  makeStyles,
  CssBaseline,
  Typography,
  Box, 
  Button, 
  Dialog, 
  DialogContent, 
  DialogActions
} from '@material-ui';

const pads = [
  {
    color: '#f55',
    sound: '/sounds/BONGO2.wav'
  },
  {
    color: '#f0f',
    sound: '/sounds/CLAP.wav'
  },
  {
    color: '#36f',
    sound: '/sounds/CRASH1.wav'
  },
  {
    color: '#3cc',
    sound: '/sounds/HHOPEN1.wav'
  },
  {
    color: '#3c3',
    sound: '/sounds/RIDECUP.wav'
  },
  {
    color: '#ff0',
    sound: '/sounds/RIMSHOT1.wav'
  },
  {
    color: '#f93',
    sound: '/sounds/SNARE12.wav'
  },
  {
    color: '#f39',
    sound: '/sounds/TOMHI1.wav'
  },
]

const App = () => {

  const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      background: '#000',
      color: '#fff'
    },
    padsRoot: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%'
    }
  }))

  const classes = useStyles();
  
  const [allPlaying, setAllPlaying] = useState(false);
  const [resetted, setResetted] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  
  const playOrStop = () => {
    setAllPlaying(!allPlaying);
  }
  
  const resetFunc = () => {
    setResetted(true);
    setTimeout(() => setResetted(false), 500);
    setDialogIsOpen(false);
    setAllPlaying(false);
  }

  return (
    <CssBaseline>
      <Box className={classes.root}> 
        <Box mt={4}>
          <Typography variant="h4">Drum Machine</Typography>
        </Box>
        <Box className={classes. padsRoot}>
          {pads.map( ({color, sound}) => (
            <PadItem color={color} sound={sound} allPlaying={allPlaying} resetted={resetted} />
          ))}
        </Box>
        <Box>
          <Button size="large" style={{color: '#fff'}} onClick={playOrStop}>
            {allPlaying ? 'Stop' : 'Play'}
          </Button>
          <Button size="large" style={{color: '#f55'}} onClick={() => setDialogIsOpen(true)}>
            Reset
          </Button>
        </Box>
       <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
          <DialogContent>
            <Typography>Are you sure you want to reset all configurations?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogIsOpen(false)}>No</Button>
            <Button onClick={resetFunc} style={{color: '#f55'}}>Yes</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CssBaseline>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);