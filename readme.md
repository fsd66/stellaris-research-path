# Stellaris Research Path

This is a utility that leverages data from [Turanar's stellaris-tech-tree](https://github.com/turanar/stellaris-tech-tree) and lists the set of research required for a given technology.

Stellaris' tech-tree is organized roughly as a directed graph, and this utility does a simple breadth-first-search to list technology dependencies.

While specifying the target technology is case-insensitive, it must match exactly

## Usage

```javascript
const path = require("path");
const { readTechnologyFile, findResearchPath } = require("stellaris-research-path");

// readTechnologyFile returns a Promise so async/await works too!
readTechnologyFile(path.join(__dirname, "data", "stellaris-technologies.json"))
    .then(techFile => {
        const researchPath = findResearchPath("Mega-Engineering", techFile);
        // ...do stuff
    }).catch(err => console.error(err));
```

In actual use, you might want to cache the technology file in memory if you plan to run this function a lot, but I will leave that determination to your own judgement and use case.
