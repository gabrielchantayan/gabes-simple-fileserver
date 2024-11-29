export const head = 
`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Files</title>
    <style>
        body {
            font-family: monospace;
            font-size: 12px;
            background-color: #131214;
            color: #f7db9e;
            padding: 10px;
        }

        div {
            margin: 0px;
            padding: 0px;
        }

        a {
            text-decoration: none;
            color: #f7efd9;
        }

        a:visited {
            color: white;
        }

        a:hover {
            text-decoration: underline;
        }

        .folderName {
            color: #f7db9e !important;
        }
    </style>

    <script>
        function showHide(e) {

            var folder = document.getElementById(e);
            
            if (folder.style.display === "none") {
                folder.style.display = "block";
                icon.style.display = "none";
            } else {
                folder.style.display = "none";
                icon.style.display = "inline";
            }
        }
    </script>

</head>`