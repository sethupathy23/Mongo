// console.log("free memory in".os.freemem() / 1024 / 1024 / 1024.toFixed(2), "GB");
// console.log()
// const os = require("os");
// console.log("version", os.version());

const fs=require("fs");
const quote= " No beauty shines brighter than that of a good heart ";
fs.writeFile ("./awesome.html", quote,(err)=>{
    console.log("completed");
});
