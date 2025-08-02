# 🧪 Desafio Técnico de QA — Testes Automatizados com Playwright

## 📘 Projeto: Minhas Receitas

Este é um desafio técnico para avaliar suas habilidades em automação de testes end-to-end utilizando o Playwright, dentro do contexto de um sistema web que consome dados reais da API [dummyjson.com](https://dummyjson.com).

---

## 🎯 Objetivo

Você deverá implementar testes automatizados com Playwright que validem as principais funcionalidades da aplicação **Minhas Receitas**, que permite:

- Realizar login com autenticação
- Listar e visualizar receitas
- Exibir o perfil do usuário autenticado

---

## 🛠 Tecnologias

- [Playwright](https://playwright.dev/)
- JavaScript/TypeScript ou Python
- API pública: [https://dummyjson.com](https://dummyjson.com)

---

## ✅ Funcionalidades a serem testadas

### 🔐 1. Login

- Fazer login com:
    - **username**: `emilys`
    - **password**: `'emilyspass'`
- Verificar se o usuário é redirecionado para `/receitas`
- Verificar se o nome do usuário aparece
- Verificar se o token é salvo no `localStorage`

---

### 🍽️ 3. Listagem de receitas

- Acessar a rota `/receitas`
- Verificar se há uma lista de receitas visíveis
- Verificar presença de: imagem, nome, calorias, tempo de preparo

---

### 📄 4. Detalhes de uma receita

- Acessar `/receitas/2`
- Verificar nome, imagem, ingredientes e instruções da receita
- Verificar se a URL contém o ID

---

### 👤 5. Perfil do usuário

- Acessar `/perfil` após login
- Verificar nome, e-mail, gênero e imagem
- Testar o botão “Sair” e confirmar redirecionamento para o login

---

## 🧠 Avaliação

O objetivo é avaliar a forma como o QA define e aplica os cenários de teste relacionados à página de perfil do usuário. Espera-se que o candidato:
* Identifique elementos relevantes para verificação (ex: nome, e-mail, tokens, imagem, etc.)
* Escolha assertivamente o que deve ser validado em termos funcionais e visuais
* Justifique a seleção dos casos de teste (por que testar esses pontos?)
* Aplique boas práticas de automação ao estruturar os testes dessa página
* É interessante também conter os testes dos endpoints que o front realiza as requisições

Não há um script fixo — o foco é observar o raciocínio, a cobertura e a clareza na execução dos testes propostos.

---

## 📦 Entrega esperada

- Projeto versionado (GitHub ou ZIP)
- Pasta `tests/` com os arquivos de teste
- Este `TESTE.md` com instruções de execução

---

### Justificativa da seleção de casos de testes 

## Fluxos críticos de autenticação: 

- O login e o logout são funcionalidades essenciais para o controle de acesso ao sistema. Os testes foram elaborados para validar o fluxo esperado (credenciais válidas) e situaçoes de erros (credenciais inválidas). 

## Segurança e controle de sessão: 

- Foi verificado se a aplicação restringe corretamente o acesso as telas protegidas ao acessar com o usuário autenticado e com o usuário não autenticado (exceto a tela de login).

## Experiência do usuário

- Foi validado se o conteúdo está sendo exibido em tela para o usuário corretamente, garantindo que os elementos estejam visíveis e acessíveis ao usuário; 

## Bugs encontrados

* Ao salvar o token do usuário no localStorage está sempre salvo a string "undefined";
* O código da tela "Receitas" não foi escrito orientado para testes, sendo assim foi utilizado o CSS para identificação do elemento dentro do HTML;
* É possivel acessar qualquer tela sem usuário autenticado; 


### Como executar os testes

1. Necessário realizar o download do [NodeJs](https://nodejs.org/pt)
2. Realizar o comando ```npm install``` para instalar as dependências do projeto
3. Executar o comando ```npm run start``` para executar o projeto
4. O projeto irá abrir no navegador na porta 3000.
5. Com o projeto em execução. Executar o comando ```npx playwright test``` para executar os testes