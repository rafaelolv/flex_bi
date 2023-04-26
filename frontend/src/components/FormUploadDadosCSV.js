import React from "react";
import * as dfd from "danfojs";

import style from '../style/FormUploadDados.module.css';


const FormUploadDadosCSV = ({ configValues, recebeDadosFromApiCSV }) => {

    

    // Método encarregado de ler o arquivo EXCEL e selecionar os labels para carregar no list form
    const handleChangeFileUpload = (event) => {

        console.log("configValuesMetodo " + configValues);

        console.log(event.target.files[0]);

        dfd.readCSV(event.target.files[0])
            .then(df => {

                // const teste = 

                const jsonObj = dfd.toJSON(df); //column format
                console.log("jsonObj");
                console.log(jsonObj);

                let df2 = new dfd.DataFrame(jsonObj)

                const testeDf = df2.loc({columns: configValues});

                const testeJSON = dfd.toJSON(testeDf);

                console.log(testeJSON);

                console.log("testeDf");
                console.log(testeDf);

                recebeDadosFromApiCSV(testeDf);


               

            }).catch(err => {
                console.log(err);
            })
    }


    return (
        <section className={style.sectionFormUploadDados}>
            <div>
                <label htmlFor="image">
                    Adicione um arquivo no formato csv
                </label><br/>
                <input 
                    type="file"
                    id="myfile"
                    label="arquivo"
                    name="myfile"
                    // accept=".jpeg, .png, .jpg"
                    onChange={handleChangeFileUpload}
                />
            </div>
        </section>
    )
};

export default FormUploadDadosCSV;