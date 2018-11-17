// =======================
// Paquetes necesarios
// =======================
var express     = require('express'), cors = require('cors'), app = express();
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // Crea, firma, y verifica los tokens
var config = require('./config'); // Archivo de configuracion
var User   = require('./app/models/user'); // mongoose user model
var Message = require('./app/models/message'); // mongoose message model
var MessageArchive = require('./app/models/messagesarchive'); // mongoose message archive model

// =======================
// configuration
// =======================
var port = process.env.PORT || 8080; // Puerto
mongoose.connect(config.database); // Conexion a la base de datos
app.set('superSecret', config.secret); // Variable secreta
app.options('*', cors()); // preflight OPTIONS; put before other routes

// Parses para obtener informacion de los POST o URL llamada
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log de la base de datos
app.use(morgan('dev'));

// =======================
// routes
// =======================
// Ruta default
app.get('/', function(req, res) {
    res.send('Aloja! La API de Baldur esta en http://localhost:' + port + '/api');
});

// API -------------------
app.get('/setup', function(req, res) {
    // Usuario de ejemplo
    var nick = new User({ 
      name: 'James', 
      password: 'password',
      admin: true 
    });
  
    // Guarda en la base de datos
    nick.save(function(err) {
      if (err) throw err;
      console.log('Usuario creado');
      res.json({ success: true });
    });
  });

// Registracion de Usuario
app.post('/register', function(req,res){
    //'Formulario' de usuario
    if(req.body.name && req.body.password){
        var user = new User({
            name: req.body.name,
            password: req.body.password,
            admin: false,
            online: false,
            activeToken: ''
        });
        console.log(req.body)
        //Guardamos el nuevo user en la db
        user.save(function(err) {
            if (err) throw err;
            console.log('Usuario creado');
            res.json({ success: true , message: 'Usuario registrado'});
        });
    }else{
        console.log("No se registro por falta de los campos usuario o password");
        return res.json({ success: false, message: 'No se registro por falta de los campos usuario o password' });  
    }
});

// Instancia el router de apis
var apiRoutes = express.Router(); 

// Ruta para autenticar un usuario (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
    // Busca el usuario
    User.findOne({ name: req.body.name}, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Usuario no encontrado, no es posible autenticar.' });
        } 
        else if (user) {
            // Corrobora la contraseña
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Contraseña erronea, no es posible autenticar.' });
            } else {
                // Crea un token si la autenticacion es correcta
                const payload = {
                    admin: user.admin 
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 600000 // Expira en 10 minutos
                });

                //Actualiza el campo TOKEN del usuario
                user.activeToken = token
                user.online = true
                user.save(function(err) {
                    if (err) throw err;
                });

                Message.find({ name_to: user.name}, function(err, message) {
                    if (err) throw err;
                    
                    // Retorna la data con el token
                    res.json({
                    success: true,
                    message: 'Token generado',
                    token: token,
                    messages: message
                    });

                    

                    Message.deleteMany({ name_to: user.name }, function(err) {
                        console.log(err);
                    });
                });
            }   
        }
    });
});

// Mensaje si entramos a la direccion dela api (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
    res.json({
        greeting: "Hola",
        message: 'Lista de endpoints',
        endpoints: [
        {
            name: "setup",
            url: "http://localhost:8080/api/setup",
            method: "GET",
            desc: "Crea usuario con permisos de administrador"
        },
        {
            name: "users",
            method: "GET",
            url: "http://localhost:8080/api/users",
            desc: "Devuelve la lista de usuarios"
        },
        {
            name: "online",
            method: "GET",
            url: "http://localhost:8080/api/online",
            desc: "Devuelve la lista de usuarios online"
        },
        {
            name: "sendMessage",
            method:"POST",
            url:"http://localhost:8080/api/sendMessage",
            desc: "Envia mensaje a otro usuario"
        }
        ] 
    });
});

// Middleware que verifica el token
apiRoutes.use(function(req, res, next) {
    // Busca el token dentro del request
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decodifica el token
    if (token) {
      // Verifica que el token tenga la clave secreta
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
        if (err) {
            User.findOne({ activeToken: token}, function(err, user) {
                if(user)
                {
                    user.activeToken = ''
                    user.online = false
                    user.save(function(err) {
                        if (err) throw err;
                    });
                }
            });
          return res.status(403).json({ success: false, message: 'Error al autenticar el token.' });    
        } else {
          // Si el token esta OK, continua con la ejecucion
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      // retorna error al no enviar token
      return res.status(403).send({ 
          success: false, 
          message: 'No dio ningun token.' 
      });  
    }
});

// Enviar un mensaje (POST http://localhost:8080/api/sendMessage)
apiRoutes.post('/sendMessage', async function(req, res) {
    if(req.body.name.length > 0 && req.body.token.length > 0)
    {
        _return = await sendMessage(req.body.token, req.body.message, req.body.name);
        res.json(_return);
    }
    else
    {
        res.json({
            success: false,
            message: "Corrobore los datos enviados"
        });
    }
});

// POST Mensajes (POST http://localhost:8080/api/getMessages)
apiRoutes.post('/getMessages', async function(req, res) {
    if(req.body.token.length > 0)
    {
        _return = await getMessages(req.body.token);
        res.json(_return);
    }
    else
    {
        res.json({
            success: false,
            message: "Corrobore los datos enviados"
        });
    }
});

async function sendMessage(token, message, names){
    var response = [];
    return new Promise( async function (resolve, reject){
        _sender = await getUserByToken(token);
        await asyncForEach(names, async function(name){
            try
            {
                console.log("for each para: "+name)
                _recipient = await getUserByName(name);
                _message = await saveMessages(_sender, _recipient, message);
                response.push(_message);
            }
            catch(error)
            {
                response.push(error);
            }
        })
        resolve(response);
    })
}

async function saveMessages(sender, recipient, message){
    return new Promise( function(resolve, reject){
        var messageToSend = new Message({
            name_from : sender.name,
            name_to : recipient.name,
            message : message,
            date : Date.now()  
        });

        messageToSend.save(function(err) {
            if (err) {
                resolve({
                    "success": false,
                    "message": "Error al almacenar mensaje a "+ recipient.name +" el mensaje en la base de datos",
                    "error": err
                });
            }
            else {
                resolve({
                    "succes": true,
                    "message": "Mensaje enviado a "+ recipient.name + " correctamente"
                });
            }
        });
    });
};

async function getUserByName(name){
    return new Promise(function(resolve, reject){
        User.findOne({ name: name }, function(err, user){
            if (err) reject(err);
            if (!user) {
                reject({
                    "success": false,
                    "message": "usuario destino no encontrado " + name + " mensaje no enviado"
                });
            }
            else {
                resolve(user);
            }
        });
    });
}

function getMessages(token){
    var response = [];
    return new Promise( async function (resolve, reject){
        _user = await getUserByToken(token);
        Message.find({ name_to: _user.name}, function(err, message) {
            if (err) throw err;

            Message.deleteMany({ name_to: _user.name }, function(err) {
                console.log(err);
            });

            resolve(message);
        });
    })
}

async function getUserByToken(token){
    return new Promise(function(resolve, reject){
        console.log("metodo get user by token")
        User.findOne({ activeToken: token }, function(err, user){
            if (err) reject(err);
            if (!user) {
                resolve({
                    "success": false,
                    "message": "Token de usuario expirado, reintente"
                });
            }
            else {
                resolve(user);
            }
        });
    });
}

async function asyncForEach(array, callback) {
    names = array.split(";");
    for (let index = 0; index < names.length; index++) {
      await callback(names[index], index, array)
    }
}

// Ruta para listar usuarios (GET http://localhost:8080/api/users)
apiRoutes.post('/users', function(req, res) {
  User.find({}, {name: 1,online: 1}, function(err, users) {
    res.json(users);
  });
});

// Ruta para listar usuarios online (GET http://localhost:8080/api/online)
apiRoutes.post('/online', function(req, res) {
    User.find({online: true},{name: 1,online: 1}, function(err, users) {
        res.json(users);
    });
});


// Ruta generica de la api, agrega prefix API a la url
app.use('/api', apiRoutes);

// =======================
// Levanta el servidor
// =======================
app.listen(port);
console.log('Corriendo: http://localhost:' + port);