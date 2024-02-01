import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Movie } from "../../../services/apiTypes";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movieData: Movie;
}

const styles = {
  link: {
    textDecoration: "none",
    color: "inherit",
    minWidth: "none",
  },
  movieImage: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "5px",
    marginBottom: 1,
    aspectRatio: 4 / 6,
  },
};

const MovieCard: React.FC<MovieCardProps> = ({ movieData }) => {
  return (
    <Link to={`/movie/${movieData.id}`} style={styles.link}>
      <Card
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            ...styles.movieImage,
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.poster_path})`,
          }}
        ></Box>

        <CardContent sx={{ m: 0, p: 0 }}>
          <Typography component="h5" variant="h5">
            {movieData.title.length > 18
              ? `${movieData.title
                  .slice(0, 16)
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}...`
              : movieData.title
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
          </Typography>
        </CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          m={0}
          p={0}
          mt={1}
          gap={1}
          flexWrap="wrap"
        >
          <Typography component="p" variant="body1">
            {movieData?.release_date?.slice(0, 4)}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            gap={0.5}
          >
            <StarIcon sx={{ fontSize: "1.3rem" }} />
            <Typography component="p" variant="body1">
              {movieData?.vote_average?.toFixed(1)}
            </Typography>
          </Stack>
          <Typography component="p" variant="body1">
            Movie
          </Typography>
        </Stack>
      </Card>
    </Link>
  );
};

export default MovieCard;
