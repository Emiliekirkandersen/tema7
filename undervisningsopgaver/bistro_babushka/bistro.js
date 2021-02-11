let menubar = document.querySelector('.navigation');
window.addEventListener("scroll", function (skiftNav) {
    skiftNav.preventDefault();
    if (window.scrollY < 900) {



        menubar.style.backgroundColor = "transparent";
    } else {
        menubar.style.backgroundColor = "#090b0b";
        menubar.style.transitionDuration = "1s";
    }
});




const header = document.querySelector("header h1");
const medieurl = "https://babushka-dd8a.restdb.io/media/";
const myHeaders = {

    "x-apikey": "600ec2fb1346a1524ff12de4"
}
document.addEventListener("DOMContentLoaded", start)
let retter;
let filter = "menu";


// første funktion der kaldes efter DOM er loaded
function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));

    loadJSON();
}

function filtrerRetter() {
    filter = this.dataset.kategori; //sæt variablen "filter" til værdien af data-troende på den knap der er klikket på
    document.querySelector(".valgt").classList.remove("valgt"); // fjern klassen valgt fra den knap
    this.classList.add("valgt") // marker den knap der er klikket på
    visRetter(); // kald funktionen visPersoner efter det nye filter
    header.textContent = this.textContent;
}

async function loadJSON() {
    const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
        headers: myHeaders
    });
    retter = await JSONData.json();
    console.log("Retter", retter);
    visRetter();
}

//funktion der viser personer i liste view
function visRetter() {
    const dest = document.querySelector("#liste"); // container til articles med en person
    const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)
    dest.textContent = ""; //ryd container - ny loop

    retter.forEach(ret => {
        console.log("Kategorier", ret.kategori);
        // loop igennem json (personer)
        // tjek hvilken tro personen har og sammenlign med aktuelt filter elelr vis alle, hvis filter har værdigen "alle"
        if (filter == ret.kategori || filter == "menu") {
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".navn").textContent = ret.navn;
            klon.querySelector(".pris").textContent += `${ret.pris} kr.`;
            klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
            klon.querySelector(".billede").src = medieurl + ret.billede;
            klon.querySelector(".ret").addEventListener("click", () => visDetaljer(ret));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(hvem) {
    location.href = `singleview.html?id=${hvem._id}`;
}
