const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const connectSessionKnex = require('connect-session-knex');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const db = require('../database/dbConfig.js');

const server = express();

const KnexSessionStore = connectSessionKnex(session);

const sessionConfig = {
  name: 'authenticate jokes',
  secret: 'jokes are not meant to be told',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true 
  },
  resave: false,
  saveUninitialized: false,
  // where do we store our sessions?
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
