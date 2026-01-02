// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getNotices } from '@/app/actions/notices';
import { getEvents } from '@/app/actions/events';
import { getSlides, getGallery } from '@/app/actions/gallery';
import { getPageContent } from '@/app/actions/settings';
import HeroSlider from '@/components/hero-slider';
import RecentNotices from '@/components/home/recent-notices';
import HomeNoticePopup from '@/components/home/home-notice-popup';
import HomepageGalleryPreview from '@/components/home/homepage-gallery-preview';
import HomeEvents from '@/components/home/home-events';
import DynamicIcon from '@/components/DynamicIcon';
import {
  ArrowRight, GraduationCap, Award, Users, BookOpen, Shield,
  Bell, Calendar, Play, Quote
} from 'lucide-react';

// Default content (fallback)
const defaultContent = {
  heroTitle: 'Sankalpa Vatika',
  heroSubtitle: 'Excellence in Education',
  heroDescription: 'Nurturing minds, building character, and shaping the future leaders of tomorrow. Join our community of learners and explorers.',
  heroBadge: 'Admissions Open for 2025',
  ctaText: 'Apply for Admission',
  secondaryCtaText: 'Learn More',
  stats: [
    { value: '500+', label: 'Students' },
    { value: '50+', label: 'Teachers' },
    { value: '15+', label: 'Years' },
    { value: '98%', label: 'Success Rate' },
  ],
  featuresTitle: 'Excellence in Every Aspect',
  features: [
    { icon: 'BookOpen', title: 'Academic Excellence', description: 'Comprehensive curriculum designed to nurture critical thinking and creativity.' },
    { icon: 'Users', title: 'Expert Faculty', description: 'Dedicated teachers with years of experience in education.' },
    { icon: 'Award', title: 'Holistic Development', description: 'Focus on sports, arts, and extracurricular activities.' },
    { icon: 'Shield', title: 'Safe Environment', description: 'Secure campus with modern infrastructure and facilities.' },
  ],
  testimonialQuote: 'Sankalpa Vatika has been instrumental in shaping my child\'s future. The dedicated faculty and nurturing environment have helped them grow both academically and personally.',
  testimonialAuthor: 'Parent of Grade 5 Student',
};

const iconMap: Record<string, any> = { BookOpen, Users, Award, Shield };

export default async function HomePage() {
  // Fetch content from database
  const contentResult = await getPageContent('homepage');
  const content = contentResult.success && contentResult.data
    ? { ...defaultContent, ...contentResult.data }
    : defaultContent;

  // Fetch notices, events, and slides
  const { data: notices } = await getNotices();
  const { data: events } = await getEvents();
  const { data: slides } = await getSlides();
  const { data: galleryItems } = await getGallery();

  const previewPhotos = (galleryItems || [])
    .filter(item => item.type === 'image' && item.category === 'glimpses')
    .slice(0, 4);

  return (
    <>
      <HomeNoticePopup notices={notices || []} />

      {/* Hero Section */}
      <HeroSlider
        slides={slides || []}
        content={content as any}
      />

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">{content.featuresTitle}</h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {content.features.map((feature: any, i: number) => {
              return (
                <Card key={i} className="group card-hover border-0 shadow-md overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-5 md:p-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <DynamicIcon name={feature.icon} className="h-6 w-6 md:h-7 md:w-7 text-white" fallback={<BookOpen className="h-6 w-6 md:h-7 md:w-7 text-white" />} />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted text-xs md:text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notices & Events Section */}
      <section className="py-16 md:py-24 bg-surface dark:bg-gradient-to-b dark:from-surface dark:to-background border-y border-surface-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Notices */}
            <div>


              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Bell className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">Latest Notices</h2>
                </div>
                <Link href="/notices" className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>

              <RecentNotices notices={notices || []} />
            </div>

            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">Upcoming Events</h2>
                </div>
                <Link href="/events" className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>

              <HomeEvents events={events || []} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-surface text-foreground relative overflow-hidden border-y border-surface-dark/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Parents Say</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded"></div>
          </div>

          {/* Testimonial Grid/Focus Layout */}
          <div className={`${(content.testimonials?.length || 0) > 2
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-8 max-w-4xl mx-auto'
            }`}>
            {/* Fallback for legacy data */}
            {(!content.testimonials && content.testimonialQuote) && (
              <div className="text-center">
                <Quote className="h-12 w-12 md:h-16 md:w-16 text-amber-500/30 mx-auto mb-6 md:mb-8" />
                <blockquote className="text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed mb-6 md:mb-8 italic">
                  "{content.testimonialQuote}"
                </blockquote>
                <div className="flex items-center justify-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm md:text-base">{content.testimonialAuthor}</p>
                    <p className="text-muted text-xs md:text-sm">Proud Parent</p>
                  </div>
                </div>
              </div>
            )}

            {/* New Array Data */}
            {(content.testimonials || []).map((testimonial: any, i: number) => (
              <div
                key={i}
                className={`${(content.testimonials?.length || 0) > 2
                  ? 'bg-surface p-6 rounded-xl hover:shadow-lg transition-all border border-surface-dark/10 flex flex-col h-full'
                  : 'text-center'
                  }`}
              >
                {(content.testimonials?.length || 0) > 2 ? (
                  // Card Layout
                  <>
                    <Quote className="h-8 w-8 text-amber-500/50 mb-4" />
                    <blockquote className="text-base text-foreground/80 leading-relaxed mb-6 flex-1 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-surface-dark/10">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                        <p className="text-muted text-xs">Parent</p>
                      </div>
                    </div>
                  </>
                ) : (
                  // Focused Layout (1-2 items)
                  <>
                    <Quote className="h-12 w-12 md:h-16 md:w-16 text-amber-500/30 mx-auto mb-6 md:mb-8" />
                    <blockquote className="text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed mb-6 md:mb-8 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground text-sm md:text-base">{testimonial.author}</p>
                        <p className="text-muted text-xs md:text-sm">Proud Parent</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Our School</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">School Moments</h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded"></div>
          </div>

          <HomepageGalleryPreview photos={previewPhotos as any} />

          <div className="text-center mt-8 md:mt-10">
            <Link href="/gallery">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
