const fs = require("fs");

const originalData = fs.readFileSync(process.cwd() + "/data.json", "utf-8");
fs.writeFileSync("/tmp/data.json", originalData);
