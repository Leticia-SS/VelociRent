const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch
const router = express.Router();

router.post('/create-customer', async (req, res) => {
  const { name, email, cpf } = req.body;

  try {
    const response = await fetch('https://api.asaas.com/v3/customers', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        access_token: '$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjUzNTlmZmVmLTMyM2UtNGMzYy04Y2EyLTQzMTY0NmQ3YWE2MDo6JGFhY2hfNTcxNmJlODEtMzI1Yi00YWQ0LWI2YzYtN2RjOGE4Yjc3Mzgy'
      },
      body: JSON.stringify({
        name,
        email,
        cpfCnpj: cpf
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ error: 'Erro ao criar cliente no Asaas' });
  }
});

module.exports = router;
