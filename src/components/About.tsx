import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TOKENS } from '../tokens/theme';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const GRID_LINE_COLOR = TOKENS.colors.gridAbout;
  const sectionRef = useRef<HTMLElement | null>(null);

  // Grid Line Refs for Line Completion Animation
  const hLine1Ref = useRef<HTMLDivElement | null>(null);
  const hLine2Ref = useRef<HTMLDivElement | null>(null);
  const hLine3Ref = useRef<HTMLDivElement | null>(null);
  const hLine4Ref = useRef<HTMLDivElement | null>(null);

  const vLine1Ref = useRef<HTMLDivElement | null>(null);
  const vLine2Ref = useRef<HTMLDivElement | null>(null);

  // Content Refs
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const whatWeDoRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  // Mobile Grid Line & Content Refs
  const mobileSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // =======================================================================
      // DESKTOP BLUEPRINT LINE COMPLETION & CONTENT REVEAL TIMELINE
      // =======================================================================
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Horizontal Grid Lines Draw Outwards (Full-Bleed Viewport Edge-to-Edge)
      aboutTl.fromTo(
        [hLine1Ref.current, hLine2Ref.current, hLine3Ref.current, hLine4Ref.current].filter(Boolean),
        { scaleX: 0, opacity: 0, transformOrigin: 'center center' },
        { scaleX: 1, opacity: 1, duration: 1.1, stagger: 0.1, ease: TOKENS.motion.easing.expoOut }
      );

      // 2. Vertical Grid Lines Drop & Complete Vertices
      aboutTl.fromTo(
        [vLine1Ref.current, vLine2Ref.current].filter(Boolean),
        { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
        { scaleY: 1, opacity: 1, duration: 0.9, stagger: 0.12, ease: TOKENS.motion.easing.expoOut },
        '-=0.75'
      );

      // 3. "About Us" Heading & "What We Do" Indicator Slide Up
      aboutTl.fromTo(
        [headingRef.current, whatWeDoRef.current].filter(Boolean),
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: TOKENS.motion.duration.sectionReveal, stagger: 0.12, ease: TOKENS.motion.easing.power3Out },
        '-=0.55'
      );

      // 4. Centered Paragraph Description Reveals
      aboutTl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: TOKENS.motion.duration.sectionReveal, ease: TOKENS.motion.easing.power3Out },
        '-=0.5'
      );

      // 5. Visual Cards Slide & Scale Up in Staggered Sequence
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
      aboutTl.fromTo(
        cards,
        {
          y: 150,
          opacity: 0,
          scale: 0.94,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: TOKENS.motion.duration.cardReveal,
          stagger: 0.14,
          ease: TOKENS.motion.easing.power3Out,
        },
        '-=0.6'
      );

      // =======================================================================
      // MOBILE ENTRANCE REVEAL
      // =======================================================================
      if (mobileSectionRef.current) {
        gsap.fromTo(
          mobileSectionRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: TOKENS.motion.easing.power3Out,
            scrollTrigger: {
              trigger: mobileSectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      aria-label="About Us Section"
      className="relative w-full bg-canvas-dark text-text-inverted overflow-hidden select-none pb-20 md:pb-0"
    >
      {/* =========================================================================
          DESKTOP ABOUT SECTION (Full-Bleed Viewport Grid Lines & Complete Blueprint)
          Active for >= 768px (md)
          ========================================================================= */}
      <div className="hidden md:block relative w-full h-[966px] overflow-hidden">
        
        {/* =======================================================================
            Full-Bleed Horizontal Grid Lines (Touching Exact Left & Right Viewport Edges)
            ======================================================================= */}
        {/* Line 1: y = 115px */}
        <div 
          ref={hLine1Ref}
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10 will-change-transform"
          style={{ top: '115px', backgroundColor: GRID_LINE_COLOR }}
        />
        {/* Line 2: y = 219px */}
        <div 
          ref={hLine2Ref}
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10 will-change-transform"
          style={{ top: '219px', backgroundColor: GRID_LINE_COLOR }}
        />
        {/* Line 3: y = 655px */}
        <div 
          ref={hLine3Ref}
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10 will-change-transform"
          style={{ top: '655px', backgroundColor: GRID_LINE_COLOR }}
        />
        {/* Line 4: y = 752px */}
        <div 
          ref={hLine4Ref}
          className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-10 will-change-transform"
          style={{ top: '752px', backgroundColor: GRID_LINE_COLOR }}
        />

        {/* =======================================================================
            Vertical Grid Lines (Connecting Vertices)
            ======================================================================= */}
        {/* Line 1 (Left): connects directly with Hero vertical line at calc(50% - 518px) from top: 0 down to y: 219px */}
        <div 
          ref={vLine1Ref}
          className="absolute w-[1px] pointer-events-none z-10 will-change-transform"
          style={{ 
            left: 'calc(50% - 518px)', 
            top: 0, 
            height: '219px',
            backgroundColor: GRID_LINE_COLOR 
          }}
        />

        {/* Line 2 (Right): x = calc(50% + 581px), from y: 115px down to y: 655px */}
        <div 
          ref={vLine2Ref}
          className="absolute w-[1px] pointer-events-none z-10 will-change-transform"
          style={{ 
            left: 'calc(50% + 581px)', 
            top: '115px', 
            height: '540px',
            backgroundColor: GRID_LINE_COLOR 
          }}
        />

        {/* =======================================================================
            Heading & Content
            ======================================================================= */}
        {/* "About Us" Heading */}
        <div 
          className="absolute z-20 flex items-center h-[104px]"
          style={{ left: 'calc(50% - 501px)', top: '128px' }}
        >
          <h2 
            ref={headingRef}
            className="font-normal text-text-inverted m-0 select-none whitespace-nowrap will-change-transform leading-none tracking-[-0.06em]"
            style={{ 
              fontFamily: TOKENS.fonts.display,
              fontSize: '96px',
            }}
          >
            About Us
          </h2>
        </div>

        {/* "What we do" Subheading with Dot Indicator */}
        <div 
          ref={whatWeDoRef}
          className="absolute z-20 flex items-center gap-[16px] h-[104px] will-change-transform"
          style={{ left: 'calc(50% + 254px)', top: '128px' }}
        >
          {/* 18px x 18px circle indicator */}
          <div className="w-[18px] h-[18px] rounded-full bg-text-inverted flex-shrink-0" />
          <span 
            className="font-medium text-text-inverted select-none whitespace-nowrap text-[40px] leading-[1.27] tracking-[-0.01em]"
            style={{ 
              fontFamily: TOKENS.fonts.body,
            }}
          >
            What we do
          </span>
        </div>

        {/* Centered Description Paragraph */}
        <div 
          className="absolute z-20"
          style={{ left: 'calc(50% - 512px)', top: '333px', width: '1025px' }}
        >
          <p 
            ref={descRef}
            className="font-normal text-text-inverted m-0 text-center leading-[1.32] tracking-[-0.01em] will-change-transform text-[36px]"
            style={{ 
              fontFamily: TOKENS.fonts.body,
            }}
          >
            we are now a community of&nbsp;18K+makers<br />
            makers with over&nbsp;20&nbsp;partners.Together, we&apos;ve hosted&nbsp;1k+events<br />
            completed&nbsp;5k+&nbsp;projectsand helped create&nbsp;100+career<br />
            opportunities
          </p>
        </div>

        {/* =======================================================================
            Bottom Visual Cards
            ======================================================================= */}
        {/* Card 1: w = 425px, h = 311px */}
        <div 
          ref={card1Ref}
          className="absolute z-20 overflow-hidden group will-change-transform shadow-2xl rounded-sm transition-all duration-300 hover:ring-1 hover:ring-brand-blue/70 cursor-pointer"
          style={{ left: 'calc(50% - 702px)', top: '655px', width: '425px', height: '311px' }}
        >
          <img 
            src="/about/card_1.png" 
            alt="Community Showcase 1" 
            width={425}
            height={311}
            className="w-full h-full object-cover object-top block"
            loading="lazy"
          />
        </div>

        {/* Card 2: w = 425px, h = 214px */}
        <div 
          ref={card2Ref}
          className="absolute z-20 overflow-hidden group will-change-transform shadow-2xl rounded-sm transition-all duration-300 hover:ring-1 hover:ring-brand-blue/70 cursor-pointer"
          style={{ left: 'calc(50% - 212px)', top: '752px', width: '425px', height: '214px' }}
        >
          <img 
            src="/about/card_2.png" 
            alt="Community Showcase 2" 
            width={425}
            height={214}
            className="w-full h-full object-cover object-center block"
            loading="lazy"
          />
        </div>

        {/* Card 3: w = 425px, h = 311px */}
        <div 
          ref={card3Ref}
          className="absolute z-20 overflow-hidden group will-change-transform shadow-2xl rounded-sm transition-all duration-300 hover:ring-1 hover:ring-brand-blue/70 cursor-pointer"
          style={{ left: 'calc(50% + 278px)', top: '655px', width: '425px', height: '311px' }}
        >
          <img 
            src="/about/card_3.png" 
            alt="Community Showcase 3" 
            width={425}
            height={311}
            className="w-full h-full object-cover object-center block"
            loading="lazy"
          />
        </div>
      </div>

      {/* =========================================================================
          MOBILE ABOUT SECTION (< 768px)
          ========================================================================= */}
      <div 
        ref={mobileSectionRef}
        className="block md:hidden relative w-full py-16 px-6 bg-canvas-dark"
      >
        {/* Top Header */}
        <div className="border-b border-text-inverted/80 pb-6 mb-6">
          <h2 
            className="text-[42px] sm:text-[48px] text-text-inverted leading-tight tracking-[-0.06em] mb-4"
            style={{ fontFamily: TOKENS.fonts.display }}
          >
            About Us
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-[12px] h-[12px] rounded-full bg-text-inverted" />
            <span 
              className="text-[20px] font-medium text-text-inverted tracking-[-0.01em]"
              style={{ fontFamily: TOKENS.fonts.body }}
            >
              What we do
            </span>
          </div>
        </div>

        {/* Centered Content Paragraph */}
        <p 
          className="text-text-inverted text-center text-[18px] sm:text-[22px] leading-[1.35] tracking-[-0.01em] mb-12 border-b border-text-inverted/80 pb-10"
          style={{ fontFamily: TOKENS.fonts.body }}
        >
          we are now a community of 18K+ makers with over 20 partners. Together, we&apos;ve hosted 1k+ events, completed 5k+ projects, and helped create 100+ career opportunities.
        </p>

        {/* Visual Cards Grid on Mobile */}
        <div className="flex flex-col gap-6">
          <div className="w-full h-[220px] overflow-hidden border border-text-inverted/30 rounded-sm">
            <img 
              src="/about/card_1.png" 
              alt="Community Showcase 1" 
              width={425}
              height={220}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full h-[180px] overflow-hidden border border-text-inverted/30 rounded-sm">
            <img 
              src="/about/card_2.png" 
              alt="Community Showcase 2" 
              width={425}
              height={180}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full h-[220px] overflow-hidden border border-text-inverted/30 rounded-sm">
            <img 
              src="/about/card_3.png" 
              alt="Community Showcase 3" 
              width={425}
              height={220}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
