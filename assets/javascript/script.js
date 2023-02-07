let myForm = document.getElementById("myForm");
let csvFile = document.getElementById("csvFile");
let barColors = ["red", "green", "blue", "orange", "brown", "yellow"];
let data;
let myChart;
let n = 0;
let xAxes;
let yAxes;
let DelimiterValue = ";";
// CSV unloading and parsing
function csvToArray(str, delimiter = DelimiterValue) {

  // use split to create an array from string by delimiter
  let headers = str.slice(0, str.indexOf("\n")).split(delimiter);
 
  // clean up split
  for (var i = 0; i < headers.length; ++i)
    headers[i] = headers[i].replace(/(\r\n|\n|\r)/gm, "");


  // use split to create an array from string by delimiter
  let rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
  // clean up split
  for (i = 0; i < rows.length; ++i)
    rows[i] = rows[i].replace(/(\r\n|\n|\r)/gm, "");


  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array

  let arr = rows.map(function (row) {
    let values = row.split(delimiter);
    let el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}
// object properties derived from headers:values
// the object passed as an element of the array
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();
// object properties derived from headers:values
// the object passed as an element of the array
  reader.onload = function (e) {
    chartTitle = document.getElementById("chart-title").value;
    xAxes = document.getElementById("x-axes").value;
    yAxes = document.getElementById("y-axes").value;
    const text = e.target.result;
    data = csvToArray(text);

    checkButton(data);



  };


  reader.readAsText(input);

});