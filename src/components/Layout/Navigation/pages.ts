export interface Pages {
  page: string;
  link: string;
}

export const headerPages: Pages[] = [{ page: "Home", link: "/" }];

export const userDropDownPages: Pages[] = [
  { page: "Profile", link: "/user/profile" },
  { page: "Favorites", link: "/user/favorites" },
  { page: "Watch List", link: "/user/watchlist" },
];
