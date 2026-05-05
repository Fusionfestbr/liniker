const ingressos = [
{
    evento: "KORN",
    data: "Sábado - 16/mai/26",
    setor: "CADEIRA INFERIOR",
    entrada: "PORTÃO C",
    secao: "CAD. INFERIOR",
    nome: "Wagner Osório Lima",
    tipo: "INTEIRA",
    valor: "R$ 645,00",
    taxa: "Taxa de Serviço: R$ 140,60",
    taxaAdm: "Taxa ADM*: R$ 21,00",
    thumb: "assets/korn.png",
    qr: [
        "assets/qr1.png",
        "assets/qr2.png",
        "assets/qr3.png",
        "assets/qr4.png",
        "assets/qr5.png"
    ]
},
{
    evento: "KORN",
    data: "Sábado - 16/mai/26",
    setor: "CADEIRA SUPERIOR",
    entrada: "PORTÃO B",
    secao: "CAD. SUPERIOR",
    nome: "Maria Silva",
    tipo: "INTEIRA",
    valor: "R$ 365,00",
    taxa: "Taxa de Serviço: R$ 79,80",
    taxaAdm: "Taxa ADM*: R$ 21,00",
    thumb: "assets/korn.png",
    qr: [
        "assets/qr1.png",
        "assets/qr2.png",
        "assets/qr3.png",
        "assets/qr4.png",
        "assets/qr5.png"
    ]
},
{
    evento: "KORN",
    data: "Sábado - 16/mai/26",
    setor: "PISTA PREMIUM",
    entrada: "PORTÃO B",
    secao: "PISTA PREMIUM",
    nome: "Carlos Lima",
    tipo: "INTEIRA",
    valor: "R$ 995,00",
    taxa: "Taxa de Serviço: R$ 217,60",
    taxaAdm: "Taxa ADM*: R$ 21,00",
    thumb: "assets/korn.png",
    qr: [
        "assets/qr1.png",
        "assets/qr2.png",
        "assets/qr3.png",
        "assets/qr4.png",
        "assets/qr5.png"
    ]
},
{
    evento: "KORN",
    data: "Sábado - 16/mai/26",
    setor: "PISTA",
    entrada: "PORTÃO A",
    secao: "PISTA",
    nome: "Fernanda Costa",
    tipo: "INTEIRA",
    valor: "R$ 495,00",
    taxa: "Taxa de Serviço: R$ 108,40",
    taxaAdm: "Taxa ADM*: R$ 21,00",
    thumb: "assets/korn.png",
    qr: [
        "assets/qr1.png",
        "assets/qr2.png",
        "assets/qr3.png",
        "assets/qr4.png",
        "assets/qr5.png"
    ]
}
];

const el = {
    headerTitulo: document.getElementById("headerTitulo"),
    eventoTitulo: document.getElementById("eventoTitulo"),
    data: document.getElementById("data"),
    setor: document.getElementById("setor"),
    entrada: document.getElementById("entrada"),
    secao: document.getElementById("secao"),
    nome: document.getElementById("nome"),
    tipo: document.getElementById("tipo"),
    valor: document.getElementById("valor"),
    taxa: document.getElementById("taxa"),
    taxaAdm: document.getElementById("taxaAdm"),
    thumb: document.getElementById("thumb"),
    qr: document.getElementById("qr-image"),
    tabs: document.getElementById("tabs")
};

let qrTimer;
let qrIndex = 0;

function criarAbas() {
    el.tabs.innerHTML = "";
    ingressos.forEach((_, i) => {
        const tab = document.createElement("div");
        tab.className = "tab";
        tab.innerText = `Ingresso ${i + 1}`;
        tab.addEventListener("click", () => carregar(i));
        el.tabs.appendChild(tab);
    });
}

function atualizarAbas(index) {
    document.querySelectorAll(".tab").forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
    });
}

function carregar(i) {
    const d = ingressos[i];

    el.headerTitulo.innerText = d.evento;
    el.eventoTitulo.innerText = d.evento;
    el.data.innerText = d.data;
    el.setor.innerText = d.setor;
    el.entrada.innerText = d.entrada;
    el.secao.innerText = d.secao;
    el.nome.innerText = d.nome;
    el.tipo.innerText = d.tipo;
    el.valor.innerText = d.valor;
    el.taxa.innerText = d.taxa;
    el.taxaAdm.innerText = d.taxaAdm;
    el.thumb.src = d.thumb;

    qrIndex = 0;
    el.qr.src = d.qr[0];

    clearInterval(qrTimer);

    qrTimer = setInterval(() => {
        qrIndex = (qrIndex + 1) % d.qr.length;
        el.qr.src = d.qr[qrIndex];
    }, 20000); // troca a cada 20 segundos

    atualizarAbas(i);
}

criarAbas();
carregar(0);