var x = require("libxmljs");
var fs = require("fs");
const args = [];
process.argv.forEach(function(val, index, array) {
  args[index] = val;
});
if(args.length!=4){
  throw new Error('Insufficient Arguments');
}
fs.readFile(args[2], "utf-8", (err, xmlData) => {
  if (err) {
    throw new Error(err);
  }
  var xmlDoc0 = x.parseXmlString(xmlData);
  fs.readFile(args[3], "utf-8", (err, xsdData) => {
    if (err) {
      throw new Error(err);
    }
    var xsdDoc = x.parseXmlString(xsdData);
    var result0 = xmlDoc0.validate(xsdDoc);
    console.log(result0);
  });
});
