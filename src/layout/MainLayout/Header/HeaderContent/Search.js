// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from '../../../../../node_modules/react-redux/es/exports';
import { searching } from 'store/reducers/menu';
import { debounce } from 'pages/admin/form/CreateQA';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => state.menu);
    const onChange = debounce((event) => {
        dispatch(searching({ search: event.target.value }));
    }, 500);

    return (
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
            <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                <OutlinedInput
                    size="small"
                    id="header-search"
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <SearchOutlined />
                        </InputAdornment>
                    }
                    defaultValue={search}
                    onChange={onChange}
                    aria-describedby="header-search-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                    placeholder="Search something..."
                />
            </FormControl>
        </Box>
    );
};

export default Search;
