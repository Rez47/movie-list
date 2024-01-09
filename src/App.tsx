import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/series/:id" element={<Series />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
