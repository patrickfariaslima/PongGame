//definir as variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 15;
let raio = diametroBolinha / 2;

// definir as variáveis da velocidade x e y da bola
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete do player
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variáveis da raquete do Oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
//altura e comprimento usar igual a definida na minha raquete
let velocidadeYOponente;

let colidiu = false;

// variáveis de vitória (Placar)
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let raquetada;
let ponto;

// criar chance de erro do oponente
let chanceErro = 0;

function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

// criar o background
function setup() {
  createCanvas(600, 400);
  
}
// desenhar o background
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda()
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete(); obsoleto, usando a função da biblioteca.
  VerificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  VerificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}


function mostraBolinha(){
  circle(xBolinha, yBolinha, diametroBolinha); 
}

function movimentaBolinha(){
    // adiciona movimento na bolinha, dizendo que a posição dela é a posição inicial + a velocidade (poderia ser xbolinha + velocidade, invés +=)
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}


function verificaColisaoBorda(){
  // se tocar na borda, volta 
  if (xBolinha + raio> width || xBolinha - raio < 0) {// width é a largura da tela, evitando que a bolinha entre até o ponto 0 (diamentro)
    velocidadeXBolinha *= -1;  }
  if (yBolinha + raio > height || yBolinha - raio < 0) { //height delimita a altura, evitando que a bolinha entre até o ponto 0 (diamentro)
    velocidadeYBolinha *= -1;}
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function mostraRaqueteOponente(){
  rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
    if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }

// LIMITAR MINHA RAQUETE NA TELA
  yRaquete = constrain(yRaquete, 0, 310);
}

//Verificação de colisão própria (não está sendo usada)
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
  }
}

//Verificar colisao com biblioteca alheia
function VerificaColisaoRaqueteBiblioteca(x,y){
colidiu = collideRectCircle(x,y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio); //colliderectcircle é uma função que existe na biblioteca de alguém que criou em p5.collide.2d
  if (colidiu) {
  velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceErro
  calculaChanceErro();
  yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER); //alinha o texto centralmente;
  textSize(25);
  fill (color(255, 140, 0)); 
  rect(150, 5, 40, 25);
  fill (255); //pintar a cor do placar de branco (padrão é preto)
  text(meusPontos, 170, 26);// inclui meus pontos e a posição dele na tela
  fill (color(255, 140, 0)); 
  rect(450, 5, 40, 25);
   fill (255); 
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play()
  }
  if (xBolinha <10){
    pontosOponente += 1;
    ponto.play();
  }
}

function calculaChanceErro() {
  if (pontosOponente >= meusPontos) {
    chanceErro += 1
    if (chanceErro >= 39){
    chanceErro = 40
    }
  } else {
    chanceErro -= 1
    if (chanceErro <= 35){
    chanceErro = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

