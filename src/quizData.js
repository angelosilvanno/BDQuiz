export const quizData = [
  {
    question: "Para descobrir a MÉDIA salarial dos funcionários, qual função de agregação você usaria?",
    options: [
      "SUM(salario)",
      "COUNT(salario)",
      "AVG(salario)",
      "MAX(salario)"
    ],
    answer: "AVG(salario)",
    explanation: "A função AVG() (de Average) é usada especificamente para calcular a média de um conjunto de valores numéricos."
  },
  {
    question: "Qual consulta retornaria o número total de produtos cadastrados na 'Tabela de produtos'?",
    options: [
      "COUNT(*) FROM produtos;",
      "SUM(produtos);",
      "SELECT COUNT(*) FROM produtos;",
      "SELECT ALL FROM produtos;"
    ],
    answer: "SELECT COUNT(*) FROM produtos;",
    explanation: "COUNT(*) é a função padrão para contar todas as linhas de uma tabela, retornando o número total de registros."
  },
  {
    question: "O que está faltando na consulta 'SELECT departamento, SUM(salario) FROM funcionarios;' para que ela funcione corretamente?",
    options: [
      "Uma cláusula HAVING.",
      "Uma cláusula ORDER BY departamento.",
      "Uma cláusula GROUP BY departamento.",
      "Nada, a consulta está correta."
    ],
    answer: "Uma cláusula GROUP BY departamento.",
    explanation: "Ao usar uma função de agregação (SUM) junto com uma coluna não agregada (departamento), é obrigatório agrupar os resultados pela coluna não agregada usando GROUP BY."
  },
  {
    question: "Qual é a principal diferença de quando as cláusulas WHERE e HAVING são aplicadas?",
    options: [
      "Não há diferença, elas são intercambiáveis.",
      "WHERE filtra as linhas ANTES do agrupamento e HAVING filtra os grupos DEPOIS do agrupamento.",
      "WHERE é para texto e HAVING é para números.",
      "HAVING é obrigatória quando se usa GROUP BY."
    ],
    answer: "WHERE filtra as linhas ANTES do agrupamento e HAVING filtra os grupos DEPOIS do agrupamento.",
    explanation: "A cláusula WHERE atua nas linhas individuais antes de serem agrupadas. A cláusula HAVING é usada para filtrar os grupos já formados pela cláusula GROUP BY."
  },
  {
    question: "Usando a 'Tabela de produtos', qual consulta mostraria apenas as categorias com mais de 1 produto?",
    options: [
      "SELECT categoria FROM produtos WHERE COUNT(*) > 1;",
      "SELECT categoria FROM produtos GROUP BY categoria HAVING COUNT(*) > 1;",
      "SELECT categoria, COUNT(*) FROM produtos WHERE produtos > 1;",
      "SELECT categoria FROM produtos HAVING COUNT(*) > 1;"
    ],
    answer: "SELECT categoria FROM produtos GROUP BY categoria HAVING COUNT(*) > 1;",
    explanation: "Primeiro, agrupa-se por 'categoria' (GROUP BY), e depois filtra-se os grupos resultantes cuja contagem de produtos seja maior que 1 (HAVING)."
  },
  {
    question: "A consulta 'SELECT nome FROM funcionarios WHERE departamento NOT IN ('Vendas', 'RH');' retornaria:",
    options: [
      "Apenas os funcionários de 'Vendas' e 'RH'.",
      "Todos os funcionários, EXCETO os de 'Vendas' e 'RH'.",
      "Um erro de sintaxe.",
      "Apenas o primeiro funcionário da lista."
    ],
    answer: "Todos os funcionários, EXCETO os de 'Vendas' e 'RH'.",
    explanation: "O operador NOT IN exclui todos os registros cujos valores na coluna especificada correspondam a qualquer um dos valores na lista."
  },
  {
    question: "Para que um desenvolvedor usaria uma subconsulta dentro da cláusula FROM?",
    options: [
      "Para deixar a consulta principal mais rápida.",
      "Para criar uma 'tabela temporária' que será usada pela consulta principal.",
      "Para substituir a necessidade de usar a cláusula WHERE.",
      "Não é possível usar uma subconsulta no FROM."
    ],
    answer: "Para criar uma 'tabela temporária' que será usada pela consulta principal.",
    explanation: "Uma subconsulta no FROM cria um conjunto de resultados intermediário (uma tabela derivada) que a consulta externa pode então usar como sua fonte de dados."
  },
  {
    question: "Na condição '... WHERE salario > ALL (SELECT salario FROM estagiarios)', o que o operador '> ALL' significa?",
    options: [
      "O salário deve ser maior que PELO MENOS UM dos salários dos estagiários.",
      "O salário deve ser maior que o MAIOR salário entre todos os estagiários.",
      "O salário deve ser igual à soma de todos os salários dos estagiários.",
      "A consulta está errada, pois ALL não pode ser usado com '>'"
    ],
    answer: "O salário deve ser maior que o MAIOR salário entre todos os estagiários.",
    explanation: "O operador '> ALL' compara um valor com todos os valores retornados pela subconsulta e é verdadeiro apenas se o valor for maior que o mais alto de todos."
  },
  {
    question: "O operador SOME é sinônimo de qual outro operador?",
    options: [
      "ALL",
      "IN",
      "ANY",
      "EXISTS"
    ],
    answer: "ANY",
    explanation: "SOME e ANY são funcionalmente idênticos. A condição '> SOME' significa 'maior que pelo menos um' dos valores da lista."
  },
  {
    question: "Para encontrar todos os inquilinos cujo telefone também está cadastrado na tabela 'corretor', qual seria a subconsulta correta?",
    options: [
      "SELECT nome FROM inquilino WHERE telefone = (SELECT telefone FROM corretor);",
      "SELECT nome FROM inquilino WHERE telefone IN (SELECT telefone FROM corretor);",
      "SELECT nome FROM inquilino WHERE telefone ANY (SELECT telefone FROM corretor);",
      "SELECT nome FROM inquilino HAVING telefone IN (SELECT telefone FROM corretor);"
    ],
    answer: "SELECT nome FROM inquilino WHERE telefone IN (SELECT telefone FROM corretor);",
    explanation: "O operador IN é ideal para verificar se um valor existe dentro de um conjunto de resultados, que neste caso é a lista de telefones retornada pela subconsulta."
  }
];