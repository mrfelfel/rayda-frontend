const express = require('express'),http = require('http'),path = require('path'),compression = require('compression');
const expressStaticGzip = require('./compot'); // compression.js gist is available on the github.

const app = express();

// app.use(express.static(path.join(__dirname, 'dist')));
 
app.get('/testsystemisnode', (req, res) => {
    res.send('hi im node')
  })
  app.use(expressStaticGzip(path.join(__dirname, 'dist'), {
    fallthrough: false,
    enableBrotli: true,
   }));
app.get('*', (req, res) => {
    res.set('Cache-Control', 'public, max-age=31557600'); // one year

     res.sendFile(path.join(__dirname, 'dist/index.html'));
})



const port = process.env.PORT || '80';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running at port ' + port))