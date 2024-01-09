import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase, useTheme } from "@mui/material";
import { SearchList, SearchResults } from "../../../services/apiTypes";
import { callApi } from "../../../services/callApi";
import { getSearchMulti } from "../../../services/Search/apiGetSearchMulti";

interface SearchBarProps {
  iconColor?: string;
  iconMargin?: string;
  inputBackground: string;
  inputMargin?: string;
  searchData?: SearchResults[];
  setSearchData?: Dispatch<SetStateAction<SearchResults[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  iconColor,
  iconMargin,
  inputBackground,
  inputMargin,
}) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState<SearchResults[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const searchQuery = async () => {
      try {
        if (text) {
          const searchData = await callApi<SearchList>({
            query: getSearchMulti(text),
          });
          console.log(searchData);
          setSearchData(searchData.results);
        }
      } catch (err) {
        console.log(err);
      }
    };
    searchQuery();
  }, [text, setSearchData]);

  const handleIconClick = () => {
    setIsInputOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleInputBlur = () => {
    setIsInputOpen(false);
    // Perform actions with the entered text
    console.log("Entered text:", text);
  };

  const handleMouseEnter = () => {
    setIsInputOpen(true);
  };

  return (
    <div style={{}}>
      <Box sx={{ position: "relative" }}></Box>
      {!isInputOpen ? (
        <IconButton onClick={handleIconClick} onMouseEnter={handleMouseEnter}>
          <SearchIcon sx={{ color: iconColor, margin: iconMargin }} />
        </IconButton>
      ) : (
        <InputBase
          value={text}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          placeholder="Search..."
          endAdornment={<SearchIcon />}
          sx={{
            backgroundColor: inputBackground,
            margin: inputMargin,
            padding: "0 1rem",
            borderRadius: "0.5rem",
            border: "0",
            unset: "all",
          }}
          inputProps={{
            style: { border: "none", textDecoration: "none" },
          }}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          maxWidth: "20rem",
          maxHeight: "20rem",
          padding: "1rem",
          top: "6rem",
          left: "1rem",
          zIndex: "999",
          overflowY: "scroll",
          backgroundColor: `${theme.palette.primary.main}`,
          scrollbarWidth: "1rem",
        }}
      >
        {text && (
          <Box>
            {searchData.map((media) => (
              <Box
                key={media.id}
                width={170}
                height={220}
                sx={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${media.poster_path})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "5px",
                  marginBottom: 1,
                }}
              ></Box>
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
};
export default SearchBar;
