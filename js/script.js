var correct_connections = [
  ["DC1T", "C1T"],
  ["C1T", "M1RT"],
  ["M1RT", "M2RT"],
  ["M1RB", "M3RT"],
  ["C1B", "GND1T"],
  ["GND1T", "C2T"],
  ["M2RB", "M4RT"],
  ["M1RB", "R1T"],
  ["VM1T", "R1T"],
  ["VM1B", "GND2"],
  ["R1B", "I1T"],
  ["R1T", "VM3T"],
  ["VM3B", "I1B"],
  ["M4RT", "I1B"],
  ["I1B", "VM4T"],
  ["M4RB", "M3RB"],
  ["M3RB", "C2B"],
  ["C2B", "DC1B"],
  ["M4L", "S1T"],
  ["M1L", "S1T"],
  ["M2L", "S2T"],
  ["M3L", "S2T"],
  ["VM4B", "GND3"],
  ["S1B", "G2T"],
  ["S2B", "opamp1T"],
  ["G2B", "opamp1T"],
  ["opamp1LB", "AC1R"],
  ["opamp1RB", "AC2L"],
  ["AC1R", "VM5R"],
  ["AC2L", "VM7L"],
  ["VM7R", "GND6"],
  ["VM5L", "GND4"],
  ["AC1L", "GND7"],
  ["AC2R", "GND7"],
];
var resistorids = ["R1-back"];
var capacitorids = ["C1-back", "C2-back"];
var inductorids = ["I1-back"];
var acsourceids = ["AC1-back"];
var triids = ["AC2-back"];
var groundids = [
  "GND1-back",
  "GND2-back",
  "GND3-back",
  "GND4-back",

  "GND6-back",
  "GND7-back",
].reverse();
var voltagemids = ["VM7-back", "VM5-back", "VM4-back", "VM3-back", "VM1-back"];
var mosfetids = ["M4-back", "M3-back", "M2-back", "M1-back"];
var opampids = ["opamp1-back"];
var switchids = ["S2-back", "S1-back"];
var notgateids = ["G2-back"];
var dcsourceids = ["DC1-back"];
var values = {
  R1: {
    name: "Resistance",
    value: 0,
    type: "Resistance: ",
    unit: " ohm",
  },
  C1: {
    name: "C1",
    value: 0,
    type: "Capacitance: ",
    unit: " uF",
  },
  C2: {
    name: "C2",
    value: 0,
    type: "Capacitance: ",
    unit: " uF",
  },
  I1: {
    name: "Inductance",
    value: 0,
    type: "Inductance: ",
    unit: " mH",
  },
  DC1: { name: "DC", value: 0, type: "Voltage: ", unit: " V" },
  AC1: {
    name: "AC1",
    volt: 0,
    freq: 0,
    type1: "Voltage: ",
    type2: "Frequency: ",
    unitfreq: " Hz",
    unit: " V",
  },
  AC2: {
    name: "TRI",
    volt: 0,
    freq: 0,
    type1: "Voltage: ",
    type: "Frequency: ",
    unitfreq: " Hz",
    unit: " V",
  },
  M1: {
    name: "M1",
  },
  M2: {
    name: "M2",
  },
  VM1: {
    name: "VM1  ",
  },
  VM2: {
    name: "VM2",
  },
  GND1: {
    name: "GND1",
  },
  GND2: {
    name: "GND2",
  },
  VM3: { name: "VLOAD" },
  M3: { name: "M3" },
  M4: { name: "M4" },
  VM4: { name: "VM2  " },
  S1: { name: "S1" },
  GND3: { name: "GND3" },
  GND4: { name: "GND4" },
  VM5: { name: "VSINE" },
  S2: { name: "S2" },
  G2: { name: "G2" },
  opamp1: { name: "Comparator" },
  VM6: { name: "VM6" },
  GND5: { name: "GND5" },
  VM7: { name: "VTRI" },
  GND6: { name: "GND5" },
  GND7: { name: "GND6" },
  Vavg: 0,
};
var endpoints = {};
var user_connection = [];
var wrong_connection = [];
var correct_connections_flag = false;

var instance = jsPlumb.getInstance({ConnectionsDetachable:false});
instance.bind("ready", () => {
  createEnd();
  $("#symbolpalette .ele-img").draggable({
    helper: "clone",
    containment: "body",
    appendTo: "#diagram",
  });
  $("#diagram").droppable({
    drop: (event, ui) => {
      if ($(ui.helper).hasClass("resistor-sym")) {
        var a = resistorids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("capacitor-sym")) {
        var a = capacitorids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("inductor-sym")) {
        var a = inductorids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("ac-sym")) {
        var a = acsourceids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("nom-sym")) {
        var a = mosfetids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("dc-sym")) {
        var a = dcsourceids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("swi-sym")) {
        var a = switchids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("not-sym")) {
        var a = notgateids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("volt-sym")) {
        var a = voltagemids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("gnd-sym")) {
        var a = groundids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      } else if ($(ui.helper).hasClass("op-sym")) {
        var a = opampids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      }
      if ($(ui.helper).hasClass("tri-sym")) {
        var a = triids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
        } else {
        }
      }
    },
  });
  //if (component.hasClass("jtk-connector"))
  function createEnd() {
    var stokwid = "3.5";
    var gnd = {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    };

    var M1RT = instance.addEndpoint("M1RT", {
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["M1RT"] = M1RT;
    var M1RB = instance.addEndpoint("M1RB", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["M1RB"] = M1RB;
    var M1L = instance.addEndpoint("M1L", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["M1L"] = M1L;

    var M2RT = instance.addEndpoint("M2RT", {
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["M2RT"] = M2RT;
    var M2RB = instance.addEndpoint("M2RB", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["M2RB"] = M2RB;
    var M2L = instance.addEndpoint("M2L", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["M2L"] = M2L;

    var M3RT = instance.addEndpoint("M3RT", {
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var M3RB = instance.addEndpoint("M3RB", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });

    var M3L = instance.addEndpoint("M3L", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["M3L"] = M3L;
    endpoints["M3RT"] = M3RT;
    endpoints["M3RB"] = M3RB;
    var M4RT = instance.addEndpoint("M4RT", {
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var M4RB = instance.addEndpoint("M4RB", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var M4L = instance.addEndpoint("M4L", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["M4L"] = M4L;
    endpoints["M4RT"] = M4RT;
    endpoints["M4RB"] = M4RB;

    var VM1T = instance.addEndpoint("VM1T", {
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var VM1B = instance.addEndpoint("VM1B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["VM1T"] = VM1T;
    endpoints["VM1B"] = VM1B;

    var VM3T = instance.addEndpoint("VM3T", {
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var VM3B = instance.addEndpoint("VM3B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["VM3T"] = VM3T;
    endpoints["VM3B"] = VM3B;
    var VM4T = instance.addEndpoint("VM4T", {
      anchor: ["Right"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var VM4B = instance.addEndpoint("VM4B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["VM4T"] = VM4T;
    endpoints["VM4B"] = VM4B;
    var VM5L = instance.addEndpoint("VM5L", {
      anchor: ["Left"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var VM5R = instance.addEndpoint("VM5R", {
      anchor: ["Right"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["VM5L"] = VM5L;
    endpoints["VM5R"] = VM5R;

    var VM7L = instance.addEndpoint("VM7L", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var VM7R = instance.addEndpoint("VM7R", {
      anchor: ["Right"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["VM7L"] = VM7L;
    endpoints["VM7R"] = VM7R;

    var GND1 = instance.addEndpoint("GND1T", {
      endpoint: "Dot",
      anchor: ["Left"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var GND2 = instance.addEndpoint("GND2", gnd);
    var GND3 = instance.addEndpoint("GND3", gnd);
    var GND4 = instance.addEndpoint("GND4", gnd);

    var GND6 = instance.addEndpoint("GND6", gnd);
    var GND7 = instance.addEndpoint("GND7", {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
      radius: 2,
    });
    endpoints["GND1T"] = GND1;
    endpoints["GND2"] = GND2;
    endpoints["GND3"] = GND3;
    endpoints["GND4"] = GND4;

    endpoints["GND6"] = GND6;
    endpoints["GND7"] = GND7;

    var AC1L = instance.addEndpoint("AC1L", {
      anchor: ["Left"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      endpoint: "Dot",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var AC1R = instance.addEndpoint("AC1R", {
      anchor: ["Right"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["AC1L"] = AC1L;
    endpoints["AC1R"] = AC1R;

    var AC2L = instance.addEndpoint("AC2L", {
      anchor: ["Left"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
      hoverPaintStyle: { fillStyle: "black" },
    });
    var AC2R = instance.addEndpoint("AC2R", {
      anchor: ["Right"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["AC2L"] = AC2L;
    endpoints["AC2R"] = AC2R;

    var SW1T = instance.addEndpoint("S1T", {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
      radius: 2,
    });
    var SW1B = instance.addEndpoint("S1B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["S1T"] = SW1T;
    endpoints["S1B"] = SW1B;

    var SW2T = instance.addEndpoint("S2T", {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
      radius: 2,
    });
    var SW2B = instance.addEndpoint("S2B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["S2T"] = SW2T;
    endpoints["S2B"] = SW2B;

    var G2T = instance.addEndpoint("G2T", {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
      radius: 2,
    });
    var G2B = instance.addEndpoint("G2B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["G2T"] = G2T;
    endpoints["G2B"] = G2B;

    var DC1T = instance.addEndpoint("DC1T", {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
      radius: 2,
    });
    var DC1B = instance.addEndpoint("DC1B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["DC1T"] = DC1T;
    endpoints["DC1B"] = DC1B;

    var R1T = instance.addEndpoint("R1T", {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 3,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
      radius: 2,
    });
    
    var R1B = instance.addEndpoint("R1B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["R1T"] = R1T;
    endpoints["R1B"] = R1B;
    

    var C1T = instance.addEndpoint("C1T", {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
      radius: 2,
    });
    var C1B = instance.addEndpoint("C1B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["C1T"] = C1T;
    endpoints["C1B"] = C1B;

    var C2T = instance.addEndpoint("C2T", {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
      radius: 2,
    });
    var C2B = instance.addEndpoint("C2B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 3,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["C2T"] = C2T;
    endpoints["C2B"] = C2B;

    var I1T = instance.addEndpoint("I1T", {
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    var I1B = instance.addEndpoint("I1B", {
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 13,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["I1T"] = I1T;
    endpoints["I1B"] = I1B;

    var OPLT = instance.addEndpoint("opamp1T", {
      endpoint: "Dot",
      anchor: ["Top"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 2,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });

    var OPLB = instance.addEndpoint("opamp1LB", {
      endpoint: "Dot",
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });

    var OPR = instance.addEndpoint("opamp1RB", {
      endpoint: "Dot",
      anchor: ["Bottom"],
      isSource: true,
      isTarget: true,
      connector: "Flowchart",
      maxConnections: 1,
      connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
      paintStyle: { fillStyle: "red" },
    });
    endpoints["opamp1T"] = OPLT;
    endpoints["opamp1LB"] = OPLB;
    endpoints["opamp1RB"] = OPR;
  }

  window.addEventListener("resize", () => {
    instance.deleteEveryEndpoint();

    createEnd();
    var per_connect = user_connection;
    for (var i of per_connect) {
      instance.connect({
        source: endpoints[i[0]],
        target: endpoints[i[1]],
      });
      user_connection.pop();
    }
    wrong_connection = [];
    if (correct_connections_flag) {
      plotData();
    }
  });

  instance.bind("connection", (conn, event) => {
    var flag = true;
    let eg1 = [String(conn.sourceId), String(conn.targetId)];

    for (var ele of correct_connections) {
      if (
        (ele[0] == eg1[0] && ele[1] == eg1[1]) ||
        (ele[0] == eg1[1] && ele[1] == eg1[0])
      ) {
        flag = false;

        user_connection.push(eg1);

        break;
      }
    }
    if (flag) {
      conn.connection._jsPlumb.paintStyleInUse.stroke = "red";
      wrong_connection.push(eg1);
      alert("Wrong Connection");
    }
  });

  instance.bind("click", function (conn) {
    let eg1 = [String(conn.sourceId), String(conn.targetId)];
    if (!correct_connections_flag) {
      
    
    for (var ele of correct_connections) {
      if (
        (ele[0] == eg1[0] && ele[1] == eg1[1]) ||
        (ele[0] == eg1[1] && ele[1] == eg1[0])
      ) {
        user_connection.pop(eg1);
        break;
      }
    }
    for (var ele of wrong_connection) {
      if (
        (ele[0] == eg1[0] && ele[1] == eg1[1]) ||
        (ele[0] == eg1[1] && ele[1] == eg1[0])
      ) {
        wrong_connection.pop(eg1);
        break;
      }
    }
    instance.deleteConnection(conn);
  }
    return false;
  });

  // context menu for resistor
  $("body").on("contextmenu", "#diagram .resistor", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

   if (correct_connections_flag) {
    $(
      '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
        window.selectedControl +
        '"></button></div></div></div><form action="#" onsubmit="dcSubmited(' +
        "'" +
        window.selectedControl +
        "'" +
        ')"><div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text" class="set-input-name" id="name-' +
        window.selectedControl +
        '" style="border-radius: 20px; padding:2px;"  placeholder="  ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-' +
        window.selectedControl +
        '">Resistance:</label><input type="number" class="set-input" placeholder=" ' +
        values[window.selectedControl]["value"] +
        ' ohm" min="1" max="100"  id="value-' +
        window.selectedControl +
        '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
   }else{
    $(
      '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
        window.selectedControl +
        '"></button></div></div></div><form action="#" onsubmit="dcSubmited(' +
        "'" +
        window.selectedControl +
        "'" +
        ')"><div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text" class="set-input-name" id="name-' +
        window.selectedControl +
        '" style="border-radius: 20px; padding:2px;"  placeholder="  ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-' +
        window.selectedControl +
        '">Resistance:</label><input type="number" class="set-input" placeholder="  ' +
        values[window.selectedControl]["value"] +
        ' ohm" min="1" max="100"  disabled id="value-' +
        window.selectedControl +
        '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
   }

    //context menu for capacitor

    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  //context menu for capacitor
  $("body").on("contextmenu", "#diagram .capacitor", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");
    
    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="dcSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-' +
          window.selectedControl +
          '">Capacitance:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["value"] +
          ' uF" min="1" max="50"  id="value-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
      
    }else{
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="dcSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;" class="set-input" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-' +
          window.selectedControl +
          '">Capacitance:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["value"] +
          ' uF" min="1" max="50" disabled  id="value-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  // contextmenu for inductor
  $("body").on("contextmenu", "#diagram .inductor", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");
    
    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="dcSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-' +
          window.selectedControl +
          '">Inductance:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["value"] +
          ' mH" min="1" max="20"  id="value-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
      
    }else{
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="dcSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-' +
          window.selectedControl +
          '">Inductance:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["value"] +
          ' mH" min="1" max="20" disabled  id="value-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  //AC Source
  $("body").on("contextmenu", "#diagram .acsource", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");
    
    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="acSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label style="color:white;" for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-volt-' +
          window.selectedControl +
          '">Amplitude:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["volt"] +
          ' Volt" min="1" max="100"  id="value-volt-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-freq-' +
          window.selectedControl +
          '">Frequency:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["freq"] +
          ' Hz" min="100" max="1000"  id="value-freq-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }else{
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="acSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-volt-' +
          window.selectedControl +
          '">Amplitude:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["volt"] +
          ' Volt" min="1" max="100" disabled id="value-volt-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-freq-' +
          window.selectedControl +
          '">Frequency:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["freq"] +
          ' Hz" min="100" max="1000" disabled id="value-freq-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  $("body").on("contextmenu", "#diagram .acsource1", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");
    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="acSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-volt-' +
          window.selectedControl +
          '">Amplitude:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["volt"] +
          ' Volt" min="1" max="50"  id="value-volt-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-freq-' +
          window.selectedControl +
          '">Frequency:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["freq"] +
          ' Hz" min="1" max="60"  id="value-freq-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }else{
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="acSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;     height: 24px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-volt-' +
          window.selectedControl +
          '">Amplitude:</label><input type="number" class="set-input"  placeholder="  ' +
          values[window.selectedControl]["volt"] +
          ' Volt" min="1" max="50" disabled id="value-volt-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-freq-' +
          window.selectedControl +
          '">Frequency:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["freq"] +
          ' Hz" min="1" max="60" disabled  id="value-freq-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit" class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    
    
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  //dc source
  $("body").on("contextmenu", "#diagram .dcsource", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");
    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="javascript:void(0);" onsubmit="dcSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;"  placeholder="   ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-' +
          window.selectedControl +
          '">Voltage:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["value"] +
          ' Volt" min="1" max="300"  id="value-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit" class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }else{
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="javascript:void(0);" onsubmit="dcSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;"  placeholder="   ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; margin: 2px"><label for="value-' +
          window.selectedControl +
          '">Voltage:</label><input type="number" placeholder="  ' +
          values[window.selectedControl]["value"] +
          ' Volt" min="1" max="300" disabled class="set-input" id="value-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
   
    
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  $("body").on("contextmenu", "#diagram .other", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;margin-bottom:3px ;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text"  id="name-' +
        window.selectedControl +
        '" class="set-input-name" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Value</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
});

function changeName(name, value) {
  values[name]["name"] = value;
  var ele = name + "-name";
  $("#" + ele).text(value);
  if (correct_connections_flag) {
    plotData();
  }
}

function acSubmited(name) {
  var volt = document.getElementById("value-volt-" + name).value;
  var ele;
  if (volt != "") {
    values[name]["volt"] = volt;
    ele = name + "-volt";
    $("#" + ele).text(values[name]["volt"] + values[name]['unit']);
  }
  var freq = document.getElementById("value-freq-" + name).value;
  if (freq != "") {
    values[name]["freq"] = freq;
    ele = name + "-freq";
    $("#" + ele).text(values[name]["freq"] + values[name]["unitfreq"]);
  }
  document.getElementById("submit-" + name).click();
  if (correct_connections_flag) {
    plotData();
  }
}

function dcSubmited(name) {
  var a = document.getElementById("value-" + name).value;
  if (a != "") {
    values[name]["value"] = a;
    var ele = name + "-value";
    $("#" + ele).text(values[name]["value"] + values[name]["unit"]);
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
  return false;
}
function instchange() {
  document.getElementById("inst").classList.toggle("inst-display");
}

$(document).ready(function () {
  $("#data").on("click", function () {
    $("#readings").show();
  });
});
document.getElementById("check1").addEventListener("click", () => {
  if (wrong_connection.length == 0) {
    if (user_connection.length < 34) {
      alert("Make all the Connections");
    } else {
      alert("All Connections Connected");

      correct_connections_flag = true;
    }
  } else {
    alert("Wrong Connection Present");
  }
});
var count = 1;
function showreadings() {
  if (correct_connections_flag) {
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
    
    ){

    
    if (count<9) {
      document.getElementById("Taken_reading").style.display = "block";
      var a = document.getElementById("tab");
      var b = a.innerHTML;
      var str =
        "<tr><td>" +
        count +
        "</td><td>" +
        values["Vavg"] +
        "</td><td>" +
        (parseFloat(values["DC1"]["value"]) - 0.1) +
        "</td></tr>";
      a.innerHTML = b + str;
      count = count + 1;
    }
    else{
      alert("You can add only 8 readings in the table");
    }
  }}
}
