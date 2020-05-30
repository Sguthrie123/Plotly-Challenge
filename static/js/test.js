d3.json("../../samples.json").then((importeddata) => {

    var data = importeddata;
    console.log(importeddata);
    var person = data.samples[0];
    console.log(person);
    var ids = data.names;
    console.log(ids);

    function highest(person){
    return person.sort(function(a,b){
        return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });

    function dropdown(){
    var dropdown = document.getElementById("selDataset");
    ids.forEach(id_num => {
      var opt = document.createElement('option');
      opt.appendChild(document.createTextNode(id_num));
      opt.value = id_num;
      //console.log(id_num);
      dropdown.appendChild(opt); 
    });

    dropdown();
}
dropdown();

}});

var dataset;
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);
// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  dataset = dropdownMenu.property("value");
  console.log(dataset);

  d3.json("../../samples.json").then((importeddata) => {
    var data = importeddata;
    for(var i = 0; i < data.samples.length; i++){
        if(dataset == data.samples[i].id){
            var newguy = data.samples[i];
        }
    }
    console.log(newguy);
    })
}

