import React, { useState } from 'react';
import PadMenu from './PadMenu.jsx'
import useSound from 'use-sound';
import {
  makeStyles,
  Box,
  Button,
  IconButton,
  Icon
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
    }
  }))

  const classes = useStyles();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState();
  
  const openMenu = (e) => {
    setMenuIsOpen(!menuIsOpen);
    setMenuAnchor(e.target);
  }

  return (
    <Box className={classes.padCtn}>
      <Button fullWidth onClick={play} className={classes.padStyle} />
      <IconButton className={classes.optionStyle} onClick={openMenu}>
        <Icon>settings</Icon>
      </IconButton>
      <PadMenu
        play={play}
        allPlaying={allPlaying}
        resetted={resetted}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        menuAnchor={menuAnchor}
      />
    </Box>
  )
}

export default PadItem;