function mostrarTime() {
    const data = new Date();
    const semana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][data.getDay()];
    const dia = data.getDate();
    const mes = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"][data.getMonth()];
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    const segundos = data.getSeconds().toString().padStart(2, "0");

    document.getElementById("time").innerHTML = `${semana}, ${dia} de ${mes} de ${ano}&ensp;${hora}:${minutos}:${segundos}`;
}

setInterval(mostrarTime, 1000);

function menu_telaCheia() {
    var menuTelaCheia = document.querySelector(".lancador-telaCheia");
    var container = document.querySelector(".docker");
    var menuLateral = document.querySelector(".lançador-aplicativos");

    if (menuTelaCheia.style.display !== 'block') {
        container.style.display = "none";
        menuTelaCheia.style.display = 'block';
        menuTelaCheia.classList.add("animate__animated", "animate__zoomInDown");
        setTimeout(function () {
            menuLateral.style.backgroundColor = "#131313";
        }, 865);
    } else {
        menuTelaCheia.classList.remove("animate__zoomInDown");
        menuTelaCheia.classList.add("animate__zoomOutDown");
        menuLateral.style.backgroundColor = "rgba(0, 0, 0, 0.65)";
        setTimeout(function () {
            container.style.display = "block";
            menuTelaCheia.classList.remove("animate__animated", "animate__zoomOutDown");
            menuTelaCheia.style.display = 'none';
        }, 1000);
    }
}
