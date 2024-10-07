import "./App.css"
import {createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Navbar from "./components/navbar/Navbar"
import { MathJaxContext } from "better-react-mathjax"

const mainTheme = createTheme({
  breakpoints : {
    values : {
      xs : 0,
      sm : 600,
      md : 900,
      lg : 1200,
      xl : 1536
    }
  },
  palette : {
    background : {
      default : "#ffffff",
      secondary : "#414141"
    },
    text : {
      primary : "#000000",
      secondary : "#cccccc"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <MathJaxContext>
        <CssBaseline />
        <div className="App" style={{backgroundColor : "inherit"}}>
          <Navbar />
        </div>
      </MathJaxContext>
    </ThemeProvider>
  )
}

export default App
