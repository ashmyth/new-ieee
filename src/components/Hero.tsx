import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TOKENS } from '../tokens/theme';

export const Hero: React.FC = () => {
  const GRID_COLOR = TOKENS.colors.gridHero;
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Refs for Desktop animated elements
  const hLine1Ref = useRef<HTMLDivElement | null>(null);
  const hLine2Ref = useRef<HTMLDivElement | null>(null);
  const hLine3Ref = useRef<HTMLDivElement | null>(null);

  const vLine1Ref = useRef<HTMLDivElement | null>(null);
  const vLine2Ref = useRef<HTMLDivElement | null>(null);
  const vLine3Ref = useRef<HTMLDivElement | null>(null);

  const box1Ref = useRef<HTMLDivElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  // Refs for Mobile animated elements
  const mobileContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // =========================================================================
      // DESKTOP BLUEPRINT DRAWING ANIMATION
      // =========================================================================
      const desktopTl = gsap.timeline({
        defaults: { ease: TOKENS.motion.easing.expoOut }
      });

      // 1. Horizontal Grid Lines draw outwards (100% full-bleed)
      desktopTl.fromTo(
        [hLine1Ref.current, hLine2Ref.current, hLine3Ref.current].filter(Boolean),
        { scaleX: 0, opacity: 0, transformOrigin: 'center center' },
        { scaleX: 1, opacity: 1, duration: 1.15, stagger: 0.12 }
      );

      // 2. Vertical Grid Lines drop from top edge to bottom edge
      desktopTl.fromTo(
        [vLine1Ref.current, vLine2Ref.current, vLine3Ref.current].filter(Boolean),
        { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
        { scaleY: 1, opacity: 1, duration: 0.95, stagger: 0.1 },
        '-=0.75'
      );

      // 3. Corner Marker Boxes snap into their intersection vertices
      desktopTl.fromTo(
        [box1Ref.current, box2Ref.current].filter(Boolean),
        { opacity: 0, scale: 0.85, transformOrigin: 'center center' },
        { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)', stagger: 0.08 },
        '-=0.6'
      );

      // 4. Scroll Down Indicator fades in
      desktopTl.fromTo(
        scrollIndicatorRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: TOKENS.motion.easing.power2Out },
        '-=0.35'
      );

      // =========================================================================
      // MOBILE ENTRANCE ANIMATION
      // =========================================================================
      if (mobileContainerRef.current) {
        gsap.fromTo(
          mobileContainerRef.current.children,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="w-full h-full">
      {/* =========================================================================
          MOBILE HERO SECTION (Figma iPhone 16 - 1 Node 418:9)
          Active for screens < 768px (md)
          ========================================================================= */}
      <section 
        ref={mobileContainerRef}
        aria-label="Hero Section"
        className="block md:hidden relative w-full h-full min-h-[600px] bg-canvas-light overflow-hidden select-none touch-manipulation"
      >
        {/* Horizontal Full-Bleed Grid Lines */}
        <div 
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10"
          style={{ top: '346px', backgroundColor: GRID_COLOR }}
        />
        <div 
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10"
          style={{ top: '399px', backgroundColor: GRID_COLOR }}
        />
        <div 
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10"
          style={{ top: '450px', backgroundColor: GRID_COLOR }}
        />

        {/* Vertical Grid Lines */}
        <div 
          className="absolute w-[1px] pointer-events-none z-10"
          style={{ 
            left: 'clamp(50px, 21.1vw, 83px)', 
            top: 0, 
            height: '399px',
            backgroundColor: GRID_COLOR 
          }}
        />
        <div 
          className="absolute w-[1px] pointer-events-none z-10"
          style={{ 
            left: 'clamp(290px, 90.3vw, 355px)', 
            top: '399px', 
            bottom: 0,
            backgroundColor: GRID_COLOR 
          }}
        />

        {/* Decorative Marker Boxes */}
        <div 
          className="absolute w-[34px] h-[34px] pointer-events-none z-10"
          style={{ 
            left: 'calc(clamp(50px, 21.1vw, 83px) - 34px)', 
            top: '312px',
            borderTop: `1px solid ${GRID_COLOR}`,
            borderLeft: `1px solid ${GRID_COLOR}`
          }}
        />
        <div 
          className="absolute w-[34px] h-[34px] pointer-events-none z-10"
          style={{ 
            left: 'clamp(290px, 90.3vw, 355px)', 
            top: '450px',
            borderRight: `1px solid ${GRID_COLOR}`,
            borderBottom: `1px solid ${GRID_COLOR}`
          }}
        />

        {/* Mobile Typography */}
        <h1 
          aria-label="Community For Engineers" 
          className="contents"
        >
          <div 
            className="absolute z-20 flex items-center h-[51px]"
            style={{ 
              left: 'calc(clamp(50px, 21.1vw, 83px) + 1px)', 
              top: '361px',
            }}
          >
            <span 
              className="font-normal text-text-primary m-0 select-none whitespace-nowrap leading-none tracking-[-0.06em]"
              style={{ 
                fontFamily: TOKENS.fonts.display,
                fontSize: 'clamp(37px, 13.6vw, 52.5px)',
              }}
            >
              Community
            </span>
          </div>

          <div 
            className="absolute z-20 flex items-center h-[49px] gap-[17px]"
            style={{ 
              left: '8px', 
              top: '414px',
            }}
          >
            <span 
              className="font-normal text-brand-blue m-0 select-none whitespace-nowrap leading-none tracking-[-0.06em]"
              style={{ 
                fontFamily: TOKENS.fonts.display,
                fontSize: 'clamp(37px, 13.6vw, 52.5px)',
              }}
            >
              For
            </span>
            <span 
              className="font-normal text-text-primary m-0 select-none whitespace-nowrap leading-none tracking-[-0.06em]"
              style={{ 
                fontFamily: TOKENS.fonts.display,
                fontSize: 'clamp(37px, 13.6vw, 52.5px)',
              }}
            >
              Engineers
            </span>
          </div>
        </h1>
      </section>

      {/* =========================================================================
          DESKTOP HERO SECTION (Elevated Grid Background, Clean Typography)
          Active for screens >= 768px (md)
          ========================================================================= */}
      <section 
        aria-label="Hero Section"
        className="hidden md:block relative w-full h-full min-h-[700px] bg-canvas-light overflow-hidden select-none"
      >
        {/* =======================================================================
            Full-Bleed Horizontal Grid Lines (Elevated Higher in Background)
            ======================================================================= */}
        {/* Top Horizontal Line (Line 1) */}
        <div 
          ref={hLine1Ref}
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10 will-change-transform"
          style={{ top: 'calc(50% - 159px)', backgroundColor: GRID_COLOR }}
        />
        {/* Middle Horizontal Line (Line 2 - Grid Center Axis) */}
        <div 
          ref={hLine2Ref}
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10 will-change-transform"
          style={{ top: 'calc(50% - 21px)', backgroundColor: GRID_COLOR }}
        />
        {/* Bottom Horizontal Line (Line 3) */}
        <div 
          ref={hLine3Ref}
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10 will-change-transform"
          style={{ top: 'calc(50% + 115px)', backgroundColor: GRID_COLOR }}
        />

        {/* =======================================================================
            Vertical Grid Lines (Touching Exact Top & Bottom Viewport Edges)
            ======================================================================= */}
        {/* Vertical Line 1: from top: 0 down to middle horizontal line */}
        <div 
          ref={vLine1Ref}
          className="absolute w-[1px] pointer-events-none z-10 will-change-transform"
          style={{ 
            left: 'calc(50% - 239px)', 
            top: 0, 
            height: 'calc(50% - 21px)',
            backgroundColor: GRID_COLOR 
          }}
        />
        {/* Vertical Line 2 (Left): from middle horizontal line down to bottom: 0 */}
        <div 
          ref={vLine2Ref}
          className="absolute w-[1px] pointer-events-none z-10 will-change-transform"
          style={{ 
            left: 'calc(50% - 518px)', 
            top: 'calc(50% - 21px)', 
            bottom: 0,
            backgroundColor: GRID_COLOR 
          }}
        />
        {/* Vertical Line 3 (Right): from middle horizontal line down to bottom: 0 */}
        <div 
          ref={vLine3Ref}
          className="absolute w-[1px] pointer-events-none z-10 will-change-transform"
          style={{ 
            left: 'calc(50% + 427px)', 
            top: 'calc(50% - 21px)', 
            bottom: 0,
            backgroundColor: GRID_COLOR 
          }}
        />

        {/* =======================================================================
            Decorative Marker Boxes
            ======================================================================= */}
        {/* Top-Left Marker Box */}
        <div 
          ref={box1Ref}
          className="absolute w-[100px] h-[100px] pointer-events-none z-10 will-change-transform"
          style={{ 
            left: 'calc(50% - 339px)', 
            top: 'calc(50% - 259px)',
            borderTop: `1px solid ${GRID_COLOR}`,
            borderLeft: `1px solid ${GRID_COLOR}`
          }}
        />
        {/* Bottom-Right Marker Box */}
        <div 
          ref={box2Ref}
          className="absolute w-[100px] h-[100px] pointer-events-none z-10 will-change-transform"
          style={{ 
            left: 'calc(50% + 427px)', 
            top: 'calc(50% + 115px)',
            borderRight: `1px solid ${GRID_COLOR}`,
            borderBottom: `1px solid ${GRID_COLOR}`
          }}
        />

        {/* =======================================================================
            Desktop Typography
            ======================================================================= */}
        <h1 aria-label="Community For Engineers" className="contents">
          {/* Row 1: "Community" */}
          <div 
            className="absolute z-20 flex items-center h-[134px]"
            style={{ 
              left: 'calc(50% - 235px)', 
              top: 'calc(50% - 137px)' 
            }}
          >
            <span 
              className="font-normal text-text-primary m-0 select-none whitespace-nowrap leading-none tracking-[-0.06em]"
              style={{ 
                fontFamily: TOKENS.fonts.display,
                fontSize: '145px',
              }}
            >
              Community
            </span>
          </div>

          {/* Row 2: "For Engineers" */}
          <div 
            className="absolute z-20 flex items-center h-[131px] gap-[57px]"
            style={{ 
              left: 'calc(50% - 518px)', 
              top: 'calc(50% + 1px)' 
            }}
          >
            <span 
              className="font-normal text-brand-blue m-0 select-none whitespace-nowrap leading-none tracking-[-0.06em]"
              style={{ 
                fontFamily: TOKENS.fonts.display,
                fontSize: '145px',
              }}
            >
              For
            </span>
            <span 
              className="font-normal text-text-primary m-0 select-none whitespace-nowrap leading-none tracking-[-0.06em]"
              style={{ 
                fontFamily: TOKENS.fonts.display,
                fontSize: '145px',
              }}
            >
              Engineers
            </span>
          </div>
        </h1>

        {/* Scroll Down Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none will-change-transform"
          style={{ bottom: '24px' }}
        >
          <span 
            className="text-text-primary font-normal leading-[0.86] tracking-[-0.01em] mb-[8px]"
            style={{ 
              fontFamily: TOKENS.fonts.display,
              fontSize: '20px'
            }}
          >
            Scroll down
          </span>
          <div 
            className="w-[1px] h-[45px]"
            style={{ backgroundColor: GRID_COLOR }}
          />
        </div>
      </section>
    </div>
  );
};
