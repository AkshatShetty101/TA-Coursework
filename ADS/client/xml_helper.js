// var validator = require('xsd-schema-validator');

function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // addPerson(this);
      // console.log(xmlhttp.responseXML);
      addOrder(xmlhttp.responseXML, "abc@gmail.com", "2555");
      parse(xmlhttp.responseXML);
    }
  };
  xmlhttp.open("GET", "person_store.xml", true);
  xmlhttp.send();
}

function validateXML(xml, xsd_path) {
  var xmlText = new XMLSerializer().serializeToString(xml);
  validator.validateXML(xmlText, xsd_path, function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result); // true
  });
}

function parse(xml) {
  var x, i, txt;
  // validateXML(xml, 'person.xsd');
  txt = "";
  x = xml.getElementsByTagName("person");
  for (i = 0; i < x.length; i++) {
    var temp;
    temp = x[i].getElementsByTagName("orders")[0];
    // console.log(temp);
    txt += temp.textContent + "<br>";
  }
  document.getElementById("demo").innerHTML = txt;
}

function addAttribute(xml, element, key, value) {
  var newElement = xml.createElement(key);
  newElement.textContent = value;
  element.appendChild(newElement);
  return element;
}

function createPersonElement(xml) {
  var newElement = xml.createElement("person");
  newElement = addAttribute(xml, newElement, "email", "dasda@gmial.com");
  newElement = addAttribute(xml, newElement, "name", "CDF");
  newElement = addAttribute(xml, newElement, "password", "a");
  newElement = addAttribute(xml, newElement, "orders", null);
  return newElement;
}

function addPerson(xml) {
  var x, newElement;
  x = xml.getElementsByTagName("personstore")[0];
  newElement = createPersonElement(xml);
  x.appendChild(newElement);
  console.log(x);
}

function nsResolver(prefix) {
	console.log(prefix);
	switch (prefix) {
			case 'x':
					return 'https://www.w3schools.com';
			case 'mathml':
					return 'http://www.w3.org/1998/Math/MathML';
			default:
					return 'http://example.com/domain';
	}
}

function addOrder(xml, email, order) {
  var x, newElement;
  xpath = `//x:person[x:email='${email}']/x:orders`;
  console.log(xpath);
  x = xml.evaluate(
		xpath,
    xml,
    nsResolver,
    XPathResult.ANY_TYPE,
    null
  );
  console.log(x);
  x = x.iterateNext();
  // while (result) {
  //   console.log(result);
  //   result = x.iterateNext();
	// } 
	newOrder = xml.createElement('order');
  newOrder.textContent = order;
	x.appendChild(newOrder);
}
