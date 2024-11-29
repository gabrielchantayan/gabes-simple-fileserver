import * as html_fragments from './html-fragments.js';
import build_files from './build-files.js';

/**
 * Grows a tree of HTML for the file list.
 *
 * @param {Object<string, string|Object>} files - A tree of files.
 *   The keys are the names of the files and directories, and the values
 *   are either the path of the file or an object that contains the list
 *   of files and directories inside the directory.
 * @param {string} tree - The HTML tree to grow.
 * @param {number} indentLevel - The level of indentation. 0 means no indentation.
 * @param {string} indent - The indentation string. Used to keep track of the
 *   indentation of the last file or directory.
 * @param {string} path - The path of the current node in the tree. Used to
 *   generate an ID for the HTML element of the folder.
 * @returns {string} - The HTML tree.
 */
const grow_tree = (files, tree, indentLevel, indent, path) => {
	// Sort the files and directories alphabetically
	const sortedFiles = Object.fromEntries(
		Object.entries(files).sort(([keyA, valueA], [keyB, valueB]) => {
			if (typeof valueA === 'object' && typeof valueB !== 'object') {
				return 1; // Directories come after files
			} else if (typeof valueA !== 'object' && typeof valueB === 'object') {
				return -1; // Files come before directories
			} else {
				return keyA.localeCompare(keyB); // Sort alphabetically
			}
		})
	);

	// Iterate over the sorted files and directories
	for (const [key, value] of Object.entries(sortedFiles)) {
		let newIndent = '';
		let newIndentRepitition = indent;

		if (indentLevel > 0) {
			// If this is not the last file in the list, use the "not last" indentation
			const isLastFile = Object.keys(sortedFiles).indexOf(key) === Object.keys(sortedFiles).length - 1;

			if (isLastFile) {
				newIndent = ' └─ '; // Last file in the list
				newIndentRepitition =
					indent + (typeof value === 'object' ? '&nbsp;&nbsp;&nbsp;&nbsp;' : ' │&nbsp;&nbsp;&nbsp;'); // Indentation for directories
			} else {
				newIndent = ' ├─ '; // Not the last file
				newIndentRepitition = indent + ' │&nbsp;&nbsp;&nbsp;'; // Indentation for files
			}
		} else {
			tree += '<br />'; // No indentation
		}

		// If the value is an object, it's a folder
		if (typeof value === 'object') {
			// Generate an ID for the folder
			const uriKey = key.replaceAll(/[./\\\s]/g, '-');

			// If this is not the first file in the list, add a newline
			if (indentLevel > 0) tree += '<p>' + indent + ' │&nbsp;&nbsp;&nbsp;' + '</p>';

			// Add the folder to the tree
			tree += `${indent}${newIndent}<span class="folderName" onClick=showHide('${path}_${uriKey}')>${key}<span style="display:none"id="icon-${path}_${uriKey}"> (-)<br /></span></span>`;

			// Add the contents of the folder to the tree
			tree += `<div id=${path}_${uriKey}>`;
			tree += grow_tree(value, '', indentLevel + 1, newIndentRepitition, `${path}_${uriKey}`);
			tree += '</div>';
		} else {
			// Add the file to the tree
			tree += `${indent}${newIndent}<a href="${value}">${key}</a><br />`;
		}
	}

	return tree;
};

/**
 * Builds an HTML tree structure representing the file directory.
 *
 * @param {string} root - The root directory path.
 * @returns {string} - The HTML tree representation of the files.
 */
const build_file_tree = (root = '') => {
    // Retrieve the file structure starting from the root
    const files = build_files(root);

    // Generate the HTML tree from the files object
    const tree = grow_tree(files, '', 0, '', '');

    // Return the HTML tree
    return tree;
};

/**
 * Builds an HTML page representing the file directory structure.
 *
 * @param {string} dir - The directory path to build the HTML for.
 * @returns {string} - The complete HTML page.
 */
const build_html = (dir = '') => {
    // Start with the HTML head section
    let html = html_fragments.head;

    // Add the header section with styling
    html += `<p style="white-space: pre;">${html_fragments.header}</p>`;

    // Generate and add the HTML file tree from the directory
    html += build_file_tree(dir);

    // Append the footer section
    html += html_fragments.footer;

    // Return the complete HTML
    return html;
};

export default build_html;
