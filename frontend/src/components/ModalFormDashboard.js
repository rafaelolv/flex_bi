import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createNewDashboard } from "../actions/dashboardAction";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import style from '../style/FormPanelChart.module.css';

const styleMui = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #0000',
    borderRadius: '25px',
    boxShadow: 24,
    p: 8,
};

// Componente que representa o formulário de cadastro de uma nova dashboard
const ModalFormDashboard = ({ getDashboard }) => {

    // 
    const initialStateDadosDashboard = {
        id_dashboard: null,
        nome: "",
        id_usuario: null,
        dadosGrafico: {}
    }

    //Para cadastro da dashboard o dos graficos que a irao compor inicialmente
    const [dashboard, setDashboard] = useState(initialStateDadosDashboard);

    // 
    const handleInputChangeDadosDashboard = event => {
        const { name, value } = event.target;
        setDashboard({ ...dashboard, [name]: value });
    };

    // Estados do modal
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();


    //Método encarregado de cadastrar uma nova Dashboard 
    const cadastrarNovaDashBoard = () => {
        
        dispatch(createNewDashboard(dashboard))
            .then(data => {
                setDashboard(data);
                getDashboard(data);

                console.log("resposta then " + dashboard.nome);
                console.log("resposta then " + dashboard.id_usuario);
                console.log("resposta then " + data.id_usuario);
                console.log("resposta then " + data.id_dashboard);

                // console.log(dashboard.dadosGrafico.label);
                console.log("SUCCESS: Nova Dashboad cadastrada com sucesso!");
            })
            .catch(e => {
                console.log("ERRO: " + e);
            });

        // navigate("/formChart");

        // console.log("--->Dash " + dadosGrafico.label);
        // console.log("---> " + dadosGrafico.valor);
        // console.log("---> " + dadosGrafico.filtros);

    }


    return (

        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleMui}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Nova Dashboard
                    </Typography>
                    <div className={style.areaModalFormDashboard}>
                        <input type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome dashboard"
                            required
                            value={dashboard.nome}
                            onChange={handleInputChangeDadosDashboard}
                        />
                        <button type="submit" onClick={cadastrarNovaDashBoard}>
                            Cadastrar nova Dashboard !!!!
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
};

export default  ModalFormDashboard;