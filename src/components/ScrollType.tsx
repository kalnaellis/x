import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HEADLINES } from '../lib/constants';
import { useAppState } from '../lib/state';

gsap.registerPlugin(ScrollTrigger);

export function ScrollType() {
  const rootRef = useRef<HTMLDivElement>(null);
  const setCTAState = useAppState((s) => s.setCTAState);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.panel');

      sections.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: true,
          onEnter: () => {
            if (i === 3) {
              setCTAState('armed');
            }
          },
        });
      });

      gsap.to('.headline--kinetic', {
        letterSpacing: '0.06em',
        y: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#scene-1',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [setCTAState]);

  return (
    <div ref={rootRef} className="scroll-content">
      <section id="scene-1" className="panel">
        <h1 className="headline headline--kinetic">{HEADLINES.s1a}</h1>
        <h2 className="subhead">{HEADLINES.s1b}</h2>
      </section>
      <section id="scene-2" className="panel panel--image">
        <div className="image-card" aria-label="16 by 9 subject reveal" />
        <p className="side-copy">Precision. Pressure. Results.</p>
      </section>
      <section id="scene-3" className="panel panel--recompose">
        <div className="image-card image-card--offset" />
        <p className="side-copy side-copy--alt">Case closed → Lips glossed.</p>
      </section>
      <section id="scene-4" className="panel panel--final">
        <h2 className="headline">{HEADLINES.s4}</h2>
      </section>
    </div>
  );
}
