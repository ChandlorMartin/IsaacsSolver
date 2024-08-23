import logo from './logo.svg';
import './App.css';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from './components/navbar/Navbar';


const mainTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    background: {
        default: '#000000',
        secondary: "#414141"
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <div className="App" style={{backgroundColor: 'inherit'}}>
          <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
