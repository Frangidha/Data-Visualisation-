//button display
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {

            let graphtype = this.getAttribute("data-type");

            DisplayChart(graphtype);


        });

    }
});

//Display the right info on the graph.html 
//about each chart
function DisplayChart(graphtype) {

    if (graphtype === "Barchart") {

        displayBarchartGraph();

    } else if (graphtype === "Lineplot") {
        displaylineplotGraph();
    } else if (graphtype === "Piechart") {
        displayPiechartGraph();
    } else if (graphtype === "Scatterplot") {
        displayScatterplotGraph();
    }
}
//Lineplot text
function displaylineplotGraph() {
    document.getElementById("operand1").textContent = "Line graphs use data point 'markers,' which are connected by straight lines. These data points, connected by straight lines, aid in visualization. While line graphs are used across many different fields for different purposes, they are especially helpful when it is necessary to create a graphical depiction of changes in values over time";
    document.getElementById("operand2").textContent = "Line graphs are often used in finance to create visual representations of values over time, including changes in the prices of securities, company revenue sheets, and histories of major stock indexes. They are also useful for comparing different securities. In investing, specifically with respect to the field of technical analysis, line graphs are used by investors to visualize trends, which can greatly aid them in their analyses.";
    document.getElementById("operator").textContent = "LinePlot";
}
//Piechart text
function displayPiechartGraph() {
    document.getElementById("operand1").textContent = "The use of the pie charts is quite popular, as the circle provides a visual concept of the whole (100%). Pie charts are also one of the most commonly used charts because they are simple to use. Despite its popularity, pie charts should be used sparingly for two reasons.";
    document.getElementById("operand2").textContent = "First, they are best used for displaying statistical information when there are no more than six components only—otherwise, the resulting picture will be too complex to understand. Second, pie charts are not useful when the values of each component are too similar because it is difficult to see the differences between slice sizes.";
    document.getElementById("operator").textContent = "Piechart";

}
//Scatterplot text
function displayScatterplotGraph() {
    document.getElementById("operand1").textContent = "A scatter plot (aka scatter chart, scatter graph) uses dots to represent values for two different numeric variables. The position of each dot on the horizontal and vertical axis indicates values for an individual data point. Scatter plots are used to observe relationships between variables.";
    document.getElementById("operand2").textContent = "Identification of correlational relationships are common with scatter plots. In these cases, we want to know, if we were given a particular horizontal value, what a good prediction would be for the vertical value. You will often see the variable on the horizontal axis denoted an independent variable, and the variable on the vertical axis the dependent variable. Relationships between variables can be described in many ways: positive or negative, strong or weak, linear or nonlinear.";
    document.getElementById("operator").textContent = "Scatterplot";
}
//Barchart text
function displayBarchartGraph() {


    document.getElementById("operand1").textContent = "Barcharts display data in rectangular bars — the longer the bar, the larger the value. A bar chart plots the variable value horizontally, and the fixed dimension, such as time, vertically.";
    document.getElementById("operand2").textContent = "Bar charts use a horizontal display, which provides more room for long, complex or numerous labels on the Y-axis. The labels also go from left to right, making labels on bar charts easy to read. In bar charts, categories are usually displayed along the Y-axis, so they're commonly used for analyses where time is not a factor.";
    document.getElementById("operator").textContent = "Barchart";

}

//Hero text Animation inspired by Luciano Felix
//glow text on letters
var glowInTexts = document.querySelectorAll(".glowIn");
glowInTexts.forEach(function (glowInText) {
    var letters = glowInText.textContent.split("");
    glowInText.textContent = "";
    letters.forEach(function (letter, i) {
        var span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = "".concat(i * 0.05, "s");
        glowInText.append(span);
    });
});