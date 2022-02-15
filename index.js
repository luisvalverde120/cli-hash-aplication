const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4();

async function hashCompileFile(typeHash, text) {
  if (!typeHash) {
    console.log("Error: missed a typeHash... [-th 'type hash']");
    return;
  }
  let hash = crypto.createHash(typeHash).update(text).digest("hex");
  await fs.appendFile(uuid + ".txt", hash);
}

async function getText(pathFile, typeHash) {
  try {
    let text = await fs.readFile(
      path.join(__dirname + "/" + pathFile),
      "utf-8"
    );
    hashCompileFile(typeHash, text);
  } catch (err) {
    console.log("Error in find file...");
  }
}

async function compareFiles(algoritm, fileOrigin, hashFile) {
  try {
    let textFileOrigin = await fs.readFile(
      path.join(__dirname + "/" + fileOrigin),
      "utf-8"
    );
    let textHashFile = await fs.readFile(
      path.join(__dirname + "/" + hashFile),
      "utf-8"
    );

    let hash = crypto.createHash(algoritm).update(textFileOrigin).digest("hex");
    if (hash !== textHashFile) {
      console.log("the file hash is not equals file origin");
      return;
    }

    console.log("that files is equals!");
  } catch (err) {
    console.log(err);
  }
}

function handdleArgv(argv) {
  if (argv.includes("-f") && argv.includes("-th")) {
    let val1 = argv.indexOf("-f") + 1;
    let val2 = argv.indexOf("-th") + 1;

    if (argv[val1] === null || argv[val1] === undefined) {
      console.log("-f missed 1 argv ['path file']");
      return;
    }

    if (argv[val2] === null || argv[val2] === undefined) {
      console.log("-th missed 1 argv ['type hash']");
    }

    getText(argv[val1], argv[val2]);
  }

  if (
    argv.includes("-c") &&
    argv.includes("-o") &&
    argv.includes("-h") &&
    argv.includes("-th")
  ) {
    let val1 = argv.indexOf("-th") + 1;
    let val2 = argv.indexOf("-o") + 1;
    let val3 = argv.indexOf("-h") + 1;

    if (argv[val1] === null || argv[val1] === undefined) {
      console.log("-th missed 1 argv ['type hash']'");
      return;
    }

    if (argv[val2] === null || argv[val2] === undefined) {
      console.log("-o missed 1 argv ['origin file']");
      return;
    }

    if (argv[val3] === null || argv[val3] === undefined) {
      console.log("-h missed 1 argv ['hash file']");
      return;
    }
    compareFiles(argv[val1], argv[val2], argv[val3]);
  }
}

function init() {
  if (process.argv.length <= 2 || process.argv.includes("--help")) {
    console.log("This aplication need argv...");
    console.log("-f  path of file encrypt");
    console.log("-c compare 2 file if equals [name, hash]");
    console.log("-o file origin");
    console.log("-h file hash");
    console.log("-th set de type hash");
    return;
  }

  handdleArgv(process.argv);
}

init();
