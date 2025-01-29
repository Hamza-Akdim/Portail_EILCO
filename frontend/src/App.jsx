import AppLayout from "./pages/AppLayout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  //Here we will implements the routes
  return <AppLayout />; //AppLayout: the layout route
}

export default App;
