import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  currentUser: any;
  favorites: any[];
  watchlist: any[];
}

const initialState: UserState = {
  currentUser: null,
  favorites: [],
  watchlist: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (media) => media.id !== action.payload.id
      );
    },
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (media) => media.id !== action.payload.id
      );
    },
  },
});

export const {
  login,
  logout,
  addToFavorites,
  addToWatchlist,
  removeFromFavorites,
  removeFromWatchlist,
} = userSlice.actions;

export default userSlice.reducer;
