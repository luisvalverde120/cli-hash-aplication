# cli-hash-aplication
this aplication get a file and encrypt file, and compare file origin and hash file if that is equals

## Install dependencies
```bash
npm install
```

## Usage
```bash
# show comands
node index.js --help 

# encrypt file
node index.js -f file.txt -th sha512

# compare files
node index.js -c -o origin-file.txt -h hash-file.txt -th sh512
```


