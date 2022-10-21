import { RETRIEVE_PRODUTOS, ACCESS_DATA, ALL_PRODUCTS, ACCESS_ABSOLUTE_VALUES_PRODUCTS } from './../actions/actionTypes/produtoActionType';

const initialState = [];


function produtoReducer(produtos = initialState, action) {
    console.log("2Chegou aqui! reducer de produtos!!!!!" + produtos + " - " + action.payload + "--" + action.type);
    const { type, payload } = action;
    switch (type) {
        case RETRIEVE_PRODUTOS:
            console.log("Chegou aqui! reducer produto!!!!!");

            return payload;
        
        case ACCESS_DATA:
            return [...produtos, payload];

        case ALL_PRODUCTS:
            console.log("Chegou aqui! reducer ALL_PRODUCTS!!!!!");
            return payload;
        
        case ACCESS_ABSOLUTE_VALUES_PRODUCTS:
            return payload;
    
        default:
            return produtos;
    }
}

export default produtoReducer;