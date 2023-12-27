import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Movie } from "../../../services/apiTypes";
import StarIcon from "@mui/icons-material/Star";

interface MovieCardProps {
  movieData: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movieData }) => {
  return (
    <Card
      sx={{
        width: 170,
        height: 280,
        bgcolor: "transparent",
        boxShadow: "none",
      }}
    >
      <Box
        width={170}
        height={220}
        sx={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.poster_path})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "5px",
          marginBottom: 1,
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
  );
};

export default MovieCard;
