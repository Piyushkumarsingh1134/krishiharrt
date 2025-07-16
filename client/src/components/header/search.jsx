import { Box, InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState, useCallback } from "react";

const SearchContainer = styled(Box)({
  display: 'flex',
  marginLeft: '10px',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  padding: '0 10px',
  width: '38%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
});

const IconWrapper = styled(Box)({
  color: 'green',
  display: 'flex',
  alignItems: 'center',
  marginRight: '8px'
});

const Search = () => {
  const [text, setText] = useState("");

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced search handler
  const handleSearch = useCallback(debounce((query) => {
      console.log("Searching for:", query);
      // Replace with your API call
      // Example:
      // fetch(`/api/search?query=${query}`)
      //   .then(res => res.json())
      //   .then(data => console.log("Results:", data))
    }, 500),
    []
  );

  useEffect(() => {
    if (text.trim() !== "") {
      handleSearch(text);
    } else {
      console.log("Cleared input");
    }
  }, [text, handleSearch]);

  return (
    <SearchContainer>
      <InputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
    </SearchContainer>
  );
};

export default Search;





