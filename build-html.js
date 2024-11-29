const header = `<p>Files</p>`;
const footer = `<br /><br />-------<br />
    Displayed with <a href="https://github.com/gabrielchantayan/gabes-simple-fileserver">Gabe's Simple Fileserver</a> v1
    <br><br>`;

import * as html_fragments from './html-fragments.js';
import build_files from './build-files.js';

const grow_tree = (files, tree, indent, repitition, path) => {


	// Sort the files based on if they are directories or not, then alphabetically
	files = Object.fromEntries(
		Object.entries(files).sort(([keyA, valueA], [keyB, valueB]) => {
			if (typeof valueA === 'object' && typeof valueB !== 'object') {
				return 1;
			} else if (typeof valueA !== 'object' && typeof valueB === 'object') {
				return -1;
			} else {
				return keyA.localeCompare(keyB);
			}
		})
	);

	for (const [key, value] of Object.entries(files)) {
		let newPrefix = '';
		let newRepitition = repitition;

		// If not in the root directory then generate the lines
		if (indent > 0) {
			// Check if the current file is the last file
			const is_last_file = Object.keys(files).indexOf(key) === Object.keys(files).length - 1;
			if (is_last_file) {
				newPrefix = ' └─ '; // Last file in the list
				newRepitition =
					repitition + (typeof value === 'object' ? '&nbsp;&nbsp;&nbsp;&nbsp;' : ' │&nbsp;&nbsp;&nbsp;'); // Indentation for directories
			} else {
				newPrefix = ' ├─ '; // Not the last file
				newRepitition = repitition + ' │&nbsp;&nbsp;&nbsp;'; // Indentation for files
			}
		} else {
			tree += '<br />';
		}

		// If it's a directory
		if (typeof value === 'object') {

            let uri_key = key.replaceAll(/[./\\\s]/g, '-');

			if (indent > 0) tree += '<p>' + repitition + ' │&nbsp;&nbsp;&nbsp;' + '</p>';
			tree += `${repitition}${newPrefix}<span class="folderName" onClick=showHide('${path}_${uri_key}')>${key}<span style="display:none"id="icon-${path}_${uri_key}"> (-)<br /></span></span>`;
            tree += `<div id=${path}_${uri_key}>`;
			tree += grow_tree(value, '', indent + 1, newRepitition, `${path}_${uri_key}`);
			tree += '</div>';
		}

		// If it's a file
		else {
			tree += `${repitition}${newPrefix}<a href="${value}">${key}</a><br />`;
		}
	}

	return tree;
};

const build_file_tree = (root = '') => {
	const files = build_files(root);

	let html = '';

	const tree = grow_tree(files, '', 0, '', '');

	return tree;
};

const build_html = (dir = '') => {
	let html = html_fragments.head;

	html += `<p style="white-space: pre;">${html_fragments.header}</p>`;

	html += build_file_tree(dir);

	html += footer;

	return html;
};

export default build_html;
