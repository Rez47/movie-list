export interface Pages {
  page: string;
  link: string;
  icon?: string;
}

export const headerPages: Pages[] = [{ page: "Home", link: "/" }];

export const userDropDownPages: Pages[] = [
  { page: "Profile", link: "/user/profile", icon: `PersonIcon` },
  { page: "Favorites", link: "/user/favorites", icon: `PersonIcon` },
  { page: "Watch List", link: "/user/watchlist", icon: `PersonIcon` },
];
