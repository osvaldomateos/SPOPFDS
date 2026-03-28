import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = 3000;
const root = process.cwd();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

createServer(async function (request, response) {
  try {
    const url = request.url === "/" ? "/index.html" : request.url || "/index.html";
    const safePath = normalize(decodeURIComponent(url.split("?")[0])).replace(/^([/\\])+/, "");
    const filePath = join(root, safePath);
    const data = await readFile(filePath);
    const extension = extname(filePath).toLowerCase();
    const contentType = contentTypes[extension] || "application/octet-stream";

    response.writeHead(200, { "content-type": contentType });
    response.end(data);
  } catch (_error) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Arquivo não encontrado.");
  }
}).listen(port, function () {
  console.log("Servidor local rodando em http://127.0.0.1:3000");
});
