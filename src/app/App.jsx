import '../fake-db';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import routes from './routes';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import AdapterDateFns from '@mui/x-date-pickers';
const App = () => {
  const content = useRoutes(routes);

  return (

    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Provider store={Store}>
      <SettingsProvider>
      <MatxTheme>
        <AuthProvider>
          {content}
        </AuthProvider>
      </MatxTheme>
      </SettingsProvider>
    </Provider>
    // </LocalizationProvider>
  );
};

export default App;
