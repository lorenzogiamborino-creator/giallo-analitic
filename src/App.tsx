import { useState } from 'react';
import { Activity, ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, ChevronDown, Globe2, LayoutDashboard, Menu, Search, ShieldCheck, SlidersHorizontal, Trophy, Users, X } from 'lucide-react';
import { LetterGlitch, LightRays, RadiantPromptInput } from './Component';
import './App.css';

const sources = [
  { name: 'Segundo Palo', type: 'Análisis y opinión', color: 'yellow' },
  { name: 'BeSoccer', type: 'Resultados y estadísticas', color: 'blue' },
  { name: 'AFA', type: 'Fuente oficial', color: 'red' },
  { name: 'Biblioteca Giallo', type: 'Libros y táctica', color: 'green' },
];

const suggested = ['¿Quién fue el mejor jugador de la fecha?', 'Compará el 4-3-3 con el 3-5-2', '¿Cuándo juega la Selección?'];

export default function App() {
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [menu, setMenu] = useState(false);
  const ask = (value: string) => { setLastQuery(value); setQuery(''); };

  return <div className="giallo-app">
    <aside className={`sidebar ${menu ? 'open' : ''}`}>
      <div className="brand"><span className="brand-mark">G</span><div><b>GIALLO</b><small>ANALITIC</small></div></div>
      <button className="new-chat" onClick={() => setLastQuery('')}><span>＋</span> Nueva consulta</button>
      <nav className="side-nav">
        <p>ESPACIO DE TRABAJO</p>
        <a className="active"><LayoutDashboard size={17} /> Inicio</a><a><Trophy size={17} /> Partidos y torneos</a><a><Activity size={17} /> Estadísticas</a><a><BookOpen size={17} /> Biblioteca táctica</a>
        <p className="nav-gap">MI EQUIPO</p><a><Users size={17} /> San Lorenzo</a><a><CalendarDays size={17} /> Calendario</a>
      </nav>
      <div className="sidebar-bottom"><div className="source-mini"><ShieldCheck size={17} /><div><b>Fuentes verificadas</b><small>4 conectadas · actualizado hoy</small></div></div><button className="settings"><SlidersHorizontal size={16} /> Configuración</button></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button><div className="crumb">GIALLO <span>/</span> <b>INICIO</b></div><div className="top-actions"><button className="date-pill"><span className="live-dot" /> Datos en vivo <ChevronDown size={14} /></button><div className="avatar">LG</div></div></header>
      <section className="hero">
        <LightRays /><div className="hero-copy"><span className="eyebrow yellow-text">INTELIGENCIA DEPORTIVA · 01</span><h1>El fútbol,<br /><em>entendido.</em></h1><p>Una mirada más profunda al juego. Datos, contexto y análisis para responder cada pregunta con fuentes confiables.</p><div className="hero-status"><CheckCircle2 size={15} /> Verificamos cada dato antes de responder</div></div><div className="glitch-frame"><LetterGlitch /><div className="glitch-label"><span>LIVE INDEX</span><b>ARG · 2026</b></div></div>
      </section>
      <section className="ask-section"><div className="section-kicker"><span className="yellow-dot" /> CONSULTÁ A GIALLO <span className="line" /></div><h2>¿Qué querés saber hoy?</h2><RadiantPromptInput value={query} onChange={setQuery} onSubmit={ask} placeholder="Preguntá por un partido, jugador, táctica..." /><div className="suggestions">{suggested.map(item => <button key={item} onClick={() => ask(item)}>{item}<ArrowUpRight size={14} /></button>)}</div></section>
      {lastQuery && <section className="answer-card"><div className="answer-top"><div className="answer-icon"><Search size={18} /></div><div><span className="eyebrow">CONSULTA ANALIZADA</span><h3>{lastQuery}</h3></div><span className="verified"><CheckCircle2 size={14} /> Verificado</span></div><p className="answer-text">Giallo está contrastando estadísticas, fuentes oficiales y contexto editorial para construir una respuesta completa sobre esta consulta. La respuesta incluirá la fecha de cada dato y los enlaces de origen.</p><div className="answer-meta"><span><Globe2 size={14} /> Búsqueda multi-fuente</span><span><CalendarDays size={14} /> Fecha de corte: hoy</span></div></section>}
      <section className="sources-section"><div className="section-heading"><div><span className="eyebrow">BASE DE CONOCIMIENTO</span><h2>Fuentes que usamos</h2></div><button className="see-all">Ver todas <ArrowUpRight size={15} /></button></div><div className="source-grid">{sources.map(source => <article className="source-card" key={source.name}><div className={`source-logo ${source.color}`}>{source.name === 'AFA' ? 'AFA' : source.name === 'BeSoccer' ? 'B' : source.name === 'Segundo Palo' ? '2P' : 'G'}</div><div><h3>{source.name}</h3><p>{source.type}</p></div><CheckCircle2 className="source-check" size={16} /></article>)}</div></section>
    </main>
  </div>;
}
