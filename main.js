import express from "express";
import build_files from "./build-files.js";
import build_html from "./build-html.js";

const app = express();

app.get("/", (req, res) => {
    res.send(build_html());
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
})