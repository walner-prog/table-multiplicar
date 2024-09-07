 

document.addEventListener('DOMContentLoaded', () => {
    let tablaElegida = null;
    let posicion = 0;
    let respuestasUsuario = [];
    const tablaSelect = document.getElementById('tablaSelect');
    const pregunta = document.getElementById('pregunta');
    const respuestaInput = document.getElementById('respuesta');
    const validarBtn = document.getElementById('validarBtn');
    const feedback = document.getElementById('feedback');
    const siguienteBtn = document.getElementById('siguienteBtn');
    const operacionDiv = document.getElementById('operacion');
    const resultadoFinal = document.getElementById('resultadoFinal');

    // Generar opciones de tablas del 1 al 10
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Tabla del ${i}`;
        tablaSelect.appendChild(option);
    }

    // Al seleccionar una tabla
    tablaSelect.addEventListener('change', () => {
        tablaElegida = parseInt(tablaSelect.value);
        if (tablaElegida) {
            posicion = 0;
            respuestasUsuario = [];
            resultadoFinal.innerHTML = '';
            siguienteBtn.style.display = 'none';  // Ocultar el botón de siguiente
            siguienteOperacion();
        } else {
            operacionDiv.style.display = 'none';
        }
    });

    // Muestra la siguiente operación
    function siguienteOperacion() {
        operacionDiv.style.display = 'block';
        siguienteBtn.style.display = 'none';
        feedback.textContent = '';
        respuestaInput.value = '';
        respuestaInput.focus();
        pregunta.textContent = `${tablaElegida} x ${posicion} = `;
    }

    // Valida la respuesta
    validarBtn.addEventListener('click', () => {
        const respuesta = respuestaInput.value;

        // Validar que el input no esté vacío
        if (respuesta === "") {
            feedback.innerHTML = '<span class="incorrect">Por favor, ingresa una respuesta antes de validar.</span>';
            return;
        }

        const respuestaNumerica = parseInt(respuesta);
        const resultadoCorrecto = tablaElegida * posicion;
        let esCorrecto = false;

        if (respuestaNumerica === resultadoCorrecto) {
            feedback.innerHTML = '<span class="correct">Correcto ✅</span>';
            esCorrecto = true;
        } else {
            feedback.innerHTML = `<span class="incorrect">Incorrecto ❌, la respuesta correcta es ${resultadoCorrecto}</span>`;
        }

        // Guardar la respuesta del usuario
        respuestasUsuario.push({
            operacion: `${tablaElegida} x ${posicion}`,
            respuestaUsuario: respuestaNumerica,
            resultadoCorrecto: resultadoCorrecto,
            esCorrecto: esCorrecto
        });

        siguienteBtn.style.display = 'block';  // Mostrar el botón de siguiente
    });

    // Pasa a la siguiente operación
    siguienteBtn.addEventListener('click', () => {
        posicion++;
        if (posicion <= 10) {
            siguienteOperacion();
        } else {
            operacionDiv.style.display = 'none';
            siguienteBtn.style.display = 'none';  // Ocultar el botón de siguiente en el resumen
            mostrarResultados();
        }
    });

    // Mostrar resultados finales
    function mostrarResultados() {
        let htmlResultados = '<h3>Resultados:</h3><table class="table table-bordered"><thead><tr><th>Operación</th><th>Tu Respuesta</th><th>Estado</th></tr></thead><tbody>';

        respuestasUsuario.forEach(item => {
            htmlResultados += `<tr>
                <td>${item.operacion} = ${item.resultadoCorrecto}</td>
                <td>${item.respuestaUsuario}</td>
                <td>${item.esCorrecto ? '<span class="correct">Correcto ✅</span>' : '<span class="incorrect">Incorrecto ❌</span> <span class="respuesta-correcta">(Correcta: ' + item.resultadoCorrecto + ')</span>'}</td>
            </tr>`;
        });

        htmlResultados += '</tbody></table>';
        resultadoFinal.innerHTML = htmlResultados;
    }
});

function guardarResultado(operacion, respuesta, estado) {
    const data = new FormData();
    data.append('usuario_id', 1); // ID de ejemplo, ajusta según sea necesario
    data.append('operacion', operacion);
    data.append('respuesta', respuesta);
    data.append('estado', estado);

    fetch('guardar_resultado.php', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(result => {
        console.log('Resultado guardado:', result);
    })
    .catch(error => console.error('Error al guardar resultado:', error));
}

function obtenerHistorial(usuario_id) {
    fetch(`historial.php?usuario_id=${usuario_id}`)
    .then(response => response.json())
    .then(data => {
        console.log('Historial:', data);
        // Aquí puedes manipular el DOM para mostrar el historial al usuario
    })
    .catch(error => console.error('Error al obtener historial:', error));
}


function descargarPDF(historial) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Historial de Resultados", 10, 10);

    historial.forEach((resultado, index) => {
        doc.text(`${resultado.operacion} = ${resultado.respuesta} (${resultado.estado})`, 10, 20 + (index * 10));
    });

    doc.save('historial.pdf');
}
