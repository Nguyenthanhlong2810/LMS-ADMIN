import * as React from 'react';
import './styles.scss';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Container } from '@mui/system';

import { ReactComponent as HomepageLogo } from '../../assets/icon/homepage-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';
import { useDispatch } from 'react-redux';
import { signOut } from 'store/reducers/UserSlice';
import { reset } from 'store/reducers/sidebarSlice';

const settings = [
  // {
  //   key: 'profile',
  //   name: 'Thông tin cá nhân',
  //   path: '/profile'
  // },
  {
    key: 'Logout',
    name: 'Đăng xuất'
  }
];
export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(reset());
    navigate('/admin/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="header-container">
      <AppBar
        position="static"
        sx={{ backgroundColor: '#FFF', color: '#0A033C', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Link to="/">
                <HomepageLogo />
              </Link>
            </Box>
            <div>
              <div className="d-flex align-items-center">
                <span>{user.username}</span>
                <IconButton sx={{ p: 0, marginLeft: '1rem' }}>
                  <Avatar alt="profile" src={user.avatarUrl ?? '/static/images/avatar/2.jpg'} />
                </IconButton>
                <IconButton onClick={handleOpenUserMenu}>
                  <ArrowDropDownIcon color="action" />
                </IconButton>
              </div>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings?.map((setting, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      if (setting.key === 'Logout') {
                        return handleSignOut();
                      }
                      navigate(setting.path);
                      handleCloseUserMenu();
                    }}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
