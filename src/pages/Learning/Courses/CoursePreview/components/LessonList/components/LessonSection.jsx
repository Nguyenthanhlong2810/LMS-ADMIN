import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandMore from 'components/ExpandMore/ExpandMore';
import { secondConvert } from 'utils';
import { Box, Typography } from '@mui/material';
const LessonSection = ({ section, expanded }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ padding: '0 8px' }}>
          <ArrowDropDownIcon />
        </ExpandMore>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: '700', fontSize: '1rem', lineHeight: '150%' }}>
              {section?.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '0.875rem' }}>{section?.totalLectures} học phần</Typography>
            {secondConvert(section?.totalDuration) && (
              <>
                <FiberManualRecordIcon sx={{ margin: '0 12px', fontSize: '6px' }} />
                <Typography sx={{ fontSize: '0.875rem' }}>
                  {secondConvert(section?.totalDuration)} giờ học
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default LessonSection;
