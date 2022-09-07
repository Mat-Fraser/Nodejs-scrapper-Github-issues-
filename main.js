let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const pdfkit = require("pdfkit");
const getRepoPageHtml = require("./repoPage");
request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }
    else if(response.statusCode == 404){
        console.log("page not found");
    }
    else{
        //console.log(html);
        getTopicLinks(html);
    }
}

function getTopicLinks(html){
    let $=cheerio.load(html);
    let linkElementArr = $("no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i < linkElementArr.length;i++){
       let herf = $(linkElementArr[i]).attr("href");
       let topic = herf.split("/").pop();
       let fullLink = `https://github.com/${herf}`;
       getRepoPageHtml(fullLink, topic);
    }

}