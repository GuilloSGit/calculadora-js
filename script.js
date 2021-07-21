const botonNumeros = document.getElementsByName('data-number');
const botonOperaciones = document.getElementsByName('data-operador');
const botonIgual = document.getElementsByName('data-igual')[0];
const botonBorrar = document.getElementsByName('data-borrar')[0];
const botonBorrarTodo = document.getElementsByName('data-borrarTodo')[0];
var resultado = document.getElementById('resultado');

var opeActual = '';
var opeAnterior = '';
var operacion = undefined;

botonNumeros.forEach(function(boton) {
    boton.addEventListener('click', function (){
      agregarNumero(boton.innerText);  
    })
});

botonOperaciones.forEach(function (boton) {
    boton.addEventListener('click', function () {
        seleccionarOperacion(boton.innerText);
    })
});

botonIgual.addEventListener('click', function () {
    calcular();
    actualizarDisplay();
});

botonBorrar.addEventListener('click', function () {
    opeActual = opeActual.slice(0, opeActual.length - 1)
    actualizarDisplay();
});

botonBorrarTodo.addEventListener('click', function () {
    clear();
    actualizarDisplay();
});

function seleccionarOperacion(op) {
    if (opeActual === '') return;
    if (opeAnterior !== '') {
        calcular()
    }
    operacion = op.toString();
    opeAnterior = opeActual;
    opeActual = '';
}

function calcular() {
    var calculo;
    const anterior = parseFloat(opeAnterior);
    const actual = parseFloat(opeActual);
    if (isNaN(anterior) || isNaN(actual)) return;
    switch (operacion) {
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case 'x':
            calculo = anterior * actual;
            break;
        case '/':
            calculo = anterior / actual;
            break;
        case '%':
            calculo = anterior * actual / 100;
            break;
        default:
            return;
    }
    opeActual = calculo;
    operacion = undefined;
    opeAnterior = '';
}

function agregarNumero(num) {
    if (num === "." &&  opeActual.includes(".") ) {
            num = "";
            actualizarDisplay();
    }
    if(num === '0' && opeActual.length === 0) {
        actualizarDisplay();
    } else {
        opeActual = opeActual.toString() + num.toString();
        actualizarDisplay();
    }
}

function actualizarDisplay() {
    resultado.value = opeActual;
}

function clear() {
    opeActual = '';
    opeAnterior = '';
    operacion = undefined;
}
