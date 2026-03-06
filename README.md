# Teste Técnico Front-End - Catálogo de Produtos

Projeto desenvolvido com **Next.js**, **React**, **TypeScript** e **Material UI** para consumir a API pública DummyJSON e exibir uma listagem de produtos com filtros, ordenação e paginação.

## 🚀 Funcionalidades

- **Listagem de Produtos**: Exibe produtos em um formato de grade responsiva.
- **Busca em Tempo Real**: Filtra os resultados instantaneamente pelo nome ou descrição.
- **Filtro por Categorias**: Permite visualizar produtos apenas de uma categoria específica.
- **Ordenação**: Ordena a página atual de produtos por Ordem Alfabética (A-Z / Z-A) ou Preço (menor para o maior / maior para o menor).
- **Paginação Completa**: Navegação entre as páginas contendo no máximo 10 itens cada.
- **Design Responsivo**: Adaptado para Desktop e Mobile através do Material UI.

## 🛠 Principais Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- API: [DummyJSON](https://dummyjson.com/products)

## 📦 Como Instalar e Rodar o Projeto Localmente

1. **Clone o repositório** (se disponível):
   ```bash
   git clone https://github.com/SEU_USUARIO/teste-tecnico-frontend.git
   cd teste-tecnico-frontend
   ```

2. **Instale as dependências**:
   Você pode utilizar o gerenciador de pacotes da sua preferência (`npm`, `yarn`, `pnpm`):
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no Navegador**:
   Abra a URL [http://localhost:3000](http://localhost:3000). A aplicação estará pronta para uso.

## 🗂 Estrutura de Arquivos

A organização baseia-se na escalabilidade e componentização:
- `src/components/`: Componentes visuais isolados (`ProductCard`, `SearchBar`, etc).
- `src/services/`: Funções assíncronas de comunicação com a API.
- `src/types/`: Tipagens unificadas em TypeScript que espelham a resposta da API.
- `src/app/`: Onde mora a `page.tsx` principal de rotas do Next.js.
