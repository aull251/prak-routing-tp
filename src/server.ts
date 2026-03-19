import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
    const url = req.url || '/';
    const method = req.method || 'GET';

    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[Log] ${req.method} ${req.url} selesai dalam ${duration}ms`);
    });

    console.log(`[Node.js] ${method} ${url}`);

    // Routing Manual
    if (url === "/" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Halaman Utama (Node.js)</h1>");
    } 
    else if (url === "/about" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Halaman About (Node.js)</h1>");
    } 
    else if (url === "/products" && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify([
            { id: 1, name: "Laptop" }, 
            { id: 2, name: "Mouse" }
        ]));
    } 
    else if (url.startsWith("/users/") && method === "GET") {
        const id = url.split("/")[2];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `User ID: ${id}` }));
    } 
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server Node.js berjalan di http://localhost:${PORT}`);
});