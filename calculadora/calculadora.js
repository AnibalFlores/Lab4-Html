/*
    Calculadora
*/

function el(id) {
    return document.getElementById(id);
}

// Variables
var rastro = el("rastropan"),
    pantalla = el("pantalla"),
    listaHistorial = el("listaHistorial"),
    calculo = 0,//almacena la secuencia de operaciones a evaluar
    op1, op2,
    memo = 0,
    signus;

function mostrarDigito(num) {
    if (pantalla.innerHTML.charAt(0) === "0" && pantalla.innerHTML.length == 1) {
        pantalla.innerHTML = num;
    } else {
        pantalla.innerHTML += num;
    }

}

function cambiaSigno(actual) {
    if (actual[0] === "-") {
        actual = actual.slice(1);
        $("#pantalla").html(actual);
    } else {
        //.prepend("-") <- función JQuery
        $("#pantalla").prepend("-");
    }
    return actual
}

function logOperacion(rastro, calculo) {
    let Nodo = document.createElement("li");
    Nodo.classList.add("list-group-item");
    Nodo.appendChild(document.createTextNode(rastro.innerHTML + " " + calculo));
    log.appendChild(Nodo);
}

function memoOperacion(signo) {
    switch (signo) {
        case "M+":
            memo += Number(pantalla.innerHTML);
            break;
        case "M-":
            memo -= Number(pantalla.innerHTML);
            break;
        case "Mc":
            memo = 0;
            break;
        case "Mr":
            pantalla.innerHTML = memo.toString();
            break;
        case "±":
            cambiaSigno(pantalla.innerHTML);
            break;
    }
    console.log("memo:" + memo);
}

function leerOperacion(signo) {
    signus = signo;
    if (op1 != undefined) {
        op2 = Number(pantalla.innerHTML);
    }
    else { op1 = Number(pantalla.innerHTML); }
    //pasa  operacion a pantalla de calculo
    rastro.innerHTML += pantalla.innerHTML.toString() + " " + signus + " ";
    //limpiar pantalla
    pantalla.innerHTML = "0";
}

function hacerOperacion() {
    op2 = Number(pantalla.innerHTML);
    switch (signus) {
        case "+":
            calculo = op1 + op2;
            break;

        case "-":
            calculo = op1 - op2;
            break;
        case "*":
            calculo = op1 * op2;
            break;
        case "/":
            calculo = op1 / op2;
            break;
    }
    informaResultado(" = ");
}

function hacerPorcentaje() {
    op2 = Number(pantalla.innerHTML);
    switch (signus) {
        case "+":
            calculo = op1 * (1 + (op2 / 100));
            break;

        case "-":
            calculo = op1 * (1 - (op2 / 100));
            break;
        case "*":
            calculo = op1 * (1 * (op2 / 100));
            break;
        case "/":
            calculo = op1 * (1 / (op2 / 100));
            break;
    }
    informaResultado(" %= ");
}

function informaResultado(s) {
    calculo = Math.round(calculo * 100000000) / 100000000;
    rastro.innerHTML += pantalla.innerHTML.toString() + s;
    pantalla.innerHTML = calculo;
    op1 = calculo;
    op2 = undefined;
    logOperacion(rastro, calculo);
    calculo = 0;
}

function limpiar() {
    pantalla.innerHTML = "0";
    calculo = 0;

}

function reiniciar() {
    rastro.innerHTML = "";
    pantalla.innerHTML = "0";
    calculo = 0;
    op1 = undefined;
    op2 = undefined;
}

