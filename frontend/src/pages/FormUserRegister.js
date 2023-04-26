import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createUser, loginUser } from "../actions/usuarioAction";

import FormPanelChart from "./FormPanelChart";

import style from '../style/Login.module.css';


const FormUserRegister = () => {

    let navigate = useNavigate();

    const [name, setName] = useState(null);
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLogin, setIsLogin] = useState(true);

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

    // 
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

        // navigate("/formChart");
    }

    // Método encarregado de efetuar o login de usuários
    const efetuarLogin= () => {
        setIsLogin(true);

        dispatch(loginUser(login, password))
            .then(data => {
                console.log("Login efetuado com sucesso " + data.login);
            })
            .catch(e => {
                console.log("ERRO: usuário não foi encontrado (não foi possível efetuar o login) " + e);
            })
    }



    return (
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
                        type="text"
                        id="password"
                        label="Senha"
                        name="password"
                        required
                        value={password}
                        onChange={onChangePassword}
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
    )
};

export default FormUserRegister; 