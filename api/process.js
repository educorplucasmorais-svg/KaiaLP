/**
 * KAIA 5.0 - API Process Assessment Endpoint
 * Processa as respostas do quiz e gera o relatório
 */

// --- BANCO DE CONHECIMENTO (A BASE DO RELATÓRIO) ---
const DEEP_KNOWLEDGE = {
  DISC: {
    D: { titulo: "EXECUTOR (DOMINÂNCIA) - O CATALISADOR DE RESULTADOS", texto: "O perfil Executor é caracterizado por uma força motriz voltada para a conquista e superação de obstáculos. Em um ambiente organizacional, você é o motor que impulsiona as mudanças, aquele que não teme o risco e busca a eficiência máxima. Sua tomada de decisão é rápida, baseada na lógica de custo-benefício e na urgência dos resultados. No entanto, essa mesma força pode se tornar uma fraqueza se não houver equilíbrio: a busca incessante por metas pode cegar para as necessidades humanas da equipe. Sua maestria reside em aprender a pausar e ouvir, transformando sua dominância em uma liderança inspiradora." },
    I: { titulo: "COMUNICADOR (INFLUÊNCIA) - O ARQUITETO DE CONEXÕES", texto: "Como Comunicador, seu capital mais valioso é o social. Você possui a habilidade intrínseca de ler ambientes e pessoas, adaptando seu discurso para engajar e motivar. Sua criatividade é um fluxo constante, e você prospera em ambientes onde a colaboração e o reconhecimento são a moeda de troca. O desafio do Comunicador reside na dispersão: a busca pelo novo pode comprometer a finalização de processos. Para atingir a alta performance, você precisa cercar-se de sistemas que garantam a execução, permitindo que sua energia seja canalizada para a visão estratégica." },
    S: { titulo: "PLANEJADOR (ESTABILIDADE) - A ÂNCORA DA CONSISTÊNCIA", texto: "O Planejador é a base de sustentação de qualquer organização de sucesso. Sua paciência, lealdade e foco em processos garantem que a visão seja executada com segurança. Você valoriza a harmonia e é o mediador natural em conflitos. O ponto de atenção é a resistência à mudança: em um mercado volátil, sua necessidade de segurança pode se tornar um entrave. Sua evolução profissional passa por desenvolver a agilidade emocional, aprendendo a navegar no caos sem perder sua essência organizadora e confiável." },
    C: { titulo: "ANALISTA (CONFORMIDADE) - O GUARDIÃO DA PRECISÃO", texto: "O Analista é o guardião da qualidade e da verdade técnica. Sua mente funciona como um scanner de alta precisão, identificando riscos e inconsistências que outros ignoram. Você baseia sua autoridade no conhecimento profundo e na evidência. O grande desafio é a 'paralisia por análise': a busca pela perfeição pode atrasar entregas críticas. Sua jornada de crescimento envolve aceitar que o 'feito é melhor que o perfeito' em situações de urgência, aprendendo a confiar na intuição quando os dados são escassos." }
  },
  SABOTADORES: {
    "Crítico": "O Crítico é o sabotador mestre. Ele julga você, os outros e as circunstâncias de forma implacável, gerando ansiedade e impedindo que você desfrute de suas conquistas.",
    "Controlador": "O Controlador acredita que só terá segurança se estiver no comando total. Ele gera estresse ao tentar prever o imprevisível e sufoca a autonomia alheia.",
    "Hiper-Realizador": "O Hiper-Realizador vincula seu valor próprio exclusivamente ao sucesso e às metas batidas, levando a um vazio emocional e ao esgotamento constante.",
    "Esquivo": "O Esquivo foca no prazer imediato e evita conflitos ou tarefas difíceis, gerando uma procrastinação que acumula problemas.",
    "Insistente": "O Insistente leva o perfeccionismo ao extremo, tornando-se rígido e dificultando a fluidez dos processos e a convivência.",
    "Prestativo": "O Prestativo busca ganhar aceitação e afeto ajudando, agradando e resgatando os outros, perdendo de vista suas próprias necessidades.",
    "Inquieto": "O Inquieto está constantemente ocupado, buscando a próxima experiência e perdendo contato com o momento presente e com relações mais profundas.",
    "Hiper-Vigilante": "O Hiper-Vigilante está sempre em guarda, antecipando o que pode dar errado, gerando ansiedade crônica e desconfiança.",
    "Hiper-Racional": "O Hiper-Racional processa tudo através do intelecto, evitando ou minimizando emoções, o que prejudica conexões mais profundas.",
    "Vítima": "A Vítima foca em sentimentos dolorosos e busca atenção e simpatia, perdendo poder e caindo em padrões de autocomiseração."
  },
  QP: {
    titulo: "MAESTRIA MENTAL E QUOCIENTE POSITIVO (QP)",
    niveis: {
      alto: { faixa: "ALTO (Acima de 75%)", analise: "Você possui uma Maestria Mental de elite. Seu cérebro opera no 'Modo Sábio', acessando criatividade e ação focada. Em crises, você prospera, convertendo desafios em oportunidades." },
      medio: { faixa: "MÉDIO (50% a 74%)", analise: "Sua mente está em um campo de batalha equilibrado. Seus sabotadores ainda conseguem 'sequestrar' sua performance em momentos de estresse, gerando oscilações de produtividade." },
      baixo: { faixa: "BAIXO (Abaixo de 50%)", analise: "Seu QP indica que sua mente opera no 'Modo Sobrevivência'. Seus sabotadores estão no controle, drenando sua energia vital. A neuroplasticidade permite reverter este quadro com treino." }
    }
  }
};

const CONFIG = {
  CHECKOUT_URL: 'https://pay.seuchekout.com/kaia-completo'
};

function processScores(answers) {
  let scores = { 
    disc: {D:0, I:0, S:0, C:0}, 
    qp: 0, 
    qpCount: 0, 
    sab: {} 
  };
  
  answers.forEach(a => {
    if (a.mod === 'DISC') {
      scores.disc[a.choice]++;
    } else if (a.mod === 'QP') { 
      scores.qp += parseInt(a.choice); 
      scores.qpCount++; 
    } else if (a.mod === 'SAB') { 
      if (parseInt(a.choice) >= 4) {
        scores.sab[a.sabName] = (scores.sab[a.sabName] || 0) + 1; 
      }
    }
  });
  
  const perfil = Object.keys(scores.disc).reduce((a, b) => 
    scores.disc[a] > scores.disc[b] ? a : b
  );
  
  const qp = scores.qpCount > 0 
    ? Math.round((scores.qp / (scores.qpCount * 5)) * 100) 
    : 50;
  
  const sabotador = Object.keys(scores.sab).length > 0 
    ? Object.keys(scores.sab).reduce((a, b) => scores.sab[a] > scores.sab[b] ? a : b) 
    : "Crítico";
  
  return { perfil, qp, sabotador };
}

function generateFreeReport(p, qp) {
  const discMap = { D: "EXECUTOR", I: "COMUNICADOR", S: "PLANEJADOR", C: "ANALISTA" };
  return '<div class="text-center space-y-8">' +
    '<div class="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto"><i class="fas fa-unlock-alt text-3xl text-indigo-400"></i></div>' +
    '<h2 class="text-3xl font-black text-white">Perfil Preliminar: ' + discMap[p] + '</h2>' +
    '<p class="text-slate-400">Seu QP atual é de ' + qp + '%. Identificamos sabotadores ocultos travando sua performance!</p>' +
    '<div class="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl mt-6">' +
    '<p class="text-indigo-300 text-sm mb-4">🔒 Para desbloquear sua análise completa de 1 lauda com:</p>' +
    '<ul class="text-left text-slate-400 text-sm space-y-2 mb-6">' +
    '<li>✓ Análise detalhada do seu perfil DISC</li>' +
    '<li>✓ Identificação dos seus sabotadores</li>' +
    '<li>✓ Plano de ação personalizado</li>' +
    '</ul>' +
    '<button onclick="window.open(\'' + CONFIG.CHECKOUT_URL + '\')" class="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all">DESBLOQUEAR ANÁLISE COMPLETA</button>' +
    '</div>' +
    '<button onclick="window.location.href=\'/\'" class="text-slate-500 text-sm hover:text-white transition-all">← Voltar ao início</button>' +
    '</div>';
}

function generateFullReport(p, qp, sab) {
  const discInfo = DEEP_KNOWLEDGE.DISC[p];
  const sabInfo = DEEP_KNOWLEDGE.SABOTADORES[sab] || DEEP_KNOWLEDGE.SABOTADORES["Crítico"];
  const qpDetail = qp >= 75 ? DEEP_KNOWLEDGE.QP.niveis.alto : (qp >= 50 ? DEEP_KNOWLEDGE.QP.niveis.medio : DEEP_KNOWLEDGE.QP.niveis.baixo);
  
  return '<div class="space-y-12 text-left p-4 md:p-8">' +
    '<div class="text-center border-b border-white/10 pb-10">' +
    '<h1 class="text-4xl font-black text-white mb-2">Relatório KAIA Elite</h1>' +
    '<p class="text-indigo-400 font-bold uppercase tracking-widest">Auditoria Comportamental Completa</p>' +
    '</div>' +
    
    '<div class="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-8 rounded-3xl border border-indigo-500/20">' +
    '<h2 class="text-2xl font-bold text-white mb-4">1. ' + discInfo.titulo + '</h2>' +
    '<p class="text-slate-300 leading-relaxed text-justify">' + discInfo.texto + '</p>' +
    '</div>' +
    
    '<div class="bg-emerald-600/5 border border-emerald-500/10 p-8 rounded-3xl">' +
    '<h2 class="text-2xl font-bold text-white mb-4">2. ' + DEEP_KNOWLEDGE.QP.titulo + '</h2>' +
    '<div class="flex items-center gap-4 mb-4">' +
    '<div class="text-4xl font-black text-emerald-400">' + qp + '%</div>' +
    '<div class="text-emerald-300 font-bold">' + qpDetail.faixa + '</div>' +
    '</div>' +
    '<p class="text-slate-300 text-justify">' + qpDetail.analise + '</p>' +
    '</div>' +
    
    '<div class="bg-orange-600/5 border border-orange-500/10 p-8 rounded-3xl">' +
    '<h2 class="text-2xl font-bold text-white mb-4">3. Sabotador Principal: ' + sab + '</h2>' +
    '<p class="text-slate-300 leading-relaxed text-justify">' + sabInfo + '</p>' +
    '<p class="text-orange-300 mt-4 text-sm">⚠️ Sua essência ' + p + ' combinada com o sabotador ' + sab + ' pode reduzir sua eficácia operacional.</p>' +
    '</div>' +
    
    '<div class="text-center pt-10 border-t border-white/10 space-y-4">' +
    '<p class="text-[10px] text-slate-600 uppercase font-bold tracking-widest">KAIA 5.0 | Powered by REVELA</p>' +
    '<button onclick="window.location.href=\'/\'" class="text-indigo-400 text-sm hover:text-white transition-all">← Voltar ao início</button>' +
    '</div>' +
    '</div>';
}

module.exports = async (req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { answers, isFull, userInfo } = req.body;
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid answers format' });
    }
    
    const { perfil, qp, sabotador } = processScores(answers);
    
    const report = isFull 
      ? generateFullReport(perfil, qp, sabotador) 
      : generateFreeReport(perfil, qp);
    
    // Aqui você pode adicionar lógica para salvar na planilha do Google via Apps Script
    // usando fetch para chamar o endpoint do Apps Script
    
    res.status(200).json({ 
      success: true, 
      report: report,
      data: {
        perfil,
        qp,
        sabotador
      }
    });
  } catch (error) {
    console.error('Error processing assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
