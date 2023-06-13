import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createUser, loginUser } from "../actions/usuarioAction";

import FormPanelChart from "../pages/FormPanelChart";

import style from '../style/Login.module.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const styleMui = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const FormUserRegister = ({ nomeBotao, isRegister }) => {

    console.log("Chegou?");
    let navigate = useNavigate();

    const [name, setName] = useState(null);
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLogin, setIsLogin] = useState(isRegister);

    // Estados do modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // openModal(handleOpen);

    // 
    // useEffect(() => {
    //     openModal(handleOpen);
    // }, []);

    const dispatch = useDispatch();


    // 
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    // 
    const onChangeLogin = (e) => {
        const login = e.target.value;
        setLogin(login);
    };
    
    // 
    const onChangePassword = (e) => {
        const senha = e.target.value;
        setPassword(senha);
    };

    
    //Método responsável por realizar o cadastro de usuários
    const efetuarCadastro = () => {
        setIsLogin(false);
        
        console.log("efetuarCadastro " + name);

        dispatch(createUser(name, login, password))
            .then(data => {
                setName(data.name);

                console.log("resposta then " + name);
                console.log(data.name);
            })
            .catch(e => {
                console.log("ERRO: " + e);
            });

        navigate("/formChart");
    }


    // Método encarregado de efetuar o login de usuários
    const efetuarLogin = () => {
        setIsLogin(true);

        dispatch(loginUser(login, password))
            .then(data => {
                console.log("Login efetuado com sucesso ");
                console.table(data);

                // Fazer select para trazer os dados do usuario, inclusive os dados dos graficos

                navigate("/home");
            })
            .catch(e => {
                console.log("ERRO: usuário não foi encontrado (não foi possível efetuar o login) " + e);
            })
    }

    
    return (
        <>
            <Button onClick={handleOpen}>{nomeBotao}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
        
                <Box sx={style}>
                    <section className={style.box}>
                        <div className={style.boxAreaLogin} >
                            {!isLogin ? (
                                <div>
                                    <label htmlFor="Nome">
                                        Nome
                                    </label><br/>
                                    <input 
                                        type="text"
                                        id="name"
                                        label="Nome"
                                        name="userName"
                                        required
                                        value={name}
                                        onChange={onChangeName}
                                        />
                                </div>
                                ) : <></>}
                                <div>
                                    <label htmlFor="login">
                                        Login
                                    </label><br/>
                                    <input 
                                        type="text"
                                        id="login"
                                        label="Login"
                                        name="login"
                                        required
                                        value={login}
                                        onChange={onChangeLogin}
                                        />
                                </div>
                                <div>
                                    <label htmlFor="Senha">
                                        Senha
                                    </label><br/>
                                    <input 
                                        type="text" id="password" label="Senha" name="password" required value={password} onChange={onChangePassword}
                                    />
                                </div>
                                <div className={style.boxEntrarCriarButton}>
                                    <button onClick={efetuarLogin}>
                                        Entrar
                                    </button>
                                    <button onClick={efetuarCadastro}>
                                        Criar nova conta
                                    </button>
                                </div>
                        </div>
                    </section>
                </Box>
            </Modal>
        </>
    )
};

export default FormUserRegister; 