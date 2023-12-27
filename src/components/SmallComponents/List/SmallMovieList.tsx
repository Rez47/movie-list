import { Box, Typography } from "@mui/material";
import { Movie } from "../../../services/apiTypes";
import MovieCard from "../Cards/MovieCard";

interface SmallMovieListProps {
  title: string;
  moviesData: Movie[];
}

const SmallMovieList: React.FC<SmallMovieListProps> = ({
  title,
  moviesData,
}) => {
  return (
    <Box p={5}>
      <Typography component="h2" variant="h2">
        {title}
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, max-content))",
          gap: 2,
          mt: 2,
          justifyContent: "center",
        }}
      >
        {moviesData.length > 0 &&
          moviesData.map((movieData) => {
            return <MovieCard movieData={movieData} />;
          })}
      </Box>
    </Box>
  );
};

export default SmallMovieList;
