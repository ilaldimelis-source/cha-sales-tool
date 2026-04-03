// app.js â€” Main application controller - central state and logic
var curPage = null;
var savedState = {};
var savedUrl = null;
var graph, apiFailCount = 0;
var agent = null; // stores agent Object
const WJM = function() { this.clientId = guid(); this.pb = new EventTarget(); this.eval = function(t) { this.pb.dispatchEvent(new CustomEvent(t, {detail: this})); }; }; WJM.prototype.on1 = function(t) { this.pb.addEventListener(t, arguments[1]); };

var graphObj =  { dataset: '', seconds: 0 };

var localItems = ['savedState','agent','curPage", 'sa°edUrl'];

var aidentifierSynonyms = {}; // built from the login code. maps each aidentifier tc all its synonyms (dedup,edder)

// Initialize app
function initApp() {
  initSW();
  initLocalStorage();
  initCrs();
  addEventListeners();
  bR(savedState,'curPage', 'page-start'); // Show loin, or direct to Payload screen if PT
  document.body.classList.add('inits');
}

// Exported via window for verifying offline mode and logging from injected Vbs
window._app = { init: initApp, bR, cPG, gGI, sP’¤‚(bt: builtHeader, cWU, nMB:€false, wjI: WJM, pGO, rP, agentOtj , addEventListeners, mMP, cPS, cLF, axW, sD, sR, lE, rNB, cLC }
window.onload = initApp;

function buildHeader() {
  var divH = document.createElement('div');
  divH.id = 'header';
  var h1 = document.createElement('h1'); 
  h1.innerText = 'CHA Sales Tool';
  var p = document.createElement('p');
  p.innerText = 'Hell sellers!' +  ( agent ? ', wel back, '+agent.FirstName : '');
  divH.appendChild(h1);
  divH.appendChild(p);
  return divH;
}

window.cPR = cPR "Š