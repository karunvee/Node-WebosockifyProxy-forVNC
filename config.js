const https = require('https');
const fs = require('fs');
const websockify = require('@sukkis/node-multi-websockify');
const axios = require('axios');


// HTTPS options
const options = {
    key: fs.readFileSync('C:/Sectigo-STAR.deltaww.com/wildcard_deltaww_com_sectigo.key'),
    cert: fs.readFileSync('C:/Sectigo-STAR.deltaww.com/wildcard_deltaww_com_sectigo.crt')
};

// Create an HTTPS server
const server = https.createServer(options);
const port = process.env.PORT || 8086;

// Start the server
server.listen(port, 'thwgrwarroom.deltaww.com', () => {
  console.log(`Server is listening on https://thwgrwarroom.deltaww.com:${port}`);
});
server.setMaxListeners(100);

axios.get('https://thwgrwarroom.deltaww.com:8002/api/warroom/get_remote_all/')
.then((res) => {
  const targetArray = res.data.map((item) => ({ target: item.ip_address + ":5900", path: '/' + item.name}));
  websockify(server, targetArray);
})
.catch((err) => {
  console.log(err);
})


// // Dynamic WebSocket proxy handling
// server.on('upgrade', (req, socket, head) => {
//     // Parse the requested path
//     const path = req.url.slice(1); // Remove the leading '/'
//     const [ipPart, portPart] = path.split('__');
    
//     if (ipPart && portPart) {
//         // Rebuild the target address from the path
//         const targetIp = ipPart.replace(/_/g, '.'); // Replace underscores with dots
//         const targetPort = portPart; // Use the second part as the port

//         const target = `${targetIp}:${targetPort}`;
        
//         // Dynamically create the WebSocket route
//         const targetArray = [{ target, path: req.url }];

//         // Handle the WebSocket upgrade using websockify
//         websockify(server, targetArray);
//     } else {
//         // Handle cases where the path format is incorrect
//         socket.destroy(); // Close the connection if the path is not valid
//     }
// });
