/**
 * KAIA 5.0 - API Proxy para Google Apps Script
 * Permite comunicação com o Google Apps Script backend
 */

module.exports = async (req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
  
  if (!APPS_SCRIPT_URL) {
    return res.status(200).json({
      success: true,
      message: 'Apps Script URL not configured. Using local processing.',
      note: 'Configure APPS_SCRIPT_URL environment variable in Vercel to enable Google Sheets integration.'
    });
  }
  
  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    if (req.method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }
    
    const response = await fetch(APPS_SCRIPT_URL, fetchOptions);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error calling Apps Script:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to communicate with Google Apps Script' 
    });
  }
};
