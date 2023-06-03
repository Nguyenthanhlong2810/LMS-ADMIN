import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
const StyledTabs = styled((props) => <Tabs {...props} />)({
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent'
  }
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  marginRight: 3,
  backgroundColor: '#E9E9E9',
  borderRadius: '5px 5px 0 0 ',
  textTransform: 'none',
  color: '#565771',
  '&.Mui-selected': {
    color: '#fff',
    backgroundColor: '#457EFF'
  }
}));

export const TabMenu = ({ tabsMenu, styled = {} }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', ...styled }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="tabs">
          {tabsMenu.map((tab, index) => (
            <StyledTab key={tab.label} label={tab.label} {...a11yProps(index)} />
          ))}
        </StyledTabs>
      </Box>
      {tabsMenu.map((tab, index) => (
        <TabPanel key={tab.label} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ backgroundColor: 'white' }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};
