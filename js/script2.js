// =========================================
// CARROSSEL DE FOTOS
// =========================================

// =========================================
// ABERTURA DO ENVELOPE
// =========================================

const telaEnvelope =
    document.getElementById("tela-envelope");

const botaoAbrirConvite =
    document.getElementById("abrir-convite");

const landingPage =
    document.getElementById("landing-page");

const musica =
    document.getElementById("musica-convite");

const controleMusica =
    document.getElementById("controle-musica");

const iconeMusica =
    document.getElementById("icone-musica");


let conviteAberto = false;

let musicaTocando = false;


// =========================================
// ABRIR CONVITE
// =========================================

function abrirConvite() {

    if (conviteAberto) {
        return;
    }

    conviteAberto = true;


    // -------------------------------------
    // Inicia a animação do envelope
    // -------------------------------------

    telaEnvelope.classList.add(
        "abrindo"
    );


    // -------------------------------------
    // Tenta iniciar a música
    // -------------------------------------

    iniciarMusica();


    // -------------------------------------
    // Depois da animação,
    // mostra a landing page
    // -------------------------------------

    setTimeout(() => {

        telaEnvelope.classList.add(
            "fechada"
        );

        landingPage.classList.add(
            "visivel"
        );

        document.body.classList.add(
            "convite-aberto"
        );

    }, 1100);

}


// =========================================
// CLIQUE NO ENVELOPE
// =========================================

botaoAbrirConvite.addEventListener(
    "click",
    abrirConvite
);



const fotos = [
    "imagens/couple-1.jpg",
    "imagens/couple-2.jpg",
    "imagens/couple-3.jpg"
];

let fotoAtual = 0;

const carrossel = document.querySelector(".carrossel");

if (carrossel) {

    fotos.forEach((foto, index) => {

        const imagem = document.createElement("img");

        imagem.src = foto;
        imagem.alt = `Foto do casal ${index + 1}`;

        imagem.classList.add("foto-carrossel");

        if (index === 0) {
            imagem.classList.add("ativa");
        }

        carrossel.appendChild(imagem);
    });

    const imagens = document.querySelectorAll(".foto-carrossel");

    setInterval(() => {

        imagens[fotoAtual].classList.remove("ativa");

        fotoAtual++;

        if (fotoAtual >= imagens.length) {
            fotoAtual = 0;
        }

        imagens[fotoAtual].classList.add("ativa");

    }, 2000);
}
// =========================================
// SISTEMA DE MODAIS
// =========================================


// =========================================
// ABRIR MODAL
// =========================================

function abrirModal(id) {

    const modal = document.getElementById(id);

    if (!modal) {
        return;
    }

    modal.classList.add("aberto");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    const botaoFechar =
        modal.querySelector(".modal-fechar");

    if (botaoFechar) {
        setTimeout(() => {
            botaoFechar.focus();
        }, 100);
    }
}


// =========================================
// FECHAR MODAL
// =========================================

function fecharModal(id) {

    const modal = document.getElementById(id);

    if (!modal) {
        return;
    }

    modal.classList.remove("aberto");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


// =========================================
// BOTÕES DO CONVITE
// =========================================


// LOCALIZAÇÃO

const botaoLocalizacao =
    document.getElementById("botao-localizacao");

if (botaoLocalizacao) {

    botaoLocalizacao.addEventListener(
        "click",
        () => {
            abrirModal("modal-localizacao");
        }
    );

}


// CONFIRMAÇÃO

const botaoPresenca =
    document.getElementById("botao-presenca");

if (botaoPresenca) {

    botaoPresenca.addEventListener(
        "click",
        () => {
            abrirModal("modal-presenca");
        }
    );

}


// PRESENTE

const botaoPresente =
    document.getElementById("botao-presente");

if (botaoPresente) {

    botaoPresente.addEventListener(
        "click",
        () => {
            abrirModal("modal-presente");
        }
    );

}


// =========================================
// BOTÕES DE FECHAR
// =========================================

const botoesFechar =
    document.querySelectorAll("[data-fechar]");


botoesFechar.forEach((botao) => {

    botao.addEventListener(
        "click",
        () => {

            const id =
                botao.getAttribute("data-fechar");

            fecharModal(id);

        }
    );

});


// =========================================
// CLICAR FORA DO MODAL
// =========================================

const modais =
    document.querySelectorAll(".modal-overlay");


modais.forEach((modal) => {

    modal.addEventListener(
        "click",
        (evento) => {

            if (
                evento.target === modal
            ) {

                fecharModal(modal.id);

            }

        }
    );

});


// =========================================
// TECLA ESC
// =========================================

document.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key !== "Escape") {
            return;
        }

        const modalAberto =
            document.querySelector(
                ".modal-overlay.aberto"
            );

        if (modalAberto) {

            fecharModal(
                modalAberto.id
            );

        }

    }
);


// =========================================
// COPIAR PIX
// =========================================

const copiarPix =
    document.getElementById("copiar-pix");

const chavePix =
    document.getElementById("chave-pix");

const mensagemCopiado =
    document.getElementById("mensagem-copiado");


if (
    copiarPix &&
    chavePix &&
    mensagemCopiado
) {

    copiarPix.addEventListener(
        "click",
        async () => {

            const valor =
                chavePix.textContent.trim();

            try {

                await navigator.clipboard.writeText(
                    valor
                );

                mensagemCopiado.textContent =
                    "Chave PIX copiada.";

                copiarPix.textContent =
                    "PIX copiado";

                setTimeout(() => {

                    mensagemCopiado.textContent =
                        "";

                    copiarPix.textContent =
                        "Copiar chave PIX";

                }, 2500);

            } catch (erro) {

                mensagemCopiado.textContent =
                    "Não foi possível copiar automaticamente.";

            }

        }
    );

}

// =========================================
// CONTADOR REGRESSIVO
// =========================================

// Data e hora do casamento
// 12 de dezembro de 2026 às 17:00
// Horário de Brasília: UTC-03:00

const dataCasamento =
    new Date("2026-12-19T17:00:00-03:00").getTime();


// Elementos do contador

const elementoDias =
    document.getElementById("dias");

const elementoHoras =
    document.getElementById("horas");

const elementoMinutos =
    document.getElementById("minutos");

const elementoSegundos =
    document.getElementById("segundos");

const elementoContador =
    document.getElementById("contador");


// =========================================
// FUNÇÃO DE ATUALIZAÇÃO
// =========================================

function atualizarContador() {

    const agora =
        new Date().getTime();

    const diferenca =
        dataCasamento - agora;


    // =====================================
    // CASAMENTO CHEGOU
    // =====================================

    if (diferenca <= 0) {

        elementoDias.textContent = "00";
        elementoHoras.textContent = "00";
        elementoMinutos.textContent = "00";
        elementoSegundos.textContent = "00";

        elementoContador.classList.add(
            "casamento-chegou"
        );

        return;
    }


    // =====================================
    // CÁLCULO
    // =====================================

    const dias =
        Math.floor(
            diferenca /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (diferenca %
                (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
        );


    const minutos =
        Math.floor(
            (diferenca %
                (1000 * 60 * 60)) /
                (1000 * 60)
        );


    const segundos =
        Math.floor(
            (diferenca %
                (1000 * 60)) /
                1000
        );


    // =====================================
    // EXIBIÇÃO
    // =====================================

    elementoDias.textContent =
        String(dias).padStart(2, "0");


    elementoHoras.textContent =
        String(horas).padStart(2, "0");


    elementoMinutos.textContent =
        String(minutos).padStart(2, "0");


    elementoSegundos.textContent =
        String(segundos).padStart(2, "0");
}


// =========================================
// EXECUTA IMEDIATAMENTE
// =========================================

atualizarContador();


// =========================================
// ATUALIZA A CADA SEGUNDO
// =========================================

setInterval(
    atualizarContador,
    1000
);

 // =========================================
 // MÚSICA DO CONVITE
 // =========================================

const musica =
    document.getElementById("musica-convite");

const controleMusica =
    document.getElementById("controle-musica");

const iconeMusica =
    document.getElementById("icone-musica");


// =========================================
// ESTADO INICIAL
// =========================================

let musicaTocando = false;


// =========================================
// ATUALIZA O BOTÃO
// =========================================

function atualizarControleMusica() {

    if (musicaTocando) {

        controleMusica.classList.add(
            "tocando"
        );

        controleMusica.setAttribute(
            "aria-label",
            "Pausar música"
        );

        controleMusica.setAttribute(
            "aria-pressed",
            "true"
        );

        iconeMusica.textContent = "♫";

    } else {

        controleMusica.classList.remove(
            "tocando"
        );

        controleMusica.setAttribute(
            "aria-label",
            "Reproduzir música"
        );

        controleMusica.setAttribute(
            "aria-pressed",
            "false"
        );

        iconeMusica.textContent = "♪";

    }
}


// =========================================
// TENTAR INICIAR AUTOMATICAMENTE
// =========================================

async function iniciarMusica() {

    try {

        await musica.play();

        musicaTocando = true;

        atualizarControleMusica();

    } catch (erro) {

        /*
         * O navegador bloqueou o autoplay.
         * A música será iniciada na primeira
         * interação do usuário.
         */

        musicaTocando = false;

        atualizarControleMusica();

    }

}


// =========================================
// BOTÃO PLAY / PAUSE
// =========================================

controleMusica.addEventListener(
    "click",
    () => {

        if (musica.paused) {

            musica.play();

            musicaTocando = true;

        } else {

            musica.pause();

            musicaTocando = false;

        }

        atualizarControleMusica();

    }
);


// =========================================
// PRIMEIRA INTERAÇÃO
// =========================================

let usuarioInteragiu = false;

function iniciarNaPrimeiraInteracao() {

    if (usuarioInteragiu) {
        return;
    }

    usuarioInteragiu = true;

    if (musica.paused) {

        musica.play()
            .then(() => {

                musicaTocando = true;

                atualizarControleMusica();

            })
            .catch(() => {});

    }

}

document.addEventListener(
    "click",
    iniciarNaPrimeiraInteracao,
    {
        once: true
    }
);

document.addEventListener(
    "touchstart",
    iniciarNaPrimeiraInteracao,
    {
        once: true
    }
);

// =========================================
// INICIAR
// =========================================

iniciarMusica();