const http = require('http');
const url  = require('url');
const fs   = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/reboot-longo' && req.method === 'POST') {
    try { reboot_longo(); } 
    catch (error) { console.error('Erro ao reiniciar:', error); } } 

  if (pathname === '/reboot' && req.method === 'POST') {
    try { reboot(); } 
    catch (error) { console.error('Erro ao reiniciar:', error); } }
  
  else { serveStaticFile(pathname, res); }

});

function reboot() {
  const { exec } = require('child_process');
  const comando = 'python3 reboot.py --reboot';

  exec(comando, (erro, stdout, stderr) => {
    if (erro) {
      console.error(`Erro: ${erro}`);
      return;
    }
  });
}

function reboot_longo() {
  const { exec } = require('child_process');
  const comando = 'python3 reboot.py --longo';

  exec(comando, (erro, stdout, stderr) => {
    if (erro) {
      console.error(`Erro: ${erro}`);
      return;
    }
  });
}

function serveStaticFile(filePathname, res) {
  const filePath = path.join(__dirname, 'public', filePathname);
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (error) {
    console.error('Erro ao servir arquivo estático:', error);
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
}

function execPromisify(command) {
  return new Promise((resolve, reject) => {
    const { exec } = require('child_process');
    exec(command, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});



