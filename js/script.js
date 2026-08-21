// ============================================================
// LANDING PAGE DE CASAMENTO
// Thaissa & Wanderson
// ============================================================


// ============================================================
// 1. ABERTURA DO ENVELOPE
// ============================================================

const telaEnvelope =
    document.getElementById("tela-envelope");

const botaoAbrirConvite =
    document.getElementById("abrir-convite");

const landingPage =
    document.getElementById("landing-page");

let conviteAberto = false;


// ============================================================
// 2. MÚSICA DO CONVITE
// ============================================================

const musica =
    document.getElementById("musica-convite");

const controleMusica =
    document.getElementById("controle-musica");

const iconeMusica =
    document.getElementById("icone-musica");

let musicaTocando = false;


// ============================================================
// ATUALIZA O BOTÃO DA MÚSICA
// ============================================================

function atualizarControleMusica() {

    if (!controleMusica || !iconeMusica) {
        return;
    }

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


// ============================================================
// INICIAR MÚSICA
// ============================================================

async function iniciarMusica() {

    if (!musica) {
        return;
    }

    try {

        await musica.play();

        musicaTocando = true;

        atualizarControleMusica();

    } catch (erro) {

        musicaTocando = false;

        atualizarControleMusica();

        console.warn(
            "Não foi possível iniciar a música:",
            erro
        );
    }
}


// ============================================================
// PLAY / PAUSE
// ============================================================

if (controleMusica) {

    controleMusica.addEventListener(
        "click",
        async () => {

            if (!musica) {
                return;
            }

            if (musica.paused) {

                try {

                    await musica.play();

                    musicaTocando = true;

                } catch (erro) {

                    musicaTocando = false;

                    console.warn(
                        "Não foi possível reproduzir a música:",
                        erro
                    );
                }

            } else {

                musica.pause();

                musicaTocando = false;
            }

            atualizarControleMusica();
        }
    );
}


// ============================================================
// ABRIR CONVITE
// ============================================================

function abrirConvite() {

    if (conviteAberto) {
        return;
    }

    conviteAberto = true;


    // --------------------------------------------
    // Começa a animação da tampa
    // --------------------------------------------

    if (telaEnvelope) {

        telaEnvelope.classList.add(
            "abrindo"
        );
    }


    // --------------------------------------------
    // O clique do usuário permite iniciar
    // a música mesmo em navegadores que
    // bloqueiam autoplay
    // --------------------------------------------

    iniciarMusica();


    // --------------------------------------------
    // Aguarda a animação do envelope
    // --------------------------------------------

    setTimeout(() => {

        if (telaEnvelope) {

            telaEnvelope.classList.add(
                "fechada"
            );
        }


        if (landingPage) {

            landingPage.classList.add(
                "visivel"
            );
        }


        document.body.classList.add(
            "convite-aberto"
        );


        // Mostra o controle da música
        if (controleMusica) {

            controleMusica.style.display =
                "flex";
        }

    }, 1100);
}


// ============================================================
// CLIQUE PARA ABRIR O ENVELOPE
// ============================================================

if (botaoAbrirConvite) {

    botaoAbrirConvite.addEventListener(
        "click",
        abrirConvite
    );
}


// ============================================================
// ESCONDE O BOTÃO DA MÚSICA ENQUANTO
// O ENVELOPE ESTÁ FECHADO
// ============================================================

if (controleMusica) {

    controleMusica.style.display =
        "none";
}


// ============================================================
// 3. CARROSSEL
// ============================================================

const fotos = [
    "imagens/couple-1.jpg",
    "imagens/couple-2.jpg",
    "imagens/couple-3.jpg"
];

const carrossel =
    document.querySelector(".carrossel");

let fotoAtual = 0;


if (carrossel) {

    fotos.forEach(
        (foto, index) => {

            const imagem =
                document.createElement("img");

            imagem.src = foto;

            imagem.alt =
                `Foto do casal ${index + 1}`;

            imagem.classList.add(
                "foto-carrossel"
            );


            if (index === 0) {

                imagem.classList.add(
                    "ativa"
                );
            }


            carrossel.appendChild(
                imagem
            );
        }
    );


    const imagensCarrossel =
        carrossel.querySelectorAll(
            ".foto-carrossel"
        );


    // --------------------------------------------
    // TROCA A CADA 2 SEGUNDOS
    // --------------------------------------------

    setInterval(
        () => {

            if (!imagensCarrossel.length) {
                return;
            }


            imagensCarrossel[
                fotoAtual
            ].classList.remove(
                "ativa"
            );


            fotoAtual++;


            if (
                fotoAtual >=
                imagensCarrossel.length
            ) {

                fotoAtual = 0;
            }


            imagensCarrossel[
                fotoAtual
            ].classList.add(
                "ativa"
            );

        },
        2000
    );
}


// ============================================================
// 4. SISTEMA DE MODAIS
// ============================================================


// ============================================================
// ABRIR MODAL
// ============================================================

function abrirModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) {
        return;
    }


    modal.classList.add(
        "aberto"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    // Impede o scroll da página
    // enquanto o modal está aberto

    document.body.style.overflow =
        "hidden";


    // Coloca o foco no botão fechar

    const botaoFechar =
        modal.querySelector(
            ".modal-fechar"
        );


    if (botaoFechar) {

        setTimeout(
            () => {

                botaoFechar.focus();

            },
            100
        );
    }
}


// ============================================================
// FECHAR MODAL
// ============================================================

function fecharModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "aberto"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


// ============================================================
// BOTÃO LOCALIZAÇÃO
// ============================================================

const botaoLocalizacao =
    document.getElementById(
        "botao-localizacao"
    );


if (botaoLocalizacao) {

    botaoLocalizacao.addEventListener(
        "click",
        () => {

            abrirModal(
                "modal-localizacao"
            );

        }
    );
}

// ============================================================
// BOTÃO CONFIRMAÇÃO DE PRESENÇA
// ============================================================

const botaoPresenca =
    document.getElementById(
        "botao-presenca"
    );

const lembreteConfirmacao =
    document.getElementById(
        "lembrete-confirmacao"
    );

const okLembreteConfirmacao =
    document.getElementById(
        "ok-lembrete-confirmacao"
    );


if (
    botaoPresenca &&
    lembreteConfirmacao
) {

    botaoPresenca.addEventListener(
        "click",
        () => {

            lembreteConfirmacao.classList.add(
                "aberto"
            );

            lembreteConfirmacao.setAttribute(
                "aria-hidden",
                "false"
            );


            // Coloca o foco no botão OK

            setTimeout(
                () => {

                    if (okLembreteConfirmacao) {

                        okLembreteConfirmacao.focus();

                    }

                },
                100
            );

        }
    );
}


// ============================================================
// BOTÃO OK DO LEMBRETE
// ============================================================

if (okLembreteConfirmacao) {

    okLembreteConfirmacao.addEventListener(
        "click",
        () => {

            lembreteConfirmacao.classList.remove(
                "aberto"
            );

            lembreteConfirmacao.setAttribute(
                "aria-hidden",
                "true"
            );


            // Agora abre o formulário

            abrirModal(
                "modal-presenca"
            );

        }
    );
}

// ============================================================
// BOTÃO SUGESTÃO DE PRESENTE
// ============================================================

const botaoPresente =
    document.getElementById(
        "botao-presente"
    );


if (botaoPresente) {

    botaoPresente.addEventListener(
        "click",
        () => {

            abrirModal(
                "modal-presente"
            );

        }
    );
}


// ============================================================
// BOTÕES DE FECHAR
// ============================================================

const botoesFechar =
    document.querySelectorAll(
        "[data-fechar]"
    );


botoesFechar.forEach(
    (botao) => {

        botao.addEventListener(
            "click",
            () => {

                const id =
                    botao.getAttribute(
                        "data-fechar"
                    );


                fecharModal(id);

            }
        );
    }
);


// ============================================================
// CLICAR FORA DO MODAL
// ============================================================

const modais =
    document.querySelectorAll(
        ".modal-overlay"
    );


modais.forEach(
    (modal) => {

        modal.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target ===
                    modal
                ) {

                    fecharModal(
                        modal.id
                    );
                }
            }
        );
    }
);


// ============================================================
// FECHAR COM ESC
// ============================================================

document.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key !==
            "Escape"
        ) {

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


// ============================================================
// 5. COPIAR PIX
// ============================================================

const copiarPix =
    document.getElementById(
        "copiar-pix"
    );

const chavePix =
    document.getElementById(
        "chave-pix"
    );

const mensagemCopiado =
    document.getElementById(
        "mensagem-copiado"
    );


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

                await navigator.clipboard
                    .writeText(valor);


                mensagemCopiado.textContent =
                    "Chave PIX copiada.";


                copiarPix.textContent =
                    "PIX copiado";


                setTimeout(
                    () => {

                        mensagemCopiado.textContent =
                            "";

                        copiarPix.textContent =
                            "Copiar chave PIX";

                    },
                    2500
                );


            } catch (erro) {

                mensagemCopiado.textContent =
                    "Não foi possível copiar automaticamente.";
            }

        }
    );
}


// ============================================================
// 6. CONTADOR REGRESSIVO
// ============================================================

// Casamento:
// 19 de dezembro de 2026
// às 17:00
// Horário de Brasília (UTC-03:00)

const dataCasamento =
    new Date(
        "2026-12-19T17:00:00-03:00"
    ).getTime();


const elementoDias =
    document.getElementById(
        "dias"
    );

const elementoHoras =
    document.getElementById(
        "horas"
    );

const elementoMinutos =
    document.getElementById(
        "minutos"
    );

const elementoSegundos =
    document.getElementById(
        "segundos"
    );

const elementoContador =
    document.getElementById(
        "contador"
    );


// ============================================================
// ATUALIZAR CONTADOR
// ============================================================

function atualizarContador() {

    if (
        !elementoDias ||
        !elementoHoras ||
        !elementoMinutos ||
        !elementoSegundos
    ) {

        return;
    }


    const agora =
        new Date().getTime();


    const diferenca =
        dataCasamento - agora;


    // --------------------------------------------
    // DATA ATINGIDA
    // --------------------------------------------

    if (diferenca <= 0) {

        elementoDias.textContent =
            "00";

        elementoHoras.textContent =
            "00";

        elementoMinutos.textContent =
            "00";

        elementoSegundos.textContent =
            "00";


        if (elementoContador) {

            elementoContador.classList.add(
                "casamento-chegou"
            );
        }


        return;
    }


    // --------------------------------------------
    // CÁLCULO DOS DIAS
    // --------------------------------------------

    const dias =
        Math.floor(
            diferenca /
            (1000 * 60 * 60 * 24)
        );


    // --------------------------------------------
    // CÁLCULO DAS HORAS
    // --------------------------------------------

    const horas =
        Math.floor(
            (
                diferenca %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    // --------------------------------------------
    // CÁLCULO DOS MINUTOS
    // --------------------------------------------

    const minutos =
        Math.floor(
            (
                diferenca %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    // --------------------------------------------
    // CÁLCULO DOS SEGUNDOS
    // --------------------------------------------

    const segundos =
        Math.floor(
            (
                diferenca %
                (1000 * 60)
            ) /
            1000
        );


    // --------------------------------------------
    // EXIBIÇÃO
    // --------------------------------------------

    elementoDias.textContent =
        String(dias).padStart(
            2,
            "0"
        );


    elementoHoras.textContent =
        String(horas).padStart(
            2,
            "0"
        );


    elementoMinutos.textContent =
        String(minutos).padStart(
            2,
            "0"
        );


    elementoSegundos.textContent =
        String(segundos).padStart(
            2,
            "0"
        );
}


// ============================================================
// INICIA CONTADOR
// ============================================================

atualizarContador();


setInterval(
    atualizarContador,
    1000
);