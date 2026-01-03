/**
 * KAIA 5.0 - API Dashboard Endpoint
 * Retorna dados para o dashboard administrativo
 */

module.exports = async (req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Dados de exemplo - em produção, você buscaria do Google Sheets via Apps Script
    const dashboardData = {
      success: true,
      stats: {
        leadsAtivos: "127",
        receitaTotal: "R$ 4.580,00",
        vendasConcluidas: "23",
        taxaConversao: "18.1%"
      },
      vendas: [
        { data: "03/01/2026", nome: "Maria Silva", valor: "R$ 197,00" },
        { data: "02/01/2026", nome: "João Santos", valor: "R$ 197,00" },
        { data: "02/01/2026", nome: "Ana Costa", valor: "R$ 197,00" },
        { data: "01/01/2026", nome: "Pedro Lima", valor: "R$ 197,00" },
        { data: "31/12/2025", nome: "Carla Souza", valor: "R$ 197,00" }
      ],
      assessments: [
        { data: "03/01/2026", nome: "Maria Silva", perfil: "EXECUTOR", qp: "82%", sabotador: "Controlador" },
        { data: "02/01/2026", nome: "João Santos", perfil: "COMUNICADOR", qp: "68%", sabotador: "Hiper-Realizador" },
        { data: "02/01/2026", nome: "Ana Costa", perfil: "ANALISTA", qp: "75%", sabotador: "Crítico" },
        { data: "01/01/2026", nome: "Pedro Lima", perfil: "PLANEJADOR", qp: "71%", sabotador: "Esquivo" },
        { data: "31/12/2025", nome: "Carla Souza", perfil: "EXECUTOR", qp: "89%", sabotador: "Insistente" }
      ]
    };
    
    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};
