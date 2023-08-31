const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url); //Define o caminho do arquivo index que será executado
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(err.code === 'ENOENT' ? 404 : 500);
            res.end(err.code === 'ENOENT' ? '404 Not Found' : '500 Internal Server Error');
        } else {
            const extname = path.extname(filePath);
            const contentType = getContentType(extname);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000; //Porta do servidor, mude se estiver ocupada
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`); //Mensagem de sucesso
});

function getContentType(extname) {
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
    };
    return contentTypes[extname] || 'text/plain';
}
