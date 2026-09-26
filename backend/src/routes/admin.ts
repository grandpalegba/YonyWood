import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAdmin } from '../middleware/requireAdmin';

const router = Router();
const prisma = new PrismaClient();

// Use middleware for all admin routes
router.use(requireAdmin);

// SÉRIES
router.get('/series', async (req, res) => {
  const series = await prisma.documentarySeries.findMany();
  res.json(series);
});

router.put('/series/:id', async (req, res) => {
  const { id } = req.params;
  const { title, synopsis, posterUrl } = req.body;
  try {
    const series = await prisma.documentarySeries.update({
      where: { id },
      data: { title, shortSynopsis: synopsis, posterUrl }
    });
    res.json(series);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// UTILISATEURS
router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { role }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

// FINANCES
router.get('/financials', async (req, res) => {
  try {
    const volumeResult = await prisma.coproductionPledge.aggregate({
      _sum: { amount: true, platformFeeAmount: true, earningsPaid: true }
    });
    
    const config = await prisma.platformConfig.findUnique({
      where: { key: 'PLATFORM_FEE_RATE' }
    });

    res.json({
      totalVolume: volumeResult._sum.amount || 0,
      platformFeeTotal: volumeResult._sum.platformFeeAmount || 0,
      earningsPaidTotal: volumeResult._sum.earningsPaid || 0,
      platformFeeRate: config?.value || '12'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get financials' });
  }
});

router.put('/financials/config', async (req, res) => {
  const { platformFeeRate } = req.body;
  try {
    const config = await prisma.platformConfig.upsert({
      where: { key: 'PLATFORM_FEE_RATE' },
      update: { value: String(platformFeeRate) },
      create: { key: 'PLATFORM_FEE_RATE', value: String(platformFeeRate) }
    });
    res.json(config);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// REPORTS ADMIN
router.get('/reports', async (req, res) => {
  const reports = await prisma.report.findMany({ include: { user: true, duo: true, series: true } });
  res.json(reports);
});

router.patch('/reports/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // PENDING, RESOLVED, DISMISSED
  try {
    const report = await prisma.report.update({
      where: { id },
      data: { status }
    });
    res.json(report);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

export default router;
