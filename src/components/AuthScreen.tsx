import React, { useState } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface AuthScreenProps {
  onSuccess: () => void;
  onBack?: () => void;
  initialTab?: 'login' | 'register';
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onBack, initialTab = 'login' }) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (tab === 'login') {
        res = await apiService.login(email, password);
      } else {
        res = await apiService.register(email, password, firstName, lastName);
      }
      
      if (res && res.token && res.user) {
        localStorage.setItem('yonywood_auth_token', res.token);
        setUser(res.user);
        onSuccess();
      } else {
        setError('Erreur lors de l\'authentification.');
      }
    } catch (err) {
      setError('Identifiants incorrects ou erreur serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0D0B] text-white flex flex-col p-6 overflow-y-auto">
      {onBack && (
        <button onClick={onBack} className="absolute top-6 left-6 text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}

      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {tab === 'login' ? 'Connexion' : 'Créer un compte'}
        </h2>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              tab === 'login' ? 'border-[#C89B3C] text-[#C89B3C]' : 'border-gray-700 text-gray-400'
            }`}
          >
            Se connecter
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              tab === 'register' ? 'border-[#C89B3C] text-[#C89B3C]' : 'border-gray-700 text-gray-400'
            }`}
          >
            S'inscrire
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C89B3C]"
              />
              <input
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C89B3C]"
              />
            </div>
          )}
          
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C89B3C]"
          />
          
          <input
            type="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C89B3C]"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {tab === 'login' && (
            <p className="text-gray-400 text-sm mt-2">
              💡 Astuce : utilisez <strong>qoctales@gmail.com</strong> pour tester l'accès administrateur.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-6 bg-[#C89B3C] text-black font-semibold rounded-lg text-lg hover:bg-[#D4A373] transition-colors disabled:opacity-50"
          >
            {loading ? 'Chargement...' : tab === 'login' ? 'Se connecter' : 'Créer un compte'}
          </button>
        </form>
      </div>
    </div>
  );
};
