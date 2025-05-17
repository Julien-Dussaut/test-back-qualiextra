// const express = require('express');
// const cookieParser = require('cookie-parser');
// const swaggerUi = require('swagger-ui-express');
// const specs = require('./swagger/documentation');

// const { limiterGlobal } = require('./middlewares/security');
// const errorHandler = require('./middlewares/errorHandler');

// const routesMain = require('./routes/routesMain');
// const routesUsers = require('./routes/routesUser');

// const { startDatabase } = require('./utils/databaseCreation');

// startDatabase();

// const app = express();

// app.use(express.json());
// app.use(limiterGlobal);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

// app.use(cookieParser());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true}));

// app.use('/', routesMain);
// app.use('/', routesUsers);

// app.use(errorHandler);

// module.exports = app;

const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { xss } = require('express-xss-sanitizer');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/documentation');

const { limiterGlobal } = require('./middlewares/security');
const errorHandler = require('./middlewares/errorHandler');

const routesMain = require('./routes/routesMain');
const routesUsers = require('./routes/routesUser');

const { startDatabase } = require('./utils/databaseCreation');

startDatabase();

const app = express();

// Add general security headers
app.use(helmet());

// Parse request who has Content-Type: application/json and limit payload to 10kb to prevent Dos (Denial of Service) attacks
app.use(express.json({ limit: '10kb' }));

// Sanitize all data (body, params, query and headers) received by the API by escaping dangerous caracters and by eliminating script tags who might execute unauthorized javascript
app.use(xss());

app.use(limiterGlobal);

// CORS configuration by checking if the environment is production and authorize only the frontend domain in prod and all domains in devlopment
// Authorize cookies for authentication
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.DOMAIN_FRONT  
    : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Allows cookies for authentication
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use('/', routesMain);
app.use('/', routesUsers);

app.use(errorHandler);

module.exports = app;