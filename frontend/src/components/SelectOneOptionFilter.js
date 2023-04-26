import React, { useState } from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// Componente Select que aceita a seleção de apenas 1 item por vez
const SelectOneOptionFilter = ({ itens, handleItemFilter }) => {

    const [year, setYear] = useState('');

    const handleChange = (event) => {
        setYear(event.target.value);

        handleItemFilter(event);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-label">Ano</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Year"
                    onChange={handleChange}
                >
                    {Array.isArray(itens)
                        ? itens.map((itemValue) => {
                            return (
                                <MenuItem key={itemValue} value={itemValue}>{ itemValue }</MenuItem>
                        )})
                        : null + console.log("ta dando errado!!!" + itens)}
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectOneOptionFilter;