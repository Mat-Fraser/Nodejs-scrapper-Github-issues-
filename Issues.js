const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");
const { file } = require("pdfkit");

function getIssuesHTML(url, topic, repoName) { 
request(url, cb);
function
 cb(err, response, html){
     if(err){
         console.log(err);
     }
     else if(response.statusCode == 404){
        console.log("page not found");
    }
     else{
        getIssuesHTML(html);
     }
   }
   function getIssues(html){
     let $ = cheerio.load(html);
     let issuesElen = $("Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title") 
    console.log(issuesElen.length);
     let arr = [];
     for(let i=0; i<issuesElen.length; i++){
         let link = $(issuesElen[i]).attr("herf");
         arr.push(link);
     }
     //console.log(topic, "   ", arr);
     let folderpath = path.join(__dirname, topic);
     dirCreator(folderpath);
     let filePath = path.join(folderpath, repoName + ".json");
     let text =JSON.stringify(arr);
     let pdfDoc = new pdfkit();
     pdfDoc.pipe(fs.createWriteStream(filePath));
     pdfDoc.text(text);
     pdfDoc.end();
     //fs.writeFileSync(filePath, );
   }
}

module.exports = getIssuesHTML;
function dirCreator(folderpath){
    if(fs.existsSync(folderpath) == false){
        fs.mkdirSync(folderpath);
    }
  }