const path = require("path");
const srp = require("./index");

const expectedResult = [
    'Fission Power',
    'Fusion Power',
    'Starport',
    'Corvettes',
    'Cold Fusion Power',
    'Starhold',
    'Destroyers',
    'Antimatter Power',
    'Star Fortress',
    'Cruisers',
    'Zero Point Power',
    'Citadel',
    'Battleships',
    'Mega-Engineering'
  ]

async function test() {
    const techFile = await srp.readTechnologyFile(path.join(__dirname, "data", "stellaris-technologies.json"));
    const result = srp.findResearchPath("Mega-Engineering", techFile);
    const calculatedResultString = result.map(v => v.name).reverse().join(", ")
    const expectedResultString = expectedResult.join(", ");

    console.log("Calculated Path:", calculatedResultString);
    console.log("Expected Path:", expectedResultString);

    const booleanResult = calculatedResultString === expectedResultString;
    console.log("Strings equal?:", booleanResult);

    if (!booleanResult) {
        throw "Failed!"
    }

    console.log("Passed.");
}

test().catch(err => console.error(err));
