import './App.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RouterSwitch from './Router/RouterSwitch';
import { AuthProvider } from './Context/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <HashRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header />
            <RouterSwitch />
            <Footer />
          </LocalizationProvider>
        </HashRouter>
      </AuthProvider>
    </div>

  );
}

export default App;
