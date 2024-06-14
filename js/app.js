//constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function () {
    /*
    1 = Americano 1.15
    2 = Asiatico 1.05
    3 = Europeo 1.35
    */

    let cantidad;
    const base = 2000;

    console.log(this.marca)
    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //leer el año
    const diferencia = new Date().getFullYear() - this.year;

    //Cada año que la diferencia es mayor, el costo va a reducir un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        Si el seguro es basico se multiplica po un 30% mas

        Si el seguro es completo se multiplica po un 50% mas
    */

        if(this.tipo === 'basico' ) {
            cantidad *= 1.30
        } else {
            cantidad *= 1.50
        }

        return cantidad


    console.log(cantidad)
}

function UI() {

}

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add( 'error')
    } else {
        div.classList.add( 'correcto')
    }

    
    div.classList.add('mensaje')
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove()
    }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) => {
    
    const {marca, year, tipo} = seguro;
    let textMarca;

    switch(marca) {
        case '1':
            textMarca = 'Americano';
            break;
        case '2':
            textMarca = 'Asiático';
            break;
        case '3':
            textMarca = 'Europeo';
            break;
        default:
            break;
    }
    //crear resultado
    const div = document.createElement('div');
    div.classList.add('seguro-resumen');
    div.style.width = '500px'
    div.style.margin= '0 auto'
    div.style.color = '#1f2259'
    div.style.textTransform= 'upperCase'
    div.innerHTML = `
        <p class='header'>Tu Resumen</p>
        <p class='font-bold'><strong>Marca:</strong> <span class="font-normal"> ${textMarca}</span></p>
        <p class='font-bold'><strong>Año:</strong> <span class="font-normal"> ${year}</span></p>
        <p class='font-bold'><strong>Tipo:</strong> <span class="font-normal"> ${tipo}</span></p>
        <p class='font-bold'><strong>Total:</strong> <span class="font-normal"> $ ${total}</span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    resultadoDiv.appendChild(div);

    //mostrar el spinner
    
        // const spinner = doument.querySelector('#cargando');
        // spinner.style.overflow = 'hidden'
        // spinner.style.display = 'block';
        
    setTimeout(() => {
        resultadoDiv.appendChild(div)
    }, 3000);

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

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    // ui.mostrarMensaje('cotizando...', 'exito')

    //ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove()
    }

    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    console.log(seguro);

    //utilizar el prototype que va a cotizar

    ui.mostrarResultado(total, seguro);
}