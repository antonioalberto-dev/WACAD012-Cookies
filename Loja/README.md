# ExpTs - Express com TypeScript

Este projeto é uma conversão do projeto Express básico para TypeScript, mantendo a mesma simplicidade e funcionalidade.

## Estrutura do Projeto

```
ExpTs/
├── src/
│   └── app.ts          # Código fonte em TypeScript
├── build/              # Arquivos JavaScript compilados
│   ├── app.js
│   └── app.d.ts
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração do TypeScript
├── .env               # Variáveis de ambiente
└── README.md          # Este arquivo
```

## Principais Mudanças do JavaScript para TypeScript

1. **Imports ES6**: Substituição de `require()` por `import`
2. **Tipagem**: Adição de tipos para variáveis (`PORT: number`, `APP_NAME: string`)
3. **Export**: Substituição de `module.exports` por `export default`
4. **Configuração**: Adição de `tsconfig.json` e dependências de tipos

## Scripts Disponíveis

- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Executa o servidor compilado
- `npm run dev`: Executa em modo desenvolvimento com nodemon

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Compile o projeto:
   ```bash
   npm run build
   ```

3. Execute o servidor:
   ```bash
   npm start
   ```

O servidor estará disponível em: http://localhost:3333

## Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão: 3000)
- `APP_NAME`: Nome da aplicação (padrão: 'APP')
