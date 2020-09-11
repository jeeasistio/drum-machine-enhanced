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

const PadItem = ({ color, sound }) => {

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
      maxWidth: 60
    },
    optionStyle: {
      color: '#fff'
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

  const [play] = useSound(sound);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState();
  const [intervalValue, setIntervalValue] = useState(0);
  const [timerValue, setTimerValue] = useState(0);
  
  const playInterval = useRef();
  const playTimeout = useRef();
  
  const openMenu = (e) => {
    setMenuIsOpen(!menuIsOpen);
    setMenuAnchor(e.target);
  }
  
  const start = () => {
    play();
    stop();
    playInterval.current = setInterval(play, intervalValue * 1000);
    clearTimeout(playTimeout.current)
    setTimeout(() => {
      stop();
    }, timerValue * 1000)
  }
  
  const stop = () => {
    clearInterval(playInterval.current);
  }
  
  useEffect(() => {
    intervalValue <= 0 ? stop() : start();
  }, [intervalValue, timerValue])

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
            defaultValue={0} 
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
            defaultValue={0} 
            step={1}
            min={0}
            max={60}
            onChange={(e, v) => setTimerValue(v)}
            valueLabelDisplay="auto"
            orientation="vertical"
          />
          <Typography variant="subtitle2">Timer</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default PadItem;