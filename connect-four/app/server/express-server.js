import express from 'express';
import compression from 'compression';
import expressEnforcesSSL from 'express-enforces-ssl';
import helmet from 'helmet';
import http from 'http';
import path from 'path';

// Express server

const app = express();

// Force HTTPS on production
if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use(expressEnforcesSSL());
}
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      /* eslint-disable quotes */
      'default-src': ["'none'"],
      'style-src': ["'self'"],
      'img-src': ["'self'"],
      'font-src': ["'self'", 'https://*.gstatic.com', 'data:'],
      'script-src': ["'self'", "'unsafe-inline'", 'https://storage.googleapis.com', 'https://www.google-analytics.com'],
      'child-src': ["'self'"],
      'connect-src': ["'self'", "https://www.google-analytics.com"],
      'manifest-src': ["'self'"]
      /* eslint-enable quotes */
    }
  }
}));

// Serve assets using gzip compression
app.use(compression());

// Routes

app.get('/room/:roomCode', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'index.html'));
});
app.get('/room', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'index.html'));
});
app.use(express.static(path.dirname(__dirname)));

// HTTP server wrapper

const server = http.Server(app);
// Warning: app.listen(8080) will not work here; see
// <https://github.com/socketio/socket.io/issues/2075>
server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started. Listening on port ${server.address().port}`);
});

export default server;
