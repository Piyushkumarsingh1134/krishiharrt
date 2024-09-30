import { Box, InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { green } from "@mui/material/colors";

// Styled container for the search input
const SearchContainer = styled(Box)({
    display: 'flex',
    marginLeft: '10px',
    alignItems: 'center',
    backgroundColor: '#ffffff',  // Set background color
    borderRadius: '4px',
    padding: '0 10px',  // Add padding
    width: '38%',  // Set a fixed width
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'  // Optional shadow
});

const IconWrapper = styled(Box)({
    color:'green',
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px'  // Space between icon and input
});

const Search = () => {
    return (
        <SearchContainer>
            
            <InputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                fullWidth
            />
            <IconWrapper>
                <SearchIcon />
            </IconWrapper>
        </SearchContainer>
    );
}

export default Search;





