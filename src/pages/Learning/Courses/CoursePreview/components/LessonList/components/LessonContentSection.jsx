import React, { useState } from 'react';
import { Card, Collapse, CardContent } from '@mui/material';
import LessonSection from './LessonSection';
import Lecture from './Lecture';

const LessonContentSection = ({ section, fatherIndex }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>
      <CardContent
        sx={{
          padding: '8px 16px !important',
          cursor: 'pointer',
          borderBottom: '1px solid #E9E9E9'
        }}
        onClick={handleExpandClick}>
        <LessonSection section={section} expanded={expanded} />
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {section?.children?.map((item, index) => {
          return (
            <CardContent key={index} sx={{ padding: '8px 16px !important' }}>
              <Lecture
                section={item}
                expanded={expanded}
                fatherIndex={fatherIndex}
                childIndex={index}
              />
            </CardContent>
          );
        })}
      </Collapse>
    </Card>
  );
};
export default LessonContentSection;
