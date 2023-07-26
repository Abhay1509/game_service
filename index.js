const http = require('http');
const app = require('./app');
const { main } = require('./db');
const axios = require('axios');
const os = require('os');

app.set('port', 5173);
const server = http.createServer(app);

main().catch(console.error).then(() => {
  const localIPAddress = getLocalIPv4Address();
  
  axios
    .get('https://api.ipify.org/?format=json')
    .then((response) => {
      const publicIPAddress = response.data.ip;
      const port = 5173; // Set the desired port

      server.listen(port, localIPAddress, () => {
        console.log(`Server is running on local IP ${localIPAddress}:${port}`);
        console.log(`Public IP address: ${publicIPAddress}`);
      });
    })
    .catch((error) => {
      console.error('Failed to fetch IP address:', error);
    });
});

function getLocalIPv4Address() {
  const interfaces = os.networkInterfaces();

  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }

  return null;
}
