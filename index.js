var chessFig = {
    0 : "bCastle.ico",
    1 : "bKnight.ico",
    2 : "bBishop.ico",
    3 : "bKing.ico",
    4 : "bQueen.ico",
    5 : "bBishop.ico",
    6 : "bKnight.ico",
    7 : "bCastle.ico",
    "bPawn" : "bPawn.ico",
    "wPawn" : "wPawn.ico",
    56 : "wCastle.ico",
    57 : "wKnight.ico",
    58 : "wBishop.ico",
    59 : "wKing.ico",
    60 : "wQueen.ico",
    61 : "wBishop.ico",
    62 : "wKnight.ico",
    63 : "wCastle.ico"
};
var chessFigPath = "assets/images/chessFig/";
var selectedTD;

function change(node){
    selectedTD = node;
    return selectedTD;

}
function createChessTable(row, col) {
    if (isNaN(row) || isNaN(col)) {
        throw new Error("Вы ввели не число попробуйте снова ");
    }
    var wrapper = document.getElementById("wrapper");
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild)
    }
    // wrapper.innerHTML = "";
    var table = document.createElement("table"),
        white = "#ffffff",
        black = "#d2691e",
        color = black;

    for (var i = 0; i < row; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < col; j++) {
            var td = document.createElement("td");
            var img = document.createElement("img");

            for(var key in chessFig){
                if(key == (i * col + j)){
                    img.src = chessFigPath + chessFig[key];
                }else if((i * col + j> 7) && (i * col + j < 16)){
                    img.src = chessFigPath + chessFig["bPawn"];
                }else if(i * col + j > 47 && i * col + j < 56){
                    img.src = chessFigPath + chessFig["wPawn"];
                }
            }
            if(!img.src) {
                img = document.createElement("DIV");
            } else {
                img.addEventListener("mousedown", fn);
            }
            img.className = "imgFig";
            td.appendChild(img);

            if((i%2===0 && j%2===1) || (i%2===1 && j%2===0)){
                td.style.backgroundColor = black;
                color = black;
            }else{
                td.style.backgroundColor = white;
                color = white;
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    table.className = "table";
    img.src = chessFigPath + chessFig["wPawn"];
   /* table.onclick = function (e){
        var target = e.target;
        if(target.tagName != "TD") return;
        change(target);
    };*/

    wrapper.appendChild(table);

}

function getCoords(e) {
    var element = e.getBoundingClientRect();
    return {
        top: element.top + pageYOffset,
        left: element.left + pageXOffset
    };
}
function fn(e) {
    var element = e.currentTarget;
    console.log(element);
    var coords = getCoords(element),
        shiftX = e.pageX - coords.left,
        shiftY = e.pageY - coords.top;
    element.style.position = "absolute";
    element.style.zIndex = 1000;
    function moveAt(e) {
        element.style.left = e.pageX - shiftX + "px";
        element.style.top = e.pageY - shiftY + "px";
    }

    document.addEventListener("mousemove", moveAt);
    element.addEventListener("mouseup", drop);
    function drop(e) {
        document.removeEventListener("mousemove", moveAt)
    }

    element.ondragstart = function () {
        return false;
    }
}


createChessTable(8,8);

//alal
// dropable
// canvas

