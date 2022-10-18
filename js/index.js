// Variables
const marcaSelect = document.querySelector("#marca");
const anioSelect = document.querySelector("#year");
const minSelect = document.querySelector("#min");
const maxSelect = document.querySelector("#max");
const puertasSelect = document.querySelector("#puertas");
const transmisionSelect = document.querySelector("#transmision");
const colorSelect = document.querySelector("#color");
const resultado = document.querySelector("#resultado");
const max = new Date().getFullYear();
const min = 2010;

//objeto busqueda
const datosBusqueda = {
  marca: "",
  modelo: "",
  anio: "",
  min: "",
  max: "",
  puertas: "",
  color: "",
  transmision: "",
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  dataAnio();
});

// Eventos Seleccion
marcaSelect.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});
anioSelect.addEventListener("change", (e) => {
  datosBusqueda.anio = parseInt(e.target.value);
  filtrarAuto();
});
minSelect.addEventListener("change", (e) => {
  datosBusqueda.min = parseInt(e.target.value);
  filtrarAuto();
});
maxSelect.addEventListener("change", (e) => {
  datosBusqueda.max = parseInt(e.target.value);
  filtrarAuto();
});
puertasSelect.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});
transmisionSelect.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});
colorSelect.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

// Funciones
function mostrarAutos(autos) {
  resultado.innerHTML = "";
  const titleResultado = document.createElement("h2");
  titleResultado.textContent = "Resultado:";
  resultado.appendChild(titleResultado);

  autos.map((auto) => {
    const autoHTML = document.createElement("p");

    const { marca, modelo, anio, puertas, transmision, precio, color } = auto;
    autoHTML.textContent = `
        ${marca} - ${modelo} - ${anio} - Puertas: ${puertas} - Transmision: ${transmision} - Color: ${color} - Precio: ${precio}
    `;

    resultado.appendChild(autoHTML);
  });
}

function dataAnio() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    anioSelect.appendChild(opcion);
  }
}

function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarAnio)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarColor)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision);
  if (resultado.length) {
    return mostrarAutos(resultado);
  }
  noResultado();
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarAnio(auto) {
  const { anio } = datosBusqueda;
  if (anio) {
    return auto.anio === anio;
  }
  return auto;
}

function filtrarMin(auto) {
  const { min } = datosBusqueda;
  if (min) {
    return auto.precio >= min;
  }
  return auto;
}

function filtrarMax(auto) {
  const { max } = datosBusqueda;
  if (max) {
    return auto.precio <= max;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function noResultado() {
  resultado.innerHTML = "";
  const titleResultado = document.createElement("h2");
  titleResultado.classList.add("alerta", "error");
  titleResultado.textContent = "Sin resultado";
  resultado.appendChild(titleResultado);
}
