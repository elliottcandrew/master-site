var gm = require('gm').subClass({imagemagick: true}),
    fs = require('fs-extra'),
    path = require('path'),

    // directories
    inDir = path.join(__dirname, "..", "..", '/assets/imgs/in/'),
    outDir = path.join(__dirname, "..", "..", '/assets/imgs/out/'),

    // img sizes to output (width)
    arrSizes = [500, 1000, 1500];

// fetch all files in inDir
fs.readdir(inDir, function (err, files) {
    if (err) {
        return console.log("unable to read directory: " + err)
    }

    // split filename and extension
    files.forEach(function (file) {
        fileName = file.split(".")[0]
        fileExt = file.split(".")[1]

        // perform resize and inject new size into filename
        arrSizes.forEach(function gmResize(size, index) {
            gm(inDir + file)
            .resize(size)
            .write(outDir +  fileName + "-" + size + "x." + fileExt, function(err){
                if (err) return console.inDir(arguments)
                console.log(this.outname + " created :: " + arguments[3])
            })
        })
    })
})