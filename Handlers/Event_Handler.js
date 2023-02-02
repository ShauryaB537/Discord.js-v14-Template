const { readdirSync } = require("fs");

module.exports = (client) => {
  readdirSync("./Events/").forEach((dir) => {
    const events = readdirSync(`./Events/${dir}/`).filter((f) =>
      f.endsWith(".js")
    );
    for (let file of events) {
      require(`../Events/${dir}/${file}`);
      client.events++;
    }
  });
};
