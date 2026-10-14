let conductores = JSON.parse(localStorage.getItem("conductores_db")) || [];
let vehiculos = JSON.parse(localStorage.getItem("vehiculos_db")) || [];

function guardarConductores() {
    localStorage.setItem("conductores_db", JSON.stringify(conductores));
}

function guardarVehiculos() {
    localStorage.setItem("vehiculos_db", JSON.stringify(vehiculos));
}

function agregarConductor() {
    let nombre = document.getElementById("conductor-nombre").value;
    let edad = document.getElementById("conductor-edad").value;
    let tipo_carnet = document.getElementById("conductor-tipo-carnet").value;
    let seguro = document.getElementById("conductor-seguro").value;

    if (nombre === "" || edad === "") {
        alert("Por favor complete todos los campos del conductor.");
        return;
    }

    let nuevoConductor = {
        nombre: nombre,
        edad: edad,
        tipo_carnet: tipo_carnet,
        seguro: seguro
    };

    conductores.push(nuevoConductor);
    guardarConductores();

    alert("Conductor agregado con éxito.");
    limpiarFormularioConductor();
}

function limpiarFormularioConductor() {
    document.getElementById("conductor-nombre").value = "";
    document.getElementById("conductor-edad").value = "";
    document.getElementById("conductor-tipo-carnet").value = "A1";
    document.getElementById("conductor-seguro").value = "SI";
}

function mostrarConductores() {
    let filtroSeguro = document.getElementById("filtro-conductor-seguro").value;
    let filtroCarnet = document.getElementById("filtro-conductor-carnet").value;
    let cuerpoTabla = document.getElementById("cuerpo-tabla-conductores");

    if (!conductores || conductores.length === 0) {
        cuerpoTabla.innerHTML = "<tr><td colspan='4' style='text-align:center;'>No hay conductores guardados en la base de datos.</td></tr>";
        return;
    }

    let filasHtml = "";
    let cantidadCoincidencias = 0;

    for (let i = 0; i < conductores.length; i++) {
        let conductor = conductores[i];

        // Comparación segura (ignora mayúsculas/minúsculas)
        let coincideSeguro = (filtroSeguro === "Todos" || (conductor.seguro && conductor.seguro.toUpperCase() === filtroSeguro.toUpperCase()));
        let coincideCarnet = (filtroCarnet === "Todos" || (conductor.tipo_carnet && conductor.tipo_carnet.toUpperCase() === filtroCarnet.toUpperCase()));

        if (coincideSeguro && coincideCarnet) {
            cantidadCoincidencias++;
            filasHtml += "<tr>" +
                "<td>" + (conductor.nombre || "-") + "</td>" +
                "<td>" + (conductor.edad || "-") + "</td>" +
                "<td>" + (conductor.tipo_carnet || "-") + "</td>" +
                "<td>" + (conductor.seguro || "-") + "</td>" +
                "</tr>";
        }
    }

    

    cuerpoTabla.innerHTML = filasHtml;
}
function agregarVehiculo() {
    let marca = document.getElementById("vehiculo-marca").value;
    let modelo = document.getElementById("vehiculo-modelo").value;
    let patente = document.getElementById("vehiculo-patente").value;
    let tipo = document.getElementById("vehiculo-tipo").value;

    if (marca === "" || modelo === "" || patente === "") {
        alert("Por favor complete todos los campos del vehículo.");
        return;
    }

    let nuevoVehiculo = {
        marca: marca,
        modelo: modelo,
        patente: patente,
        tipo: tipo
    };

    vehiculos.push(nuevoVehiculo);
    guardarVehiculos();

    alert("Vehículo agregado con éxito.");
    limpiarFormularioVehiculo();
}

function limpiarFormularioVehiculo() {
    document.getElementById("vehiculo-marca").value = "";
    document.getElementById("vehiculo-modelo").value = "";
    document.getElementById("vehiculo-patente").value = "";
    document.getElementById("vehiculo-tipo").value = "A1";
}

function actualizarDesplegableMarcas() {
    let selectMarca = document.getElementById("filtro-vehiculo-marca");
    let marcasUnicas = [];

    for (let i = 0; i < vehiculos.length; i++) {
        let marcaActual = vehiculos[i].marca;
        let existe = false;

        for (let j = 0; j < marcasUnicas.length; j++) {
            if (marcasUnicas[j].toLowerCase() === marcaActual.toLowerCase()) {
                existe = true;
                break;
            }
        }

        if (!existe) {
            marcasUnicas.push(marcaActual);
        }
    }

    let opcionesHtml = '<option value="Todos">Todos</option>';
    for (let k = 0; k < marcasUnicas.length; k++) {
        opcionesHtml += '<option value="' + marcasUnicas[k] + '">' + marcasUnicas[k] + '</option>';
    }
    selectMarca.innerHTML = opcionesHtml;
}

function mostrarVehiculos() {
    let filtroMarca = document.getElementById("filtro-vehiculo-marca").value;
    let filtroTipo = document.getElementById("filtro-vehiculo-tipo").value;
    let cuerpoTabla = document.getElementById("cuerpo-tabla-vehiculos");

    let filasHtml = "";
    let cantidadCoincidencias = 0;

    for (let i = 0; i < vehiculos.length; i++) {
        let vehiculo = vehiculos[i];

        let coincideMarca = (filtroMarca === "Todos" || vehiculo.marca.toLowerCase() === filtroMarca.toLowerCase());
        let coincideTipo = (filtroTipo === "Todos" || vehiculo.tipo === filtroTipo);

        if (coincideMarca && coincideTipo) {
            cantidadCoincidencias++;
            filasHtml += "<tr>" +
                "<td>" + vehiculo.marca + "</td>" +
                "<td>" + vehiculo.modelo + "</td>" +
                "<td>" + vehiculo.patente + "</td>" +
                "<td>" + vehiculo.tipo + "</td>" +
                "</tr>";
        }
    }

   

    cuerpoTabla.innerHTML = filasHtml;
}

if (document.getElementById("cuerpo-tabla-conductores")) {
    mostrarConductores();
}

if (document.getElementById("cuerpo-tabla-vehiculos")) {
    actualizarDesplegableMarcas();
    mostrarVehiculos();
}

let menu = document.getElementById("menu-container");
if (menu) {
    menu.innerHTML = 
        '<a href="crear_conductor.html">1. Crear Conductor</a> ' +
        '<a href="crear_vehiculo.html">2. Crear Vehículo</a> ' +
        '<a href="ver_conductores.html">3. Ver Conductores</a> ' +
        '<a href="ver_vehiculos.html">4. Ver Vehículos</a>';
}