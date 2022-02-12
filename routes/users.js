const { Router, application } = require('express');
const router = Router();

const bcryptjs = require("bcryptjs");

const connection = require('../database/db');







router.get('/login', (req,res)=> {
   res.render("login")
});



router.get('/register',(req,res)=> {
    res.render("register")
})


router.post('/register', async (req, res)=> {

    const user = req.body.user;
    const name = req.body.name;
    const country = req.body.country;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password, 8);

            connection.query('INSERT INTO usuarios SET ?',{user:user, name:name, country:country, password:passwordHaash}, async(error, results)=> {
                if (error) {
                    res.render('register',{
                        alert:false,
                        alerTitle: "Registro",
                        alertMessage:"nombre de usuario ya existe, intente otro",
                        alertIcon:"error",
                        showConfirmButton:false,
                        timer: 15000,
                        ruta: "register"
                    })
                    console.log(error)
                }else{
                   res.render('register', {
                       alert:true,
                       alerTitle: "Registro",
                       alertMessage:"Usuario creado con exito",
                       alertIcon:"success",
                       showConfirmButton:false,
                       timer: 1500,
                       ruta: ""
                   })
                }
            })

});





router.post('/auth', async (req, res)=> {
	const user = req.body.user;
	const password = req.body.password;    
    let passwordHash = await bcryptjs.hash(password, 8);
	if (user && password) {
		connection.query('SELECT * FROM usuarios WHERE user = ?', [user], async (error, results, fields)=> {
			if( results.length == 0 || !(await bcryptjs.compare(password, results[0].password)) ) {    
				res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "USUARIO y/o PASSWORD incorrectas",
                        alertIcon:'error',
                        showConfirmButton: false,
                        timer: 15000,
                        ruta: 'login'    
                    });
							
			} else {         
				//creamos una var de session y le asignamos true si INICIO SESSION       
				req.session.loggedin = true;    
                data = results;            
				req.session.user = results[0].user;
				res.render('login', {
					alert: true,
					alertTitle: "Conexión exitosa",
					alertMessage: "¡LOGIN CORRECTO!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: '',
                    
				});        			
			}			
			res.end();
		});
	} 
});

router.get ("/", (req, res)=> {
    connection.query("SELECT * FROM usuarios", (error, results) => {
        if (req.session.loggedin) {
            res.render("index",{
                login: true,
                user: req.session.user,
                data: results
            });
        }else {
            res.render("index", {
                login:false,
                user:"Debe iniciar sesion"
            })
        }
    })
})


router.get("/logout", (req, res)=> {
    req.session.destroy(() =>{
        res.redirect("/")
    })
})


router.get("/api/users", (req, res)=> {
    connection.query("SELECT * FROM usuarios", (error, results) => {
        if(error){
            console.log(error)
        } else {             
           res.send(results)          
        }
    });
    
});

module.exports = router;
