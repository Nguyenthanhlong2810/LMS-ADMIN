import React, { useState } from 'react';
import '../styles.scss';

import Email from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  IconButton
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { UserAPI } from 'apis/User';
import { localStorageHelper } from 'helpers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as HomepageLogo } from 'assets/icon/homepage-logo.svg';

import { LOCAL_STORE } from 'consts/system.const';
import { fetchUser } from 'store/reducers/UserSlice';
import { useDispatch } from 'react-redux';
import { DEFAULT_ERROR_MESSAGE } from 'consts';
import { useLoading } from 'hooks/LoadingProvider';

const LoginAdminForm = () => {
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading();

  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const disabledLogin = !values.password || !values.username;
  let navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value.trim() });
  };

  const onChangeRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = async () => {
    showLoading();
    const submitData = {
      email: '',
      appUserRoles: ['ROLE_ADMIN'],
      isLdap: values.username !== 'admin',
      appUserSkills: [
        {
          id: 0,
          name: ''
        }
      ],
      ...values
    };
    try {
      const res = await UserAPI.signin(submitData);
      if (res.status === 200) {
        const token = res.data.token;
        if (token) {
          localStorageHelper.setItem(LOCAL_STORE.TOKEN, token);
          toast.success(res.data?.success || 'Đăng nhập thành công');
          dispatch(fetchUser());
          return navigate('/');
        }
        toast.error(res.data.error || 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại');
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const onKeyDownEnter = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const onClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <HomepageLogo className="login__cmc-logo" />

      <div className="login-form-container">
        <div className="align-center">
          <h2 className="login-form__header">Đăng nhập</h2>

          <div>
            <div className="login-form">
              <div className="login-inputs">
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { marginBottom: 2 },
                    width: '100%'
                  }}
                  noValidate
                  autoComplete="off">
                  <InputLabel className="login-form__label">Tài khoản</InputLabel>
                  <TextField
                    onKeyDown={onKeyDownEnter}
                    required
                    value={values.username}
                    onChange={handleChange('username')}
                    id="outlined-required"
                    placeholder="Nhập tài khoản LDAP"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton edge="end" disableRipple sx={{ cursor: 'text' }}>
                            <Email />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <InputLabel className="login-form__label">Mật khẩu</InputLabel>
                  <TextField
                    onKeyDown={onKeyDownEnter}
                    id="outlined-password-input"
                    value={values.password}
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange('password')}
                    autoComplete="current-password"
                    placeholder="Mật khẩu"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            tabIndex={3}
                            aria-label="toggle password visibility"
                            onClick={onClickShowPassword}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                {/* <div className="login-form__remember">
                  <FormControlLabel
                    control={<Checkbox onChange={onChangeRememberMe} value={rememberMe} />}
                    label="Duy trì đăng nhập"
                  />
                </div> */}
              </div>
              <Button
                onClick={handleLogin}
                variant="contained"
                disabled={disabledLogin}
                disableElevation
                sx={{
                  backgroundColor: '#1FBDF8',
                  color: '#fff',
                  gap: '32px',
                  width: '100%',
                  padding: '14px 0px',
                  mt: 4
                }}>
                Đăng nhập
              </Button>
            </div>

            {/* <a href="/" className="login-form__forgot">
              Quên mật khẩu ?
            </a> */}
          </div>
        </div>
      </div>

      <p className="copyright">Copyright @2021 CMC Global. All rights reserved.</p>
    </div>
  );
};

export default LoginAdminForm;
