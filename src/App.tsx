import React from 'react';
import {ThemeProvider} from 'styled-components';

//import './App.css';

import Routes from './routes';

import {useTheme} from './hooks/theme';

import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import List from './pages/LIst';
import dark from './styles/themes/dark';




const App: React.FC = () => {

  const {theme} = useTheme();

  return (
    
    <ThemeProvider theme={theme}>
      <GlobalStyles />
          <Routes />
    </ThemeProvider>
  );
}

export default App;
