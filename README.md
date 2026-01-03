# KAIA 5.0 - Plataforma de Mapeamento Comportamental

Sistema de avaliação comportamental baseado em DISC, Sabotadores e Quociente Positivo (QP).

## 🚀 Deploy no Vercel

Este projeto está configurado para deploy automático no Vercel.

### Estrutura do Projeto

```
├── api/                    # Serverless Functions
│   ├── quiz.js            # Endpoint para questões do quiz
│   ├── process.js         # Processamento das respostas
│   ├── dashboard.js       # Dados do dashboard
│   └── apps-script.js     # Proxy para Google Apps Script
├── public/                 # Arquivos estáticos
│   ├── index.html         # Landing page
│   ├── quiz.html          # Página do quiz
│   └── dashboard.html     # Dashboard administrativo
├── vercel.json            # Configuração do Vercel
└── package.json           # Dependências
```

### Rotas Disponíveis

- `/` - Landing page principal
- `/quiz` - Página do quiz (parâmetros: `mode=free` ou `mode=full`)
- `/dashboard` - Dashboard administrativo
- `/api/quiz` - API de questões
- `/api/process` - API de processamento
- `/api/dashboard` - API de dados do dashboard
- `/api/apps-script` - Proxy para Google Apps Script

### Configuração de Variáveis de Ambiente

No painel do Vercel, configure:

```
APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_DEPLOYMENT_ID/exec
```

### Integração com Google Apps Script

Para salvar dados na planilha Google:

1. Faça deploy do seu Apps Script como Web App
2. Copie a URL do deploy
3. Configure a variável `APPS_SCRIPT_URL` no Vercel

## 🛠 Desenvolvimento Local

```bash
# Instalar Vercel CLI
npm i -g vercel

# Rodar localmente
vercel dev
```

## 📊 Funcionalidades

- **Análise DISC**: Identifica o perfil comportamental (Executor, Comunicador, Planejador, Analista)
- **Quociente Positivo (QP)**: Mede a força mental e resiliência
- **Sabotadores**: Identifica padrões mentais que limitam a performance
- **Relatório Personalizado**: Gera análise detalhada com recomendações

## 🔗 Links

- **Planilha de Dados**: [Google Sheets](https://docs.google.com/spreadsheets/d/1pZwkyVMD_7lBKYjg8oAoEmGaX__x0c2_eMnLiQtf8fw/edit)
- **Apps Script**: [Editor](https://script.google.com/u/0/home/projects/1JRFBaTlIBuRrTWUozAGDxmJKoDCWiOfXQKHyUSpMvRxHKA586Ljb812r/edit)

---

**Powered by REVELA**