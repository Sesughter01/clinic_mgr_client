const Cors = require('cors');
const { NextApiRequest, NextApiResponse } = require('next');

// ----------------------------------------------------------------------

const initMiddleware = (middleware) => (req, res) =>
  new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve();
    });
  });

// ----------------------------------------------------------------------

// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const corsMiddleware = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);

module.exports = corsMiddleware;
