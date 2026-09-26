import React, { useState, useEffect } from 'react';
import {
  Film, ShieldAlert, Users, TrendingUp, Search,
  CheckCircle, XCircle, Trash2, Edit3, ChevronDown,
  RefreshCw, AlertTriangle, DollarSign, Percent,
  Eye, EyeOff, Crown, UserX
} from 'lucide-react';
import { apiService } from '../services/api';

// ── Types locaux ────────────────────────────────────────────────
interface AdminSeries {
  id: string; title: string; shortSynopsis?: string; posterUrl?: string; status?: string;
}
interface AdminReport {
  id: string; reason: string; details?: string; status: string; createdAt: string;
  user?: { email: string };
  duo?: { id: string };
  series?: { title: string };
}
interface AdminUser {
  id: string; email: string; displayName?: string; role: string; createdAt: string;
}
interface Financials {
  totalVolume?: number | string;
  platformFeeTotal?: number | string;
  earningsPaidTotal?: number | string;
  platformFeeRate?: string | number;
}

// ── Helpers ────────────────────────────────────────────────────
const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-800',
    RESOLVED: 'bg-emerald-100 text-emerald-800',
    DISMISSED: 'bg-stone-200 text-stone-600',
    ADMIN: 'bg-[#A2482B]/15 text-[#A2482B]',
    USER: 'bg-stone-100 text-stone-600',
  };
  return map[status] ?? 'bg-stone-100 text-stone-600';
};

const fmt = (v?: number | string) =>
  v == null ? '—' : Number(v).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

// ── Composant principal ────────────────────────────────────────
export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'series' | 'reports' | 'users' | 'financials'>('series');
  const [series, setSeries] = useState<AdminSeries[]>([]);
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [financials, setFinancials] = useState<Financials>({});
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [feeInput, setFeeInput] = useState('');
  const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ title: string; synopsis: string; posterUrl: string }>({ title: '', synopsis: '', posterUrl: '' });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      if (activeTab === 'series') setSeries(((await apiService.getAdminSeries()) as AdminSeries[]) || []);
      if (activeTab === 'reports') setReports(((await apiService.getAdminReports()) as AdminReport[]) || []);
      if (activeTab === 'users') setUsers(((await apiService.getAdminUsers()) as AdminUser[]) || []);
      if (activeTab === 'financials') {
        const f = (await apiService.getAdminFinancials()) as Financials || {};
        setFinancials(f);
        setFeeInput(String(f.platformFeeRate ?? 12));
      }
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [activeTab]);

  // ── Actions ──
  const resolveReport = async (id: string, status: string) => {
    await apiService.updateReportStatus(id, status);
    toast('Signalement mis à jour');
    load();
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Confirmer la suppression de ce compte ?')) return;
    await apiService.deleteAdminUser(id);
    toast('Compte supprimé');
    load();
  };

  const promoteUser = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    await apiService.updateAdminUserRole(id, newRole);
    toast(`Rôle mis à jour → ${newRole}`);
    load();
  };

  const updateFee = async () => {
    await apiService.updatePlatformFeeRate(Number(feeInput));
    toast(`Taux mis à jour → ${feeInput}%`);
    load();
  };

  const startEdit = (s: AdminSeries) => {
    setEditingSeriesId(s.id);
    setEditForm({ title: s.title, synopsis: s.shortSynopsis || '', posterUrl: s.posterUrl || '' });
  };

  const saveEdit = async () => {
    if (!editingSeriesId) return;
    await apiService.updateAdminSeries(editingSeriesId, {
      title: editForm.title,
      synopsis: editForm.synopsis,
      posterUrl: editForm.posterUrl,
    });
    setEditingSeriesId(null);
    toast('Série mise à jour');
    load();
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
    (u.displayName || '').toLowerCase().includes(searchUser.toLowerCase())
  );

  // ── Tabs config ──
  const tabs = [
    { id: 'series' as const, label: 'Séries', icon: Film },
    { id: 'reports' as const, label: 'Modération', icon: ShieldAlert },
    { id: 'users' as const, label: 'Utilisateurs', icon: Users },
    { id: 'financials' as const, label: 'Finances', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#F9F6EE] text-[#1C1917]">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-[#A2482B] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-top">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="bg-[#1C1917] text-white px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-editorial font-bold tracking-tight">YonyWood Back-Office</h1>
          <p className="text-xs text-stone-400 mt-0.5">Espace d'administration</p>
        </div>
        <button onClick={load} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Actualiser">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#E7E5E4] flex overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === id
                ? 'border-[#A2482B] text-[#A2482B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto p-6 pb-24">
        {loading && (
          <div className="text-center py-20 text-stone-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" />
            <p className="text-sm">Chargement…</p>
          </div>
        )}

        {!loading && (
          <>
            {/* ── SÉRIES ── */}
            {activeTab === 'series' && (
              <div>
                <h2 className="text-lg font-editorial font-bold mb-5">Gestion des Séries</h2>
                <div className="space-y-3">
                  {series.length === 0 && <p className="text-stone-400 text-sm">Aucune série disponible via l'API.</p>}
                  {series.map(s => (
                    <div key={s.id} className="bg-white rounded-2xl border border-[#E7E5E4] p-5 shadow-sm">
                      {editingSeriesId === s.id ? (
                        <div className="space-y-3">
                          <input
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm"
                            value={editForm.title}
                            onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="Titre"
                          />
                          <textarea
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm"
                            value={editForm.synopsis}
                            onChange={e => setEditForm(f => ({ ...f, synopsis: e.target.value }))}
                            placeholder="Synopsis court"
                            rows={3}
                          />
                          <input
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm"
                            value={editForm.posterUrl}
                            onChange={e => setEditForm(f => ({ ...f, posterUrl: e.target.value }))}
                            placeholder="URL de l'affiche"
                          />
                          <div className="flex gap-2">
                            <button onClick={saveEdit} className="px-4 py-2 bg-[#A2482B] text-white rounded-lg text-sm font-semibold hover:bg-[#8B3A20] transition">Sauvegarder</button>
                            <button onClick={() => setEditingSeriesId(null)} className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-sm font-semibold hover:bg-stone-200 transition">Annuler</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          {s.posterUrl && (
                            <img src={s.posterUrl} alt={s.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{s.title}</p>
                            {s.shortSynopsis && <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">{s.shortSynopsis}</p>}
                          </div>
                          <button
                            onClick={() => startEdit(s)}
                            className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-[#A2482B] transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SIGNALEMENTS ── */}
            {activeTab === 'reports' && (
              <div>
                <h2 className="text-lg font-editorial font-bold mb-5">Signalements & Modération</h2>
                <div className="space-y-3">
                  {reports.length === 0 && <p className="text-stone-400 text-sm">Aucun signalement en attente.</p>}
                  {reports.map(r => (
                    <div key={r.id} className="bg-white rounded-2xl border border-[#E7E5E4] p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-red-50">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{r.reason}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge(r.status)}`}>{r.status}</span>
                          </div>
                          {r.details && <p className="text-xs text-stone-500 mb-1">{r.details}</p>}
                          <p className="text-xs text-stone-400">
                            Par : {r.user?.email || '—'} · {r.duo ? `Duo #${r.duo.id.slice(0, 8)}` : r.series?.title || '—'}
                          </p>
                        </div>
                        {r.status === 'PENDING' && (
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => resolveReport(r.id, 'RESOLVED')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-200 transition"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Résoudre
                            </button>
                            <button
                              onClick={() => resolveReport(r.id, 'DISMISSED')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 text-stone-600 rounded-lg text-xs font-semibold hover:bg-stone-200 transition"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Ignorer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── UTILISATEURS ── */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-lg font-editorial font-bold mb-5">Gestion des Utilisateurs</h2>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A2482B]/30"
                    placeholder="Rechercher par email ou nom…"
                    value={searchUser}
                    onChange={e => setSearchUser(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  {filteredUsers.length === 0 && <p className="text-stone-400 text-sm">Aucun utilisateur trouvé.</p>}
                  {filteredUsers.map(u => (
                    <div key={u.id} className="bg-white rounded-2xl border border-[#E7E5E4] p-4 shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#A2482B]/15 flex items-center justify-center shrink-0">
                        <span className="text-[#A2482B] font-bold text-sm">{(u.displayName || u.email)[0].toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{u.displayName || u.email}</p>
                        <p className="text-xs text-stone-500">{u.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusBadge(u.role)}`}>{u.role}</span>
                      <button
                        onClick={() => promoteUser(u.id, u.role)}
                        className="p-2 rounded-lg hover:bg-amber-50 text-stone-400 hover:text-amber-600 transition"
                        title={u.role === 'ADMIN' ? 'Rétrograder en USER' : 'Promouvoir en ADMIN'}
                      >
                        <Crown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition"
                        title="Supprimer / bannir"
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FINANCES ── */}
            {activeTab === 'financials' && (
              <div>
                <h2 className="text-lg font-editorial font-bold mb-5">Finances & Coproductions</h2>

                {/* Métriques */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-stone-500">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Volume Total</span>
                    </div>
                    <p className="text-2xl font-editorial font-bold text-[#1C1917]">{fmt(financials.totalVolume)}</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-stone-500">
                      <Percent className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Commissions YonyWood</span>
                    </div>
                    <p className="text-2xl font-editorial font-bold text-[#A2482B]">{fmt(financials.platformFeeTotal)}</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-stone-500">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Gains distribués</span>
                    </div>
                    <p className="text-2xl font-editorial font-bold text-emerald-700">{fmt(financials.earningsPaidTotal)}</p>
                  </div>
                </div>

                {/* Taux de commission */}
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 shadow-sm">
                  <h3 className="font-semibold text-sm mb-4">Taux de commission plateforme</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-xs">
                      <input
                        type="number"
                        min={0}
                        max={50}
                        step={0.5}
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2482B]/30"
                        value={feeInput}
                        onChange={e => setFeeInput(e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">%</span>
                    </div>
                    <button
                      onClick={updateFee}
                      className="px-5 py-2.5 bg-[#A2482B] text-white rounded-xl text-sm font-semibold hover:bg-[#8B3A20] transition shadow-sm"
                    >
                      Mettre à jour
                    </button>
                  </div>
                  <p className="text-xs text-stone-400 mt-2">Taux actuel : {financials.platformFeeRate ?? 12}%</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
