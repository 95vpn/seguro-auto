//constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() {

}

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20 

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = function(mensaje, tipo) {
    const div = document.createElement('div');
    if(tipo === 'error') {
        div.classList.add( 'error')
    } else {
        div.classList.add( 'correcto')
    }

    div.classList.add('mensaje')
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))
}

//instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //llen el select con los años...
});


eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(event) {
    event.preventDefault();

    //leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    console.log(marca)


    //leer el año selecionado
    const year = document.querySelector('#year').value;

    //leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '' ) {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
    } else {
        console.log('Si pasó la validación')
    }
}