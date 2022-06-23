# Data Information

The data in `stellaris-technologies.json` is what `stellaris-research-path` uses.
The `parse-stellaris-data.js` script is used to transform the data from what is in the `vanilla` folder into what is needed.

Usage instructions:

```bash
node parse-stellaris-data.js /path/to/folder/with/data /path/to/output.json

# Example
node parse-stellaris-data.js ./vanilla  # this will output to ./stellaris-technologies.json by default.
```

The data in the `vanilla` folder comes from [Turanar's stellaris-tech-tree](https://github.com/turanar/stellaris-tech-tree) repository and is provided as an example.
