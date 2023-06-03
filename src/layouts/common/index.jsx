import React, { useLayoutEffect } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Container, Grid, InputAdornment, TextField } from '@mui/material';
import List from '@mui/material/List';
import Breadcrumb from 'layouts/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toggle, open, setListMenu, active } from 'store/reducers/sidebarSlice';
import './layout.scss';

import { isCurrentPath } from 'helpers';
import { Footer, Header } from '..';
import { MenuItem } from './MenuItem';
import { FlexCol } from 'components/Layout/Layout';
import { useAppSelector } from 'store/configureStore';

export const CommonLayout = ({ children }) => {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const { listSidebarItems } = useSelector(({ sidebar }) => sidebar);
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    for (let i = 0; i < listSidebarItems.length; i++) {
      const item = listSidebarItems[i];
      if (item.path) {
        if (isCurrentPath(item.path, pathname)) {
          dispatch(open(item.id));
          dispatch(active({ childId: null, parentId: item.id }));
        }
      } else if (item.subItems) {
        for (let subItem of item.subItems) {
          if (isCurrentPath(subItem.path, pathname)) {
            dispatch(open(item.id));
            dispatch(active({ childId: subItem.id, parentId: item.id }));
          }
        }
      }
    }
  }, []);

  const handleClick = (parent, item) => {
    if (item) {
      dispatch(active({ childId: item.id, parentId: parent.id }));
      navigate(item.path);
    } else {
      navigate(parent.path);
      dispatch(toggle(parent.id));
      if (parent.path) {
        dispatch(active({ childId: null, parentId: parent.id }));
      }
    }
  };

  const handleSearchMenu = (event) => {
    dispatch(setListMenu(event.target.value.trim()));
  };

  return (
    <div className="wrap-layout">
      <Header />
      <Container maxWidth="xl">
        <div className="my-2">
          <Breadcrumb />
        </div>
        {/* <Box className="common-layout-wrapper">{children}</Box> */}
        <Box className="common-layout-wrapper">
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div className="sidebar">
                <List
                  sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: '10px'
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      margin: '12px 12px 29.5px',
                      gap: '23.5px'
                    }}>
                    <Box className="account-name" sx={{ display: 'flex', gap: '8px' }}>
                      <Avatar alt="profile" src={user.avatarUrl ?? '/static/images/avatar/2.jpg'} />

                      <Box className="name" sx={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{user?.username}</span>
                        <span>{user?.email}</span>
                      </Box>
                    </Box>
                    <TextField
                      required
                      placeholder="Tìm kiếm"
                      fullWidth
                      onChange={handleSearchMenu}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                  <FlexCol sx={{ p: 2, gap: 0.5 }}>
                    {listSidebarItems.map((item) => {
                      return <MenuItem item={item} key={item.title} onClick={handleClick} />;
                    })}
                  </FlexCol>
                </List>
              </div>
            </Grid>

            <Grid item xs={9}>
              <div className="content">{children}</div>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};
