document.addEventListener('DOMContentLoaded', (evento) => {
    function quando_clico(event) {
        //Ativa quando eu clico 
        if(this.classList.contains('btn-deletar') == false){
            if(this.classList.contains('clicado') == false){
            this.classList.add('clicado')
        }
        else{
            this.classList.remove('clicado')
        }
        }
    
    }
    function clicarBotoesPrincipais(evento){
        if(this.classList.contains('btn-nova')){
            let classe_a_ser_adicionada = this.classList.item(2)
            let posicao = document.getElementById(classe_a_ser_adicionada)
            let valor_do_input = document.getElementById("valor-input").value
            posicao.insertAdjacentHTML('afterBegin', `<div draggable="true" id="nova-task" class="elemento">${valor_do_input}</div>`)
            let meu_alvo = document.getElementById("nova-task")
            function recarregar(item){
                item.addEventListener("click", quando_clico);
                item.addEventListener('dragstart', quando_segurar);
                item.addEventListener('dragleave', remover_classe); //Quando saio de um elemento, remover a classe.
                item.addEventListener('dragover', quando_arrasto);
                item.addEventListener('dragenter', adicionar_classe); //detecta quando arrasto um elemento pra cima de outro.
                item.addEventListener('dragend', quando_soltar);  //quando solto
                item.addEventListener('drop', soltar_em_lugar_valido); //Quando eu soltar em lugar válido.
            }
            recarregar(meu_alvo)
            meu_alvo.removeAttribute('id')
            items = document.querySelectorAll('.elemento');
            }
        if(this.classList.contains('btn-deletar')){
          items.forEach(function (item){
            if(item.classList.contains('clicado')){
                item.remove()
            }})}
          
        if(this.classList.contains('btn-renomear')){
          items.forEach(function (item){
            if(item.classList.contains('clicado')){
              let valor_do_input = document.getElementById("valor-input").value
              item.innerHTML = valor_do_input
              valor_do_input = ''
              item.classList.remove('clicado')
            }})}}
    

  
    function quando_segurar(event) {
        //quando segurar o elemento
        target_drag = this;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', this.innerHTML);
      }
    function quando_arrasto(event) {
        //ativo enquando eu arrasto o elemento
        //prevenir o arrasto padrão que proibe arrastar
        items.forEach(function (item) {
            item.classList.add('arrastando');
        });
        if (event.preventDefault) {
        event.preventDefault();
      }
    }
      //quando solto
    function quando_soltar(evento) {
        items.forEach(function (item) {
            item.classList.remove('over');
            item.classList.remove('selecionado');
            
      });
    }
    
    

    function adicionar_classe(evento) {

        //detecta quando arrasto um elemento pra cima de outro adicionar a classe.
      this.classList.add('over');
      this.classList.add('selecionado');
    }
  
    function remover_classe(evento) {
        //Quando saio de um elemento, remover a classe.
      this.classList.remove('over');
      this.classList.remove('selecionado');
    }
  
    function soltar_em_lugar_valido(evento) {
        //Quando eu soltar em lugar válido.
        //"Event.stopPropagation() Impede a propagação do evento por seus respectivos listeners"
        evento.stopPropagation();
        //Checar se o target da arrastada é != da div segurada.
        //Lembrar que this é o contexto sendo arrastado.
        if (target_drag != this) {
            target_drag.innerHTML = this.innerHTML;
            this.innerHTML = evento.dataTransfer.getData('text/html');
            target_drag.classList.remove('clicado')
        }
      
        return false;
      }
    
    let botoes = document.querySelectorAll('.js-botoes');
    botoes.forEach(function(botao){
        botao.addEventListener("click", clicarBotoesPrincipais);
    });

    let items;
    let esquerda = document.querySelectorAll('.js-esquerda')
    esquerda.forEach(function(botao){
      botao.addEventListener('click', mover_para_esquerda)
    })
    let direita = document.querySelectorAll('.js-direita')
    direita.forEach(function(botao){
      botao.addEventListener('click', mover_para_direita)
    })
    
    
    
    function mover_para_esquerda(event){
    items = document.querySelectorAll('.elemento');  
    items.forEach(function (item){
        if(item.classList.contains('clicado')){
          if(item.parentElement.id =="quadroB"){
            document.getElementById("quadroA").appendChild(item)
          }
          else{
            if(item.parentElement.id =="quadroC"){
              document.getElementById("quadroB").appendChild(item)
            }
          }
        }})}

    function mover_para_direita(event){
      items = document.querySelectorAll('.elemento');
      items.forEach(function (item){
        if(item.classList.contains('clicado')){
          if(item.parentElement.id =="quadroB"){
            document.getElementById("quadroC").appendChild(item)
          }
          else{
            if(item.parentElement.id =="quadroA"){
              document.getElementById("quadroB").appendChild(item)
            }
          }
        }
      })
    }
});