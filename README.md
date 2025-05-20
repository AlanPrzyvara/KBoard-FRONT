# Kanban Board

Um quadro Kanban moderno e responsivo construído com Next.js 13, TypeScript e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14**: Framework React com suporte a Server Components e App Router
- **TypeScript**: Tipagem estática para maior segurança e melhor desenvolvimento
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e consistente
- **React Query**: Gerenciamento de estado e cache para dados do servidor
- **React Hook Form**: Gerenciamento de formulários com validação
- **Zod**: Validação de esquemas e tipos em tempo de execução
- **React Beautiful DnD**: Biblioteca para implementação de drag and drop
- **Headless UI**: Componentes acessíveis e sem estilo para UI
- **Heroicons**: Ícones modernos e consistentes
- **React Hot Toast**: Notificações toast elegantes e customizáveis

### Backend
- **Spring Boot**: Framework Java para desenvolvimento de APIs REST
- **Spring Data JPA**: Persistência de dados com JPA/Hibernate
- **PostgreSQL**: Banco de dados relacional
- **Lombok**: Redução de código boilerplate em Java
- **Spring Security**: Autenticação e autorização
- **JWT**: Autenticação baseada em tokens

## ✨ Funcionalidades

- 📱 Interface responsiva e moderna
- 🌓 Suporte a tema claro e escuro
- 🎯 Drag and drop de tarefas entre colunas
- 📝 Criação e edição de tarefas
- 📋 Gerenciamento de colunas
- 🔄 Atualização em tempo real
- 🔒 Autenticação de usuários
- 💾 Persistência de dados
- 🎨 Design system consistente
- ♿ Acessibilidade

## 🛠️ Configuração do Ambiente

### Frontend
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar versão de produção
npm start
```

### Backend
```bash
# Compilar o projeto
./mvnw clean install

# Iniciar o servidor
./mvnw spring-boot:run
```

## 📦 Estrutura do Projeto

```
kanbam-front/
├── src/
│   ├── app/              # Rotas e páginas
│   ├── components/       # Componentes React
│   ├── contexts/         # Contextos React
│   ├── services/         # Serviços e APIs
│   ├── types/           # Definições de tipos
│   └── utils/           # Funções utilitárias
├── public/              # Arquivos estáticos
└── tailwind.config.js   # Configuração do Tailwind
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Alan Oliveira - [GitHub](https://github.com/alan-oliveira)

---

Desenvolvido com ❤️ por Alan Oliveira

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
