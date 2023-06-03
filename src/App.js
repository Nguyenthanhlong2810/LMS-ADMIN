import React, { Suspense, useEffect } from 'react';
import './styles/app.scss';
import { ThemeProvider } from '@mui/material/styles';
import { LoadingProvider } from 'hooks/LoadingProvider';
import Loading from './components/Loading/Loading';
import { AppRoutes } from './routes';
import { theme } from './themes';
import { fetchUser } from 'store/reducers/UserSlice';
import { useDispatch } from 'react-redux';
import { localStorageHelper } from 'helpers';
import * as yup from 'yup';
import { DialogProvider } from 'hooks/DialogProvider';
import ValidationMessage from 'consts/validation.const';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

yup.setLocale(ValidationMessage);
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorageHelper.isLogin()) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <LoadingProvider>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Loading />}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DialogProvider>
                <AppRoutes />
              </DialogProvider>
            </LocalizationProvider>
          </Suspense>
        </ThemeProvider>
      </div>
    </LoadingProvider>
  );
}

export default App;
