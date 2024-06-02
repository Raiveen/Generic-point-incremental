//----------------------==========================-----------------------
//----------------------==========VARIABLES==========-----------------------
//----------------------==========================-----------------------

var player = {
    points: 0,
    prestige: 0,
    prestigerewards: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    upgrades: [0, 0],
    rebirthpoins: 0,
    rebirthed: false,
    rupgrades: [0, 0, 0],
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
    if (player.rupgrades[2]) prestigepricediv = 500;
    else prestigepricediv = 1;
    var prestige3boost = Math.log10(player.points+1)+1;
    if (player.prestigerewards[5]) prestigeprice = (10 * Math.pow(1.5, 2.5*Math.pow(player.prestige, 1.5))) / prestigepricediv;
    else prestigeprice = (10 * Math.pow(1.75, 2.5*Math.pow(player.prestige, 1.5))) / prestigepricediv;
    if (player.rupgrades[1]) upg1price = 20 + 20*player.upgrades[0]*Math.pow(4, 0.16*player.upgrades[0])
        else upg1price = 20 + 20*player.upgrades[0]*Math.pow(5, 0.2*player.upgrades[0])
    if (player.rupgrades[1]) upg2price = 50 + 50*player.upgrades[1]*Math.pow(4, 0.4*player.upgrades[1])
        else upg2price = 50 + 50*player.upgrades[1]*Math.pow(5, 0.5*player.upgrades[1])
    document.getElementById("points").innerHTML = expo(player.points, 2) + " points";
    document.getElementById("prestigecount").innerHTML = "Prestige: " + player.prestige;
    document.getElementById("prestige").innerHTML = "Prestige<br>Req: "+expo(prestigeprice, 2)+" points";
    document.getElementById("upgrade1").innerHTML = "Upgrade 1<br>+1 to point gain<br>Cost: "+expo(upg1price, 2)+" points";
    document.getElementById("upgrade2").innerHTML = "Upgrade 2<br>+1x to point gain<br>Cost: "+expo(upg2price, 2)+" points";
    if (player.prestigerewards[3]) document.getElementById("upg1eff").innerHTML = "+" +expo(player.upgrades[0]*prestige3boost, 2)+ " to point gain";
    else document.getElementById("upg1eff").innerHTML = "+" +expo(player.upgrades[0], 2)+ " to point gain";
    if (player.prestigerewards[4]) document.getElementById("upg2eff").innerHTML = "+" +Math.pow(player.upgrades[1], 2)+ "x to point gain";
    else document.getElementById("upg2eff").innerHTML = "+" +player.upgrades[1]+ "x to point gain";
    document.getElementById("prestige3boost").innerHTML = "Prestige 3<br>Points boost themselves: "+expo(prestige3boost, 2)+"x";

    function setRewardDisplay(id, condition) {
        if (condition) {
            document.getElementById(id).style.display = "block";
            document.getElementById(id).style.backgroundColor = "green";
        }  else {
            document.getElementById(id).style.backgroundColor = "grey";
        }
        document.getElementById(id).style.display = "block";
        document.getElementById("prestigerewards").style.display = "block";
        if (player.rebirthed) { 
        document.getElementById("upgrade1").style.display = "block"
        document.getElementById("upgrade2").style.display = "block"
        document.getElementById("upg1eff").style.display = "block"
        document.getElementById("upg2eff").style.display = "block"}
        
    }

    setRewardDisplay("jedna", player.prestigerewards[0]);
    setRewardDisplay("dva", player.prestigerewards[1]);
    setRewardDisplay("tri", player.prestigerewards[2]);
    setRewardDisplay("ctyri", player.prestigerewards[3]);
    setRewardDisplay("pet", player.prestigerewards[4]);
    setRewardDisplay("sest", player.prestigerewards[5]);
    setRewardDisplay("sedm", player.prestigerewards[6]);
    setRewardDisplay("osm", player.prestigerewards[7]);
    setRewardDisplay("devet", player.prestigerewards[8]);
    setRewardDisplay("deset", player.prestigerewards[9]);
    setRewardDisplay("dvanact", player.prestigerewards[10]);

    if (player.prestigerewards[0] == 1) document.getElementById("prestigerewards").style.display = "block";

    if (player.prestigerewards[1] == 1) {document.getElementById("upgrade1").style.display = "block"
    document.getElementById("upgrade2").style.display = "block"
    document.getElementById("upg1eff").style.display = "block"
    document.getElementById("upg2eff").style.display = "block"}
    
    if (player.prestigerewards[6] == 1) {document.getElementById("rebirthblock").style.display = "block"
    document.getElementById("rebirth").innerHTML = "Rebirth<br>Req: "+expo(rebirthprice, 2)+" points<br>Gain: "+expo(Math.pow(player.points/1e8, 0.5), 2)+" rebirth points";
    document.getElementById("rebirthpoints").innerHTML = "Rebirth points: "+expo(player.rebirthpoins, 2);}

    if (player.rebirthed) {document.getElementById("rebirthblock").style.display = "block"
    document.getElementById("rupgrade1").style.display = "block"
    document.getElementById("rupgrade2").style.display = "block"
    document.getElementById("rupgrade3").style.display = "block"
    document.getElementById("rebirth").innerHTML = "Rebirth<br>Req: "+expo(rebirthprice, 2)+" points<br>Gain: "+expo(Math.pow(player.points/1e8, 0.4), 2)+" rebirth points";
    document.getElementById("rebirthpoints").innerHTML = "Rebirth points: "+expo(player.rebirthpoins, 2);}

    if(player.rupgrades[0] == 1) document.getElementById("rupgrade1").style.backgroundColor = "green";
    if(player.rupgrades[1] == 1) document.getElementById("rupgrade2").style.backgroundColor = "green";
    if(player.rupgrades[2] == 1) document.getElementById("rupgrade3").style.backgroundColor = "green";
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
    if (player.prestigerewards[6]) x *= 4;
    if (player.rupgrades[0]) x *= 10;

    if (player.prestige >= 8) presige7mult = 1
    if (player.prestige >= 9) presige7mult = 2
    if (player.prestige >= 10) presige7mult = 3

    switch (presige7mult) {
        case 3: x *= Math.pow(1.6, player.prestige);
        break;
        case 2: x *= Math.pow(1.4, player.prestige);
        break;
        case 1: x *= Math.pow(1.2, player.prestige);
        break;
    }

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
    if (player.rupgrades[1]) upg1price = 20 + 20*player.upgrades[0]*Math.pow(4, 0.16*player.upgrades[0])
    else upg1price = 20 + 20*player.upgrades[0]*Math.pow(5, 0.2*player.upgrades[0])
    if (player.points >= upg1price) {
        player.points -= upg1price
        player.upgrades[0]++;
        
    }
    update();
}

var upg2price = 50
function upgrade2() {
    if (player.rupgrades[1]) upg2price = 50 + 50*player.upgrades[1]*Math.pow(4, 0.4*player.upgrades[1])
    else upg2price = 50 + 50*player.upgrades[1]*Math.pow(5, 0.5*player.upgrades[1])
    if (player.points >= upg2price) {
        player.points -= upg2price
        player.upgrades[1]++
    }
    update();
}

function rupgrade1() {
    if(player.rebirthpoins >= 1 && player.rupgrades[0] == 0) {
        player.rebirthpoins -= 1
        player.rupgrades[0] = 1
    }
    update();
}

function rupgrade2() {
    if(player.rebirthpoins >= 30 && player.rupgrades[1] == 0) {
        player.rebirthpoins -= 30
        player.rupgrades[1] = 1
    }
    update();
}

function rupgrade3() {
    if(player.rebirthpoins >= 150 && player.rupgrades[2] == 0) {
        player.rebirthpoins -= 150
        player.rupgrades[2] = 1
    }
    update();
}

//----------------------==========================-----------------------
//----------------------==========RESET LAYERS==========-----------------------
//----------------------==========================-----------------------
var prestigeprice = 10
var presige7mult = 0
var prestigepricediv = 1
function prestige() {
    if (player.rupgrades[2]) prestigepricediv = 500;
    else prestigepricediv = 1;
    if (player.prestigerewards[5]) prestigeprice = (10 * Math.pow(1.5, 2.5*Math.pow(player.prestige, 1.5))) / prestigepricediv;
    else prestigeprice = (10 * Math.pow(1.75, 2.5*Math.pow(player.prestige, 1.5))) / prestigepricediv;
    if (player.points >= prestigeprice) {
        player = {
            points: 0,
            prestige: player.prestige,
            prestigerewards: player.prestigerewards,
            upgrades: [0, 0],
            rebirthpoins: player.rebirthpoins,
            rebirthed: player.rebirthed,
            rupgrades: player.rupgrades,
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
    if (player.prestige >= 8) {player.prestigerewards[7] = 1; presige7mult = 1}
    if (player.prestige >= 9) {player.prestigerewards[8] = 1; presige7mult = 2}
    if (player.prestige >= 10) {player.prestigerewards[9] = 1; presige7mult = 3}
}   
var rebirthprice = 1e8
function rebirth() {
    if (player.points >= rebirthprice) {
        player.rebirthpoins += Math.pow(player.points/1e8, 0.4)
        player = {
            points: 0,
            prestige: 0,
            prestigerewards: [0, 0, 0, 0, 0, 0, 0, 0],
            upgrades: [0, 0],
            rebirthpoins: player.rebirthpoins,
            rebirthed: true,
            rupgrades: player.rupgrades,
        };
        
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
        prestigerewards: [0, 0, 0, 0, 0, 0, 0, 0],
        upgrades: [0, 0],
        rebirthpoins: 0,
        rebirthed: false,
        rupgrades: [0, 0],
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