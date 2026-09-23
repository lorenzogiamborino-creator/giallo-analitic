import { CSSProperties, useEffect, useRef, useState } from 'react';
import { ArrowUp, Mic, Plus } from 'lucide-react';

export type RaysOrigin = 'top-center' | 'top-left' | 'top-right' | 'right' | 'left' | 'bottom-center' | 'bottom-right' | 'bottom-left';
type RaysProps = { raysColor?: string; lightSpread?: number };

export function LightRays({ raysColor = '#f4c542', lightSpread = 1 }: RaysProps) {
  const style = { '--ray-color': raysColor, '--ray-spread': `${Math.max(.5, lightSpread)}px` } as CSSProperties;
  return <div aria-hidden="true" className="light-rays" style={style}><i /><i /><i /></div>;
}

export interface RadiantPromptInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function RadiantPromptInput({ placeholder = 'Preguntale a Giallo...', value: propValue, onChange, onSubmit, className = '', disabled = false }: RadiantPromptInputProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = propValue ?? internalValue;
  const update = (next: string) => { if (propValue === undefined) setInternalValue(next); onChange?.(next); };
  const submit = () => { if (value.trim() && !disabled) { onSubmit?.(value.trim()); if (propValue === undefined) setInternalValue(''); } };
  return <div className={`radiant-input ${className}`}>
    <button className="input-icon" type="button" aria-label="Adjuntar archivo"><Plus size={19} /></button>
    <input value={value} disabled={disabled} placeholder={placeholder} onChange={e => update(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }} />
    <button className="input-icon" type="button" aria-label="Usar micrófono"><Mic size={19} /></button>
    <button className="send-button" type="button" disabled={!value.trim() || disabled} onClick={submit} aria-label="Enviar pregunta"><ArrowUp size={20} /></button>
  </div>;
}

export function LetterGlitch({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let frame = 0; let raf = 0;
    const chars = '01 GIALLO ANALITIC +⚽';
    const draw = () => {
      const dpr = window.devicePixelRatio || 1, rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#101713'; ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.font = '12px monospace';
      for (let y = 18; y < rect.height; y += 21) for (let x = 12; x < rect.width; x += 18) {
        const flicker = (x * 7 + y * 3 + frame) % 37 === 0;
        ctx.fillStyle = flicker ? '#f4c542' : '#284032'; ctx.globalAlpha = flicker ? .9 : .48;
        ctx.fillText(chars[Math.floor((x + y + frame) / 13) % chars.length], x, y);
      }
      ctx.globalAlpha = 1; frame += 1; if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf);
  }, [reduced]);
  return <canvas ref={canvasRef} className={`letter-glitch ${className}`} aria-hidden="true" />;
}
