function plotData() {
  if (
    values["AC1"]["volt"] != 0 &&
    values["AC2"]["volt"] != 0 &&
    values["AC2"]["freq"] != 0 &&
    values["AC1"]["freq"] != 0 &&
    values["C2"]["value"] != 0 &&
    values["C1"]["value"] != 0 &&
    values["DC1"]["value"] != 0 &&
    values["R1"]["value"] != 0 &&
    values["I1"]["value"] != 0
  
  ) {
    var graph = document.getElementById("graph-new");
    graph.innerHTML = "";
    var mine = document.createElement("div");
    mine.id = "mineeee";
    mine.classList.add("graph-style");
    graph.append(mine);
    mine = document.createElement("div");
    mine.id = "squarewave";
    mine.classList.add("graph-style");
    graph.append(mine);
    mine = document.createElement("div");
    mine.id = "squarewaveResistor";
    mine.classList.add("graph-style");
    graph.append(mine);
    mine = document.createElement("div");
    mine.id = "squarewaveInductor";
    mine.classList.add("graph-style");
    graph.append(mine);

    
    a = generateData();

    var data = [
      {
        x: a[0][1],
        y: a[0][0],
        mode: "lines",
        name: 'Vsine',
      },
      {
        x: a[1][1],
        y: a[1][0],
        mode: "lines",
        name: "Vtri ",
      },
    ];
    
    var layout = {
      title: "<b>"+values['VM5']['name']+"/"+values['VM7']['name']+"</b>",
      xaxis: { range: [0, 0.041], title: "Time(s)",fixedrange: true},
      yaxis: { range: [-1 * (a[5][1] + 1), a[5][1] + 1], title: "Amplitude(V)",fixedrange: true },
      margin: { t: 35 },
    };

    Plotly.newPlot("mineeee", data, layout,{displayModeBar: false});
    Plotly.newPlot(
      "squarewave",
      [
        {
          x: a[2][1],
          y: a[2][0],
          mode: "lines",
          name: "Vload",
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      { title: "<b>"+values['VM3']['name']+"</b>",
        xaxis: { range: [0, 0.041], title: "Time(s)" ,fixedrange: true},
        yaxis: {
          range: [-1 * (a[5][0] + 1), a[5][0] + 1],
          title: "Voltage(V)",fixedrange: true
        },
        margin: { t: 30 },
      },{displayModeBar: false}
    );
    Plotly.newPlot(
      "squarewaveInductor",
      [
        {
          x: a[3][1],
          y: a[3][0],
          mode: "lines",
          name:"VM2  " ,
          marker: {
            color: "Green",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      { title:"<b>"+values['VM4']["name"]+"</b>",
        xaxis: { range: [0, 0.041], title: "Time(s)",fixedrange: true },
        yaxis: {
          range: [-1 * (a[5][0] + 1), a[5][0] + 1],
          title: "Voltage(V)",fixedrange: true
        },
        margin: { t: 30 },
      },{displayModeBar: false}
    );
    Plotly.newPlot(
      "squarewaveResistor",
      [
        {
          x: a[4][1],
          y: a[4][0],
          mode: "lines",
          name: "VM1  ",
          marker: {
            color: "Green",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      { title:"<b>"+values['VM1']['name']+"</b>",
        xaxis: { range: [0, 0.041], title: "Time(s)",fixedrange: true },
        yaxis: {
          range: [-1 * (a[5][0] + 1), a[5][0] + 1],
          title: "Voltage(V)",fixedrange: true
        },
        margin: { t: 30 },
      },{displayModeBar: false}
    );
  }
}

function generateData() {
  var a = values["AC1"]["freq"];
  var dcvalue = values["DC1"]["value"];
  var aplitute = values["AC1"]["volt"];
  var yval = [];
  var xval = [];
  var value, valuetri;
  var large;
  var yvaltri = [];
  var app = values["AC2"]["volt"];
  var ac2freq = values["AC2"]["freq"];
  var distance = 1 / ac2freq;
  var flag = true;
  var parity = true;
  if (app <= aplitute) {
    large = app;
  } else {
    large = aplitute;
  }
  var difference = (1 / 100) * large;
  var slop1 = 4 * (app / distance);
  var slop2 = -1 * slop1;
  var sqwave = dcvalue,
    dist = 0;
  var sq = [];
  var cap1 = values["C1"]["value"];
  var cap2 = values["C2"]["value"];
  var sum = parseInt(cap1) + parseInt(cap2);
  var vloadind = [];
  var vloadresis = [];
  var vresis = -1 * (dcvalue * (cap1 / sum));
  var vinduc = dcvalue * (cap2 / sum);
  var avgsum = 0;
  for (let x = 0; x <= 0.04; x += 0.000001) {
    value = aplitute * Math.sin(2 * Math.PI * a * x);
    yval.push(value);
    xval.push(x);
    if (flag) {
      valuetri = slop1 * x - slop1 * dist - app;
      if (valuetri > app) {
        dist = dist + distance;
        flag = false;
        valuetri = slop2 * x - slop2 * dist - app;
      }
    } else {
      valuetri = slop2 * x - slop2 * dist - app;
      if (valuetri < -1 * app) {
        flag = true;
        valuetri = slop1 * x - slop1 * dist - app;
      }
    }
    yvaltri.push(valuetri);
    if (parity) {
      if (Math.abs(value - valuetri) < difference) {
        if (sqwave == dcvalue) {
          sqwave = -1 * dcvalue;
          vresis = dcvalue * (cap2 / sum);
          vinduc = -1 * (dcvalue * (cap1 / sum));
        } else {
          sqwave = dcvalue;
          vresis = -1 * (dcvalue * (cap1 / sum));
          vinduc = dcvalue * (cap2 / sum);
        }
        parity = false;
      }
    }
    if (Math.abs(value - valuetri) > difference) {
      parity = true;
    }
    sq.push(sqwave);
    vloadind.push(vinduc);
    vloadresis.push(parseFloat(vresis));

    avgsum = avgsum + parseFloat(sqwave);
  }
  var avg=avgsum / sq.length;

  avg=avg*100;
  avg=parseInt(avg);
  
  values["Vavg"] = avg/100;
  
  var z;
  if (parseInt(app) >= parseInt(aplitute)) {
    z = app;
  } else {
    z = aplitute;
  }
  avgsum = avgsum / sq.length;
  return [
    [yval, xval],
    [yvaltri, xval],
    [sq, xval],
    [vloadind, xval],
    [vloadresis, xval],
    [parseFloat(dcvalue), parseFloat(z)],
  ];
}
function Reset() {
  window.location.reload();
}

function showtable() {
  var r = document.getElementById("readings");
  if ((r.style.display = "none")) {
    r.style.display = "block";
  } else {
    r.style.display.toggle();
  }
}

function Print() {
  var a=document.getElementById("body")
  a.style.width="100vw";
  a.style.height="100vh";
  window.print();
}
