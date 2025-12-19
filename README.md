# G4F Frontend

Aplicação frontend desenvolvida em **React + TypeScript**, utilizando **Vite**, com foco em organização de código, boas práticas, UX responsivo e testes automatizados no formato **BDD**.

A aplicação contempla:

- Busca de endereços por CEP usando a API pública **ViaCEP**
- CRUD de **Notícias** integrado a uma API REST
- Layout responsivo (mobile-first)
- Testes automatizados com **Vitest + Testing Library**
- Dockerização otimizada usando **Node 22**
- Estrutura de pastas pensada para escalabilidade e manutenção

---

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Axios
- Vitest
- @testing-library/react
- Docker
- Node.js 22

---

## Requisitos

Para rodar localmente sem Docker:

- Node.js **22.x**
- npm ou yarn

Para rodar com Docker:

- Docker instalado

---

## Configuração do projeto

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:4501
```

> Essa URL deve apontar para a API backend que expõe os endpoints de Notícias.

---

## Executando o projeto localmente

### Instalar dependências

```bash
npm install
```

### Rodar em modo desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:4500
```

> A porta **4500** é fixa e configurada no `vite.config.ts`.

---

### Build de produção

```bash
npm run build
```

---

### Preview do build

```bash
npm run preview
```

---

## Testes automatizados (BDD)

Os testes seguem a metodologia **BDD (Behavior-Driven Development)**, utilizando descrições no formato:

> Given / When / Then

### Estrutura dos testes

Os testes ficam **fora da pasta `src`**, na raiz do projeto:

```txt
tests/
└── cep-search.bdd.test.tsx
```

### Rodar os testes

```bash
npm run test
```

O teste cobre os seguintes cenários da busca de CEP:

- CEP válido retorna endereço
- CEP inválido exibe mensagem de erro
- CEP inexistente (API retorna `erro: true`) exibe mensagem apropriada

---

## Executando com Docker

### Estrutura

O Dockerfile está localizado em:

```txt
ops/Dockerfile
```

### Build da imagem

Na raiz do projeto:

```bash
docker build -t g4f-frontend -f ops/Dockerfile .
```

### Executar o container

```bash
docker run -p 4500:4500 g4f-frontend
```

A aplicação ficará disponível em:

```
http://localhost:4500
```

---

## Estrutura de pastas

```txt
src/
├── App.tsx
├── index.css
├── main.tsx
├── common
│   └── Navigation/
├── layouts
│   └── AppLayout.tsx
├── pages
│   ├── CepSearch
│   │   ├── CepSearch.css
│   │   ├── CepSearch.tsx
│   │   ├── components/
│   │   └── hooks/
│   └── Noticias
│       ├── components/
│       ├── hooks/
│       ├── Noticias.css
│       └── Noticias.tsx
├── routes
│   └── AppRoutes.tsx
├── services
│   ├── httpClient.ts
│   ├── noticias.service.ts
│   └── viacep.service.ts
├── types/
└── utils/
```

---

## Justificativa da arquitetura

### Organização por página (page-centric)

Cada funcionalidade da aplicação é tratada como uma **página isolada**, contendo:

- Componentes específicos da tela
- Um hook central responsável por toda a lógica
- Estilos próprios

Isso facilita:

- Leitura do código
- Manutenção
- Escalabilidade

---

### Hooks por página

Cada página possui um hook principal (`useCepSearch`, `useNoticias`) que concentra:

- Estado
- Efeitos colaterais
- Chamadas à API
- Regras de negócio

Os componentes ficam responsáveis apenas pela renderização.

---

### Camada de serviços

Toda comunicação HTTP fica isolada na pasta `services`, utilizando um `httpClient` centralizado.

- URLs relativas -> API interna
- URLs absolutas -> APIs externas (ViaCEP)

O Axios ignora automaticamente o `baseURL` em URLs absolutas, permitindo reutilização do client.

---

### CSS manual e responsivo

- CSS escrito manualmente (sem frameworks)
- Abordagem mobile-first

---

### Testes fora do `src`

Os testes ficam fora da pasta de código-fonte para:

- Separar claramente código de produção e código de teste
- Facilitar leitura e organização
- Evitar acoplamento indevido

---

## Padrões de código

- ESLint para padronização
- Prettier para formatação
- Componentes pequenos e focados
- Nomes explícitos

