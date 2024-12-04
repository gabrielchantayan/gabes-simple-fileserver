import build_html from "./build-html.js";
import http from "http";
import config from "./config.json" with { type: "json" };
import { readFileSync , statSync} from 'fs';

// This is the server that will serve the files
const server = http.createServer((req, res) => {
    // Get the URL of the request
    const url = req.url.replaceAll("%20", " ");
    const file = url.replace(config.root_web_dir, "")
    
    // If the URL starts with /css/, serve the CSS file
    if (url.startsWith(`/${config.root_web_dir}css/` || url.startsWith('/css'))) {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(readFileSync(`./${file}`));
    } 
    // If the URL is /, serve the index.html file
    else if (url === `/${config.root_web_dir}` || url === '/') {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(build_html());
    } 
    // If the URL is anything else, try to serve the file from the files directory
    else {
        try {
            // Get the stats for the file
            const stats = statSync(`./files${file}`);

            // If the file is a directory, serve the index.html file from that directory
            if (stats.isDirectory()) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(build_html(file));
            } 
            // If the file is not a directory, serve the file itself
            else {
                res.end(readFileSync(`./files${file}`));
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

