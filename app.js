var session = require('express-session');
var Keycloak = require('keycloak-connect');

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

// Use the express-session middleware and tell it to use the memoryStore session store
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Use the keycloak middleware, with the 'logout' option set to the path you want to use for logout
app.use(keycloak.middleware({
  logout: '/logout',
}));

// Protect the '/test' route with Keycloak
app.get('/test', keycloak.protect(), function(req, res){
  res.send("You're accessing a protected route!");
});
