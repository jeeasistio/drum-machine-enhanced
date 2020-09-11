import React,  { useState } from 'react';
import ReactDOM from 'react-dom';
import PadItem from './PadItem.jsx';
import {
  makeStyles,
  CssBaseline,
  Typography,
  Box, 
  Button
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
      justifyContent: 'space-between',
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
  
  const playOrStop = () => {
    setAllPlaying(!allPlaying);
  }

  return (
    <CssBaseline>
      <Box className={classes.root}> 
        <Box mt={4}>
          <Typography variant="h4">Drum Machine</Typography>
        </Box>
        <Box className={classes. padsRoot}>
          {pads.map( ({color, sound}) => (
            <PadItem color={color} sound={sound} allPlaying={allPlaying} />
          ))}
        </Box>
        <Box>
          <Button style={{color: '#fff'}} onClick={playOrStop}>
            {allPlaying ? 'Stop' : 'Play'}
          </Button>
        </Box>
      </Box>
    </CssBaseline>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);