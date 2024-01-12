import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/user/Profile";
import Favorites from "./pages/user/Favorites";
import Watchlist from "./pages/user/Watchlist";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/series/:id" element={<Series />} />

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/favorites" element={<Favorites />} />
          <Route path="/user/watchlist" element={<Watchlist />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
