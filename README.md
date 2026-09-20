# To-Do List — Testes Unitários em Next.js

Aplicação simples de listagem e adição de tarefas, construída com **Next.js (App Router)** e **TypeScript**, com foco em Server Components, Server Actions, um hook personalizado e cobertura de testes unitários com **Jest** e **React Testing Library**.

🔗 **Site publicado:** https://ebac-frontend-testes-unitarios-2rtsdn82i.vercel.app/

## Pré-requisitos

- Node.js 20+
- npm

## Instalação

```bash
npm install
```

## Executando em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Rodando os testes

```bash
npm run test
```

Para rodar em modo watch (re-executa ao salvar arquivos):

```bash
npm run test:watch
```

## Estrutura do projeto

```
app/
  components/     Componentes de UI reutilizáveis (NovaTarefa, ListTasksComponent, Header, Footer)
  hooks/          Hooks personalizados (useContadorDeTarefas e variantes)
  pages/          Server Components de página, compostos a partir de app/page.tsx
  lib/            Camada de dados (Server Actions de leitura/escrita das tarefas)
  types/          Tipos TypeScript compartilhados
  data/           Arquivo JSON usado como "banco de dados" simulado
tests/
  components/     Testes dos componentes acima
  hooks/          Testes dos hooks (via renderHook)
  pages/          Testes das páginas
  lib/            Testes da camada de dados
```

## Arquitetura

- **`app/page.tsx`** é o Server Component que carrega a lista de tarefas (`getTask()`, de `app/lib/Tasks.ts`) e a repassa como prop para `app/pages/ToDoListPage.tsx`.
- **`app/components/NovaTarefa.tsx`** é um Client Component com formulário controlado (`useState`) que adiciona tarefas via Server Action (`addTask`).
- **`app/lib/Tasks.ts`** concentra todas as operações de CRUD (`getTask`, `addTask`, `deleteTask`, `toggleTask`) como Server Actions (`'use server'`), persistindo em `app/data/tasks.json` via `fs/promises`.
- **`app/hooks/tasksCountHook.ts`** expõe `useContadorDeTarefas` (e as variantes `useContadorDeTarefasConcluidas`/`useContadorDeTarefasInconcluidas`), hooks puros que recebem a lista de tarefas e retornam contagens.

## Estratégia de testes

- **Camada de dados (`tests/lib/Tasks.test.ts`)**: roda em ambiente `node` (`@jest-environment node`) e mocka `fs/promises` e `next/cache` com `jest.mock`, isolando a lógica de CRUD do sistema de arquivos real.
- **Componentes de UI**: mockam apenas as Server Actions importadas de `app/lib/Tasks` (não a fonte de dados em si), evitando carregar a infraestrutura de servidor do Next.js (`fs`, `next/cache`) dentro do ambiente `jsdom`.
- **Hook (`tests/hooks/tasksCountHook.test.ts`)**: testado de forma isolada com `renderHook`, sem nenhum mock, já que os hooks são funções puras que recebem a lista de tarefas por parâmetro.
- **Página (`tests/pages/ToDoListPage.test.tsx`)**: renderiza `ToDoListPage` recebendo `tasks` diretamente por prop — sem mockar a busca de dados — já que Server Components `async` não são suportados pelo Jest.

## CI/CD

O pipeline está definido em [`.github/workflows/main.yml`](.github/workflows/main.yml) e é executado a cada `push` ou `pull request` na branch `main`.

**Job `ci`** (roda sempre):
1. Instala as dependências (`npm ci`)
2. Roda o lint (`npm run lint`)
3. Roda os testes (`npm run test`)
4. Roda o build de verificação (`npm run build`)

**Job `deploy`** (roda apenas em `push` direto na `main`, após o `ci` passar):
1. Instala a Vercel CLI
2. Faz o build e o deploy de produção via `vercel deploy --prod`

### Secrets necessários

Cadastre em *Settings → Secrets and variables → Actions* do repositório:

| Secret | Onde obter |
|---|---|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Rode `vercel link` localmente e veja `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Idem — gerado em `.vercel/project.json` após `vercel link` |

Acompanhe as execuções na aba **Actions** do repositório no GitHub.
