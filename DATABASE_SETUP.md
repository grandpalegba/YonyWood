# Configuration de la base de données YonyWood

Vous avez deux options simples pour configurer la base de données PostgreSQL de votre projet :

## Option 1 : Base locale avec Docker (Recommandé pour le développement)

1. Assurez-vous que [Docker](https://www.docker.com/) est installé et lancé sur votre machine.
2. À la racine du projet, lancez la commande suivante pour démarrer le conteneur :
   ```bash
   docker compose up -d
   ```
3. Dans le fichier `backend/.env`, utilisez cette chaîne de connexion :
   ```env
   DATABASE_URL="postgresql://yonywood:yonywood_password@localhost:5432/yonywood_db?schema=public"
   ```

## Option 2 : Base Cloud gratuite (Neon / Supabase)

1. Créez un projet gratuit sur [Neon.tech](https://neon.tech/) ou [Supabase](https://supabase.com/).
2. Récupérez la chaîne de connexion (Connection string) qui vous est fournie (elle commence par `postgresql://...` ou `postgres://...`).
3. Modifiez votre fichier `backend/.env` avec cette chaîne :
   ```env
   DATABASE_URL="votre_chaine_de_connexion_ici"
   ```

---

Une fois l'une des deux options configurée, appliquez la structure de la base de données avec :
```bash
cd backend
npx prisma db push
```
