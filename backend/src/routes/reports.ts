import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create a report
router.post('/', async (req, res) => {
  try {
    const userId = (req as any).user?.id || 'mock-user-id'; // Assume user is auth'd
    const { reason, details, duoId, seriesId } = req.body;

    const report = await prisma.report.create({
      data: {
        reason,
        details,
        userId,
        duoId,
        seriesId
      }
    });
    res.json(report);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create report' });
  }
});

export default router;
