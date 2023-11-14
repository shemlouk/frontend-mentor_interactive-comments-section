const fs = require("fs");

try {
  const originalData = fs.readFileSync(process.cwd() + "/data.json", "utf-8");
  fs.writeFileSync("/tmp/data.json", originalData);
  const confirmSeed = fs.readFileSync("/tmp/data.json", "utf-8").length;
  console.log("Seed completed! - " + confirmSeed);
} catch (error) {
  console.error(error);
}
