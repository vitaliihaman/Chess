
var square = document.getElementById("myTestDiv");

square.addEventListener("mousedown", fn);
function getCoords(e) {
    var element = e.getBoundingClientRect();
    return {
        top: element.top + pageYOffset,
        left: element.left + pageXOffset
    };
}
function fn(e) {
    var element = e.target;
    var coords = getCoords(element),
        shiftX = e.pageX - coords.left,
        shiftY = e.pageY - coords.top;
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
        return true;
    }
}
