import { Box } from '@mui/material';
import { TabMenu } from 'components';
import Title from 'components/Title/Title';
import React, { useState } from 'react';
import EditNewsForm from './components/EditNewsForm';
import { NEWS_TYPE } from './const';
import ListNew from './ListNew';

const News = () => {
  const [isCreateNew, setIsCreateNew] = useState(false);

  const tabsMenu = [
    {
      label: 'Thêm tin tức',
      component: <EditNewsForm setIsCreateNew={setIsCreateNew} />
    },
    {
      label: 'Thêm tin video',
      component: <EditNewsForm setIsCreateNew={setIsCreateNew} typeOfNews={NEWS_TYPE[0].value} />
    }
  ];
  return (
    <div>
      {isCreateNew ? (
        <Box sx={{ p: 3, backgroundColor: 'white' }}>
          <Title>thêm tin mới </Title>
          <TabMenu tabsMenu={tabsMenu} />
        </Box>
      ) : (
        <ListNew setIsCreateNew={setIsCreateNew} />
      )}
    </div>
  );
};

export default News;
