import { Chip, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5, 0.25)
  }
}));
export const TagsInput = (props) => {
  const classes = useStyles();
  const { selectedTags, tags, ...other } = props;
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState([]);
  useEffect(() => {
    if (tags) {
      setSelectedItem(tags);
    }
  }, [tags]);
  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(event.target.value.trim());

      if (duplicatedValues !== -1) {
        setInputValue('');
        return;
      }
      if (!event.target.value.replace(/\s/g, '').length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue('');
    }
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <TextField
      InputProps={{
        startAdornment: selectedItem.map((item) => (
          <Chip
            key={item}
            tabIndex={-1}
            label={item}
            className={classes.chip}
            onDelete={handleDelete(item)}
          />
        )),
        onChange: (event) => {
          handleInputChange(event);
        },
        onKeyDown: handleKeyDown
      }}
      value={inputValue}
      {...other}
    />
  );
};
