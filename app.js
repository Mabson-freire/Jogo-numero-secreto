let numerosGerados = [];
let tentativaLimite = 100;
let numeroSecreto = gerarAleatorio();
let tentativas = 1;

function exibeTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function gerarAleatorio() {
  let numeroAleatorio = parseInt(Math.random() * tentativaLimite + 1);

  if (numerosGerados.length === tentativaLimite) {
    numerosGerados = [];
  }

  if (numerosGerados.includes(numeroAleatorio)) {
    return gerarAleatorio();
  } else {
    numerosGerados.push(numeroAleatorio);
    console.log(numerosGerados);
    return numeroAleatorio;
  }   
}

function mostrarTextoInicial() {
  exibeTexto("h1", "Jogo do número secreto");
  exibeTexto("p", `Digite um número entre 1 e ${tentativaLimite}`);
}

mostrarTextoInicial();

function verificarChute() {
  let chute = parseInt(document.querySelector("input").value);

  let palavraTentativa = tentativas > 1 ? "Tentativas" : "tentativa";

  if (chute == numeroSecreto) {
    exibeTexto("h1", "Parabéns!! você acertou.");
    exibeTexto(
      "p",
      `Precisou de ${tentativas} ${palavraTentativa} para acertar.`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibeTexto("h1", "Você errou!");
      exibeTexto("p", `O Número secreto é menor do que ${chute}`);
    } else {
      exibeTexto("h1", "Você errou!");
      exibeTexto("p", `O Número secreto é maior do que ${chute}`);
    }
    tentativas++;
    limpaCampo();
  }
}

function limpaCampo() {
  let chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarAleatorio();

  limpaCampo();
  mostrarTextoInicial();

  tentativas = 1;

  document.getElementById("reiniciar").setAttribute("disabled", true);
}
