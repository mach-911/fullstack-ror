import { Navigation } from './assets/components/Navigation.js'
import { Card } from './assets/components/Card.js'

customElements.define("main-nav", Navigation);
customElements.define("enidev-card", Card);

const main = document.querySelector("main");

const verificar = (item) => {
    return item.length > 0;
}

const crearLink = (href, title, badge) => {
    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("target", "_blank");
    link.setAttribute("title", title);
    link.style.textDecoration = "none";
    link.style.color = "#333";
    link.style.margin = "0 2%";
    link.innerHTML = badge;
    return link;
}

const crearDetalle = (badge, desafio, modo) => {
    const details = document.createElement("details");
    // STYLE DETAILS
    details.style.border = "1px solid #aaa";
    details.style.borderRadius = "4px";
    details.style.padding = "0.5em 0.5em";
    details.style.backgroundColor = "#FFF";
    const summary = document.createElement("summary");
    summary.style.fontWeight = "bold";
    summary.style.margin = "-0.5em -0.5em 0";
    summary.style.padding = "0.5em";
    summary.style.cursor = "pointer";
    summary.style.userSelect = "none";
    summary.style.color = "#555";
    summary.innerHTML = `${modo} ${desafio.titulo}`;
    details.appendChild(summary);
    if (desafio.github) {
        details.appendChild(crearLink(
            desafio.github,
            "Github",
            badge.github));
    }
    if (desafio.github_page) {
        details.appendChild(crearLink(
            desafio.github_page,
            "Github Page",
            badge.github_page));
    }
    if (desafio.youtube) {
        details.appendChild(crearLink(
            desafio.youtube,
            "Ver en Youtube",
            badge.youtube));
    }
    if (desafio.zip) {
        details.appendChild(crearLink(
            desafio.zip,
            "Descargar zip",
            badge.zip));
    }
    if (desafio.maqueta) {
        details.appendChild(crearLink(
            desafio.maqueta,
            "Ir a maqueta",
            badge.adobe));
    }
    if (desafio.notion) {
        details.appendChild(crearLink(
            desafio.notion,
            "Ver en notion",
            badge.notion));
    }
    if (desafio.fly_io) {
        details.appendChild(crearLink(
            desafio.fly_io,
            "Despliegue fly.io",
            badge.fly_io));
    }
    if (desafio.hackmd) {
        details.appendChild(crearLink(
            desafio.hackmd,
            "Despliegue fly.io",
            badge.hackmd));
    }
    return details;
}

const crearItem = (item, index, arreglo) => {
    const bullet = document.createElement("wc-bullet-chain");
    bullet.style.borderRadius = "10px";
    bullet.style.paddingRight = "30px";
    bullet.style.margin = "10px auto";
    bullet.style.backgroundColor = "#FFCFCF";
    bullet.style.border = "8px solid #f039";
    let li = document.createElement("li");
    li.innerHTML = item.modulo;
    li.setAttribute("class", "title");
    li.style.fontSize = "22px";
    li.style.color = "#c15";
    li.style.fontWeight = "bold";
    li.style.cursor = "pointer";
    bullet.appendChild(li);
    // GUIADOS
    const guiados = arreglo.map((item) => item.guiados);
    guiados[index].forEach(desafio => {
        if (verificar(desafio.titulo)) {
            li = document.createElement("li");
            li.appendChild(crearDetalle(item.badges, desafio, item.badges.guiado));
            bullet.appendChild(li);
        }
    })
    // EVALUADOS
    const evaluados = arreglo.map((item) => item.evaluados);
    evaluados[index].forEach(desafio => {
        if (verificar(desafio.titulo)) {
            li = document.createElement("li");
            li.appendChild(crearDetalle(item.badges, desafio, item.badges.evaluado));
            bullet.appendChild(li);
        }
    })
    // EXAMEN
    li = document.createElement("li");
    li.appendChild(crearDetalle(item.badges, item.examen, item.badges.examen))
    bullet.appendChild(li);
    return bullet;
}

main.getAttribute("id") === "main" ?
    fetch("assets/data/desafios.json")
        .then(res => res.json())
        .then((data) => {
            if (localStorage.getItem("auth") === data.codigo) {
                data.modulos.forEach((item, index, arr) => {
                    main.appendChild(crearItem(item, index, arr));
                })
                setTimeout(() => {
                    // LISTENERS
                    document.querySelectorAll("wc-bullet-chain").forEach(e => {
                        let show = true;
                        e.shadowRoot.querySelector(".title").onclick = () => {
                            if (show) {
                                e.shadowRoot.querySelectorAll("details").forEach(detail => {
                                    detail.parentElement.style.display = "none";
                                    e.shadowRoot.querySelector(".title").style.color = "#555";
                                    show = false;
                                })
                            } else {
                                e.shadowRoot.querySelectorAll("details").forEach(detail => {
                                    detail.parentElement.style.display = "block";
                                    e.shadowRoot.querySelector(".title").style.color = "#c15";
                                    show = true;
                                })
                            }
                        }
                    })
                }, 1500)
            }
            else if (window.prompt('Código de autorización') === data.codigo) {
                localStorage.setItem("auth", data.codigo);
                location.reload();
            }
            else {
                document.write(`
                    <body style='display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:100vh;'>
                    <main-nav></main-nav>
                        <h1 style='text-align: center'>No estás autorizado</h1>
                        <img src='https://media.tenor.com/G8tm3S_8Un4AAAAd/que-cochino-emoji-triste.gif' alt='gif' height='200' style='border-radius: 50%'/>
                    </body>
                `)
            }
        })
        .catch(err => console.error(err.message))

    : main.getAttribute("id") === "software" ?
        fetch("assets/data/software.json")
            .then(res => res.json())
            .then((softwares) => {
                softwares.forEach((item, index, arr) => {
                    // const card = document.createElement("enidev-card");
                    // const h4 = document.createElement("h4");
                    // h4.setAttribute("slot", "title");
                    console.log(item)
                })
            })
            .catch(err => console.error(err.message))

        : ""