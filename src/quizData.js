export const quizData = [
  {
    question: "Para descobrir a MÉDIA salarial dos funcionários, qual função de agregação você usaria?",
    options: [
      "SUM(salario)",
      "COUNT(salario)",
      "AVG(salario)",
      "MAX(salario)"
    ],
    answer: "AVG(salario)"
  },
  {
    question: "Qual consulta retornaria o número total de produtos cadastrados na 'Tabela de produtos'?",
    options: [
      "COUNT(*) FROM produtos;",
      "SUM(produtos);",
      "SELECT COUNT(*) FROM produtos;",
      "SELECT ALL FROM produtos;"
    ],
    answer: "SELECT COUNT(*) FROM produtos;"
  },
  {
    question: "Para que serve a cláusula GROUP BY?",
    options: [
      "Para filtrar linhas com base em uma condição, como o WHERE.",
      "Para ordenar os resultados em ordem alfabética.",
      "Para agrupar linhas com valores iguais e aplicar funções (soma, média, etc.) a cada grupo.",
      "Para criar uma tabela nova no banco de dados."
    ],
    answer: "Para agrupar linhas com valores iguais e aplicar funções (soma, média, etc.) a cada grupo."
  },
  {
    question: "O que está faltando na consulta 'SELECT departamento, SUM(salario) FROM funcionarios;' para que ela funcione corretamente?",
    options: [
      "Uma cláusula HAVING.",
      "Uma cláusula ORDER BY departamento.",
      "Uma cláusula GROUP BY departamento.",
      "Nada, a consulta está correta."
    ],
    answer: "Uma cláusula GROUP BY departamento."
  },
  {
    question: "Qual é a principal diferença de quando as cláusulas WHERE e HAVING são aplicadas?",
    options: [
      "Não há diferença, elas são intercambiáveis.",
      "WHERE filtra as linhas ANTES do agrupamento e HAVING filtra os grupos DEPOIS do agrupamento.",
      "WHERE é para texto e HAVING é para números.",
      "HAVING é obrigatória quando se usa GROUP BY."
    ],
    answer: "WHERE filtra as linhas ANTES do agrupamento e HAVING filtra os grupos DEPOIS do agrupamento."
  },
  {
    question: "Usando a 'Tabela de produtos', qual consulta mostraria apenas as categorias com mais de 1 produto?",
    options: [
      "SELECT categoria FROM produtos WHERE COUNT(*) > 1;",
      "SELECT categoria FROM produtos GROUP BY categoria HAVING COUNT(*) > 1;",
      "SELECT categoria, COUNT(*) FROM produtos WHERE produtos > 1;",
      "SELECT categoria FROM produtos HAVING COUNT(*) > 1;"
    ],
    answer: "SELECT categoria FROM produtos GROUP BY categoria HAVING COUNT(*) > 1;"
  },
  {
    question: "Qual operador permite verificar se um valor está presente em uma lista de opções, como em '...WHERE id IN (1, 3, 5)'?",
    options: [
      "LIKE",
      "IN",
      "BETWEEN",
      "EXISTS"
    ],
    answer: "IN"
  },
  {
    question: "A consulta 'SELECT nome FROM funcionarios WHERE departamento NOT IN ('Vendas', 'RH');' retornaria:",
    options: [
      "Apenas os funcionários de 'Vendas' e 'RH'.",
      "Todos os funcionários, EXCETO os de 'Vendas' e 'RH'.",
      "Um erro de sintaxe.",
      "Apenas o primeiro funcionário da lista."
    ],
    answer: "Todos os funcionários, EXCETO os de 'Vendas' e 'RH'."
  },
  {
    question: "Uma subconsulta é uma consulta dentro de outra. Para que um dev a usaria na cláusula FROM?",
    options: [
      "Para deixar a consulta principal mais rápida.",
      "Para criar uma 'tabela temporária' que será usada pela consulta principal.",
      "Para substituir a necessidade de usar a cláusula WHERE.",
      "Não é possível usar uma subconsulta no FROM."
    ],
    answer: "Para criar uma 'tabela temporária' que será usada pela consulta principal."
  },
  {
    question: "Na condição '... WHERE salario > ALL (SELECT salario FROM estagiarios)', o que o operador '> ALL' significa?",
    options: [
      "O salário deve ser maior que PELO MENOS UM dos salários dos estagiários.",
      "O salário deve ser maior que o MAIOR salário entre todos os estagiários.",
      "O salário deve ser igual à soma de todos os salários dos estagiários.",
      "A consulta está errada, pois ALL não pode ser usado com '>'"
    ],
    answer: "O salário deve ser maior que o MAIOR salário entre todos os estagiários."
  },
  {
    question: "O operador SOME é sinônimo de qual outro operador?",
    options: [
      "ALL",
      "IN",
      "ANY",
      "EXISTS"
    ],
    answer: "ANY"
  },
  {
    question: "A condição '... WHERE vendas < SOME (500, 1000, 1500)' será verdadeira para um produto com vendas de:",
    options: [
      "400 (porque é menor que 500, o primeiro da lista).",
      "1600 (porque é maior que todos na lista).",
      "A condição é inválida.",
      "Apenas se o valor for exatamente 500, 1000 ou 1500."
    ],
    answer: "400 (porque é menor que 500, o primeiro da lista)."
  },
  {
    question: "Qual é a ordem de execução correta que um banco de dados geralmente segue?",
    options: [
      "SELECT, FROM, WHERE, GROUP BY, HAVING",
      "FROM, WHERE, GROUP BY, HAVING, SELECT",
      "SELECT, HAVING, WHERE, GROUP BY, FROM",
      "FROM, GROUP BY, WHERE, HAVING, SELECT"
    ],
    answer: "FROM, WHERE, GROUP BY, HAVING, SELECT"
  },
  {
    question: "Na 'Tabela de funcionários', qual o resultado da consulta: SELECT SUM(salario) FROM funcionarios;",
    options: [
        "1890,90",
        "7560,00",
        "2480,00",
        "4"
    ],
    answer: "7560,00"
  },
  {
    question: "Para encontrar todos os inquilinos cujo telefone também está cadastrado na tabela 'corretor', qual seria a subconsulta correta?",
    options: [
      "SELECT nome FROM inquilino WHERE telefone = (SELECT telefone FROM corretor);",
      "SELECT nome FROM inquilino WHERE telefone IN (SELECT telefone FROM corretor);",
      "SELECT nome FROM inquilino WHERE telefone ANY (SELECT telefone FROM corretor);",
      "SELECT nome FROM inquilino HAVING telefone IN (SELECT telefone FROM corretor);"
    ],
    answer: "SELECT nome FROM inquilino WHERE telefone IN (SELECT telefone FROM corretor);"
  },
  {
    question: "Por que, ao usar uma subconsulta no FROM, é quase sempre obrigatório dar um nome (alias) a ela?",
    options: [
      "Por uma questão de organização do código.",
      "Para a consulta principal ter um nome para se referir às colunas da 'tabela temporária'.",
      "É uma exigência apenas para o banco de dados MySQL.",
      "Para que a subconsulta seja executada primeiro."
    ],
    answer: "Para a consulta principal ter um nome para se referir às colunas da 'tabela temporária'."
  },
  {
    question: "Qual função de agregação ignora valores nulos ao fazer seu cálculo?",
    options: [
      "COUNT(*)",
      "Apenas SUM e MIN",
      "Nenhuma, todas consideram valores nulos.",
      "Todas, exceto COUNT(*)."
    ],
    answer: "Todas, exceto COUNT(*)."
  },
  {
    question: "Qual das seguintes consultas é um exemplo de uso da cláusula HAVING para filtrar um resultado agregado?",
    options: [
      "SELECT * FROM produtos WHERE vendas > 1000;",
      "SELECT categoria, AVG(vendas) FROM produtos GROUP BY categoria HAVING AVG(vendas) > 2000;",
      "SELECT * FROM produtos ORDER BY vendas;",
      "SELECT nome FROM produtos WHERE categoria IN ('Eletrônicos', 'Roupas');"
    ],
    answer: "SELECT categoria, AVG(vendas) FROM produtos GROUP BY categoria HAVING AVG(vendas) > 2000;"
  }
];