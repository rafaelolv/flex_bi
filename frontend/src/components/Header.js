import React from "react";

import styleGlobal from '../style/Global.module.css';
import Bar from "../components/Bar";

const Header = () => {

    return (
        <header className={styleGlobal.header}>
            <Bar />
        </header>
    )
};

export default Header;