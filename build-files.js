import fs from "fs";
import config from "./config.json" with { type: "json" };

const build_tree = (current_dir, output_files) => {
	// Build a tree of files
	// Each folder is a key in the object
	// Each file is a value in the object
	const files = fs.readdirSync(current_dir);

	for (const file of files) {

		if (config.ignored_files.includes(file)) {
			continue;
		}



		const path = `${current_dir}/${file}`;

		// Check if it's a directory or a file without throwing an error
		// lstatSync returns info about the file without throwing an error
		// if it doesn't exist, it returns null
		const file_info = fs.lstatSync(path);
		if (file_info?.isDirectory()) {
			output_files[file] = build_tree(path, {});
		} else {
			// Sanitize the path for a URL
			output_files[file] = path.slice(8)
		}
	}

    
	return output_files;
};

const build_files = (dir = '') => {

    // Build a tree of files
    const output_files = build_tree(`./files${dir}`, {});


    return output_files;

}

export default build_files