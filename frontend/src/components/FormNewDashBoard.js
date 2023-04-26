import React, {useState} from "react";
import { useDispatch } from "react-redux";


const FormNewDashBoard = () => {

    const initialState = {
        nome: ""
    }

    const [dashboard, setDashboard] = useState(initialState);

    const dispatch = useDispatch();

    // 
    const handleInputChange = event => {
        const { name, value } = event.target;
        setDashboard({ ...dashboard, [name]: value });
    };



    return (
        <div>
            <input type="text"
                id="nome"
                name="nome"
                placeholder="Nome"
                required
                value={dashboard.nome}
                onChange={handleInputChange}
            />
            {/* <button type="submit" onClick={cadastrarNovaDashBoard}>
                Criar nova dashboard
            </button> */}
        </div>
    )
};