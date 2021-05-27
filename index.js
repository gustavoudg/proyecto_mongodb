var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/tecmm',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/registrar", (req, res) => {
    var name = req.body.fnombre;
    var networks = req.body.fredes;
    var birthday = req.body.cumple;
    var race = req.body.carrera;

    var data = {
        "nombre": name,
        "redes" : networks,
        "cumple": birthday,
        "carrera" : race
    }

    db.collection('tics').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('finalizado.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");