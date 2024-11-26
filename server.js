// Importation du module https et fs
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("server.cert"),
};

// Fonction pour gérer les requêtes entrantes
const requestListener = function (req, res) {
  // Lire le contenu du fichier index.html
  fs.readFile("index.html", "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error reading HTML file");
      return;
    }

    // Envoyer le contenu HTML avec le type MIME approprié
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
};

// Création du serveur HTTPS
const server = https.createServer(options, requestListener);

// Le serveur écoute sur le port 3000
server.listen(3000, () => {
  console.log("Server is running on https://localhost:3000");
});
