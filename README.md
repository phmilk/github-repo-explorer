# GitHub Repo Explorer

Uma aplicação web para explorar perfis e repositórios do GitHub de forma rápida e intuitiva.

**Demo:** https://my-github-repo-explorer.web.app/

## Sobre o Projeto

O **GitHub Repo Explorer** permite que você busque qualquer usuário do GitHub, visualize seus repositórios com suporte a ordenação e paginação, e acesse os detalhes completos de cada repositório. A aplicação usa autenticação via Firebase com GitHub OAuth para realizar requisições autenticadas à API do GitHub.

### Funcionalidades

- **Buscar usuários** — encontre qualquer usuário público do GitHub pelo nome de usuário
- **Listar repositórios** — veja todos os repositórios públicos em uma tabela paginada
- **Ordenar repositórios** — ordene por nome, stars, forks ou issues abertas (asc/desc)
- **Paginação** — navegue entre páginas com controle de itens por página (10, 20, 30, 50 ou 100)
- **Detalhes do repositório** — descrição, tópicos, estatísticas, licença, branch padrão, datas e mais
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

### Instalação

```bash
git clone https://github.com/phmilk/github-repo-explorer.git
cd github-repo-explorer
npm install
```

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

O projeto segue uma arquitetura **orientada a features**, com testes co-localizados aos módulos que testam.

```
src/
├── app/
│   └── App.tsx                   # Raiz da aplicação: providers e rotas
│
├── features/
│   ├── auth/                     # Autenticação Firebase + GitHub OAuth
│   │   ├── components/           # LoginModal, UserMenu
│   │   ├── context/              # AuthContext, LoginModalContext
│   │   ├── hooks/                # useAuth, useLoginModal
│   │   └── services/             # firebase.ts, tokenStorage.ts
│   │
│   ├── repositories/             # Repositórios do GitHub
│   │   ├── components/           # RepoTable (Body, Row, SortHeader, Footer)
│   │   │                         # RepoDetails (Header, Stats, Info, InfoRow, Flag)
│   │   ├── hooks/                # useRepoData
│   │   ├── pages/                # RepoPage
│   │   ├── services/             # repoApi.ts
│   │   ├── types/
│   │   └── utils/
│   │
│   └── users/                    # Perfis de usuários do GitHub
│       ├── components/           # UserInfo (UserAvatar, UserStats)
│       ├── hooks/                # useReposPaginated
│       ├── pages/                # UserPage
│       ├── services/             # userApi.ts
│       └── types/
│
└── shared/                       # Código compartilhado entre features
    ├── components/               # Layout, Header, Search, Footer
    │                             # Loading, RepoPagination, ErrorPage
    ├── pages/                    # HomePage, NotFoundPage
    └── services/                 # githubClient.ts (Axios)
```

### Fluxo de Dados

1. O usuário digita um nome na barra de busca (`Search`)
2. A navegação vai para `/user/:username` — `UserPage` invoca `useReposPaginated`
3. `useReposPaginated` busca `getUser` e `getUserRepos` em paralelo
4. O estado de paginação/ordenação fica nos **search params da URL** (ex: `?page=2&per_page=30&sort=forks_count&direction=desc`)
5. Ordenação de colunas numéricas é feita **client-side**; para nome é delegada à API
6. Ao clicar em um repo, a navegação vai para `/repo/:username/:reponame` — `RepoPage` invoca `useRepoData`

---

## Testes

```bash
npm test                # Todos os testes
npm run test:coverage   # Com relatório de cobertura
```

Testes co-localizados com os módulos que cobrem, usando **Vitest** + **Testing Library**:

- Funções utilitárias (`formatSize`, `formatDate`, `formatStars`)
- Camada de serviços (`tokenStorage`, `repoApi`, `userApi`)
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
