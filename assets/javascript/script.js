let myForm = document.getElementById("myForm");
let csvFile = document.getElementById("csvFile");
let data;

function csvToArray(str, delimiter = ";") {


  let headers = str.slice(0, str.indexOf("\n")).split(delimiter);


  let rows = str.slice(str.indexOf("\n") + 1).split("\n");


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

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    data = csvToArray(text);
    console.log(data)
    checkButton(data)

    

  };


  reader.readAsText(input);
});

function BarChart() {

  let getArrayByValue = function (data, key) {
    let result = [];
    for (var i = 0; i < this.length; i++) {
      result.push(data[i][key])
    }
    return result;
  }

  let x = getArrayByValue(data, 'x')
  let y = getArrayByValue(data, 'y').map(i => Number(i))

  console.log(x)
  console.log(y)

  let barColors = ["red", "green", "blue", "orange", "brown"];
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: x,
      datasets: [{
        backgroundColor: barColors,
        data: y
      }]
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "World Wine Production 2018"
      }
    }
  });
}

function LinePlot() {

  let getArrayByValue = function (data, key) {
    let result = [];
    for (i in data) {
      result.push(data[i][key])
    }
    return result;
  }

  let x = getArrayByValue(data, 'x').map(i => Number(i))
  let y = getArrayByValue(data, 'y').map(i => Number(i))

  console.log(x)
  console.log(y)

  new Chart("myChart", {
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
      legend: {display: false}
    }
  });
}

function PieChart (){
  
  let getArrayByValue = function (data, key) {
    let result = [];
    for (i in data) {
      result.push(data[i][key])
    }
    return result;
  }

  let x = getArrayByValue(data, 'x')
  let y = getArrayByValue(data, 'y').map(i => Number(i))
  let barColors = ["red", "green", "blue", "orange", "brown"];
  console.log(x)
  console.log(y)
  new Chart("myChart", {
    
    type: "pie",
    data: {
      labels: x,
      datasets: [{
        backgroundColor: barColors,
        data: y
      }]
    },
    options: {
      title: {
        display: true,
        text: "World Wide Wine Production"
      }
    }
  });

}
function checkButton() {
  if (document.getElementById('barchart').checked) {
    BarChart()
  } else if (document.getElementById('scatterplot').checked) {
    ScatterPlot()
  } else if (document.getElementById('pie-chart').checked) {
    PieChart ()
  } 
  else if (document.getElementById('lineplot').checked) {
    LinePlot()
  }
  else {
    alert("You have not selected any graph type") ;
  }


}