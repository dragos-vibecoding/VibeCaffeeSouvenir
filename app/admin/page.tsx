'use client';

import { useEffect, useState } from 'react';

type Rezervare = {
  id: number;
  nume: string;
  email: string;
  telefon: string;
  persoane: number;
  data_rezervare: string;
  ora_rezervare: string;
  status: 'IN ASTEPTARE' | 'CONFIRMAT' | 'RESPINS';
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  'IN ASTEPTARE': 'bg-yellow-100 text-yellow-800',
  'CONFIRMAT': 'bg-green-100 text-green-800',
  'RESPINS': 'bg-red-100 text-red-800',
};

const STATUSURI = ['TOATE', 'IN ASTEPTARE', 'CONFIRMAT', 'RESPINS'];

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      sessionStorage.setItem('admin_auth', '1');
      onLogin();
    } else {
      setError('Email sau parolă incorectă.');
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#b5c9a8', fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
    >
      <div className="backdrop-blur-md bg-white/50 rounded-2xl p-10 shadow-xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-[#3a5432] mb-1 text-center">Admin</h1>
        <p className="text-[#4a6741] text-sm text-center mb-8">Vibe Caffée Souvenir</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-[#3a5432] mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/70 border border-[#4a6741]/20
                focus:outline-none focus:border-[#4a6741] text-[#2d3a2a] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-[#3a5432] mb-1">Parolă</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/70 border border-[#4a6741]/20
                focus:outline-none focus:border-[#4a6741] text-[#2d3a2a] text-sm"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#4a6741] text-white font-semibold rounded-lg
              transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Se verifică...' : 'INTRĂ'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [autentificat, setAutentificat] = useState<boolean | null>(null);
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtruStatus, setFiltruStatus] = useState('TOATE');
  const [cautare, setCautare] = useState('');
  const [actiuneId, setActiuneId] = useState<number | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    setAutentificat(auth === '1');
  }, []);

  useEffect(() => {
    if (autentificat) fetchRezervari();
  }, [autentificat]);

  async function fetchRezervari() {
    setLoading(true);
    const res = await fetch('/api/rezervari');
    const data = await res.json();
    setRezervari(data);
    setLoading(false);
  }

  async function schimbaStatus(id: number, status: 'CONFIRMAT' | 'RESPINS') {
    setActiuneId(id);
    await fetch('/api/rezervari', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setRezervari(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
    setActiuneId(null);
  }

  async function sterge(id: number) {
    if (!confirm('Ești sigur că vrei să ștergi această rezervare?')) return;
    setActiuneId(id);
    await fetch('/api/rezervari', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setRezervari(prev => prev.filter(r => r.id !== id));
    setActiuneId(null);
  }

  const filtrate = rezervari.filter(r => {
    const potrivireStatus = filtruStatus === 'TOATE' || r.status === filtruStatus;
    const potrivireNume = r.nume.toLowerCase().includes(cautare.toLowerCase());
    return potrivireStatus && potrivireNume;
  });

  if (autentificat === null) return null;
  if (!autentificat) return <LoginForm onLogin={() => setAutentificat(true)} />;

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ backgroundColor: '#b5c9a8', fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#3a5432] mb-1">Rezervări</h1>
            <p className="text-[#4a6741] text-lg">Panou de administrare</p>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setAutentificat(false); }}
            className="px-4 py-2 text-sm text-[#4a6741] bg-white/50 rounded-lg hover:bg-white/70 transition-all"
          >
            Deconectare
          </button>
        </div>

        {/* Filtre */}
        <div className="backdrop-blur-md bg-white/40 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-3 shadow">
          <input
            type="text"
            placeholder="Caută după nume..."
            value={cautare}
            onChange={e => setCautare(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-white/60 bg-white/60 text-[#3a5432] placeholder-[#4a6741]/60 outline-none focus:ring-2 focus:ring-[#4a6741]/40"
          />
          <div className="flex gap-2 flex-wrap">
            {STATUSURI.map(s => (
              <button
                key={s}
                onClick={() => setFiltruStatus(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filtruStatus === s
                    ? 'bg-[#4a6741] text-white shadow'
                    : 'bg-white/60 text-[#4a6741] hover:bg-white/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <p className="text-[#4a6741] mb-4 text-sm">
          {filtrate.length} rezerv{filtrate.length === 1 ? 'are' : 'ări'}
        </p>

        {loading ? (
          <div className="text-center py-20 text-[#4a6741] text-xl">Se încarcă...</div>
        ) : filtrate.length === 0 ? (
          <div className="text-center py-20 text-[#4a6741] text-xl">Nicio rezervare găsită.</div>
        ) : (
          <>
            {/* DESKTOP — tabel */}
            <div className="hidden md:block backdrop-blur-md bg-white/40 rounded-2xl shadow overflow-hidden">
              <table className="w-full text-sm text-[#3a5432]">
                <thead>
                  <tr className="bg-[#4a6741]/20 text-[#3a5432] text-left">
                    <th className="px-4 py-3 font-semibold">Nume</th>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Data</th>
                    <th className="px-4 py-3 font-semibold">Ora</th>
                    <th className="px-4 py-3 font-semibold">Pers.</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrate.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`border-t border-white/40 ${i % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}
                    >
                      <td className="px-4 py-3 font-medium">{r.nume}</td>
                      <td className="px-4 py-3">
                        <div>{r.email}</div>
                        <div className="text-[#4a6741]/80">{r.telefon}</div>
                      </td>
                      <td className="px-4 py-3">{r.data_rezervare}</td>
                      <td className="px-4 py-3">{r.ora_rezervare}</td>
                      <td className="px-4 py-3">{r.persoane}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[r.status]}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {r.status !== 'CONFIRMAT' && (
                            <button
                              onClick={() => schimbaStatus(r.id, 'CONFIRMAT')}
                              disabled={actiuneId === r.id}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs transition-all disabled:opacity-50"
                            >
                              Confirmă
                            </button>
                          )}
                          {r.status !== 'RESPINS' && (
                            <button
                              onClick={() => schimbaStatus(r.id, 'RESPINS')}
                              disabled={actiuneId === r.id}
                              className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs transition-all disabled:opacity-50"
                            >
                              Respinge
                            </button>
                          )}
                          <button
                            onClick={() => sterge(r.id)}
                            disabled={actiuneId === r.id}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-all disabled:opacity-50"
                          >
                            Șterge
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE — carduri */}
            <div className="md:hidden flex flex-col gap-4">
              {filtrate.map(r => (
                <div
                  key={r.id}
                  className="backdrop-blur-md bg-white/40 rounded-2xl p-4 shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg font-semibold text-[#3a5432]">{r.nume}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="text-sm text-[#4a6741] space-y-1 mb-3">
                    <div>{r.email}</div>
                    <div>{r.telefon}</div>
                    <div>{r.data_rezervare} · {r.ora_rezervare} · {r.persoane} pers.</div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {r.status !== 'CONFIRMAT' && (
                      <button
                        onClick={() => schimbaStatus(r.id, 'CONFIRMAT')}
                        disabled={actiuneId === r.id}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-all disabled:opacity-50"
                      >
                        Confirmă
                      </button>
                    )}
                    {r.status !== 'RESPINS' && (
                      <button
                        onClick={() => schimbaStatus(r.id, 'RESPINS')}
                        disabled={actiuneId === r.id}
                        className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm transition-all disabled:opacity-50"
                      >
                        Respinge
                      </button>
                    )}
                    <button
                      onClick={() => sterge(r.id)}
                      disabled={actiuneId === r.id}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-all disabled:opacity-50"
                    >
                      Șterge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
