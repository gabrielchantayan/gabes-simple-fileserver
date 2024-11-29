const header = `<p>Files</p>`
const footer = `<br /><br />-------<br />
    Displayed with <a href="https://github.com/gabrielchantayan/gabes-simple-fileserver">Gabe's Simple Fileserver</a> v1
    <br><br>`;

import * as html_fragments from './html-fragments.js';

const build_html = () => {

    let html = html_fragments.head;

    html += header;
    html += footer;

    return html;
}

export default build_html