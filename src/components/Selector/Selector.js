import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AllProjectsContext from '../../store/AllProjectcontext';
import { useContext } from 'react';
export default function BasicSelect(props) {
    const [age, setAge] = React.useState(props.init);
    const allProjectCtx = useContext(AllProjectsContext);
    const handleChange = (event) => {
        setAge(event.target.value);
        console.log(props.id, event.target.value);
        allProjectCtx.changeSortingOrder(props.id, event.target.value);
        console.log(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Sort By"
                    onChange={handleChange}
                // default value={age}
                >
                    <MenuItem value={0}>User</MenuItem>
                    <MenuItem value={1}>Date</MenuItem>
                    <MenuItem value={2}>Group</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
