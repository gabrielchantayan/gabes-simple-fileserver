import fs from "fs";
import config from "./config.json" with { type: "json" };

/**
 * Builds a tree of files and directories.
 * @param {string} currentDir - The directory path to build the file tree for.
 * @param {Object<string, string|Object>} outputFiles - An object to store the file tree.
 * @returns {Object<string, string|Object>} - A tree of files and directories.
 */
const build_tree = (currentDir, outputFiles) => {
	const files = fs.readdirSync(currentDir);
	const sanitizedOutputFiles = { ...outputFiles };

	// Iterate over each file in the directory
	for (const file of files) {
		// Check if the file should be ignored
		if (config.ignored_files.includes(file)) {
			continue;
		}

		// Get the path of the file
		const filePath = `${currentDir}/${file}`;
		// Get the stat of the file
		const fileInfo = fs.lstatSync(filePath);

		// If the file is a directory
		if (fileInfo?.isDirectory()) {
			// Build the file tree for the directory
			sanitizedOutputFiles[file] = build_tree(filePath, {});
		} else {
			// Add the path of the file to the outputFiles object
			sanitizedOutputFiles[file] = filePath.slice(8);
		}
	}

	// Return the file tree
	return sanitizedOutputFiles;
};

/**
 * Builds a tree of files and directories.
 * @param {string} dir - The directory path to build the file tree for.
 * @returns {Object<string, string|Object>} - A tree of files and directories.
 */
const build_files = (dir = '') => {

    // Create an object to store the file tree
    const output_files = build_tree(`./files${dir}`, {});

    // Return the file tree
    return output_files;

}

export default build_files