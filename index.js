const express = require('express');
const app = express();
const fsPromises = require('fs/promises');
const expressFileUpload = require('express-fileupload');
require('dotenv').config();

const PORT = 3000;

const fileUploadConfig = {
    limits: { fileSize: process.env.FILEUPLOAD_LIMITS_FILESIZE },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
}

// middlewares
app.use(expressFileUpload(fileUploadConfig));
app.use(express.static("wwww"));
app.get("/", (req, res) => {
res.sendFile(__dirname + '/wwww/formulario.html')
})

app.get("/collage", (req, res) => {
    res.sendFile(__dirname + '/wwww/collage.html')
    })


app.post("/imagen", (req, res) => {
    let targetFile = req.files.target_file;
    const { posicion } = req.body;
    targetFile.mv(`${__dirname}/wwww/assets/imgs/imagen-${posicion}.jpg`, (err) => {
        
        if(err) throw err;
        res.redirect("/collage")
    })
});

app.get("/deleteImg/:imagen",async (req, res) => {
    let imagen = req.params.imagen;
    try{
        fsPromises.unlink(`${__dirname}/wwww/assets/imgs/${imagen}`);
        res.status(201).send(`Imagen ${nombre} fue eliminada con éxito`);
    }
    catch (error){
        res.send(`${imagen} fue borrada. <a href="/"> subir otra imagen</a>`)
    }
    
    })


//Disponibiliza
app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`))