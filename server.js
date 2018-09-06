// =======================
// Paquetes necesarios
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // Crea, firma, y verifica los tokens
var config = require('./config'); // Archivo de configuracion
var User   = require('./app/models/user'); // mongoose model

// =======================
// configuration
// =======================
var port = process.env.PORT || 8080; // Puerto
mongoose.connect(config.database); // Conexion a la base de datos
app.set('superSecret', config.secret); // Variable secreta

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
app.get('/register', function(req,res){
    //'Formulario' de usuario
    if(req.query.name && req.query.password){
        var user = new User({
            name: req.query.name,
            password: req.query.password,
            admin: false,
            online: false,
            activeToken: ''
        });
        console.log(req.query)
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
                    expiresIn: 600 // Expira en 10 minutos
                });

                //Actualiza el campo TOKEN del usuario
                user.activeToken = token
                user.online = true
                user.save(function(err) {
                    if (err) throw err;
                  });

                // Retorna la data con el token
                res.json({
                    success: true,
                    message: 'Token generado',
                    token: token
                });
            }   
        }
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
                user.activeToken = ''
                user.online = false
                user.save(function(err) {
                    if (err) throw err;
                  });
            });
          return res.json({ success: false, message: 'Error al autenticar el token.' });    
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

// Mensaje si entramos a la direccion dela api (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({
        greeting: "Hola "+req.body.name,
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
            }
        ] 
    });
});

// Ruta para listar usuarios (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, {name: 1,online: 1}, function(err, users) {
    res.json(users);
  });
});

// Ruta para listar usuarios online (GET http://localhost:8080/api/online)
apiRoutes.get('/online', function(req, res) {
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