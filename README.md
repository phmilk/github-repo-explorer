# GitHub Repo Explorer

Uma aplicação web para explorar perfis e repositórios do GitHub de forma rápida e intuitiva.

## Sobre o Projeto

O **GitHub Repo Explorer** permite que você busque qualquer usuário do GitHub, visualize seus repositórios com suporte a ordenação e paginação, e acesse os detalhes completos de cada repositório. A aplicação usa autenticação via Firebase com GitHub OAuth para realizar requisições autenticadas à API do GitHub.

### O que a aplicação faz

- **Buscar usuários** — encontre qualquer usuário público do GitHub pelo nome de usuário
- **Listar repositórios** — veja todos os repositórios públicos em uma tabela paginada
- **Ordenar repositórios** — ordene por nome, stars, forks ou issues abertas (asc/desc)
- **Paginação** — navegue entre páginas com controle de itens por página (10, 20, 30, 50 ou 100)
- **Detalhes do repositório** — informações completas: descrição, tópicos, estatísticas, licença, branch padrão, datas e mais
- **Autenticação** — faça login com GitHub via Firebase para usar a API com rate limit mais alto

---

## Tecnologias

| Tecnologia                                                         | Uso                              |
| ------------------------------------------------------------------ | -------------------------------- |
| [React 19](https://react.dev/)                                     | Framework principal              |
| [Vite 8](https://vite.dev/)                                        | Build tool e dev server          |
| [React Router 7](https://reactrouter.com/)                         | Roteamento client-side           |
| [React Bootstrap 2](https://react-bootstrap.github.io/)            | Componentes de UI                |
| [Bootstrap 5](https://getbootstrap.com/) + Bootstrap Icons         | Estilo e ícones                  |
| [Axios](https://axios-http.com/)                                   | Requisições HTTP à API do GitHub |
| [Firebase](https://firebase.google.com/)                           | Autenticação e hosting           |
| [Vitest 4](https://vitest.dev/)                                    | Test runner                      |
| [Testing Library](https://testing-library.com/)                    | Utilitários de teste             |
| [TypeScript 5](https://www.typescriptlang.org/)                    | Tipagem estática                 |
| [ESLint 9](https://eslint.org/) + [Prettier](https://prettier.io/) | Linting e formatação             |
| [Semantic Release](https://semantic-release.gitbook.io/)           | Versionamento automático         |

---

## Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20.x
- Conta no GitHub (para criar um app OAuth)
- Projeto no [Firebase](https://console.firebase.google.com/) com Authentication habilitado

### Instalação

```bash
# Clone o repositório
git clone https://github.com/<seu-usuario>/github-repo-explorer.git
cd github-repo-explorer

# Instale as dependências
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis do Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

> As credenciais estão disponíveis em **Configurações do projeto → Seus aplicativos** no [Firebase Console](https://console.firebase.google.com/).
> Para habilitar o login com GitHub, vá em **Authentication → Sign-in method → GitHub** e configure o Client ID e Secret do seu GitHub OAuth App.

### Scripts Disponíveis

```bash
npm run dev           # Servidor de desenvolvimento
npm run build         # Build de produção
npm run preview       # Visualizar o build localmente
npm run lint          # Verificar Prettier + ESLint
npm run lint:fix      # Corrigir problemas de lint automaticamente
npm test              # Executar testes
npm run test:coverage # Executar testes com relatório de cobertura
```

---

## Arquitetura

O projeto segue uma organização **orientada a componentes** com separação clara de responsabilidades:

```
src/
├── api/                      # Camada de acesso a dados
│   ├── auth.ts               # Gerenciamento de token (localStorage)
│   └── github.ts             # Cliente Axios para a API do GitHub
│
├── components/               # Componentes reutilizáveis
│   ├── Layout/               # Header, Footer, UserMenu, Search
│   ├── RepoDetails/          # Detalhes de um repositório
│   │   ├── RepoHeader.tsx    # Cabeçalho: back-link, owner, badges
│   │   ├── RepoStats.tsx     # Stars, forks, watchers, issues, size
│   │   ├── RepoInfo.tsx      # Linguagem, licença, datas, flags
│   │   ├── Flag.tsx          # Indicador booleano (ex: Issues ativas)
│   │   ├── InfoRow.tsx       # Linha label + valor
│   │   └── utils.ts          # formatSize, formatDate
│   ├── RepoTable/            # Tabela paginada de repositórios
│   │   ├── Body.tsx          # Corpo da tabela
│   │   ├── Row.tsx           # Linha com link para detalhes
│   │   ├── SortHeader.tsx    # Cabeçalho com ordenação
│   │   ├── Footer.tsx        # Seletor de itens/página + paginação
│   │   └── utils.ts          # formatStars, formatDate
│   ├── UserInfo/             # Card de perfil do usuário
│   │   ├── UserAvatar.tsx    # Avatar, nome e handle
│   │   └── UserStats.tsx     # Seguidores, seguindo, botão limpar
│   ├── Loading.tsx           # Spinner acessível
│   ├── LoginModal.tsx        # Modal de autenticação GitHub/Firebase
│   ├── RepoPagination.tsx    # Controles de paginação
│   └── Search.tsx            # Barra de busca de usuários
│
├── contexts/                 # Contextos React
│   ├── AuthContext.tsx       # Estado de autenticação Firebase
│   └── LoginModalContext.tsx # Visibilidade do modal de login
│
├── hooks/                    # Custom hooks
│   ├── useAuth.ts            # Acesso ao AuthContext
│   ├── useLoginModal.ts      # Acesso ao LoginModalContext
│   ├── useRepoData.ts        # Busca de um repositório
│   └── useReposPaginated.ts  # Busca paginada com estado na URL
│
├── lib/
│   └── firebase.ts           # Inicialização do Firebase
│
├── pages/                    # Páginas
│   ├── HomePage.tsx          # Tela inicial
│   ├── UserPage.tsx          # Perfil + tabela de repos
│   ├── RepoPage.tsx          # Detalhes do repositório
│   ├── ErrorPage.tsx         # Erro genérico
│   └── NotFoundPage.tsx      # 404
│
└── __tests__/                # Testes (espelham a estrutura src/)
    ├── api/
    ├── components/
    ├── hooks/
    └── pages/
```

### Fluxo de Dados

1. O usuário digita um nome na barra de busca (`Search`)
2. A navegação vai para `/user/:username` — `UserPage` invoca `useReposPaginated`
3. `useReposPaginated` busca `getUser` e `getUserRepos` em paralelo
4. O estado de paginação/ordenação fica nos **search params da URL** (ex: `?page=2&per_page=30&sort=forks_count&direction=desc`)
5. Ordenação de colunas numéricas é feita **client-side**; para nome (`full_name`) é delegada à API
6. Ao clicar em um repo, a navegação vai para `/repo/:username/:reponame` — `RepoPage` invoca `useRepoData`

---

## Testes

O projeto mantém cobertura próxima de 100% com **Vitest** e **Testing Library**.

```bash
npm test                # Todos os testes
npm run test:coverage   # Com relatório de cobertura
```

A suíte cobre:

- Funções utilitárias (`formatSize`, `formatDate`, `formatStars`)
- Camada de API (`auth.ts`, mocks de `github.ts`)
- Custom hooks (`useRepoData`, `useReposPaginated`)
- Todos os componentes visuais
- Todas as páginas

---

## CI/CD

O GitHub Actions executa automaticamente em todo push e PR para `main`:

| Job         | Gatilho                                                         |
| ----------- | --------------------------------------------------------------- |
| **Lint**    | PRs e push para `main`                                          |
| **Test**    | PRs e push para `main`                                          |
| **Build**   | Após lint + test passarem                                       |
| **Release** | Push para `main` — gera versão e CHANGELOG via Semantic Release |
| **Deploy**  | Push para `main` — deploy no Firebase Hosting                   |

### Commits Convencionais

| Prefixo                      | Versão gerada     |
| ---------------------------- | ----------------- |
| `feat:`                      | minor (ex: 1.1.0) |
| `fix:`                       | patch (ex: 1.0.1) |
| `feat!:` / `BREAKING CHANGE` | major (ex: 2.0.0) |
| `chore:`, `docs:`, `test:`   | sem release       |
