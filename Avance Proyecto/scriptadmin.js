document.addEventListener('DOMContentLoaded', () => {
    const boton3D = document.getElementById('boton3D');
    const formularioContainer = document.getElementById('formularioContainer');
    const formularioProducto = document.getElementById('formularioProducto');
    const cerrarFormulario = document.getElementById('cerrarFormulario');
    const tablaJuegosBody = document.querySelector('#tablaJuegos tbody');
    const tablaAccesoriosBody = document.querySelector('#tablaAccesorios tbody');
    const formularioEditarContainer = document.getElementById('formularioEditarContainer');
    const formularioEditarProducto = document.getElementById('formularioEditarProducto');
    const cerrarFormularioEditar = document.getElementById('cerrarFormularioEditar');

    // Elementos del formulario de edición
    const editarIdInput = document.getElementById('editar_id');
    const editarImagenInput = document.getElementById('editar_imagen');
    const editarNombreInput = document.getElementById('editar_nombre');
    const editarDescripcionInput = document.getElementById('editar_descripcion');
    const editarPrecioInput = document.getElementById('editar_precio');
    const editarStockInput = document.getElementById('editar_stock');

    let juegos = [];
    let accesorios = [];
    let productoAEditar = null; // Variable para almacenar el producto que se va a editar

    function renderizarTablas() {
        tablaJuegosBody.innerHTML = '';
        juegos.forEach(juego => {
            const row = tablaJuegosBody.insertRow();
            row.insertCell().textContent = juego.id;
            const imagenCell = row.insertCell();
            const imgElement = document.createElement('img');
            imgElement.src = juego.imagen;
            imgElement.style.maxWidth = '50px';
            imgElement.style.maxHeight = '50px';
            imagenCell.appendChild(imgElement);
            row.insertCell().textContent = juego.nombre;
            row.insertCell().textContent = juego.descripcion;
            row.insertCell().textContent = juego.precio;
            row.insertCell().textContent = juego.stock;
            const accionesCell = row.insertCell();
            accionesCell.classList.add('acciones');
            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.addEventListener('click', () => mostrarFormularioEdicion(juego));
            accionesCell.appendChild(editarBtn);
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', () => eliminarProducto('Juegos', juego.id));
            accionesCell.appendChild(eliminarBtn);
        });

        tablaAccesoriosBody.innerHTML = '';
        accesorios.forEach(accesorio => {
            const row = tablaAccesoriosBody.insertRow();
            row.insertCell().textContent = accesorio.id;
            const imagenCell = row.insertCell();
            const imgElement = document.createElement('img');
            imgElement.src = accesorio.imagen;
            imgElement.style.maxWidth = '50px';
            imgElement.style.maxHeight = '50px';
            imagenCell.appendChild(imgElement);
            row.insertCell().textContent = accesorio.nombre;
            row.insertCell().textContent = accesorio.descripcion;
            row.insertCell().textContent = accesorio.precio;
            row.insertCell().textContent = accesorio.stock;
            const accionesCell = row.insertCell();
            accionesCell.classList.add('acciones');
            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.addEventListener('click', () => mostrarFormularioEdicion(accesorio));
            accionesCell.appendChild(editarBtn);
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', () => eliminarProducto('Accesorios', accesorio.id));
            accionesCell.appendChild(eliminarBtn);
        });
    }

    function eliminarProducto(categoria, id) {
        if (confirm(`¿Seguro que quieres eliminar el producto con ID ${id} de ${categoria}?`)) {
            console.log(`Simulando eliminación de ${categoria} con ID ${id}`);
            if (categoria === 'Juegos') {
                juegos = juegos.filter(juego => juego.id !== id);
            } else if (categoria === 'Accesorios') {
                accesorios = accesorios.filter(accesorio => accesorio.id !== id);
            }
            renderizarTablas();
            // Aquí: Llamada al backend para eliminar
        }
    }

    function mostrarFormularioEdicion(producto) {
        productoAEditar = producto;
        editarIdInput.value = producto.id;
        editarNombreInput.value = producto.nombre;
        editarDescripcionInput.value = producto.descripcion;
        editarPrecioInput.value = producto.precio;
        editarStockInput.value = producto.stock;
        formularioEditarContainer.classList.remove('oculto');
    }

    cerrarFormularioEditar.addEventListener('click', () => {
        formularioEditarContainer.classList.add('oculto');
        productoAEditar = null;
        formularioEditarProducto.reset();
    });

    formularioEditarProducto.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!productoAEditar) {
            console.error('No hay producto seleccionado para editar.');
            return;
        }

        const formData = new FormData(formularioEditarProducto);
        const datosEditados = Object.fromEntries(formData);
        datosEditados.id = productoAEditar.id; // Asegurar que el ID se envíe

        try {
            // Simulación de la llamada al backend para editar
            console.log('Datos editados a enviar al backend:', datosEditados);
            alert(`Simulando la edición del producto con ID ${productoAEditar.id}`);

            // Actualizar el array local (simulación de la respuesta del backend)
            if (juegos.some(j => j.id === productoAEditar.id)) {
                juegos = juegos.map(juego => juego.id === productoAEditar.id ? {...juego, ...datosEditados} : juego);
            } else if (accesorios.some(a => a.id === productoAEditar.id)) {
                accesorios = accesorios.map(accesorio => accesorio.id === productoAEditar.id ? {...accesorio, ...datosEditados} : accesorio);
            }

            renderizarTablas();
            formularioEditarContainer.classList.add('oculto');
            formularioEditarProducto.reset();
            productoAEditar = null;

            

        } catch (error) {
            console.error('Error al enviar los datos de edición:', error);
            alert('Ocurrió un error al intentar editar el producto.');
        }
    });

    boton3D.addEventListener('click', () => {
        formularioContainer.classList.remove('oculto');
    });

    cerrarFormulario.addEventListener('click', () => {
        formularioContainer.classList.add('oculto');
        formularioProducto.reset();
    });

    formularioProducto.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(formularioProducto);
        const nuevoProducto = Object.fromEntries(formData);
        nuevoProducto.id = Date.now(); // Simulación de ID

        if (nuevoProducto.categoria === 'Juegos') {
            juegos.push(nuevoProducto);
        } else if (nuevoProducto.categoria === 'Accesorios') {
            accesorios.push(nuevoProducto);
        }

        renderizarTablas();
        formularioContainer.classList.add('oculto');
        formularioProducto.reset();

        // Aquí deberías enviar los datos del nuevo producto al backend para guardarlos
        console.log('Datos del nuevo producto:', nuevoProducto);
    });

    // Renderizar las tablas iniciales
    renderizarTablas();
});
function agregarEmpleado() {
    const nombre = document.getElementById("nombree").value;
    const apellido = document.getElementById("apellidoe").value;
    const documento = document.getElementById("documentoe").value;
    const direccion = document.getElementById("direccione").value;
    const telefono = document.getElementById("telefonoe").value;
    const correo = document.getElementById("correoe").value;
    const cargo = document.getElementById("cargoe").value;

    if (nombre && apellido && documento && correo && cargo) {
        const tabla = document.getElementById("tablaEmpleados").getElementsByTagName('tbody')[0];
        const nuevaFila = tabla.insertRow(tabla.rows.length);

        const celdaNombre = nuevaFila.insertCell(0);
        const celdaApellido = nuevaFila.insertCell(1);
        const celdaDocumento = nuevaFila.insertCell(2);
        const celdaDireccion = nuevaFila.insertCell(3);
        const celdaTelefono = nuevaFila.insertCell(4);
        const celdaCorreo = nuevaFila.insertCell(5);
        const celdaCargo = nuevaFila.insertCell(6);

        celdaNombre.innerHTML = nombre;
        celdaApellido.innerHTML = apellido;
        celdaDocumento.innerHTML = documento;
        celdaDireccion.innerHTML = direccion;
        celdaTelefono.innerHTML = telefono;
        celdaCorreo.innerHTML = correo;
        celdaCargo.innerHTML = cargo;

        // Agregar el atributo data-label a cada celda para la responsividad
        celdaNombre.setAttribute("data-label", "Nombre:");
        celdaApellido.setAttribute("data-label", "Apellido:");
        celdaDocumento.setAttribute("data-label", "Documento:");
        celdaDireccion.setAttribute("data-label", "Dirección:");
        celdaTelefono.setAttribute("data-label", "Teléfono:");
        celdaCorreo.setAttribute("data-label", "Correo:");
        celdaCargo.setAttribute("data-label", "Cargo:");

        // Limpiar el formulario después de agregar el empleado
        document.getElementById("registroEmpleado").reset();
    } else {
        alert("Por favor, completa todos los campos obligatorios.");
    }
}
