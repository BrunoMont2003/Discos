import { LinkedList } from "./src/LinkedList.js";

import { Disco } from "./src/Disco.js";

const formulario = document.getElementById("formulario");

const inputs = document.querySelectorAll("#formulario input");

const tabla = document.getElementById("tablabody");
const buscar = document.getElementById("buscar");
var listaDiscos = new LinkedList();
var cantidadDiscos = 1;

const btnTodo = document.getElementById("btnTodo");

const expresiones = {
  nombre: /^[0-9a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  precio: /^\d+[,.]?\d$/,
  año: /^\b(19|20)\d\d\b$/, // 9 numeros.
};
const campos = {
  nombre: false,
  precio: false,
  año: false,
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .querySelector(`#grupo-${campo} .invalid-feedback`)
      .classList.remove("show");
    document.getElementById(`grupo-${campo}`).classList.remove("invalid");

    campos[campo] = true;
  } else {
    document
      .querySelector(`#grupo-${campo} .invalid-feedback`)
      .classList.add("show");
    document.getElementById(`grupo-${campo}`).classList.add("invalid");

    campos[campo] = false;
  }
};
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "precio":
      validarCampo(expresiones.precio, e.target, "precio");
      break;
    case "año":
      validarCampo(expresiones.año, e.target, "año");
      break;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

const handlerSubmit = (e) => {
  e.preventDefault();
  console.log(campos);
  if (campos.nombre && campos.precio && campos.año) {
    let datos = new FormData(formulario);
    let nombre = datos.get("nombre");
    let precio = datos.get("precio");
    let año = datos.get("año");

    let id = getNewId();
    let disco = new Disco(id, precio, nombre, año);

    listaDiscos.addEnd(disco);

    agregarFila(disco, cantidadDiscos);

    cantidadDiscos++;
    formulario.reset();
    campos.nombre = false;
    campos.precio = false;
    campos.año = false;
  }
};

formulario.addEventListener("submit", (event) => {
  handlerSubmit(event);
});

const mostrarData = () => {
  if (listaDiscos.isEmpty) {
    fetch("data/discos.json")
      .then((data) => data.json())

      .then((discos) => {
        discos.map((disco, index) => {
          // let d = new Disco(disco.id, disco.nombre, disco.precio, disco.año);
          listaDiscos.addEnd(disco);
          cantidadDiscos++;
          agregarFila(disco, index + 1);
        });
      });
  }
};

const agregarFila = (disco, index) => {
  const row = document.createElement("tr");
  row.innerHTML += `
                <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="">
                    <div class="text-sm font-medium text-gray-900">
                      ${disco.id}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                    ${disco.nombre}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  $${disco.precio}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                  ${disco.año}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button class="text-indigo-600 hover:text-indigo-900" id="eliminar-${index}">
                  Eliminar
                </button>
              </td>
                `;
  tabla.appendChild(row);
};

const handlerDelete = ({ target }) => {
  if (target.nodeName === "BUTTON") {
    let id = target.id.split("-")[1];
    id = parseInt(id);
    const disco = listaDiscos.get(id).data;
    listaDiscos.delete(disco);
    tabla.innerHTML = "";
    for (let i = 1; i <= listaDiscos.length; i++) {
      let disco = listaDiscos.get(i).data;
      agregarFila(disco, i);
    }
    cantidadDiscos--;
  }
};

mostrarData();
tabla.addEventListener("click", handlerDelete);

const getNewId = () => {
  let mayor = 0;
  for (let i = 1; i <= listaDiscos.length; i++) {
    let disco = listaDiscos.get(i).data;
    if (disco.id >= mayor) {
      mayor = disco.id;
    }
  }
  return mayor + 1;
};

const Searching = ({ target }) => {
  let nameTyped = target.value;
  let matches = listaDiscos.getByName(nameTyped);
  if (matches) {
    tabla.innerHTML = "";
    matches.map((match) => {
      const disco = match.data;
      let index = listaDiscos.getIndex(match);
      agregarFila(disco, index);
    });
  }
};

buscar.addEventListener("keyup", Searching);

btnTodo.addEventListener("click", (e) => {
  e.preventDefault();
  buscar.value = "";
  tabla.innerHTML = "";
  let matches = listaDiscos.getByName("");
  if (matches) {
    matches.map((match) => {
      const disco = match.data;
      let index = listaDiscos.getIndex(match);
      agregarFila(disco, index);
    });
  }
});
