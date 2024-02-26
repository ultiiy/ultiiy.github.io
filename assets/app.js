let appData = {
    "app1": {
        "nome": "Villager Life",
        "logo": "./assets/images/Villager Life.png",
        "url": "./assets/projetos/villager-life/index.html",
        "aberto": false
    },
    "app2": {
        "nome": "Jogo da Memoria",
        "logo": "./assets/images/Jogo da memoria.png",
        "url": "./assets/projetos/jogo-da-memoria/index.html",
        "aberto": false
    },
    "app3": {
        "nome": "Terminal",
        "logo": "./assets/icons/terminal-app.png",
        "url": "./apps/terminal.html",
        "aberto": false
    }
};

// Variáveis para o estado do arrasto
let dragging = false;
let offsetX = 0;
let offsetY = 0;
let currentApp = null;

let openedApps = [];

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

    function createApp(appId) {
        let app = appData[appId];
        if (app && !app.aberto) {
            let appDiv = document.createElement('div');
            appDiv.className = 'app';
            appDiv.draggable = false;
            appDiv.dataset.appId = appId;

            let menuJanela = document.createElement('div');
            menuJanela.className = 'menu-janela';

            let infoSpan = document.createElement('span');
            infoSpan.className = 'info';

            let logoImg = document.createElement('img');
            logoImg.id = 'logoAPP';
            logoImg.src = app.logo;
            logoImg.alt = app.nome;

            let nomeP = document.createElement('p');
            nomeP.id = 'nomeAPP';
            nomeP.textContent = app.nome;

            infoSpan.appendChild(logoImg);
            infoSpan.appendChild(nomeP);

            let iconsSpan = document.createElement('span');
            iconsSpan.className = 'icons-menuJanela';

            let minimizarIcon = document.createElement('i');
            minimizarIcon.className = 'bi bi-dash';
            minimizarIcon.onclick = minimizarAPP;

            let maximizarIcon = document.createElement('i');
            maximizarIcon.id = 'maximizarAPP';
            maximizarIcon.className = 'bi bi-copy';
            maximizarIcon.style.fontSize = '12px';
            maximizarIcon.onclick = function () {
                toggleFullScreen(appDiv);
            };

            let fecharIcon = document.createElement('i');
            fecharIcon.className = 'bi bi-x-lg';
            fecharIcon.onclick = function () {
                fecharAPP(appId);
            };

            iconsSpan.appendChild(minimizarIcon);
            iconsSpan.appendChild(maximizarIcon);
            iconsSpan.appendChild(fecharIcon);

            menuJanela.appendChild(infoSpan);
            menuJanela.appendChild(iconsSpan);

            let janelaDiv = document.createElement('div');
            janelaDiv.className = 'janela';
            janelaDiv.innerHTML = '<iframe src="' + app.url + '"></iframe>';

            appDiv.appendChild(menuJanela);
            appDiv.appendChild(janelaDiv);

            docker.appendChild(appDiv);
            app.aberto = true;

            // Adicionar evento de arrastar
            menuJanela.addEventListener('mousedown', function (e) {
                currentApp = appDiv;
                startDrag(e);
                e.preventDefault();
            });

            document.addEventListener('mousemove', dragApp);
            document.addEventListener('mouseup', stopDrag);

            // Adicionar aos aplicativos abertos
            openedApps.push(appId);
        }
    }

    function minimizarAPP() {
        if (currentApp !== null) {
            currentApp.style.display = 'none';
        }
    }

    function fecharAPP(appId) {
        let app = appData[appId];
        if (app && app.aberto) {
            app.aberto = false;
            let appElement = document.querySelector(`.app[data-app-id="${appId}"]`);
            if (appElement) {
                appElement.remove();
            }
            openedApps = openedApps.filter(id => id !== appId); // Remove o appId dos aplicativos abertos
        }
    }

    // Função para iniciar o arrasto
    function startDrag(e) {
        dragging = true;
        let bounds = currentApp.getBoundingClientRect();
        offsetX = e.clientX - bounds.left;
        offsetY = e.clientY - bounds.top;
        e.preventDefault(); // Evita o comportamento padrão do navegador
    }

    // Função para arrastar o aplicativo
    function dragApp(e) {
        if (dragging) {
            const dockerRect = docker.getBoundingClientRect();
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            // Verifica se a nova posição está dentro dos limites da docker
            if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft + currentApp.offsetWidth > dockerRect.width) {
                newLeft = dockerRect.width - currentApp.offsetWidth;
            }

            if (newTop < 0) {
                newTop = 0;
            } else if (newTop + currentApp.offsetHeight > dockerRect.height) {
                newTop = dockerRect.height - currentApp.offsetHeight;
            }

            // Define a nova posição da div .app
            currentApp.style.left = newLeft + 'px';
            currentApp.style.top = newTop + 'px';
        }
    }

    // Função para parar o arrasto
    function stopDrag() {
        dragging = false;
    }

    // Seleciona todas as imagens com a classe .icon-app
    document.querySelectorAll('.icon-app img').forEach(function (img) {
        img.addEventListener('mousedown', function () {
            // Obtém o data-app-id da imagem clicada
            let appId = img.dataset.appId;
            // Chama a função para criar o aplicativo com o ID correspondente
            createApp(appId);
        });
    });

});
 