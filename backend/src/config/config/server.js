
// const bodyParser = require('body-parser');  /* deprecated */
const express = require('express');

const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

require("../../routes/usuarioRoutes")(app); //passando app para a função que esta nesse caminho
require("../../routes/graficoRoutes")(app);
require("../../routes/dashboardRoutes")(app);

// app.use("/cadastrousuario", UsuarioRoutes);

// server.get('/hello', function (req, res) {
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`BACKEND is running on ${port}.`);
// })

// app.post('/usuarios', function (req, res, next) {
//     console.log(req.body)
//     res.json(req.body)
//   })

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is runnnnnnning on port ${PORT}.`);
});