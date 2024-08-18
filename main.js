let contadorNinos = 0;
let contadorNinas = 0;
const maxAlumnos = 20;

function getStoredData() {
  const storedData = localStorage.getItem("niñosInscriptos");
  return storedData ? JSON.parse(storedData) : [];
}

function saveData() {
  localStorage.setItem("niñosInscriptos", JSON.stringify(niñosInscriptos));
}

const niñosInscriptos = getStoredData();
function registrarAlumno() {
  if (niñosInscriptos.length >= maxAlumnos) {
    document.getElementById("mensaje").innerText =
      "No se pueden inscribir más alumnos. Cupos llenos.";
    return;
  }

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const dni = document.getElementById("dni").value;
  const genero = document.getElementById("genero").value;
  const autorizacion = document.getElementById("autorizacion").value;
  const incluirComedor = document.getElementById("comedor").value;

  if (autorizacion === "no") {
    document.getElementById("mensaje").innerText = "Gracias por su tiempo.";
    return;
  }

  let costoComedor = 0;
  if (incluirComedor === "si") {
    costoComedor = 25000;
  }

  const costoTotal = 100000 + costoComedor;
  const nuevoAlumno = {
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    genero: genero,
    autorizacion: autorizacion,
    incluirComedor: incluirComedor === "si",
    costoTotal: costoTotal,
  };

  niñosInscriptos.push(nuevoAlumno);
  if (genero === "masculino") {
    contadorNinos++;
  } else if (genero === "femenino") {
    contadorNinas++;
  }

  saveData();
  actualizarCards();
  actualizarLista();

  Swal.fire({
    title: "Alumno Registrado!",
    text: `Usted deberá abonar por ${nombre} $${costoTotal}`,
    icon: "success",
    confirmButtonText: "Ok",
  });

  document.getElementById("registro-form").reset();
}

// function registrarAlumno() {
//   if (niñosInscriptos.length >= maxAlumnos) {
//     document.getElementById("mensaje").innerText =
//       "No se pueden inscribir más alumnos. Cupos llenos.";
//     return;
//   }

//   const nombre = document.getElementById("nombre").value;
//   const apellido = document.getElementById("apellido").value;
//   const dni = document.getElementById("dni").value;
//   const genero = document.getElementById("genero").value;
//   const autorizacion = document.getElementById("autorizacion").value;
//   const incluirComedor = document.getElementById("comedor").value;

//   if (autorizacion === "no") {
//     document.getElementById("mensaje").innerText = "Gracias por su tiempo.";
//     return;
//   }

//   let costoComedor = 0;
//   if (incluirComedor === "si") {
//     costoComedor = 25000;
//   }

//   const costoTotal = 100000 + costoComedor;
//   const nuevoAlumno = {
//     nombre: nombre,
//     apellido: apellido,
//     dni: dni,
//     genero: genero,
//     autorizacion: autorizacion,
//     incluirComedor: incluirComedor === "si",
//     costoTotal: costoTotal,
//   };

//   niñosInscriptos.push(nuevoAlumno);
//   if (genero === "masculino") {
//     contadorNinos++;
//   } else if (genero === "femenino") {
//     contadorNinas++;
//   }

//   saveData();
//   actualizarCards();
//   actualizarLista();
//   document.getElementById(
//     "mensaje"
//   ).innerText = `Usted debera abonar por ${nombre} $${costoTotal}`;

//   document.getElementById("registro-form").reset();
// }
function eliminarAlumno() {
  const dni = prompt("Ingrese el DNI del alumno a eliminar:");

  if (!dni) {
    document.getElementById("mensaje").innerText = "DNI no proporcionado.";
    return;
  }

  const index = niñosInscriptos.findIndex((alumno) => alumno.dni === dni);

  if (index === -1) {
    document.getElementById("mensaje").innerText = "Alumno no encontrado.";
    return;
  }

  niñosInscriptos.splice(index, 1);
  saveData();
  actualizarCards();
  actualizarLista();
  document.getElementById("mensaje").innerText =
    "Alumno eliminado correctamente.";
}

function actualizarCards() {
  const grupoNinos = document.getElementById("grupo-ninos");
  const grupoNinas = document.getElementById("grupo-ninas");
  grupoNinos.innerHTML = "<h2>Grupo de Niños</h2>";
  grupoNinas.innerHTML = "<h2>Grupo de Niñas</h2>";

  niñosInscriptos.forEach((alumno) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <h3>${alumno.nombre} ${alumno.apellido}</h3>
            <p>DNI: ${alumno.dni}</p>
            <p>Género: ${alumno.genero}</p>
            <p>Autorización: ${alumno.autorizacion}</p>
            <p>Incluir Comedor: ${alumno.incluirComedor ? "Sí" : "No"}</p>
            <p>Costo Total: $${alumno.costoTotal}</p>
        `;

    if (alumno.genero === "masculino") {
      grupoNinos.appendChild(card);
    } else {
      grupoNinas.appendChild(card);
    }
  });
}

function actualizarLista() {
  const alumnosLista = document.getElementById("alumnos-lista");
  alumnosLista.innerHTML = "<h2>Lista de Alumnos Registrados</h2>";

  niñosInscriptos.forEach((alumno) => {
    const listaItem = document.createElement("div");
    listaItem.className = "alumno";
    listaItem.innerHTML = `
            <p><strong>Nombre:</strong> ${alumno.nombre} ${alumno.apellido}</p>
    
        `;
    alumnosLista.appendChild(listaItem);
  });
}

document.addEventListener("DOMContenido", () => {
  actualizarCards();
  actualizarLista();
});
