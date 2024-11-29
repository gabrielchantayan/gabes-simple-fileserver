import config from "./config.json" with { type: "json" };

export const head = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Files</title>

    <link rel="stylesheet" href="/css/${config.style}.css">

    <script>
        function showHide(e) {
            var folder = document.getElementById(e);

            var icon = document.getElementById(\`icon-\${e}\`);
            if (folder.style.display === "none") {
                folder.style.display = "block";
                icon.style.display = "none";
            } else {
                folder.style.display = "none";
                icon.style.display = "inline";
            }
        }
    </script>

</head>`;

export const header = 
`▗▄▄▄▖▗▄▄▄▖▗▖   ▗▄▄▄▖ ▗▄▄▖
▐▌     █  ▐▌   ▐▌   ▐▌   
▐▛▀▀▘  █  ▐▌   ▐▛▀▀▘ ▝▀▚▖
▐▌   ▗▄█▄▖▐▙▄▄▖▐▙▄▄▖▗▄▄▞▘`