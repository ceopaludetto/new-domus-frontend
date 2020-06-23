const { format, parse } = require("date-fns");
const fs = require("fs-extra");
const path = require("path");

module.exports = async (p) => {
  const modules = await fs.readdir(p);

  await Promise.all(
    modules.map(async (m) => {
      const [timestamp, name] = m.split("-");

      const date = parse(timestamp, "dd:MM:yyyy_HH:mm:ss", new Date());
      const normalized = `${format(date, "yyyy:MM:dd_HH:mm:ss")}-${name}`;

      const oldPath = path.resolve(p, m);
      const newPath = path.resolve(p, normalized);
      await fs.rename(oldPath, newPath);
    })
  );
};
