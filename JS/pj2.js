//Seleção de elementos-------------------------------------------------

//Pegando os elementos no html
var btnGeraSenha = document.querySelector("#gerarSenha");
var senhaGerada = document.querySelector("#senhaGerada");
var btnEmail = document.querySelector("#btnEntrar");

//Gerar caracteres-------------------------------------------------

/*Funções que retornam os valores aleatórios que correspondem
a caracteres do Unicode*/
var todosOsCaracteresMinusculos = () => { //Letras minúsculas
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
var todosOsCaracteresMaiusculos = () => { //Letras maiúsculas
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
var numeros = () => { //Números
    return Math.floor(Math.random() * 10).toString(); //Passando os números em string
}
var simbolos = () => {
    var pegarSimbolos = "!@#$%^&*_-+=~|?"; //Símbolos

    //Pegando o tamanho da string dos símbolos
    return pegarSimbolos[Math.floor(Math.random() * pegarSimbolos.length)];
}

//Mandar email-------------------------------------------------

function mandaEmail(){
    var data = new Date(); //Definindo nova data
    var diaDoMes = data.getDate(); //Pegando o dia do mês
    var mes = data.getMonth(); //Pegando o mês do ano
    var ano = data.getFullYear(); //Pegando o ano
    var nomeDoMes; //Declarando uma variável vazia
    var momento = new Date(); //Definindo nova data para horas
    var hora = momento.getHours(); //Pegando as horas atuais
    var minuto = momento.getMinutes(); //Pegando os minutos atuais

    //Definindo os nomes para os meses da variável "mes"
    switch(mes){
        case 0:
            nomeDoMes = "Janeiro";
            break;
        case 1:
            nomeDoMes = "Fevereiro";
            break;
        case 2:
            nomeDoMes = "Março";
            break;
        case 3:
            nomeDoMes = "Abril";
            break;
        case 4:
            nomeDoMes = "Maio";
            break;
        case 5:
            nomeDoMes = "Junho";
            break;
        case 6:
            nomeDoMes = "Julho";
            break;
        case 7:
            nomeDoMes = "Agosto";
            break;
        case 8:
            nomeDoMes = "Setembro";
            break;
        case 9:
            nomeDoMes = "Outubro";
            break;
        case 10:
            nomeDoMes = "Novembro";
            break;
        case 11:
            nomeDoMes = "Dezembro";
            break;
    }

    //Input que será exibida a mensagem de erro de login
    var mensagemErro = document.getElementById("mensagemDeErro");

    //Input que será exibida a mensagem de login
    var mensagemEmailEnviado = document.getElementById("mensagemDeEmail");

    //Input do campo de entrada da senha
    var campoSenha = document.getElementById("senha").value;

    //Input do campo de entrada para a confirmação de senha
    var confirmarSenha = document.getElementById("confirmpassword").value;

    //Input de entrada do nome
    var campoDoNome = document.getElementById("nome").value;

    //Input de entrada do email
    var campoDoEmail = document.getElementById("email").value;

    //Validar se o email é válido ou não
    function validateEmail (campoDoEmail){ //Input do email como parâmetro
        var re = /\S+@\S+\.\S+/; //Expressão regular que verifica formato do email
        return re.test(campoDoEmail);
    }  
    //validateEmail("texto@texto.com");  true
    //validateEmail("texto@texto");  false
    //validateEmail("texto.com");  false
    //validateEmail("texto");  false
    
    //Se os minutos forem menores do que 10, acrescentar 0 na frente 
    var minutos = (minutos < 10) ? "0" + minuto : minuto;
    
    //Mensagem enviada para o cliente
    var msgEmail = "Olá " + campoDoNome + ", " + "este é seu email de verificação, "
    + "obrigado por acessar nosso site, seu acesso foi feito no dia "
    + diaDoMes + " de " + nomeDoMes + " de " + ano;

    //Mensagem enviada para o desenvolvedor
    var msgParaMim = "Uma pessoa chamada " + campoDoNome
    + " acessou seu projeto no dia " + diaDoMes + " de " + nomeDoMes
    + " de " + ano + ", às " + hora + ":" + minutos;

    //Se todos os campos estiverem preenchidos:
    if(campoSenha !== "" && campoDoEmail !== "" &&
        campoDoNome !== "" && confirmarSenha !== ""){

            //Se a senha e a confirmação forem iguais:
            if(campoSenha == confirmarSenha){

                //Se o email for válido:
                if(validateEmail(campoDoEmail) == true){
                    console.log("Email válido enviado");
                    Email.send({ //Email ao cliente
                        Host : "smtp.elasticemail.com",
                        Username : "danieleduardoprattabezerra@gmail.com",
                        Password : "DAFFEDC3402024CBD395C72D7AA847C71911",
                        To : campoDoEmail,
                        From : "danieleduardoprattabezerra@gmail.com",
                        Subject : "Email de verificação",
                        Body : msgEmail
                    })
                    Email.send({ //email ao desenvolvedor
                        Host : "smtp.elasticemail.com",
                        Username : "danieleduardoprattabezerra@gmail.com",
                        Password : "DAFFEDC3402024CBD395C72D7AA847C71911",
                        To : "daniel.bezerra.mult@gmail.com",
                        From : "danieleduardoprattabezerra@gmail.com",
                        Subject : "Email ao desenvolvedor",
                        Body : msgParaMim
                    })
                    
                    //Mensagem de aviso ao cliente
                    mensagemEmailEnviado.textContent = `Um email de verificação
                    foi enviado para você, cheque sua caixa de entrada, ou o Span`;
                    mensagemErro.textContent = "";
                    console.log("Email enviado");
                }else{
                    //Mensagem de erro
                    mensagemErro.textContent = "";
                    mensagemErro.textContent = "Use um email válido";
                }
            }else{
                //Mensagem de erro
                mensagemErro.textContent = "";
                mensagemErro.textContent = "Use a mesma senha para confirmar";
                mensagemEmailEnviado.textContent = "";
            }
    }else{
        //Mensagem de erro
        mensagemErro.textContent = "Por favor, preencha todos os campos";
        mensagemEmailEnviado.textContent = "";
    }
}

//Funções-------------------------------------------------

//Função de seta, recebendo as funções dos caracteres como parâmetros
var geraSenha = (
    simbolos,
    todosOsCaracteresMaiusculos,
    todosOsCaracteresMinusculos,
    numeros
    ) => {
    var senha = ""; //Declarando uma variável vazia
    var tamanhoSenha = 10; //Definindo o tamanho da senha
    var geradores = [ //Array que armazena as funções dos caracteres
        simbolos,
        todosOsCaracteresMaiusculos,
        todosOsCaracteresMinusculos,
        numeros
    ]

    //Iniciando um loop, que itera em i o tamanho do array geradores
    for(var i = 0 ; i < tamanhoSenha ; i = i + geradores.length){
        geradores.forEach(() => { //Executa cada uma das funções do array

            //escolhe um elemento aleatório no array e o executa
            var funcaoAleatoria = geradores[Math.floor(Math.random() * geradores.length)]();
            
            //Concatena os valores dos caracteres construidos na variável vazia
            senha += funcaoAleatoria;
        });
    }

    //Cortando a variável da senha, para ficar do tamanho que foi definido
    senha = senha.slice(0 , tamanhoSenha);

    senhaGerada.style.display = "block"; //Mandando a senha gerada aparecer no campo
    senhaGerada.querySelector("h4").innerText = senha; //Colocando a senha no campo
}

//Eventos-------------------------------------------------

//Chamando a função que cria a senha com um evento de click
btnGeraSenha.addEventListener("click" , () => {
        geraSenha (simbolos,
        todosOsCaracteresMaiusculos,
        todosOsCaracteresMinusculos,
        numeros)
});

//Chamando a função que manda emails com um evento de click
btnEmail.addEventListener("click" , mandaEmail);