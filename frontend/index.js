const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // permite Vite
app.use(express.json());

app.post('/api/create-customer', (req, res) => {
  const { name, email, cpf } = req.body;

  const url = 'https://api.asaas.com/v3/customers';

  fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: '$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjUzNTlmZmVmLTMyM2UtNGMzYy04Y2EyLTQzMTY0NmQ3YWE2MDo6JGFhY2hfNTcxNmJlODEtMzI1Yi00YWQ0LWI2YzYtN2RjOGE4Yjc3Mzgy' // coloque a token real
    },
    body: JSON.stringify({
      name,
      email,
      cpfCnpj: cpf
    })
  })
    .then(r => r.json())
    .then(json => res.json(json))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar cliente' });
    });
});

app.listen(3001, () => {
  console.log('Servidor backend rodando na porta 3001');
});
