import React, { useState } from 'react';
import { X, Flag, AlertTriangle, Copyright, MessageSquareWarning, Loader2, CheckCircle } from 'lucide-react';
import { apiService } from '../services/api';

interface ReportModalProps {
  targetId: string;
  targetType: 'duo' | 'series';
  onClose: () => void;
}

const REASONS = [
  { value: 'Contenu inapproprié', label: 'Contenu inapproprié', icon: AlertTriangle, description: 'Contenu offensant, violent ou choquant' },
  { value: "Droits d'auteur", label: "Droits d'auteur", icon: Copyright, description: 'Utilisation non autorisée d\'œuvres protégées' },
  { value: 'Spam', label: 'Spam', icon: MessageSquareWarning, description: 'Contenu répétitif ou non pertinent' },
  { value: 'Harcèlement', label: 'Harcèlement', icon: Flag, description: 'Comportement abusif ou menaçant' },
];

export const ReportModal: React.FC<ReportModalProps> = ({ targetId, targetType, onClose }) => {
  const [reason, setReason] = useState<string>('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    setLoading(true);
    try {
      await apiService.reportContent(targetId, targetType, reason, details);
      setSuccess(true);
      setTimeout(onClose, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <Flag className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h2 className="font-editorial text-base font-bold text-[#1C1917]">Signaler ce contenu</h2>
              <p className="text-xs text-stone-400">
                {targetType === 'duo' ? 'Duo vidéo' : 'Série documentaire'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          /* Success state */
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-[#1C1917] mb-1">Merci pour votre signalement</h3>
            <p className="text-sm text-stone-500">Notre équipe de modération examinera ce contenu dans les plus brefs délais.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5">
            {/* Raisons */}
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Motif du signalement</p>
            <div className="space-y-2 mb-5">
              {REASONS.map(({ value, label, icon: Icon, description }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setReason(value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    reason === value
                      ? 'border-[#A2482B] bg-[#A2482B]/5'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    reason === value ? 'bg-[#A2482B]/15 text-[#A2482B]' : 'bg-stone-100 text-stone-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1917]">{label}</p>
                    <p className="text-xs text-stone-400">{description}</p>
                  </div>
                  {reason === value && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-[#A2482B] flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Détails */}
            <div className="mb-5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2 block">
                Détails supplémentaires <span className="text-stone-300">(facultatif)</span>
              </label>
              <textarea
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#A2482B]/30 placeholder:text-stone-300"
                rows={3}
                placeholder="Décrivez le problème en quelques mots…"
                value={details}
                onChange={e => setDetails(e.target.value)}
              />
            </div>

            {/* CTA */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 border border-stone-200 rounded-xl text-sm font-semibold text-stone-600 hover:bg-stone-50 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!reason || loading}
                className="flex-1 h-11 bg-[#A2482B] text-white rounded-xl text-sm font-semibold hover:bg-[#8B3A20] transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flag className="w-4 h-4" />}
                Envoyer le signalement
              </button>
            </div>

            <p className="text-xs text-stone-400 text-center mt-3">
              Les faux signalements peuvent entraîner des restrictions sur votre compte.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportModal;
