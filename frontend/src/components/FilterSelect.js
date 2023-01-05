import React, { useState } from "react";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import Bar from "../components/Bar";
import Footer from "../components/Footer";

import * as dfd from "danfojs";

import styleGlobal from '../style/Global.module.css';
import style from '../style/FormUploadDados.module.css';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const FilterSelect = ( {itens, handleItensFilter} ) => {

    const [item, setItem] = useState([]);

    console.log(">>>>");
    console.log(itens);
    console.log(Object.values(itens));
    console.log(Array.isArray(itens));
    console.log(Array.isArray(itens.itens));
    console.log(item);


    // Recebe o item selecionado
    const handleChangeSelectFilter = (event) => {

        console.log("listItens " + event.target);

        const { name, value } = event.target;

        setItem(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        
        handleItensFilter(event);
        console.log("aqui!!!");
    }


    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={item}
                name="Segment"
                onChange={handleChangeSelectFilter}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >

                {Array.isArray(itens)
                    ? itens.map((itemValue) => {
                        return (
                            <MenuItem key={itemValue} value={itemValue}>
                                <Checkbox checked={item.indexOf(itemValue) > -1} />
                                <ListItemText primary={itemValue} />
                            </MenuItem>
                    )})
                    : null + console.log("ta dando errado!!!" + itens)}
            </Select>
        </FormControl>
    );
}

export default FilterSelect;



