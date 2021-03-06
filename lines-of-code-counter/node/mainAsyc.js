const process = require('process')
const fs = require('fs')
const path = require('path')

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
});

function getPP(argArray) {
    for (let i=0; i < argArray.length; i++) {
        let ret = argArray[i].split("=")
        if (ret.length === 2) {
            if (ret[0] === "pp") {
                return ret[1]
            }
        }    
    }
    return false
}

let argArray = process.argv
let argLength = argArray.length
let projectPath = ""
if (argLength <= 2) {
    projectPath = "E:\\sourceCode\\isp-fe\\src"
    // projectPath = "/Users/zsusyt/works/lvshou/isp-fe/src"
} else {
    projectPath = getPP(argArray)
}

console.log("PP:",projectPath)

const config = {
    js: true,
    vue: true
}

let sum = 0;
let length = 0;
let unfinishedFiles = [];
let finishedFiles = [];

function readChild(parent, child) {
    let newPath = path.join(parent, child)
    let newStat = fs.statSync(newPath)
    if (newStat.isDirectory()) {
        let files = fs.readdirSync(newPath)
        files.forEach( file => {
            readChild(newPath, file)
        })
    } else {
        makeUnfinishedFilesArray(newPath)
    }
}

function makeUnfinishedFilesArray (filePath) {
    let parsedPath = path.parse(filePath)
    let ext = parsedPath.ext.slice(1)
    if (config[ext]) {
        unfinishedFiles.push(filePath)
    }
}

function countFiles () {
    unfinishedFiles.forEach(file=>{
        let data = fs.readFile(file, (err, data) => {
            sum += data.toString().match(/\n/g).length;
            finishedFiles.push(file)
            if (finishedFiles.length === length) {
                console.timeEnd("test")
                console.log(sum)
            }
        })
    })
}

if (projectPath) {
    console.time("test")
    let stat = fs.statSync(projectPath)

    if (stat.isDirectory()) {
        let files = fs.readdirSync(projectPath)
        files.forEach(file=>{
            readChild(projectPath, file)
        })
        length = unfinishedFiles.length;
        countFiles()
    } else {
        console.log("读取源代码路径出错，请检查路径是否合法")
    }
} else {
    console.log("请提供正确项目源代码路径")
}
