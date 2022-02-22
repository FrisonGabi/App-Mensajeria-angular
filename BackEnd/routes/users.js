const { Router, application } = require('express');
const router = Router();

const connection = require('../database/db');
const { route } = require('express/lib/application');
const jwt = require('jsonwebtoken');



router.get("/api/users", (req, res)=> {
    connection.query("SELECT user FROM usuarios", (error, results) => {
        if(error){
            console.log(error)
        } else {             
           res.json(results)          
        }
    });
    
});

router.post('/login', async (req, res)=> {
	const user = req.body.user;
	const password = req.body.password;    
    
    connection.query("SELECT * FROM usuarios WHERE user=? AND password=?", [user,password], (error,results,fields) => {
        if(results.length>0){
          let data = JSON.stringify(results[0]);
          const token = jwt.sign(data, "secreto")          
          let user = results[0].user
          res.json({user,token})

          console.log(user);
          console.log("inicio de sesion correcto")
        }else{
            res.json(error)
        }
    })
}); 




router.get(`/api/users/:user/messages/inbox`, (req,res)=>{
    let user = req.params["user"]
    connection.query(`SELECT * FROM mensajes WHERE usuario_destino='${user}'`, (error,results) =>{
        if(error){
            console.log(error)
        } 
        else {             
           res.send(results) 
                    
        }
    })
});



router.post('/api/users', async (req, res)=> {

    const user = req.body.user;
    const name = req.body.name;
    const country = req.body.country;
    const state = req.body.state;
    const lastName = req.body.lastName;
    const password = req.body.password;
   
            connection.query('INSERT INTO usuarios SET ?',{user:user,lastName:lastName, name:name, country:country,state:state, password:password}, async(error, results)=> {
                if (error) {                   
                    console.log(error)
                    res.json(error)
                }else{
                   console.log("Usuario agregado")
                   res.json({"message": "usuario agregado"});
                }
            })

});



router.get("/api/users/:user/messages/sent", (req,res)=>{
    let user = req.params["user"]
    connection.query(`SELECT * FROM mensajes WHERE usuario_origen='${user}'`, (error,results) =>{
        if(error){
            console.log(error)
        } 
        else{             
           res.send(results)          
        }
    })
});


router.post("/api/users/:user/messages" ,async (req, res)=>{
    let user = req.params["user"]
    const usuario_destino = req.body.usuarioDestino;
    const mensaje = req.body.mensaje;
    const usuario_origen = req.body.usuarioOrigen;
    console.log(usuario_destino);

    connection.query('INSERT INTO mensajes set?', {mensaje:mensaje,usuario_origen:usuario_origen, usuario_destino:usuario_destino}, async (error,ressults) =>{
        if (error){
            console.log(error)
            }else{
                console.log("mensaje enviado de: "+usuario_origen+" a: "+usuario_destino)
                       
        }
    })
})



module.exports = router;
