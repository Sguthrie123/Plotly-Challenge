d3.json("data/samples.json").then((importeddata) => {
    
    var data = importeddata;
    console.log(importeddata);
    var person = data.samples[0];
    var demo = data.metadata[0];
    console.log(demo);
    console.log(person);
    var ids = data.names;
    console.log(ids);

    function highest(person){
    return person.sort(function(a,b){
        return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });
}

    var cats = d3.entries(demo);
    
    var ul = d3.select("#sample-metadata").append('ul');

	ul.selectAll('li')
    .data(cats)
	.enter()
	.append('li')
	.text(function (d){
        return `${d.key} : ${d.value}`
    })
    .exit()
    .remove()


    // Slice the first 10 objects for plotting
    x = person.sample_values.slice(0,10);
    y = person.otu_ids.slice(0,10);
    console.log(x);
    console.log(y);
    // Reverse the array due to Plotly's defaults
    x = x.reverse();
    y = y.reverse();
    //Create the traces
    labels = []
    y.forEach(y => labels.push(`OTU ${y}`))
    console.log(labels);
        var trace1 = {
            x: x,
            y: labels,
            text: person.otu_labels,
            type: "bar",
            orientation: "h"
        };

    var data = [trace1];

    var layout ={
        title: "Top 10 OTU's Found in Patient",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          }
    }
    Plotly.newPlot("bar",data, layout, {responsive: true});

    x1 = person.sample_values;
    y1 = person.otu_ids;

    var trace2 = {
        x:y1,
        y:x1,
        mode: "markers",
        text: person.otu_labels,
        marker: {
            size: x1,
            color: y1
        }
    }

    var layout2 ={
        title: "OTU's"
    }

    var data2 = [trace2];
    Plotly.newPlot('bubble',data2,layout2);

    var data3 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: demo.wfreq,
            title: { text: "Wash Frequency Per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 10] },
            },
            
        }
    ];
    var layout = {width: 600, height: 500};
    Plotly.newPlot("gauge",data3, layout);


    function dropdown(){
        var dropdown = document.getElementById("selDataset");
        ids.forEach(id_num => {
          var opt = document.createElement('option');
          opt.appendChild(document.createTextNode(id_num));
          opt.value = id_num;
          //console.log(id_num);
          dropdown.appendChild(opt); 
        });
    }
    dropdown();

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
    console.log(importeddata);
    for(var i = 0; i < importeddata.samples.length; i++){
        if(dataset === importeddata.samples[i].id){
            var newguy = importeddata.samples[i];
            var newstats = importeddata.metadata[i];

        }
      }
    console.log(newguy);
    console.log(newstats);
    x = newguy.sample_values.slice(0,10);
    y = newguy.otu_ids.slice(0,10);
    console.log(x);
    console.log(y);
    // Reverse the array due to Plotly's defaults
    x = x.reverse();
    y = y.reverse();
    //Create the traces
    labels = []
    y.forEach(y => labels.push(`OTU ${y}`))
    console.log(labels);
    Plotly.restyle("bar","x",[x]);
    Plotly.restyle("bar","y",[labels]);
    
    newwash = newstats.wfreq;


    var newstats = d3.entries(newstats);
    console.log(newstats);
    
    d3.select("ul").remove();
    
    var ul = d3.select("#sample-metadata").append('ul');

	ul.selectAll('li')
    .data(newstats)
	.enter()
	.append('li')
	.text(function (d){
        return `${d.key} : ${d.value}`
    })
    
    x1 = newguy.sample_values;
    y1 = newguy.otu_ids;
    otu_labs = newguy.otu_labels;

    Plotly.restyle("bubble","x",[y1]);
    Plotly.restyle("bubble","y",[x1]);
    Plotly.restyle("bubble","text",[otu_labs]);
    Plotly.restyle("bubble","marker.color",[y1]);

    console.log(newwash);
    Plotly.restyle("gauge",'value',[newwash]);
    }
});



