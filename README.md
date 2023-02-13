# pw2 

###  __1) Porque em um sistema multiusuário implementado em Node.JS é importante evitar o uso de chamadas de I/O bloqueantes?__ 
__R=__ Porque elas interrompem a execução do código e impedem que outros usuários interajam com o sistema.  Isso pode levar a um comportamento lento e instável do sistema é recomendado usar chamadas de I/O não-bloqueantes ou usar técnicas como o callback ou promessas para lidar com a chamada de I/O de forma assíncrona


### 3) Crie uma função chamada searchUsers que aceite uma_ string como parâmetro (nome do usuário que será procurado).Dentro da função, use a API de usuários do GitHub para procurar pelo usuário com o nome informado. Use a função fetch do JavaScript para fazer uma requisição à API do GitHub usando o endpoint < https://api.github.com/search/users?q=<STR>, que retorna um array chamado items contendo a lista de usuários do GitHub cujos nomes começam com a string STR. A
resposta da API é retornada como uma Promise, então será preciso usar await para lidar com a resposta. Se o array items não existir na resposta, então sua Promise deverá ser rejeitada e deverá retornar uma mensagem de erro. Se o array items existir na resposta, então você deve procurar nesse array pelo usuário com o nome exatamente igual ao passado para a função searchUsers. Se você encontrar o usuário, sua Promise deverá retorna true. Caso contrário, deverá retornar false. Adicione async à declaração da função para permitir o uso de await. Teste a função passando o nome de um usuário como argumento e verifique se a Promise é resolvida corretamente, returnando true ou false ou uma mensagem de erro.
__R=__ 
~~~javascript
async function searchUsers(username) {
    const response = await fetch(`https://api.github.com/search/users?q=${username}`);
    const data = await response.json();
    if (!data.items) {
      return Promise.reject("Erro: items não encontrado na resposta da API");
    }
    const user = data.items.find(user => user.login === username);
    return user ? true : false;
  }
  
  searchUsers("<username>")
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
~~~

### __2) O que é callback hell e como evitá-los através do uso de Promises e async/await? Mostre exemplos de códigos onde o uso de Promises e async/await resolva o problema do callback hell.__

__R=__ Encadeamento de várias operações assíncronas e acaba com uma série de callbacks aninhados, dificultando a leitura e manutenção do código. Isso pode levar a um código difícil de entender e manter, além de ser propenso a erros. Com Promise um valor resposta poderá estar disponível agora, no futuro ou nunca. Podendo encadear várias Promises juntas, tornando o código mais fácil de ler e manter. Com async/await Ao invés de encadear vários callbacks, você pode escrever código assíncrono usando a palavra-chave await, que espera por uma Promise ser resolvida antes de continuar com a execução.

~~~javascript

 // Callback Hell
function doTask1(callback) {
    console.log('Task 1');
    setTimeout(() => {
      callback();
    }, 1000);
  }
  
  function doTask2(callback) {
    console.log('Task 2');
    setTimeout(() => {
      callback();
    }, 1000);
  }
  
  function doTask3(callback) {
    console.log('Task 3');
    setTimeout(() => {
      callback();
    }, 1000);
  }
  
  doTask1(() => {
    doTask2(() => {
      doTask3(() => {
        console.log('All tasks completed');
      });
    });
  });
  
  // Solução usando Promises
  function doTask1P() {
    return new Promise((resolve) => {
      console.log('Task 1');
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  
  function doTask2P() {
    return new Promise((resolve) => {
      console.log('Task 2');
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  
  function doTask3P() {
    return new Promise((resolve) => {
      console.log('Task 3');
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  
  doTask1P()
    .then(doTask2P)
    .then(doTask3P)
    .then(() => {
      console.log('All tasks completed');
    });
  
  // Solução usando async/await
  async function runTasks() {
    console.log('Task 1');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Task 2');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Task 3');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('All tasks completed');
  }
  
  runTasks();
~~~

### __4) Quais são as diferenças entre frameworks opinativos e não opinativos? Em qual dessas classes o framework Express melhor se encaixa?__
__R=__ Frameworks opinativos: Determinam como as coisas devem ser feitas e fornecem um conjunto completo de recursos e ferramentas para seguir essas diretrizes. Eles tendem a ser mais rápidos e fáceis de aprender e usar, mas também são mais limitantes em termos de flexibilidade e personalização. Exemplos de frameworks opinativos incluem Ruby on Rails e Django.

Frameworks não opinativos: Permitem ao desenvolvedor escolher as melhores soluções para cada problema. Eles fornecem uma série de ferramentas e recursos que podem ser combinados de acordo com as necessidades da aplicação, mas deixam muitas decisões importantes nas mãos do desenvolvedor. Eles tendem a ser mais flexíveis e personalizáveis, mas também podem ser mais difíceis de aprender e usar. Exemplos de frameworks não opinativos incluem Express.js e Flask.

### __5) Uma das características do framework Express é que ele é minimalista. Explique o significado dessa característica e quais as suas vantagens.__
__R=__ é um framework que prioriza a simplicidade e a eficiência, oferecendo apenas o conjunto mínimo de ferramentas e recursos necessários para realizar tarefas específicas permitindo que o desenvolvedor construa sobre esse conjunto de ferramentas de acordo com suas necessidades. Geralmente menor em tamanho e mais fácil de aprender e usar, pois não inclui muitas das complicações adicionais e decisões pré-determinadas de um framework mais complexo. 

### __6) Crie um sistema Web usando o framework Express que funciona como uma calculadora envolvendo operações de soma, subtração, multiplicação e divisão entre dois números. O programa deverá receber rotas no formato /<operacao>/<num1>/<num2>, onde 1) operacao pode ser sum, sub, multi e div; 2) num1 é o primeiro operando e 3) num2 é o segundo operando.__

__R=__ 
~~~javascript
const express = require("express");
const app = express();

app.get("/:operation/:num1/:num2", (req, res) => {
  const operation = req.params.operation;
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);

  let result;
  switch (operation) {
    case "sum":
      result = num1 + num2;
      break;
    case "sub":
      result = num1 - num2;
      break;
    case "multi":
      result = num1 * num2;
      break;
    case "div":
      result = num1 / num2;
      break;
    default:
      result = "Operação Inválida";
  }

  res.send(`Resultado: ${result}`);
});

app.listen(3000, () => {
  console.log("Aplicação rodando na porta 3000");
});

~~~

### __7) O que são Middlewares e como são usados no framework Express?__

__R=__ Os middlewares são funções que podem ser usadas para processar solicitações HTTP e respostas em um aplicativo Express. Eles são executados na sequência, de cima para baixo, e podem modificar a solicitação e a resposta, bem como executar outras tarefas, antes de a solicitação ser enviada para o controlador apropriado. No Express, os middlewares são usados para implementar várias funcionalidades, como autenticação, autorização, tratamento de erros, validação de dados, e muito mais. 

~~~javascript
//Questao 7

const express = require('express');
const app = express();

// Define o middleware de registro
const logMiddleware = function(req, res, next) {
  console.log(`Método HTTP: ${req.method}`);
  next();
};

// Aplica o middleware a todas as rotas
app.use(logMiddleware);

// Controladores para as rotas
app.get('/', (req, res) => {
  res.send('Página inicial');
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

~~~


### __8) Explique em poucas palavras o propósito do padrão de desenvolvimento MVC (model, view, controller), adotado durante o desenvolvimento do trabalho final da disciplina. Explique também a função de cada componente do padrão MVC: model, view, controller.__
__R=__ Ele visa separar a lógica de negócios da aplicação da representação dos dados e da interface do usuário.

As três partes principais do MVC são:

1. Model: Representa os dados da aplicação e as regras de negócios. É responsável por manipular e armazenar informações persistentes, como acesso ao banco de dados, validação de dados, etc.

2. View: Representa a interface do usuário e como os dados serão exibidos para o usuário final. É responsável por apresentar os dados recebidos do model em uma forma visualmente atraente para o usuário.

3. Controller: Recebe as ações do usuário (por exemplo, cliques em botões ou submissões de formulários) e decide como o model e a view devem ser atualizados com base nessas ações. Ele é responsável por fornecer a lógica de negócios e controlar a comunicação entre o model e a view.

### __9) Cite 3 vantagens de se desenvolver códigos em estilizando SASS ao invés de CSS.__
__R=__ SASS oferece uma série de recursos adicionais e poderosos que não estão disponíveis no CSS:

1. Variáveis: SASS permite o uso de variáveis, o que facilita a manutenção do código e torna possível a reutilização de valores comuns, como cores ou fontes, em todo o site.

2. Aninhamento de regras: Com SASS, é possível aninhar regras de estilo dentro de outras regras, o que ajuda a manter o código organizado e legível.

3. Mixins: SASS permite a criação de mixins, que são blocos de código que podem ser reutilizados em vários lugares do código. Isso torna possível criar regras complexas de estilo sem precisar repeti-las.

4. Funções: SASS inclui uma ampla gama de funções, como calcular o tamanho de fonte em relação a outro valor, gerar cores a partir de outras cores, etc. Essas funções ajudam a tornar o código mais poderoso e eficiente.

5. Importação: SASS permite importar arquivos SASS ou CSS em outros arquivos SASS, o que facilita a organização do código e a manutenção de módulos separados.

6. Compilação: SASS é compilado em CSS, o que significa que é possível escrever código mais sofisticado e, em seguida, compilá-lo em CSS para que possa ser usado em navegadores.


### __10) Quais são as diferenças entre Views, Layouts e Helpers na engine de views HandleBars?__
__R=__ Views são a apresentação visual dos dados, Layouts definem a estrutura geral da página e Helpers fornecem lógica adicional para processar e formatar dados antes de serem exibidos ao usuário 

1. Views: Uma View é uma representação visual de um conjunto de dados. É responsável por exibir informações ao usuário. As Views são arquivos HTML que podem ser complementados com variáveis ​​e logica para torná-las dinâmicas.

2. Layouts: Um Layout é uma estrutura básica para suas Views. Ele define a estrutura geral da página, incluindo a barra lateral, o cabeçalho e o rodapé, e permite que você reutilize a estrutura em várias Views.

3. Helpers: Os Helpers são funções personalizadas que podem ser usadas nas Views para processar e formatar dados antes de serem exibidos ao usuário. Eles fornecem uma maneira de adicionar lógica adicional às Views, tornando possível fazer coisas como formatar datas, calcular valores, etc.

### __11) Mapeamento objeto-relacional (ORM) é uma técnica de desenvolvimento que permite consultar e manipular dados de um banco de dados usando o paradigma de orientação a objetos. O uso dessa técnica envolve a codificação de 3 tipos de arquivos: modelos, migrations e seeders. Explique com suas próprias palavas qual a finalidade de cada um desses códigos.__

__R=__ Os modelos definem a estrutura de uma tabela, as migrations gerenciam a estrutura do banco de dados e os seeders populam o banco de dados com dados iniciais. 

1. Modelos: O arquivo de modelo define a estrutura de uma tabela em seu banco de dados, incluindo quais campos existem e quais tipos de dados eles são. Os modelos são usados para representar as tabelas em sua aplicação, permitindo que você acesse e manipule seus dados usando objetos em vez de SQL.

2. Migrations: As migrations são usadas para gerenciar a estrutura do banco de dados. Elas permitem que você crie, altere e exclua tabelas de maneira controlada e versionada, evitando a perda de dados importantes.

3. Seeders: Os seeders são usados para popular o banco de dados com dados iniciais. Eles são úteis para testes, desenvolvimento e demonstração de seu aplicativo, pois permitem que você tenha dados consistentes e confiáveis para trabalhar.

### __12) Por que dizemos que o HTTP é um protocolo que não mantém estado, isto é não mantem uma conexão? De que forma as sessões e os cookies são usados para lidar com essa limitação do HTTP?__
__R=__  Porque cada requisição HTTP é tratada independentemente, sem lembrar informações da requisição anterior. uma conexão persistente com o cliente não é mantida e as informações sobre o usuário e perdida entre requisições. Uma sessão é um mecanismo que permite ao servidor manter informações sobre o usuário entre requisições. Os cookies são pequenos arquivos de texto que são armazenados no lado do cliente e enviados ao servidor com cada requisição. 

Quando um usuário faz login em um site, por exemplo, uma sessão é iniciada e um identificador de sessão único é gerado. Esse identificador é enviado para o cliente como um cookie, e em requisições subsequentes, o cookie é enviado de volta para o servidor, permitindo que o servidor associe a requisição à sessão correta. s sessões e os cookies são usados para permitir que o servidor mantenha informações sobre o usuário entre requisições

### __13) Considere o middleware abaixo, que foi adicionado em uma aplicação Express. O que aparecerá no browser quando o usuário acessar essa página pela primeira, segunda, e terceira vez? Considere que o intervalo entre os acessos seja de no máximo 30 segundos.__

~~~javascript
app.use((req, res) => {
    if ("count" in req.cookies) {
        count = parseInt(req.cookies.count) + 1;
        res.cookie("count", count, new Date() + 600);
    } else {
        count = 0;
        res.cookie("count", count, new Date() + 600);
    }
    res.send(`${count}`);
});
~~~

__R=__ Ao acessar a página pela primeira vez, o browser receberá a resposta "0" e uma nova cookie "count" com o valor "0". Na segunda vez que a página for acessada, a cookie "count" será enviada junto com a requisição e o middleware aumentará o valor da cookie para "1". Então a resposta para o browser será "1". O mesmo processo se repetirá nas próximas vezes, com o valor da cookie "count" sendo incrementado a cada requisição e a resposta enviada ao browser sempre sendo a contagem atual.

Lembrando que a cookie "count" é definida para expirar após 600 segundos (10 minutos), portanto, se o usuário não acessar a página por mais de 10 minutos, ele começará novamente com o valor "0".

### __14) Quais são as diferenças entre Cookies e Sessões?__
R= Cookies são arquivos de texto armazenados no lado do cliente que contêm informações sobre o usuário, enquanto as sessões são mecanismos no lado do servidor que permitem manter informações sobre o usuário entre requisições. Ambos são usados para lidar com a limitação do HTTP de ser um protocolo sem estado, mas eles funcionam de maneiras diferentes.
