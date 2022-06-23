const fs = require("fs");
const path = require("path");

const stellarisDataFiles = [
    "anomalies.json",
    "engineering.json",
    "physics.json",
    "society.json"
];

const defaultOutputPath = "./stellaris-technologies.json";

async function main(args) {
    const filePath = path.normalize(args[0]);
    const outputPath = path.normalize(args[1] || defaultOutputPath);
    const filePromises = readDataFiles(filePath, stellarisDataFiles);
    const files = await Promise.all(filePromises);

    const technologies = [];

    const keys = {};

    files.forEach(v => {
        let rootArray;
        if (v.length === undefined) {
            // File is not an array, get the root before iterating
            rootArray = v.children[0].children;

        } else {
            // File is an array
            rootArray = v;
        }

        rootArray.forEach(techs => {
            const techStack = [];
            techStack.push(techs);

            while (techStack.length > 0) {
                const t = techStack.pop();
                const parsedTech = parseTechnology(t);
                if (keys[parsedTech.key] !== undefined) {
                    // Skip technologies already parsed.
                    continue;
                }

                technologies.push(parsedTech);
                keys[parsedTech.key] = technologies.length - 1;

                t.children.forEach(v => techStack.push(v));
            }
        });
    });

    console.log(`Parsed ${technologies.length} technologies`);

    // Create a convenience dictionary for looking up technologies by their in-game text
    const dictionary = {};

    technologies.forEach(v => {
        const name = v.name.toLowerCase();
        dictionary[name] = keys[v.key];
    });

    const outputData = { technologies, keys, dictionary, updated: Date.now() };

    await writeDataFile(outputData, outputPath);
}

const parseTechnology = (tech) => {
    const techData = {
        key: tech.key,
        name: tech.name,
        description: tech.description,
        type: tech.area,
        category: tech.category,
        tier: tech.tier,
        baseFactor: tech["base_factor"],
        baseWeight: tech["base_weight"],
        cost: tech.cost,
        dangerous: tech["is_dangerous"],
        starterTech: tech["is_start_tech"],
        eventTech: tech["is_event"],
        rare: tech["is_rare"],
        source: tech.source,
        prerequisites: tech.prerequisites
    };

    return techData;
}

const readDataFiles = (dirpath, filesToRead) => {
    const files = [];

    filesToRead.forEach(file => {
        files.push(new Promise((pass, fail) => {
            fs.readFile(path.join(dirpath, file), (error, data) => {
                if (error) {
                    fail(error);
                }

                pass(JSON.parse(data));
            });
        }));
    });

    return files;
};

const writeDataFile = (data, filepath) => {
    return new Promise((resolve, reject) => {
        const stringifyedData = JSON.stringify(data, null, 2);
        fs.writeFile(path.join(filepath), stringifyedData, err => {
            if (err) {
                return reject(err);;
            }

            return resolve("Write successful!");
        });
    });
}

main(process.argv.slice(2)).catch(err => console.error(err));
