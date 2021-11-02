import { globby } from "globby";
import fs from "fs";

(async () => {
  const paths = await globby("templates/**/*.json");
  console.log(paths);
  let data = {};
  paths.forEach((p) => {
    let category = p.split("/")[1];
    let list = data[category] ?? [];
    list.push(
        "https://raw.githubusercontent.com/certopus/templates/main/" + p
      );
    data[category] = list;
  });
  fs.writeFile("main.json", JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log("complete");
  });
})();
