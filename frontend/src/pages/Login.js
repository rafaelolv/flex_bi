import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormPanelChart from "./FormPanelChart";

import style from '../style/Login.module.css';


const Login = () => {

    let navigate = useNavigate();

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");


    // 
    const onChangeUserName = (e) => {
        const login = e.target.value;
        setUsername(login);
    };
    
    // 
    const onChangePassword = (e) => {
        const senha = e.target.value;
        setPassword(senha);
    };

    // 
    const efetuarLogin = () => {
        console.log(userName);

        navigate("/formChart");
    }


    return (
        <section className={style.box}>
            <div className={style.boxAreaLogin} >
                <div>
                    <label htmlFor="login">
                        Login
                    </label><br/>
                    <input 
                        type="text"
                        id="userName"
                        label="Login"
                        name="userName"
                        required
                        value={userName}
                        onChange={onChangeUserName}
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

                <button type="submit" onClick={efetuarLogin}>
                    Entrar
                </button>
            </div>
        </section>
    )
};

export default Login;