import build_files from "./build-files.js";
import build_html from "./build-html.js";
import http from "http";
import fs from "fs";
const server = http.createServer((req, res) => {

    // Server CSS based on URL
    // If req.url beings with a css path, serve the css file specified in req.url
    if (req.url.startsWith("/css/"))  {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(fs.readFileSync("./" + req.url));
    }

    else if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(build_html());
    }


    else {

            try {
// Check if req.url is a directory or a file
            const file_info = fs.lstatSync("./files" + req.url.replaceAll("%20", " "));
            if (file_info.isDirectory()) {
                res.writeHead(200, { "Content-Type": "text/html" });
                try {
                    res.end(build_html(req.url));
                } catch (error) {
                    res.end(build_html());
                }
            } else {
                res.end(fs.readFileSync("./files" + req.url.replaceAll("%20", " ")));
            }
            }
            
            catch (e) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(build_html());
            }


            // // If the file is a directory, serve the index.html file
            // res.writeHead(200, { "Content-Type": "text/html" });

            // try {
            //     res.end(build_html(req.url));
            // } catch (error) {
            //     res.end(build_html());
            // }

            // return;
        

    }

    // // If req.url is anything else, serve the file specified in req.url
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.end(fs.readFileSync("./" + req.url));
});

server.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
