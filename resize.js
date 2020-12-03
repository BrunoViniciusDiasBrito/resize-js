(() => {
  const path = require("path"),
    fs = require("fs"),
    sharp = require("sharp"),
    filepath = process.argv[2],
    dirname = path.dirname(filepath),
    [filename, ext] = path.basename(filepath).split("."),
    destination = `${dirname}/redimensionado`,
    sizes = [128, 48, 32, 16];

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  sizes.forEach((size) => {
    sharp(filepath)
      .clone()
      .resize({
        width: size,
      })
      .toFile(`${destination}/${filename}-${size}.${ext}`)
      .then((info) => console.log(info))
      .catch((error) => console.log(error));
  });
})();
