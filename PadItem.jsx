import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import {
  makeStyles,
  Box,
  Button,
  IconButton,
  Icon,
  Menu,
  MenuItem,
  Slider,
  Typography
} from '@material-ui';

const PadItem = ({ color, sound, allPlaying, resetted }) => {

  const [play, {isPlaying}] = useSound(sound);

  const useStyles = makeStyles(theme => ({
    padCtn: {
      display: 'flex',
      flexDirection: 'column',
      margin: '16px 8px'
    },
    padStyle: {
      background: `linear-gradient(${color}, ${color})`,
      minHeight: 60,
      maxHeight: 60,
      minWidth: 60,
      maxWidth: 60, 
      transform: isPlaying ? 'scale(1.2)' : 'scale(1)', 
      transition: 'transform 0.2s'
    },
    optionStyle: {
      color: '#ccc'
    },
    sliderStyle: {
      minHeight: 100,
      maxHeight: 100
    },
    menuRoot: {
      overflow: 'visible',
      '& > ul': {
        display: 'flex'
      }
    },
    menuItem: {
      overflow: 'visible',
      flexDirection: 'column',
      '& > h6': {
        marginTop: 10
      }
    }
  }))

  const classes = useStyles();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState();
  const [intervalValue, setIntervalValue] = useState(0);
  const [timerValue, setTimerValue] = useState(0);
  const [delayValue, setDelayValue] = useState(0);
  const [playOpt, setPlayOpt] = useState({
    int: 0,
    tim: 0,
    del: 0
  });
  
  const playInterval = useRef();
  const playTimeout = useRef();
  
  const openMenu = (e) => {
    setMenuIsOpen(!menuIsOpen);
    setMenuAnchor(e.target);
  }
  
  const start = () => {
    setTimeout(() => {
      play();
      stop();
      playInterval.current = setInterval(play, playOpt.int * 1000);
      clearTimeout(playTimeout.current)
      setTimeout(() => {
        stop();
      }, playOpt.tim * 1000)
    }, playOpt.del * 1000)
  }
  
  const stop = () => {
    clearInterval(playInterval.current);
  }
  
  const playBeat = () => {
    setPlayOpt({
      int: intervalValue, 
      tim: timerValue,
      del: delayValue
    }) 
  }
  
  const stopBeat = () => {
    setPlayOpt({
      int: 0,
      tim: 0,
      del: 0
    })
    stop();
  }
  
  const resetConfig = () => {
    setIntervalValue(0);
    setTimerValue(0);
    setDelayValue(0);
  }
  
  useEffect(() => {
    playOpt.int <= 0 ? stop() : start();
  }, [playOpt.int, playOpt.tim])
  
  useEffect(() => {
    allPlaying ? playBeat() : stopBeat();
  }, [allPlaying])
  
  useEffect(() => {
     if (resetted) {
       resetConfig();
       stopBeat();
     }
  }, [resetted])

  return (
    <Box className={classes.padCtn}>
      <Button fullWidth onClick={play} className={classes.padStyle} />
      <IconButton className={classes.optionStyle} onClick={openMenu}>
        <Icon>settings</Icon>
      </IconButton>
      <Menu
        classes={{paper: classes.menuRoot}}
        anchorEl={menuAnchor} 
        open={menuIsOpen} 
        onClose={() => setMenuIsOpen(false)}
      >
        <MenuItem className={classes.menuItem}>
          <Slider
            className={classes.sliderStyle}
            value={intervalValue} 
            step={0.1}
            min={0}
            max={5}
            onChange={(e, v) => setIntervalValue(v)}
            valueLabelDisplay="auto"
            orientation="vertical"
          />
          <Typography variant="subtitle2">Interval</Typography>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Slider
            className={classes.sliderStyle}
            value={timerValue} 
            step={1}
            min={0}
            max={60}
            onChange={(e, v) => setTimerValue(v)}
            valueLabelDisplay="auto"
            orientation="vertical"
          />
          <Typography variant="subtitle2">Timer</Typography>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Slider
            className={classes.sliderStyle}
            value={delayValue} 
            step={0.2}
            min={0}
            max={30}
            onChange={(e, v) => setDelayValue(v)}
            valueLabelDisplay="auto"
            orientation="vertical"
          />
          <Typography variant="subtitle2">Delay</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default PadItem;