// const fs = require("fs");

// const quote ="No beauty shines brighter than that of a good heart";
// fs.writeFile("./quote.html", quote, (err) => {
//     console.log("completed");
// });// ithu o/p varala


const fs=require("fs");
const quote2="Live more,worry less";
for (let i = 1; i < 10; i++) {
    fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
        console.log("completed writing")
    })
    
}//o/p varala

fs.readFile("./readfile.js","utf-8" , (err,data) => {
   
    if(err){
        console.log(X);
    }
    else{
        console.log(data);
    }
}); // o/p varala
