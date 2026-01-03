/**
 * KAIA 5.0 - API Quiz Endpoint
 * Retorna as questões do quiz
 */

// --- BANCO DE QUESTÕES (MASTER BANK) ---
const MASTER_QUESTION_BANK = {
  QP: [
    "Eu mantenho a calma sob pressão extrema.", 
    "Eu foco na solução em vez de remoer o problema.", 
    "Eu controlo minhas emoções na maior parte do tempo.",
    "Eu busco aprender com meus erros rapidamente.", 
    "Eu consigo silenciar pensamentos negativos.", 
    "Eu me sinto confiante para novos desafios.",
    "Eu pratico a gratidão diariamente.", 
    "Eu evito me culpar excessivamente.", 
    "Eu acredito que o futuro reserva oportunidades.", 
    "Eu raramente me deixo abater por críticas."
  ],
  SABOTADORES: [
    {t:"Sinto necessidade de que tudo esteja perfeito.", s:"Insistente"}, 
    {t:"Coloco as necessidades dos outros acima das minhas.", s:"Prestativo"},
    {t:"Sinto que só tenho valor se produzir resultados.", s:"Hiper-Realizador"}, 
    {t:"Costumo adiar tarefas difíceis.", s:"Esquivo"},
    {t:"Sinto necessidade de controlar tudo ao meu redor.", s:"Controlador"}, 
    {t:"Sou extremamente crítico comigo mesmo.", s:"Crítico"},
    {t:"Sinto-me inquieto e busco sempre novidades.", s:"Inquieto"}, 
    {t:"Foco no que pode dar errado.", s:"Hiper-Vigilante"},
    {t:"Uso a lógica para evitar emoções.", s:"Hiper-Racional"}, 
    {t:"Sinto que sou uma vítima das circunstâncias.", s:"Vítima"}
  ],
  DISC: [
    {t:"Em uma equipe, minha postura natural é:", opts:[{t:"Liderar", v:"D"},{t:"Engajar", v:"I"},{t:"Apoiar", v:"S"},{t:"Analisar", v:"C"}]},
    {t:"Meu maior motivador no trabalho é:", opts:[{t:"Desafios", v:"D"},{t:"Reconhecimento", v:"I"},{t:"Estabilidade", v:"S"},{t:"Precisão", v:"C"}]},
    {t:"Sob pressão, eu costumo:", opts:[{t:"Agir rápido", v:"D"},{t:"Falar mais", v:"I"},{t:"Ficar calmo", v:"S"},{t:"Me retrair", v:"C"}]},
    {t:"Quando tomo decisões, eu priorizo:", opts:[{t:"Velocidade", v:"D"},{t:"Consenso", v:"I"},{t:"Segurança", v:"S"},{t:"Dados", v:"C"}]},
    {t:"Em conflitos, eu geralmente:", opts:[{t:"Confronto", v:"D"},{t:"Negocio", v:"I"},{t:"Cedo", v:"S"},{t:"Analiso", v:"C"}]},
    {t:"O que mais me frustra é:", opts:[{t:"Lentidão", v:"D"},{t:"Rejeição", v:"I"},{t:"Mudança", v:"S"},{t:"Erros", v:"C"}]},
    {t:"Meu estilo de comunicação é:", opts:[{t:"Direto", v:"D"},{t:"Entusiástico", v:"I"},{t:"Calmo", v:"S"},{t:"Detalhado", v:"C"}]},
    {t:"Eu trabalho melhor quando:", opts:[{t:"Tenho autonomia", v:"D"},{t:"Trabalho em equipe", v:"I"},{t:"Sigo rotinas", v:"S"},{t:"Tenho regras claras", v:"C"}]},
    {t:"Meu maior medo é:", opts:[{t:"Perder controle", v:"D"},{t:"Ser ignorado", v:"I"},{t:"Conflito", v:"S"},{t:"Estar errado", v:"C"}]},
    {t:"Eu valorizo mais:", opts:[{t:"Resultados", v:"D"},{t:"Relacionamentos", v:"I"},{t:"Harmonia", v:"S"},{t:"Qualidade", v:"C"}]}
  ]
};

function getRandomItems(arr, n, allowRepeat = false) {
  let shuffled = arr.slice().sort(() => 0.5 - Math.random());
  if (allowRepeat && shuffled.length < n) { 
    let r = []; 
    while(r.length < n) r = r.concat(shuffled); 
    return r.slice(0, n); 
  }
  return shuffled.slice(0, n);
}

function getQuizData(isFull) {
  let questions = [];
  
  // Questões QP (sempre incluídas)
  questions = questions.concat(
    getRandomItems(MASTER_QUESTION_BANK.QP, 10).map(t => ({ 
      mod: 'QP', 
      type: 'LIKERT', 
      text: t 
    }))
  );
  
  if (isFull) {
    // Questões de Sabotadores (apenas versão completa)
    questions = questions.concat(
      getRandomItems(MASTER_QUESTION_BANK.SABOTADORES, 10).map(q => ({ 
        mod: 'SAB', 
        type: 'LIKERT', 
        text: q.t, 
        sabName: q.s 
      }))
    );
    
    // Questões DISC (versão completa - 10 questões)
    questions = questions.concat(
      getRandomItems(MASTER_QUESTION_BANK.DISC, 10, true).map(q => ({ 
        mod: 'DISC', 
        type: 'TETRA', 
        text: q.t, 
        opts: q.opts 
      }))
    );
  } else {
    // Questões DISC (versão gratuita - 4 questões)
    questions = questions.concat(
      getRandomItems(MASTER_QUESTION_BANK.DISC, 4, true).map(q => ({ 
        mod: 'DISC', 
        type: 'TETRA', 
        text: q.t, 
        opts: q.opts 
      }))
    );
  }
  
  return questions;
}

module.exports = (req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const isFull = req.query.isFull === 'true';
  const questions = getQuizData(isFull);
  
  res.status(200).json({ 
    success: true, 
    questions: questions,
    total: questions.length
  });
};
