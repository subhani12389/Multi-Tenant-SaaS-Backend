import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// POST: Create Tenant
app.post('/tenants', async (req, res) => {
  try {
    const { name, domain } = req.body;
    const tenant = await prisma.tenant.create({
      data: { name, domain },
    });
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: All Tenants
app.get('/tenants', async (req, res) => {
  try {
    const tenants = await prisma.tenant.findMany();
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update Tenant
app.put('/tenants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, domain } = req.body;
    const tenant = await prisma.tenant.update({
      where: { id: parseInt(id) },
      data: { name, domain },
    });
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove Tenant
app.delete('/tenants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tenant.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Tenant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
