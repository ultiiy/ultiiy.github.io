function mostrarTime() {
    const data = new Date();
    const semana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][data.getDay()];
    const dia = data.getDate();
    const mes = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"][data.getMonth()];
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    const segundos = data.getSeconds().toString().padStart(2, "0");

    document.getElementById("time").innerHTML = `${semana}, ${dia} de ${mes} de ${ano}&ensp;${hora}:${minutos}`;
}

setInterval(mostrarTime, 1000);

function menu_telaCheia() {
    var menuTelaCheia = document.querySelector(".lancador-telaCheia");
    var docker = document.querySelector(".docker");
    var menuLateral = document.querySelector(".lançador-aplicativos");

    if (menuTelaCheia.style.display !== 'block') {
        docker.style.display = "none";
        menuTelaCheia.style.display = 'block';
        menuTelaCheia.classList.add("animate__animated", "animate__zoomInDown");
        setTimeout(function () {
            menuLateral.style.backgroundColor = "#131313";
        }, 865);
    } else {
        menuTelaCheia.classList.remove("animate__zoomInDown");
        menuTelaCheia.classList.add("animate__zoomOutDown");
        menuLateral.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        setTimeout(function () {
            docker.style.display = "block";
            menuTelaCheia.classList.remove("animate__animated", "animate__zoomOutDown");
            menuTelaCheia.style.display = 'none';
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const docker = document.querySelector('.docker');
    let isDragging = false;
    let offsetX, offsetY;
    let currentApp = null;

    function startDragging(e) {
        if (currentApp.getAttribute('draggable') !== 'true') {
            return; // Não inicie o movimento se draggable for false
        }
        isDragging = true;
        offsetX = e.clientX - currentApp.getBoundingClientRect().left;
        offsetY = e.clientY - currentApp.getBoundingClientRect().top;
        currentApp.classList.add('dragging');
    }

    function dragApp(e) {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            const maxX = docker.clientWidth - currentApp.offsetWidth;
            const maxY = docker.clientHeight - currentApp.offsetHeight;
            const boundedX = Math.min(Math.max(x, 0), maxX);
            const boundedY = Math.min(Math.max(y, 0), maxY);
            currentApp.style.left = boundedX + 'px';
            currentApp.style.top = boundedY + 'px';
        }
    }

    function stopDragging() {
        isDragging = false;
        currentApp.classList.remove('dragging');
    }

    document.querySelectorAll('.app').forEach(function (app) {
        app.addEventListener('mousedown', function (e) {
            currentApp = app;
            startDragging(e);
            document.addEventListener('mousemove', dragApp);
            document.addEventListener('mouseup', stopDragging);
        });
    });
});
