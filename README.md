## Como rodar o projeto

### Requisitos

- Node.js 20+
- Gerenciador de pacotes (NPM 10+, Yarn 4+ ou PNPM 9+)
- Variáveis de ambiente: nenhuma obrigatória para ambiente local (API pública FakeStore).

### Instalação

```bash
# instale dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
# acessível em http://localhost:3000
```

### Build de produção

```bash
npm run build
npm run start   # inicia servidor com o build gerado
```

### Testes

```bash
npm run test                     # roda Jest + Testing Library
npm run test -- <pasta/arquivo>  # roda suíte específica
```

### Scripts disponíveis

- `dev`: Next.js em modo watch
- `build`: compila o App Router
- `start`: executa o build em modo produção
- `lint`: validação via ESLint 9+
- `test`: Jest 30 com RTL

### Configuração opcional

- `npm run lint` para checar estilo

---

## Decisões técnicas

### Arquitetura por features

- `src/features/products` concentra componentes, hooks, copy, utils e testes do domínio. Facilita ownership por squad e evita imports cruzados acidentais.

### Next.js App Router

- `src/app` mantém rotas, layout e loaders seguindo convenções do App Router (Streaming + RSC). Server Components padrão para páginas, Containers como Client Components para interatividade.

### Server vs Client Components

- Server: `app/products/page.tsx`, `ProductDetail`, layouts e skeletons → reduzem bundle, usam fetch no servidor.
- Client: componentes com estado (filtros, botões) e containers que consomem hooks (`useProductsData`, `useProductDetail`).

### Hooks personalizados

- `useProductsData`, `useProductDetail` vivem em `features/products/hooks`. Abstraem fetch, loading e retry sem depender de libs externas. `useCallback` garante identidade estável ao expor `refetch`.

### Gerenciamento de estado local

- `useState` apenas onde há interação do usuário (filtro de categoria, acordeão de filtros). Não há global store; containers recebem dados via props ou hooks.

### Camada de API

- `lib/api/products.ts` isola `getProducts`/`getProductById`, centralizando URL base e tratamento de erros HTTP/JSON.

### Testes

- Jest + Testing Library. Componentes usam RTL para validar comportamento acessível; hooks são testados com mocks de `getProducts`/`getProductById`.

### Cópia em /copy

- Strings e helpers de texto ficam em `src/lib/copy.ts` (globais) e `features/products/copy/*` (contexto específico). Facilita i18n e garante consistência com testes.

### Componentes desacoplados

- `components/common` guarda ActionButton, Header, Skeletons e Breadcrumb para evitar repetição. `classNames` util em `lib/utils.ts` mantém Tailwind organizado.

### Padronização de tipos

- `features/products/types.ts` descreve `Product`/`Rating`. Todos os componentes/hook usam o mesmo contrato, evitando discrepâncias com a API.

### Hooks React

- `useState`: filtros, accordions.
- `useEffect`: dentro dos hooks para disparar fetch inicial quando necessário.
- `useCallback`: memoiza funções de refetch e evita re-render em consumidores.
- `useMemo`: não foi necessário; datasets pequenos e cálculo barato.

---

## Trade-offs

- **Simplicidade vs abstração**: optei por hooks manuais no lugar do React Query para reduzir dependências externas. A prioridade é ter um código explícito e previsível, mesmo que isso signifique menos funcionalidades automáticas (cache, dedupe) integradas.
- **Manutenção vs granularidade**: componentes quebrados por responsabilidade (Card, InfoCard, Filters) aumentam arquivos, mas facilitam testes e evolução.
- **Client/Server boundary**: containers em client deixam parte da lógica no browser; em troca, páginas server-side entregam dados cacheados e diminuem JS enviado, o que acelera o tempo de carregamento da página e melhora a performance geral.
- **Sem state global**: evita overhead de Context/Redux, mas exige prop drilling controlado (atualmente mínimo). Se o app crescer, será preciso reavaliar.
- **Caching leve**: implementei um caching leve onde o hook refetch sempre chama a API. Essa simplicidade atual evita complexidade, mas resulta em requisições repetitivas que seriam otimizadas com uma camada de cache dedicada.
- **Fallback UI**: `AsyncStatus` centraliza skeletons e `ErrorStatus`, evitando duplicação de código e preserva uma UX consistente. Caso a complexidade cresça, ainda podemos evoluir para Suspense boundaries ou React Query para estados assíncronos mais sofisticados.
- **Estrutura de pastas**: adotei a separação features/ para lógica de negócios e components/common/ para itens reutilizáveis. Isso cria uma organização clara, mas a estrutura pode parecer verbosa em projetos de menor escala.

---

## Pontos de melhoria

1. **Adicionar testes E2E** (Playwright/Cypress) para validar jornada completa (lista → detalhe → erro).
2. **Melhorar acessibilidade**: revisar contraste, focus visíveis e labels dinâmicos.
3. **Integrar React Query/SWR** futuramente para cache e revalidação automática da FakeStore API.
4. **Criar camada de domain models** (ex.: mapeamento ProductDTO → Product) para tratar descontos, normalizar categorias e preparar adaptações de API.
5. **Memoization estratégica**: `useMemo` para listas derivadas quando o catálogo crescer, reduzindo cálculos repetidos.
6. **Design System interno**: promover componentes como Card, Badge, Grid para evitar repetição de Tailwind.
7. **Documentar tipos mais profundamente**: gerar doc via TypeDoc ou comentários JSDoc nos principais hooks e utilitários.
