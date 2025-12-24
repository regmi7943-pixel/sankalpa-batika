import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getNotices } from '@/app/actions/notices';
import { getEvents } from '@/app/actions/events';
import { getPageContent } from '@/app/actions/settings';
import {
  ArrowRight, GraduationCap, Award, Users, BookOpen, Shield,
  Star, Quote, ChevronDown, Bell, Calendar, Play
} from 'lucide-react';

// Default content (fallback)
const defaultContent = {
  heroTitle: 'Sankalpa Batika',
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
  testimonialQuote: 'Sankalpa Batika has been instrumental in shaping my child\'s future. The dedicated faculty and nurturing environment have helped them grow both academically and personally.',
  testimonialAuthor: 'Parent of Grade 5 Student',
};

const iconMap: Record<string, any> = { BookOpen, Users, Award, Shield };

export default async function HomePage() {
  // Fetch content from database
  const contentResult = await getPageContent('homepage');
  const content = contentResult.success && contentResult.data
    ? { ...defaultContent, ...contentResult.data }
    : defaultContent;

  // Fetch notices and events
  const { data: notices } = await getNotices();
  const { data: events } = await getEvents();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-blue-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 animate-fade-in">
            <Star className="h-3 w-3 md:h-4 md:w-4 text-amber-400" />
            <span className="text-amber-200 text-xs md:text-sm font-medium">{content.heroBadge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 md:mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-white via-blue-100 to-amber-200 text-transparent bg-clip-text">
              {content.heroTitle}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-blue-200 mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {content.heroSubtitle}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-blue-100/80 max-w-2xl mx-auto mb-6 md:mb-8 animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
            {content.heroDescription}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/admissions">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg shadow-xl shadow-amber-500/20">
                {content.ctaText}
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg">
                {content.secondaryCtaText}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-12 md:mt-20 animate-slide-up px-2" style={{ animationDelay: '0.4s' }}>
            {content.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-blue-200 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <ChevronDown className="h-8 w-8 text-white/50 animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{content.featuresTitle}</h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {content.features.map((feature: any, i: number) => {
              const IconComponent = iconMap[feature.icon] || BookOpen;
              return (
                <Card key={i} className="group card-hover border-0 shadow-md overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-5 md:p-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notices & Events Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Notices */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <Bell className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Latest Notices</h2>
                </div>
                <Link href="/notices" className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>

              <div className="space-y-3 md:space-y-4">
                {notices && notices.length > 0 ? notices.slice(0, 3).map((notice) => (
                  <Card key={notice.id} className="card-hover border-0 shadow-sm">
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base line-clamp-1">{notice.title}</h3>
                          <p className="text-gray-500 text-xs md:text-sm">
                            {new Date(notice.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Link href={`/notices/${notice.id}`} className="text-blue-600 hover:text-blue-700 flex-shrink-0">
                          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 md:p-8 text-center text-gray-500 text-sm">
                      No notices available
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Upcoming Events</h2>
                </div>
                <Link href="/events" className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>

              <div className="space-y-3 md:space-y-4">
                {events && events.length > 0 ? events.slice(0, 3).map((event) => (
                  <Card key={event.id} className="card-hover border-0 shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white p-3 md:p-4 text-center min-w-[60px] md:min-w-[70px]">
                          <p className="text-[10px] md:text-xs font-bold uppercase">
                            {new Date(event.date).toLocaleString('default', { month: 'short' })}
                          </p>
                          <p className="text-xl md:text-2xl font-bold">{new Date(event.date).getDate()}</p>
                        </div>
                        <div className="p-3 md:p-4 flex-grow">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1">{event.name}</h3>
                          <p className="text-gray-500 text-xs md:text-sm line-clamp-1">{event.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 md:p-8 text-center text-gray-500 text-sm">
                      No upcoming events
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Quote className="h-12 w-12 md:h-16 md:w-16 text-amber-500/30 mx-auto mb-6 md:mb-8" />

          <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 md:mb-8 italic">
            "{content.testimonialQuote}"
          </blockquote>

          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-white text-sm md:text-base">{content.testimonialAuthor}</p>
              <p className="text-gray-400 text-xs md:text-sm">Proud Parent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Our Campus</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Campus Moments</h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer relative">
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/50 transition-colors flex items-center justify-center">
                  <Play className="h-10 w-10 md:h-12 md:w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-10">
            <Link href="/gallery">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
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
