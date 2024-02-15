Certainly! Below is an example of a simple Node.js code that spins up a server:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Here's how you can use it:

1. Create a new file named `server.js`.
2. Copy and paste the above code into `server.js`.
3. Open your terminal and navigate to the directory where `server.js` is located.
4. Run the following command to start the server: `node server.js`.
5. The server will start running on `http://127.0.0.1:3000/`.
6. Visit `http://127.0.0.1:3000/` in your browser or send a GET request to that URL using a tool like cURL to see the response.

The server will respond with "Hello, World!" to any incoming HTTP requests. Feel free to modify the response or customize the server behavior to suit your needs.