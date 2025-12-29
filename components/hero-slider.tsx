'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
    id: string;
    url: string;
    caption?: string;
}

interface HeroContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroBadge: string;
    ctaText: string;
    secondaryCtaText: string;
    stats: { value: string; label: string }[];
}

interface HeroSliderProps {
    slides: Slide[];
    content: HeroContent;
}

export default function HeroSlider({ slides, content }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // If no slides, use a fallback array or handle gracefully. 
    // Ideally, caller handles this, but robust component is good.
    const activeSlides = slides.length > 0 ? slides : [];

    useEffect(() => {
        if (activeSlides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, [activeSlides.length]);

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-blue-950 text-white overflow-hidden group">
            {/* Background Slides - Swipe/Slide Effect */}
            {activeSlides.length > 0 ? (
                <div className="absolute inset-0 z-0">
                    <div
                        className="flex h-full transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {activeSlides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className="w-full h-full flex-shrink-0 relative"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={slide.url}
                                        alt={slide.caption || 'School Campus'}
                                        fill
                                        priority={index === 0}
                                        className="object-cover object-center"
                                        onLoad={() => index === 0 && setIsLoaded(true)}
                                    />
                                </div>

                                {/* Professional Dark Overlay - Dimmed Look (Made lighter as requested) */}
                                <div className="absolute inset-0 bg-black/40" />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-950/30 to-black/20" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Fallback Background if no slides
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 z-0">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl animate-pulse-slow"></div>
                        <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-blue-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
            )}

            {/* Content Content - Left Aligned with Red Accent */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pb-12 pt-24 md:pb-20 md:pt-32">
                <div className="max-w-3xl space-y-6 md:space-y-8 animate-fade-in-up">

                    {/* Badge / Subtitle with Accent Bar */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-1 md:w-1.5 h-10 md:h-12 bg-red-600 rounded-sm"></div> {/* Red Accent Bar */}
                        <div className="space-y-0.5 md:space-y-1">
                            <div className="inline-flex items-center gap-2 text-red-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                                <Star className="h-3 w-3" />
                                <span>{content.heroBadge}</span>
                            </div>
                            <p className="text-lg md:text-2xl text-blue-100 font-medium">
                                {content.heroSubtitle}
                            </p>
                        </div>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight drop-shadow-xl">
                        {content.heroTitle}
                    </h1>

                    {/* Description */}
                    <p className="text-base md:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-md border-l-4 border-white/20 pl-4 md:pl-6">
                        {content.heroDescription}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                        <Link href="/admissions">
                            <Button size="lg" className="w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white px-6 py-6 md:px-8 md:py-7 text-base md:text-lg uppercase tracking-wider font-bold rounded-none shadow-2xl hover:shadow-red-900/50 transition-all border-l-4 border-red-500">
                                {content.ctaText}
                                <ArrowRight className="ml-3 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent hover:bg-white text-white hover:text-blue-950 border-2 border-white px-6 py-6 md:px-8 md:py-7 text-base md:text-lg uppercase tracking-wider font-bold rounded-none transition-all">
                                {content.secondaryCtaText}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats - Relative on mobile (in flow), Absolute on Desktop */}
                {content.stats && content.stats.length > 0 && (
                    <div className="mt-12 lg:mt-0 relative lg:absolute lg:bottom-0 lg:right-0 lg:left-auto w-full lg:w-auto bg-blue-950/80 backdrop-blur-md border-t border-white/10 lg:border-t-0 lg:border-l lg:rounded-tl-3xl p-6 lg:p-10">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                            {content.stats.map((stat, i) => (
                                <div key={i} className="text-left">
                                    <div className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                                    <div className="text-blue-200 text-[10px] md:text-sm uppercase tracking-wider font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>



            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-20">
                <ChevronDown className="h-8 w-8 text-white/50 animate-bounce" />
            </div>
        </section>
    );
}
