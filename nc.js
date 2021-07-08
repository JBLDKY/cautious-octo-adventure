var UFLetters = []; //possible edge letters
var UFRLetters = []; //possible corner letters
var UFInvalids = []; //invalid UF combinations
const UFRInvalids = new Set([]); // UFRinvalids
var UBL = []; // expected: [A; E; R] (through documents.getelementbyclassname)
var UFL = []; // expected: [D, I, F]
var UBR = []; // expected: [B, C, N]
var DBL = []; // expected: [X, H, S]
var DFL = []; // expected: [U, L, G]
var DBR = []; // expected: [W, O, T]
var DFR = []; // expected: [V, K, P]
var Combos = [];
const pieceType = [];
// grabValues fetches the possibleletters and sends them to UFLetters and UFRLetters
var x = 100;
var betterAlgs = [];

function grabValues() {
  // // get possible edge letters

  var y = document.getElementsByClassName("Corner");
  var z = document.getElementsByClassName("Edge");
  var g = document.getElementsByName("UBL");
  var h = document.getElementsByName("UFL");
  var j = document.getElementsByName("UBR");
  var a = document.getElementsByName("DBL");
  var s = document.getElementsByName("DFL");
  var d = document.getElementsByName("DBR");
  var f = document.getElementsByName("DFR");

  p = 0;
  for (let i = 0; i < z.length; i++) {
    for (let o = 0; o < z.length; o++) {
      if (
        z[i].name[0] + z[i].name[1] == z[o].name[1] + z[o].name[0] ||
        z[i].name == z[o].name // checks for dupes and 3cycles that hit the same sticker twice
      ) {
        void 0; // if the above is the case, then do nothing
      } else {
        // if the above is NOT the case, add the computed pair to better Algs
        betterAlgs.splice(p, 1, z[i].value + z[o].value);
        p++;
      }
    }
  }

  for (let i = 0; i < g.length; i++) {
    UBL.push(g[i].value);
    UFL.push(h[i].value);
    UBR.push(j[i].value);
    DBL.push(a[i].value);
    DFL.push(s[i].value);
    DBR.push(d[i].value);
    DFR.push(f[i].value);
  }

  for (let o = 0; o < UBL.length; o++) {
    // generates all possible combinations
    for (let i = 0; i < UBL.length; i++) {
      UFRInvalids.add(UBL[o] + UBL[i]);
      UFRInvalids.add(UBR[o] + UBR[i]);
      UFRInvalids.add(UFL[o] + UFL[i]);
      UFRInvalids.add(DBR[o] + DBR[i]);
      UFRInvalids.add(DBL[o] + DBL[i]);
      UFRInvalids.add(DFL[o] + DFL[i]);
      UFRInvalids.add(DFR[o] + DFR[i]);
    }
  }

  for (let i = 0; i < z.length; i++) {
    UFLetters.splice(i, 1, z[i].value);
  }

  for (let i = 0; i < y.length; i++) {
    UFRLetters.splice(i, 1, y[i].value);
  }

  var z = [];
  console.log(z.length);
}

function UFTable() {
  var Amount = 100;
  var UFValids = [];
  i = 0;
  while (UFValids.length < Amount) {
    rI = Math.floor(Math.random() * betterAlgs.length);
    UFValids.splice(i, 1, betterAlgs[rI]);
    i++;
  }

  console.log(UFValids);
  console.log(betterAlgs);
  document.getElementById("container").innerHTML = betterTable(UFValids);
}

function UFRTable() {
  // generates a table full of *manually* filtered UF 3cycles
  var UFRAlgs = []; // UF 3-cycles
  var UFRValids = [];
  x = 1000; // dont know why, but it works, be careful of changing the above arrays to constants
  while (UFRValids.length < x) {
    let rnd1 = Math.floor(Math.random() * UFRLetters.length); // generate random number
    let rnd2 = Math.floor(Math.random() * UFRLetters.length);
    var inh2 = UFRLetters[rnd1] + UFRLetters[rnd2]; // generates random 3cycles
    UFRAlgs.push(inh2); // Fill array 'UFAlgs' with the generated 3cycles
    var UFRValids = UFRAlgs.filter(
      (element) =>
        // new array valids = array algs filtered for dupes & invalids
        UFRInvalids.has(element) == false
    );
  }
  document.getElementById("container").innerHTML = betterTable(UFRValids);
}

function betterTable(pieceType) {
  // this converts the corresponding array into a table
  // CREATING A HTML TABLE
  // (B) CREATE HTML TABLE STRING

  var perrow = 5, // 50 CELLS PER ROW
    html = "<table id=blue><tr>";
  // LOOP THROUGH ARRAY AND ADD TABLE CELLS
  for (var i = 0; i < pieceType.length; i++) {
    // "NORMAL" CELL
    html += `<td>${pieceType[i]}</td>`;
    // BREAK INTO NEXT ROW
    var next = i + 1;
    if (next % perrow == 0 && next != pieceType.length) {
      html += "</tr><tr>";
    }
  }
  html += "</tr></table>";
  // (C) ATTACH HTML TO CONTAINER
  return html;
}
