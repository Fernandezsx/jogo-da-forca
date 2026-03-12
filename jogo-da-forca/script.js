const palavras = ["grau", "javascript", "forca", "tecnico", "programador", "roblox", "script"];
let palavraAtual = "";
let letrasCorretas = [];
let letrasErradas = [];
let tentativasRestantes = 6;

// IDs das partes do corpo na ordem que devem aparecer
const partesCorpo = ["cabeca", "tronco", "braco-esquerdo", "braco-direito", "perna-esquerda", "perna-direita"];

function escolherPalavra() {
    const index = Math.floor(Math.random() * palavras.length);
    palavraAtual = palavras[index].toLowerCase();
    letrasCorretas = [];
    letrasErradas = [];
    tentativasRestantes = 6;
    
    // Resetar visual do boneco
    document.querySelectorAll('.corpo-parte').forEach(p => p.style.display = 'none');
    
    atualizarTela();
}

function atualizarTela() {
    // Exibir a palavra com traços
    const display = palavraAtual
        .split("")
        .map(letra => letrasCorretas.includes(letra) ? letra : "_")
        .join(" ");
    
    document.getElementById("palavra-secreta").textContent = display;
    document.getElementById("letras-erradas").textContent = letrasErradas.join(", ");
    document.getElementById("tentativas").textContent = tentativasRestantes;
    document.getElementById("mensagem").textContent = "";

    // Atualizar desenho da forca
    const errosCometidos = 6 - tentativasRestantes;
    for (let i = 0; i < errosCometidos; i++) {
        document.getElementById(partesCorpo[i]).style.display = "block";
    }
}

function verificarLetra() {
    const input = document.getElementById("letra-input");
    const letra = input.value.toLowerCase();
    input.value = "";
    input.focus();

    // Validação
    if (!letra || letra.length !== 1 || !/[a-z]/i.test(letra)) return;

    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
        alert("Você já usou essa letra!");
        return;
    }

    // Lógica de acerto/erro
    if (palavraAtual.includes(letra)) {
        letrasCorretas.push(letra);
    } else {
        letrasErradas.push(letra);
        tentativasRestantes--;
    }

    atualizarTela();
    verificarFimDeJogo();
}

function verificarFimDeJogo() {
    const venceu = palavraAtual.split("").every(letra => letrasCorretas.includes(letra));
    const mensagem = document.getElementById("mensagem");

    if (venceu) {
        mensagem.textContent = "Parabéns! Você venceu! 🎉";
        mensagem.style.color = "#4ecca3";
        desativarJogo();
    } else if (tentativasRestantes === 0) {
        mensagem.textContent = `Game Over! A palavra era: ${palavraAtual.toUpperCase()}`;
        mensagem.style.color = "#e94560";
        desativarJogo();
    }
}

function desativarJogo() {
    document.getElementById("letra-input").disabled = true;
    document.getElementById("btn-chutar").disabled = true;
}

function novoJogo() {
    document.getElementById("letra-input").disabled = false;
    document.getElementById("btn-chutar").disabled = false;
    escolherPalavra();
}

// Inicia o jogo ao carregar
escolherPalavra();