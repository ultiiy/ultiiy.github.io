/* - Horario na barra de tarefas  -------------------- */
function mostrarTime() {
    const dia = new Date().getDate();
    const mes = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"][new Date().getMonth()];
    const ano = new Date().getFullYear();
    const hora = new Date().getHours().toString().padStart(2, "0");
    const minutos = new Date().getMinutes().toString().padStart(2, "0");
    document.getElementById("time").innerHTML = `${dia} de ${mes} de ${ano}&ensp;${hora}:${minutos}`;
}

setInterval(mostrarTime, 1000);

/* - Tela cheia do lancador de aplicativos -------------------- */

function menu_telaCheia() {
    var menuTelaCheia = document.querySelector(".lancador-telaCheia");
    var docker = document.querySelector(".docker");
    var menuLateral = document.querySelector(".lançador-aplicativos");

    if (menuTelaCheia.style.display !== 'block') {
        docker.style.display = "none";
        menuTelaCheia.style.display = 'block';
        menuLateral.style.backgroundColor = "#131313";
    } else {
        docker.style.display = "block";
        menuTelaCheia.style.display = 'none';
        menuLateral.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    }
}
