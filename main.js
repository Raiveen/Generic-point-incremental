//----------------------==========================-----------------------
//----------------------==========VARIABLES==========-----------------------
//----------------------==========================-----------------------

var player = {
    points: 0,
    prestige: 0,
    prestigerewards: [0, 0, 0, 0, 0, 0, 0],
    upgrades: [0, 0],
    rebirthpoins: 0,
    rebirthed: false,
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
    
    var prestige3boost = Math.log10(player.points+1)+1;
    if (player.prestigerewards[5]) prestigeprice = 10 * Math.pow(1.5, 2.5*Math.pow(player.prestige, 1.5))
    else prestigeprice = 10 * Math.pow(1.75, 2.5*Math.pow(player.prestige, 1.5))
    upg1price = 20 + 20*player.upgrades[0]*Math.pow(5, 0.2*player.upgrades[0])
    upg2price = 50 + 50*player.upgrades[1]*Math.pow(5, 0.5*player.upgrades[1])
    document.getElementById("points").innerHTML = expo(player.points, 2) + " points";
    document.getElementById("prestigecount").innerHTML = "Prestige: " + player.prestige;
    document.getElementById("prestige").innerHTML = "Prestige<br>Req: "+expo(prestigeprice, 2)+" points";
    document.getElementById("upgrade1").innerHTML = "Upgrade 1<br>+1 to point gain<br>Cost: "+expo(upg1price, 2)+" points";
    document.getElementById("upgrade2").innerHTML = "Upgrade 2<br>+1x to point gain<br>Cost: "+expo(upg2price, 2)+" points";
    if (player.prestigerewards[3]) document.getElementById("upg1eff").innerHTML = "+" +expo(player.upgrades[0]*prestige3boost, 2)+ " to point gain";
    else document.getElementById("upg1eff").innerHTML = "+" +player.upgrades[0]+ " to point gain";
    if (player.prestigerewards[4]) document.getElementById("upg2eff").innerHTML = "+" +Math.pow(player.upgrades[1], 2)+ "x to point gain";
    else document.getElementById("upg2eff").innerHTML = "+" +player.upgrades[1]+ "x to point gain";
    document.getElementById("prestige3boost").innerHTML = "Prestige 3<br>Points boost themselves: "+expo(prestige3boost, 2)+"x";

    if (player.prestigerewards[0] == 1) document.getElementById("prestigerewards").style.display = "block";

    if (player.prestigerewards[0] == 1) {document.getElementById("jedna").style.display = "block"
     document.getElementById("jedna").style.backgroundColor = "green";} else document.getElementById("jedna").style.display = "none"
    if (player.prestigerewards[1] == 1) {document.getElementById("dva").style.display = "block"
    document.getElementById("upgrade1").style.display = "block"
    document.getElementById("upgrade2").style.display = "block"
    document.getElementById("upg1eff").style.display = "block"
    document.getElementById("upg2eff").style.display = "block"
     document.getElementById("dva").style.backgroundColor = "green";} else document.getElementById("dva").style.display = "none"

    if (player.prestigerewards[2] == 1) {document.getElementById("tri").style.display = "block"
    document.getElementById("tri").style.backgroundColor = "green";}  else document.getElementById("tri").style.display = "none"
    if (player.prestigerewards[3] == 1) {document.getElementById("ctyri").style.display = "block"
    document.getElementById("ctyri").style.backgroundColor = "green";} else document.getElementById("ctyri").style.display = "none"
    if (player.prestigerewards[4] == 1) {document.getElementById("pet").style.display = "block"
    document.getElementById("pet").style.backgroundColor = "green";} else document.getElementById("pet").style.display = "none"
    if (player.prestigerewards[5] == 1) {document.getElementById("sest").style.display = "block"
    document.getElementById("sest").style.backgroundColor = "green";} else document.getElementById("sest").style.display = "none"
    if (player.prestigerewards[6] == 1) {document.getElementById("sedm").style.display = "block"
    document.getElementById("sedm").style.backgroundColor = "green";
    document.getElementById("rebirthblock").style.display = "block"} else document.getElementById("sedm").style.display = "none"

    if (player.rebirthed) document.getElementById("rebirthblock").style.display = "block"
    document.getElementById("rebirth").innerHTML = "Rebirth<br>Req: "+expo(rebirthprice, 2)+" points<br>Gain: "+expo(Math.pow(player.points/1e8, 0.5), 2)+" rebirth points";
    document.getElementById("rebirthpoints").innerHTML = "Rebirth points: "+player.rebirthpoins;
}

//----------------------==========================-----------------------
//----------------------==========POINT GAIN==========-----------------------
//----------------------==========================-----------------------

function pointgain() {
    let x = 0.01
    if (player.prestigerewards[3]) {
        x += (player.upgrades[0] / 100)*((Math.log10(player.points+1)+1)*1.5)
    } else {x += player.upgrades[0] / 100}
    if (player.prestigerewards[4]) {
        x *= Math.pow((player.upgrades[1]+1), 2)
    } else { 
        if (player.upgrades[1] >= 1) x *= player.upgrades[1]+1
    }
    
    if (player.prestigerewards[0]) x *= 3;
    if (player.prestigerewards[2]) x *= Math.log10(player.points+1)+1;
    document.getElementById("pointpersec").innerHTML = expo(x*100, 2)+"/sec";
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
        player.upgrades[1]++
    }
    update();
}

//----------------------==========================-----------------------
//----------------------==========RESET LAYERS==========-----------------------
//----------------------==========================-----------------------
var prestigeprice = 10
function prestige() {
    if (player.prestigerewards[5]) prestigeprice = 10 * Math.pow(1.5, 2.5*Math.pow(player.prestige, 1.5))
    else prestigeprice = 10 * Math.pow(1.75, 2.5*Math.pow(player.prestige, 1.5))
    if (player.points >= prestigeprice) {
        player = {
            points: 0,
            prestige: player.prestige,
            prestigerewards: player.prestigerewards,
            upgrades: [0, 0],
            rebirthpoins: player.rebirthpoins,
            rebirthed: player.rebirthed,
        };
        player.prestige++;
    }
    update()
    if (player.prestige >= 1) player.prestigerewards[0] = 1;
    if (player.prestige >= 2) player.prestigerewards[1] = 1;
    if (player.prestige >= 3) player.prestigerewards[2] = 1;
    if (player.prestige >= 4) player.prestigerewards[3] = 1;
    if (player.prestige >= 5) player.prestigerewards[4] = 1;
    if (player.prestige >= 6) player.prestigerewards[5] = 1;
    if (player.prestige >= 7) player.prestigerewards[6] = 1;
}   
var rebirthprice = 1e8
function rebirth() {
    if (player.points >= rebirthprice) {
        player = {
            points: 0,
            prestige: 0,
            prestigerewards: [0, 0, 0, 0, 0, 0, 0],
            upgrades: [0, 0],
            rebirthpoins: player.rebirthpoins,
            rebirthed: true,
        };
        player.rebirthpoins += Math.pow(player.points/1e8, 0.5)
    }
}

//----------------------==========================-----------------------
//----------------------==========SAVING AND CLEARING==========-----------------------
//----------------------==========================-----------------------

function clearData() {
    localStorage.removeItem("save2");
    player = {
        points: 0,
        prestige: 0,
        prestigerewards: [0, 0, 0, 0, 0, 0, 0],
        upgrades: [0, 0],
        rebirthpoins: 0,
        rebirthed: false,
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