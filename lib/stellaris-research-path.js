const { Queue } = require("./queue");

module.exports.findResearchPath = (targetTechnology, technologyData) => {
    const queue = new Queue();
    const target = targetTechnology.toLowerCase();
    const initialIndex = technologyData.dictionary[target];

    if (initialIndex === undefined) {
        return undefined;
    }

    queue.push(technologyData.technologies[initialIndex].key);

    const researchPath = [];
    const memo = new Set();

    while (queue.size > 0) {
        const currentTechKey = queue.pop();
        if (memo.has(currentTechKey)) {
            continue;
        }

        memo.add(currentTechKey);

        const techIndex = technologyData.keys[currentTechKey];
        const tech = technologyData.technologies[techIndex];

        researchPath.push(tech);

        tech.prerequisites.forEach(k => {
            queue.push(k);
        });
    }

    return researchPath;
};
