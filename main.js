import build_html from "./build-html.js";
import http from "http";
import config from "./config.json" with { type: "json" };
import { readFileSync , statSync} from 'fs';

// This is the server that will serve the files
const server = http.createServer((req, res) => {
    // Get the URL of the request
    const url = req.url.replace(config.root_web_dir, "").replaceAll("%20", " ");

    // If the URL starts with /css/, serve the CSS file
    if (url.startsWith('/css/')) {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(readFileSync(`./${url}`));
    } 
    // If the URL is /, serve the index.html file
    else if (url === '/') {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(build_html());
    } 
    // If the URL is anything else, try to serve the file from the files directory
    else {
        try {
            // Get the stats for the file
            const stats = statSync(`./files${url}`);

            // If the file is a directory, serve the index.html file from that directory
            if (stats.isDirectory()) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(build_html(url));
            } 
            // If the file is not a directory, serve the file itself
            else {
                res.end(readFileSync(`./files${url}`));
            }
        } 
        // If the file does not exist, serve the index.html file
        catch (e) {
            res.end(build_html());
        }
    }
});

// Start the server on port 3000
server.listen(config.port, () => {
    console.log(`Gabe's Simple Fileserver listening on port ${config.port}!`);
});

