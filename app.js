
/* FATEC-217 - Aula 26/08/2026 - 3 Sem - DSM
NOME: Vinicius Heltai - vheltai@gmail.com
Desenvolvimento web sem framework com boas praticas e abrindo multiplos formatos de arquivos
*/

// Carregar os modulos
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, 'public');

// Content-Types:
const content_type = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.mp4': 'video/mp4',
    '.svg': 'image/svg+xml'
}

// Rotas
const routes = {
    '/': 'index.html',
    '/algebra': 'algebra.html',
    '/banco-dados': 'banco-dados.html',
    '/dev-web': 'dev-web.html',
    '/gestao-agil': 'gestao-agil.html',
    '/ihc': 'ihc.html',
    '/ingles': 'ingles.html',
    '/tec-programacao': 'tec-programacao.html',
    '/disciplinaspdf': 'pdf/matriz-curricular.pdf'

}

// Abrir arquivos
function readFile(response, file){
    fs.readFile(file, function(err, data){
        
        if(err){
            response.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});

            return fs.createReadStream(
                path.join(publicDir, 'erro404.html')
            ).pipe(response);
        }

        var extension = path.extname(file).toLowerCase();
        var contentType = content_type[extension] || 'application/octet-stream';

        response.writeHead(200, {'Content-Type': contentType});
        response.end(data);
    });
}



// Funcao callback para utilizar no server http
var callback = function(request, response){
    var pathname = decodeURIComponent(url.parse(request.url).pathname);

    // Rotas
    if(routes[pathname])
        return readFile(response, path.join(publicDir, routes[pathname]));

    // Arquivo estatico
    var file = path.join(publicDir, pathname);

    // Impedir acesso fora da pasta public
    if(!file.startsWith(publicDir))
        return readFile(response, path.join(publicDir, 'erro404.html'));

    return readFile(response, file);
}

// Servidor - Cria e Configura:
var server = http.createServer(callback);
server.listen(3000);
console.log('Servidor iniciando em http://localhost:3000');