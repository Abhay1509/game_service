const http = require('http');
const app = require('./app');
const {main} = require('./db')

app.set('port', 5173);
const server = http.createServer(app);

main().catch(console.error).then(()=>{
    server.listen(5173, "192.168.69.13");
});
