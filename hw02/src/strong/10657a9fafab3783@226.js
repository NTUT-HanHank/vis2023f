function _1(md){return(
md`# HW3 Strong baseline`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _cons(data){return(
data.map(item=>item.Constellation)
)}

function _5(yCounts,cons,data)
{
  yCounts.length = 0;
  var minCons = Math.min(...cons);
  var maxCons = Math.max(...cons);

  for (var y = minCons; y <= maxCons; y++) {
    let conN = "";
    if(y == 0) conN += "牡羊座";
    else if(y == 1) conN += "金牛座";
    else if(y == 2) conN += "雙子座";
    else if(y == 3) conN += "巨蟹座";
    else if(y == 4) conN += "獅子座";
    else if(y == 5) conN += "處女座";
    else if(y == 6) conN += "天秤座";
    else if(y == 7) conN += "天蠍座";
    else if(y == 8) conN += "射手座";
    else if(y == 9) conN += "摩羯座";
    else if(y == 10) conN += "水瓶座";
    else if(y == 11) conN += "雙魚座";

    yCounts.push({constellation:y, gender:"male", count:0, consName: conN});
    yCounts.push({constellation:y, gender:"female", count:0, consName: conN});
  }
  data.forEach(x=>{
    var i = (x.Constellation-minCons)*2 + (x.Gender=="男" ?0:1);
    yCounts[i].count++;
  })
  return yCounts
}


function _6(Plot,yCounts){return(
Plot.plot({
  
  grid: true,
  y: {label: "count"},
  x: {label: "constellation",
      domain: ["牡羊座", "金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
     },
  marks: [
    
    Plot.barY(yCounts, {x: "consName", y: "count" ,tip: true , fill:"gender"}),
    
    Plot.ruleY([0]),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("cons")).define("cons", ["data"], _cons);
  main.variable(observer()).define(["yCounts","cons","data"], _5);
  main.variable(observer()).define(["Plot","yCounts"], _6);
  return main;
}
