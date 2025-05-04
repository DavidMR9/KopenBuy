document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modal1");
    const openModalBtn = document.getElementById("openModal");
    const modal2 = document.getElementById("modal2");
    const openModalBtn2 = document.getElementById("openModal2");
    const loginForm = document.getElementById("loginForm");
    const mensaje = document.getElementById("mensaje");
    
    openModalBtn2.onclick = () => modal2.style.display = "block";

    openModalBtn.onclick = () => modal.style.display = "block";

    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const usuario = document.getElementById("usuario").value;
        const contrasena = document.getElementById("contrasena").value;
        const cargo = document.getElementById("cargo").value;

        if (usuario === "admin" && contrasena === "1234" && cargo.toLowerCase() === "administrador") {
            mensaje.textContent = "Acceso concedido.";
            mensaje.style.color = "green";
            window.location.href = "admin.html";

        } else {
            mensaje.textContent = "Datos incorrectos.";
            mensaje.style.color = "red";
        }

    };
    const closeButton = modal.querySelector('.close');
    const closeButton2 = modal2.querySelector('.close-2')
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    closeButton2.addEventListener('click', function () {
        modal2.style.display = 'none';
    });
});
/* -----Modal 2--*/

 
 

