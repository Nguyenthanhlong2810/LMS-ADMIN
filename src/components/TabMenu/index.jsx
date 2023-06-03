import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
const StyledTabs = styled((props) => <Tabs {...props} />)({
  '& .MuiTabs-indicator': {
    backgroundColor: ' #1c1d1f'
  }
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  marginRight: 3,
  textTransform: 'none',
  color: '#6a6f73',
  fontWeight: 700,
  fontSize: '1.03rem',
  lineHeight: 1.2,
  '&.Mui-selected': {
    color: '#1c1d1f'
  }
}));

export const TabMenu = ({ tabsMenu, styled = {}, tabValue, setTabValue }) => {
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', ...styled }}>
        <StyledTabs value={tabValue} onChange={handleChange} aria-label="tabs">
          {tabsMenu.map((tab, index) => (
            <StyledTab
              key={tab.label}
              label={tab.label}
              {...a11yProps(index)}
              disabled={tab.disabled}
            />
          ))}
        </StyledTabs>
      </Box>
      {tabsMenu.map((tab, index) => (
        <TabPanel key={tab.label} value={tabValue} index={index}>
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
