import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Routes
import authRoutes from './routes/auth';
import seriesRoutes from './routes/series';
import duosRoutes from './routes/duos';
import explorerRoutes from './routes/explorer';
import coproductionRoutes from './routes/coproduction';
import messagesRoutes from './routes/messages';

import prisma from './lib/prisma';
import { authenticate } from './middleware/auth';

const app = express();
const httpServer = createServer(app);

// =============================================
// CONFIGURATION SOCKET.IO (WebSocket temps réel)
// =============================================
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Map des utilisateurs connectés via WebSocket: userId -> socketId
const connectedUsers = new Map<string, string>();

io.on('connection', (socket) => {
  console.log(`[WS] Nouveau client connecté: ${socket.id}`);

  // Authentification WebSocket via token JWT
  socket.on('authenticate', (token: string) => {
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
        id: string;
        email: string;
      };
      connectedUsers.set(decoded.id, socket.id);
      socket.data.userId = decoded.id;
      socket.emit('authenticated', { userId: decoded.id });
      console.log(`[WS] Utilisateur authentifié: ${decoded.email}`);
    } catch {
      socket.emit('auth_error', { error: 'Token invalide' });
    }
  });

  // Rejoindre une salle de conversation
  socket.on('join_thread', (threadId: string) => {
    socket.join(`thread:${threadId}`);
    console.log(`[WS] Socket ${socket.id} rejoint le fil: ${threadId}`);
  });

  // Quitter une salle de conversation
  socket.on('leave_thread', (threadId: string) => {
    socket.leave(`thread:${threadId}`);
  });

  // Écriture en temps réel (typing indicator)
  socket.on('typing', (data: { threadId: string; isTyping: boolean }) => {
    socket.to(`thread:${data.threadId}`).emit('user_typing', {
      userId: socket.data.userId,
      isTyping: data.isTyping,
    });
  });

  // Déconnexion
  socket.on('disconnect', () => {
    if (socket.data.userId) {
      connectedUsers.delete(socket.data.userId);
    }
    console.log(`[WS] Client déconnecté: ${socket.id}`);
  });
});

// Exporter io pour l'utiliser dans les routes
export { io, connectedUsers };

// =============================================
// MIDDLEWARES GLOBAUX
// =============================================
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// =============================================
// ROUTES API
// =============================================
app.use('/api/auth', authRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/duos', duosRoutes);
app.use('/api/explorer', explorerRoutes);
app.use('/api/coproduction', coproductionRoutes);
app.use('/api/messages', messagesRoutes);

// Route de santé
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Yonywood API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// =============================================
// GESTION DES ERREURS
// =============================================
app.use((req, res) => {
  res.status(404).json({
    error: `Route non trouvée: ${req.method} ${req.path}`,
  });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Erreur globale]', err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// =============================================
// DÉMARRAGE DU SERVEUR
// =============================================
const PORT = parseInt(process.env.PORT || '3001', 10);

async function main() {
  try {
    // Tester la connexion à la base de données
    await prisma.$connect();
    console.log('✅ Connexion PostgreSQL établie');

    httpServer.listen(PORT, () => {
      console.log(`🚀 Yonywood API démarrée sur http://localhost:${PORT}`);
      console.log(`📡 WebSocket disponible sur ws://localhost:${PORT}`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Erreur de démarrage:', error);
    process.exit(1);
  }
}

main();

// Gestion propre de la fermeture
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
