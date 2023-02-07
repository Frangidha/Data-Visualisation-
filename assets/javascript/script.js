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

// Selector which chart that needs to be created
function checkButton() {
  if (document.getElementById('barchart').checked) {
    BarChart();
  } else if (document.getElementById('scatterplot').checked) {
    ScatterPlot();
  } else if (document.getElementById('pie-chart').checked) {
    PieChart();
  } else if (document.getElementById('lineplot').checked) {
    LinePlot();
  } else {
    alert("You have not selected any graph type");
  }
}

//Barchart Generation
function BarChart() {

  let getArrayByValue = function (data, key) {
    let result = [];
    for (let i in data) {
      result.push(data[i][key]);
    }
    return result;
  };

  let x = getArrayByValue(data, 'x');
  let y = getArrayByValue(data, 'y').map(i => Number(i));

  CheckNan(y);

  myChart = new Chart("myChart", {
    type: "bar",
    data: {
      labels: x,
      datasets: [{
        backgroundColor: barColors,
        data: y
      }]
    },
    options: {

      scales: {
        x: {
          title: {
            color: 'red',
            display: true,
            text: xAxes
          }
        },
        y: {
          title: {
            color: 'red',
            display: true,
            text: yAxes
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: chartTitle
        },
        legend: {
          display: false
        }
      }
    }
  });

}
//Lineplot Generation
function LinePlot() {
//split data in x and y array
  let getArrayByValue = function (data, key) {
    let result = [];
    for (let i in data) {
      result.push(data[i][key]);
    }
    return result;
  };

  let x = getArrayByValue(data, 'x');
  let y = getArrayByValue(data, 'y').map(i => Number(i));
//check data for NaN values
  CheckNan(y);

  myChart = new Chart("myChart", {
    type: "line",
    data: {
      labels: x,
      datasets: [{
        data: y,
        borderColor: "red",
        fill: false
      }]
    },
    options: {

      scales: {
        x: {
          title: {
            color: 'red',
            display: true,
            text: xAxes
          }
        },
        y: {
          title: {
            color: 'red',
            display: true,
            text: yAxes
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: chartTitle
        },
        legend: {
          display: false
        }
      }
    }
  });

}
//PieChart Generation
function PieChart() {
//split data in x and y array
  let getArrayByValue = function (data, key) {
    let result = [];
    for (let i in data) {
      result.push(data[i][key]);
    }
    return result;
  };

  let x = getArrayByValue(data, 'x');
  let y = getArrayByValue(data, 'y').map(i => Number(i));

//Check data for NaN values
  CheckNan(y);

  myChart = new Chart("myChart", {

    type: "pie",
    data: {
      labels: x,
      datasets: [{
        backgroundColor: barColors,
        data: y
      }]
    },
    options: {

      scales: {
        x: {
          title: {
            color: 'red',
            display: true,
            text: xAxes
          }
        },
        y: {
          title: {
            color: 'red',
            display: true,
            text: yAxes
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: chartTitle
        },
        legend: {
          display: false
        }
      }
    }
  });

}
// Scatterplot creator
function ScatterPlot() {

  // Checking of the data 
  checkData(data);
  myChart = new Chart("myChart", {
    type: "scatter",
    data: {
      datasets: [{
        pointRadius: 4,
        pointBackgroundColor: "rgb(0,0,255)",
        data: data
      }]
    },
    options: {

      scales: {
        x: {
          title: {
            color: 'red',
            display: true,
            text: xAxes
          }
        },
        y: {
          title: {
            color: 'red',
            display: true,
            text: yAxes
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: chartTitle
        },
        legend: {
          display: false
        }
      }
    }
  });

}
// changes the delimiter of the CSV file
function DelimiterSwitch(delimiter) {

  if (delimiter === "comma") {

    DelimiterValue = ',';


  } else if (delimiter === "dot-comma") {
    DelimiterValue = ';';
  }

}

// how to check each data point for being NaN
function checkData(data) {
  n = 0;

  for (i = 0; i < data.length; i++) {
    if (isNaN(data[i]['y'])) {
      n++;
      if (data.length === n) {
        alert("all numeric values are not available! Please check your CSV file or delimiter selector.");
      }
    }
  }
  return n;
}
// Checking of the data for NaN values
function CheckNan(y) {
  for (i = 0; i < y.length; i++) {
    if (isNaN(y[i])) {
      n++;
      if (y.length === n) {
        alert("all numeric values are not available! Please check your CSV file or delimiter selector.");
      }
    }

  }
}

// Discard the Chart and sets the NaN count to Zero
function destroy() {
  myChart.destroy();
  n = 0;
}
// Download button converts chart into a PNG
function download() {

  let imageLink = document.createElement('a');
  let canvas = document.getElementById('myChart');
  imageLink.download = 'graph.png';
  imageLink.href = canvas.toDataURL('image/png', 1);


  imageLink.click();
}