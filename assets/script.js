/* - Horario na barra de tarefas  -------------------- */
function mostrarTime() {
    const data = new Date();
    const semana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][data.getDay()];
    const dia = data.getDate();
    const mes = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"][data.getMonth()];
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");

    document.getElementById("time").innerHTML = `${semana}, ${dia} de ${mes} de ${ano}&ensp;${hora}:${minutos}`;
}

setInterval(mostrarTime, 1000);

/* - TEla cheia do lancador de aplicativos -------------------- */

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

/* - Dragging para movimentar na div -------------------- */

document.addEventListener('DOMContentLoaded', function () {
    const docker = document.querySelector('.docker');
    let isDragging = false;
    let offsetX, offsetY;
    let currentApp = null;

    function startDragging(e) {
        isDragging = true;
        const dockerRect = docker.getBoundingClientRect();
        const appRect = currentApp.getBoundingClientRect();
        offsetX = e.clientX - appRect.left + dockerRect.left;
        offsetY = e.clientY - appRect.top + dockerRect.top;
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
        const menuJanela = app.querySelector('.menu-janela');
        menuJanela.addEventListener('mousedown', function (e) {
            currentApp = app;
            startDragging(e);
            document.addEventListener('mousemove', dragApp);
            document.addEventListener('mouseup', stopDragging);
            e.preventDefault();
        });
    });
});

/* - Colocar o APP em tela cheia -------------------- */

document.addEventListener('DOMContentLoaded', function () {
    const docker = document.querySelector('.docker');
    const originalPositions = {};

    function toggleFullScreen(app) {
        const appRect = app.getBoundingClientRect();
        const dockerRect = docker.getBoundingClientRect();

        if (!originalPositions[app]) {
            originalPositions[app] = {
                width: app.style.width,
                height: app.style.height,
                left: app.style.left,
                top: app.style.top
            };
        }

        if (appRect.width < dockerRect.width || appRect.height < dockerRect.height) {
            app.style.width = dockerRect.width + 'px';
            app.style.height = dockerRect.height + 'px';
            app.style.left = '0';
            app.style.top = '0';
        } else {
            // Restaura as dimensões e posição originais da div .app
            const originalPos = originalPositions[app];
            app.style.width = originalPos.width;
            app.style.height = originalPos.height;
            app.style.left = originalPos.left;
            app.style.top = originalPos.top;
            delete originalPositions[app];
        }
    }

    document.querySelectorAll('.app').forEach(function (app) {
        const menuJanela = app.querySelector('.menu-janela');
        menuJanela.addEventListener('dblclick', function (e) {
            toggleFullScreen(app);
        });

        app.addEventListener('mousedown', function (e) {
            e.preventDefault(); // Evita a seleção de texto ao clicar e arrastar
        });
    });

    const maximizeButton = document.getElementById('maximizarAPP');
    maximizeButton.addEventListener('click', function () {
        const app = document.querySelector('.app');
        toggleFullScreen(app);
    });
});


/* -   -------------------- */


db