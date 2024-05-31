//----------------------==========================-----------------------
//----------------------==========VARIABLES==========-----------------------
//----------------------==========================-----------------------

var player = {
    points: 0,
    prestige: 0,
    prestigerewards: [0, 0],
    upgrades: [0, 0],
};

//----------------------==========================-----------------------
//----------------------==========UPDATING==========-----------------------
//----------------------==========================-----------------------

function expo(x, f) {
    if (x >= 100000) return Number.parseFloat(x).toExponential(f);
    else { return new Intl.NumberFormat('th-TH', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(x); }
  }

function update() {

    prestigeprice = 10 * Math.pow(1.75, 2.5*Math.pow(player.prestige, 1.5))
    upg1price = 20 + 20*player.upgrades[0]*Math.pow(5, 0.2*player.upgrades[0])
    upg2price = 50 + 50*player.upgrades[1]*Math.pow(5, 0.5*player.upgrades[1])
    document.getElementById("points").innerHTML = expo(player.points, 2) + " points";
    document.getElementById("prestigecount").innerHTML = "Prestige: " + player.prestige;
    document.getElementById("prestige").innerHTML = "Prestige<br>Req: "+expo(prestigeprice, 2)+" points";
    document.getElementById("upgrade1").innerHTML = "Upgrade<br>+1 to point gain<br>Cost: "+expo(upg1price, 2)+" points";
    document.getElementById("upgrade2").innerHTML = "Upgrade<br>+1x to point gain<br>Cost: "+expo(upg2price, 2)+" points";

    if (player.prestigerewards[0] == 1) document.getElementById("prestigerewards").style.display = "block";

    if (player.prestigerewards[0] == 1) {document.getElementById("jedna").style.display = "block"
     document.getElementById("jedna").style.backgroundColor = "green";}
    if (player.prestigerewards[1] == 1) {document.getElementById("dva").style.display = "block"
    document.getElementById("upgrade1").style.display = "block"
    document.getElementById("upgrade2").style.display = "block"
     document.getElementById("dva").style.backgroundColor = "green";}
}

//----------------------==========================-----------------------
//----------------------==========POINT GAIN==========-----------------------
//----------------------==========================-----------------------

function pointgain() {
    let x = 0.01
    x += player.upgrades[0] / 100
    if (player.upgrades[1] >= 1) x *= player.upgrades[1]+1
    if (player.prestigerewards[0]) x *= 3;
    player.points += x;
    update();
}

var mainGameLoop = window.setInterval(function() {
        pointgain();
}, 10);

//----------------------==========================-----------------------
//----------------------==========UPGRADES==========-----------------------
//----------------------==========================-----------------------
var upg1price = 20
function upgrade1() {
    upg1price = 20 + 20*player.upgrades[0]*Math.pow(5, 0.2*player.upgrades[0])
    if (player.points >= upg1price) {
        player.points -= upg1price
        player.upgrades[0]++;
    }
    update();
}

var upg2price = 50
function upgrade2() {
    upg2price = 50 + 50*player.upgrades[1]*Math.pow(5, 0.5*player.upgrades[1])
    if (player.points >= upg2price) {
        player.points -= upg2price
        player.upgrades[1]++;
    }
    update();
}

//----------------------==========================-----------------------
//----------------------==========RESET LAYERS==========-----------------------
//----------------------==========================-----------------------
var prestigeprice = 10
function prestige() {
    prestigeprice = 10 * Math.pow(1.75, 2.5*Math.pow(player.prestige, 1.5))
    if (player.points >= prestigeprice) {
        player = {
            points: 0,
            prestige: player.prestige,
            prestigerewards: player.prestigerewards,
            upgrades: [0, 0],
        };
        player.prestige++;
    }
    update()
    if (player.prestige >= 1) player.prestigerewards[0] = 1;
    if (player.prestige >= 2) player.prestigerewards[1] = 1;
    
    
}   

//----------------------==========================-----------------------
//----------------------==========SAVING AND CLEARING==========-----------------------
//----------------------==========================-----------------------

function clearData() {
    localStorage.removeItem("save2");
    player = {
        points: 0,
        prestige: 0,
        prestigerewards: [0, 0],
        upgrades: [0, 0],
    };
    location.reload();
    update();
}

function saveGame() {
    var data = {
        player: player,
    };
    localStorage.setItem("save2", JSON.stringify(data));
}

var saveGameLoop = window.setInterval(function() {
    saveGame();
}, 1000);

function loadSaveGame() {
    var savedData = JSON.parse(localStorage.getItem("save2"));
    if (savedData !== null) {
        player = savedData.player !== undefined ? savedData.player : player;
    }
    update();
}

loadSaveGame();
update();