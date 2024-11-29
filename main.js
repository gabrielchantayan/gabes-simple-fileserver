import build_files from "./build-files.js";
import build_html from "./build-html.js";
import http from "http";
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(build_html());
    }
});

server.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
