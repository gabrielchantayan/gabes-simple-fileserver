Gabe's Simple Fileserver
---

### Why?

When I was switching my website over from a static server to a NextJS server, I realized I could no longer host static files.

This is my way around it. A light-weight framework-less server that can host static files and serve them over HTTP.

### Usage

Run `npm i` to install the server, then run `npm run start` to start the server. Navigate to http://localhost:3003 in your browser to view the files.


### Customization

This program is highly customizable.

To change the root directory, change the `root_web_dir` field in the config file. By default it is `files/`. Don't include the leading slash.

To change the port, change the `port` field in the config file. By default it is `3003`.

To change the style of the file listing, change the `style` field in the config file.

<details>
    <summary>The program comes with the following styles:</summary>


![coffee](images/coffee.png)
coffee

![gabe](images/gabe.png)
gabe (based on my [portfolio website](https://gabrielchantayan.com))

![hacker](images/hacker.png)
hacker

![lotus](images/lotus.png)
lotus

![ocean](images/ocean.png)
ocean

![old](images/old.png)
old (based on raw HTML)

![rose](images/rose.png)
rose

</details>

To stop certain files from showing, add them to the `ignored_files` array in the config file.

To change the header/footer, modify `html-fragments.js`