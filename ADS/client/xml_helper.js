/**
 *
 * @param {*} file The path to the XML file
 * @description Makes an XMLHttpRequest to get the XML data from the file path passed
 * @returns The XML data of the file
 */
const loadXMLDoc = file =>
  new Promise((resolve, reject) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(xmlhttp.responseXML);
      }
    };
    xmlhttp.open("GET", file, true);
    xmlhttp.send();
  });

/**
 *
 * @param {*} prefix The prefix to resolve
 * @description The function takes a prefix and resolves it to the url to be passed
 * @returns The appropriate url
 */
const nsResolver = prefix => {
  switch (prefix) {
    case "x":
      return "https://www.w3schools.com";
    case "mathml":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://example.com/domain";
  }
};

/**
 *
 * @param {*} file The path to the XML file
 * @param {*} xpath The Xpath query to be run
 * @description Runs the xpath query and aggregates the result data in an array
 * @returns An array containing the data queried
 */
const find = (file, xpath) =>
  new Promise((resolve, reject) => {
    loadXMLDoc(file).then(xml => {
      const data = xml.evaluate(
        xpath,
        xml,
        nsResolver,
        XPathResult.ANY_TYPE,
        null
      );
      let iterator = data.iterateNext();
      const arr = [];
      while (iterator) {
        arr.push(iterator);
        iterator = data.iterateNext();
      }
      resolve(arr);
    });
  });
