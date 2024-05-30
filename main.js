//----------------------==========================-----------------------
//----------------------==========VARIABLES==========-----------------------
//----------------------==========================-----------------------

var player = {
    points: 10000,
    prestige: 0,
    prestigerewards: [0, 0]
};

//----------------------==========================-----------------------
//----------------------==========UPDATING==========-----------------------
//----------------------==========================-----------------------

function format(value) {
    return new Intl.NumberFormat('th-TH', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(value);
}

function update() {

    price = 10 * Math.pow(1.75, 2.5*Math.pow(player.prestige, 1.5))
    document.getElementById("points").innerHTML = format(player.points) + " points";
    document.getElementById("prestigecount").innerHTML = "Prestige: " + player.prestige;
    document.getElementById("prestige").innerHTML = "Prestige<br>Req: "+format(price)+" points";

    if (player.prestigerewards[0] == 1) document.getElementById("prestigerewards").style.display = "block";

    if (player.prestigerewards[0] == 1) {document.getElementById("jedna").style.display = "block"
     document.getElementById("jedna").style.backgroundColor = "green";}
    if (player.prestigerewards[1] == 1) {document.getElementById("dva").style.display = "block"
     document.getElementById("dva").style.backgroundColor = "green";}
}

//----------------------==========================-----------------------
//----------------------==========POINT GAIN==========-----------------------
//----------------------==========================-----------------------

function pointgain() {
    let x = 0.01
    if (player.prestigerewards[0]) x *= 3;
    player.points += x;
    update();
}

var mainGameLoop = window.setInterval(function() {
        pointgain();
}, 10);

//----------------------==========================-----------------------
//----------------------==========RESET LAYERS==========-----------------------
//----------------------==========================-----------------------
var price = 10
function prestige() {
    price = 10 * Math.pow(1.75, 2.5*Math.pow(player.prestige, 1.5))
    if (player.points >= price) {
        player.points -= price;
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