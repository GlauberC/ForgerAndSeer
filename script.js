var seer;
var forger;

function tela_inicial(){
  $('.cabecalho').html("<h1 class='titulo-jogo'>Forger N Seer</h1>");
  $('.info').html("<p>Aperte no botão abaixo para começar uma <strong>nova partida</strong></p>");
  $('.botao').html("<button class='btn btn-button btn-primary btn-block' onclick='comeca_jogo()'>Começar com tema aleatório</button>");
  $('.botao').append("<button class='btn btn-button btn-info btn-block' onclick='listar_temas()'>Escolher o tema</button>");
}

$(document).ready(function(){
    tela_inicial();
});




function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            alert('O TEMPO ACABOU')
//             timer = duration;
        }
    }, 1000);
}
function comeca_cronometro(minutos){
  var time = 60 * minutos;
  var display = $('#time');
  startTimer(time, display);
}
    


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


function sorteia_For_Se(){
  var linha = $('.titulo_tema').attr('linha');
  linha = linha.split(',');
  var n_seer = getRandomInt(0, linha.length);
  var n_forger
  do{
    n_forger = getRandomInt(0, linha.length);
  }while(n_seer == n_forger);
  
  seer = linha[n_seer];
  forger = linha[n_forger];
  
}

function partida_terminada(msg){
  $('.titulo_tema').html("<h2>"+ msg +"</h2>");
  $('.info').html("<p>Aperta no botão abaixo para voltar à tela inicial</p>");
  $('.botao').html("<button class='btn btn-button btn-primary btn-block btn-tela_inicial' onclick='tela_inicial()'>Voltar a tela inicial</button>");
}
function comum_venceu(){
  if (confirm("Os Comuns vencerão, deseja continuar?")){
    partida_terminada("Os comuns venceram <span class='glyphicon glyphicon-user'></span>");
  }
}
function seer_venceu(){
  if (confirm("O Seer será o vencedor, deseja continuar?")){
    partida_terminada("O Seer foi o vencedor <span class='glyphicon glyphicon-eye-open'></span> ");
  }
}
function forger_venceu(){
  if (confirm("O Forger será o vencedor, deseja continuar?")){
    partida_terminada("O Forger foi o vencedor <span class='glyphicon glyphicon-random'></span> ");
  }
  
}
function encontrar_seer(){
  if (confirm("O cronometro será adaptado para achar o Seer, deseja continuar?")){
    $('.cabecalho').html("<h1 class='titulo_tema'>Encontre o Seer</h1>")
    $('.botao').html("<div><p><span class='glyphicon glyphicon-time'></span> Tempo: <span id='time'>02:00</span> minutos!</p></div>");
    $('.botao').append("<button class='btn btn-button btn-success btn-block btn-seer_encontrado' onclick='comum_venceu()'>Encontraram o Seer</button>");
    $('.botao').append("<button class='btn btn-button btn-danger btn-block btn-seer_encontrado' onclick='seer_venceu()'>O seer não foi encontrado</button>");
    comeca_cronometro(2);
  }
  
}
function comeca_rodada(){
  alert('Peça para o Forger fechar os olhos\n e então peça para todos abrirem os olhos para começar a partida');
  $('.botao').html("<div><p><span class='glyphicon glyphicon-time'></span> Tempo: <span id='time'>05:00</span> minutos!</p></div>");
  $('.botao').append("<button class='btn btn-button btn-info btn-block btn-encontra_seer' onclick='encontrar_seer()'>Acertou a palavra do Seer</button>");
  $('.botao').append("<button class='btn btn-button btn-danger btn-block btn-acertou_forger' onclick='forger_venceu()'>Acertou a palavra do Forger</button>");
  comeca_cronometro(5);
}
function escolhe_forger(){
    alert('Peça para o Seer fechar os olhos.\nPeça para o Forger olhar para você\n e então mostre o smartphone para ele');
    $('.lista-elementos').append("<li class ='list-group-item list-group-item-danger forger'><span class='glyphicon glyphicon-random'></span>&nbsp;&nbsp; "+ forger +"</li>");
    $('.botao').html("<button class='btn btn-button btn-warning btn-block btn-comeca_rodada' onclick='comeca_rodada()'>Começa Rodada</button>");
}
function escolhe_seer(){
  alert('Peça para o Seer olhar para você\ne então mostre o smartphone para ele');
  sorteia_For_Se();
  var linha = $('.titulo_tema').attr('linha');
  $('.info').html("<ul class='list-group lista-elementos'><li class ='list-group-item list-group-item-info seer'><span class='glyphicon glyphicon-eye-open'></span>&nbsp;&nbsp; "+ seer +"</li></ul>");
  $('.botao').html("<button class='btn btn-button btn-danger btn-block btn-forger' onclick='escolhe_forger()'>Escolhe Forger</button>");
}

function ler_arquivo(){
//   Ler arquivo
  $.get("dados.csv", function(data, status){
//     Separa as linhas num vetor de linhas
    var dados = data.match(/.+/ig);
    
//     Sorteia e seleciona uma linha
    var linha = dados[getRandomInt(1, dados.length)];
    
//     Separa elementos por virgula
    var lista = linha.split(',');
    
//     Remove os vazios
    lista = lista.filter(Boolean);
    
//     Separa o tema e remove 
    var tema = lista[0];
    lista.shift();
    
//     Coloca o tema na pagina principal
    alert('Antes de continuar, verifique se todos os outros jogadores não estão olhando')
    $('.cabecalho').html("<h1 class='titulo_tema' linha='" + lista + "'>" + tema + "</h1>");
    $('.info').html("<p>Tema escolhido, aperte no botão abaixo para escolher a palavra do Seer</p>");
    $('.botao').html("<button class='btn btn-button btn-success btn-block' onclick='escolhe_seer()'>Escolhe Seer</button>");
 });
//   Elimina a primeira linha
//   Trata entrada para casos,,,,,,
//   retorna lista
}
function listar_temas(){
      $('.info').html("");
      $('.botao').html("");
   $.get("dados.csv", function(data, status){
//     Separa as linhas num vetor de linhas
    var tema;
    var dados = data.match(/.+/ig);
    for(i = 1; i<dados.length; i++){
      linha = dados[i].split(',');
      linha = linha.filter(Boolean);
      tema = linha[0];
      linha.shift();
      $('.botao').append("<button class='btn btn-button btn-default btn-block btn-tema' linha='" + linha + "' onClick = 'tema_escolhido(this)'>"+ tema +"</button>");
    }
    $('.cabecalho').html("<h1 class='escolhe_tema'>Escolher Tema</h1>");
     
    
 });
}

function comeca_jogo(tema = 'null', lista=[]){
  if(tema == 'null'){
     ler_arquivo();
  }else{
    $('.cabecalho').html("<h1 class='titulo_tema' linha='" + lista + "'>" + tema + "</h1>");
    $('.info').html("<p>Tema escolhido, aperte no botão abaixo para escolher a palavra do Seer</p>");
    $('.botao').html("<button class='btn btn-button btn-success btn-block' onclick='escolhe_seer()'>Escolhe Seer</button>");
  }
}

function tema_escolhido(botao){
  var tema = $(botao).html();
  var lista = $(botao).attr('linha').split(',');
  comeca_jogo(tema, lista);
}