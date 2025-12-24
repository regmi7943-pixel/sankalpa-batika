import { Card, CardContent } from '@/components/ui/card';
import { getEvents } from '@/app/actions/events';
import { Calendar, MapPin, Clock } from 'lucide-react';

export const metadata = {
    title: 'Events - Sankalpa Batika',
    description: 'Upcoming events and activities at Sankalpa Batika School.',
};

export default async function EventsPage() {
    const { data: events } = await getEvents();

    // Separate upcoming and past events
    const now = Date.now();
    const upcoming = events?.filter(e => e.date >= now) || [];
    const past = events?.filter(e => e.date < now) || [];

    return (
        <div className="pt-16 md:pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6">Events Calendar</h1>
                    <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto">
                        Mark your calendar for exciting school events and activities.
                    </p>
                </div>
            </section>

            {/* Events Section */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Upcoming Events */}
                    <div className="mb-12 md:mb-16">
                        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                            <div className="w-8 md:w-10 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Upcoming Events</h2>
                        </div>

                        {upcoming.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {upcoming.map((event, i) => (
                                    <Card key={event.id} className="overflow-hidden card-hover group animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                                        {/* Date Header */}
                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 md:p-6 text-center relative overflow-hidden">
                                            <div className="absolute -right-4 -top-4 w-16 md:w-20 h-16 md:h-20 bg-white/10 rounded-full"></div>
                                            <p className="text-sm md:text-lg font-bold uppercase tracking-wider">
                                                {new Date(event.date).toLocaleString('default', { month: 'long' })}
                                            </p>
                                            <p className="text-4xl md:text-5xl font-bold my-1">{new Date(event.date).getDate()}</p>
                                            <p className="text-blue-200 text-sm">{new Date(event.date).getFullYear()}</p>
                                        </div>

                                        {/* Content */}
                                        <CardContent className="p-4 md:p-6">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors">
                                                {event.name}
                                            </h3>

                                            <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-3 w-3 md:h-4 md:w-4 text-blue-500 flex-shrink-0" />
                                                    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                {event.location && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-3 w-3 md:h-4 md:w-4 text-blue-500 flex-shrink-0" />
                                                        <span className="truncate">{event.location}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <p className="text-gray-600 text-xs md:text-sm line-clamp-3">
                                                {event.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 md:py-16 bg-white rounded-xl md:rounded-2xl shadow-sm">
                                <Calendar className="h-12 w-12 md:h-16 md:w-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                                <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No Upcoming Events</h3>
                                <p className="text-gray-500 text-sm md:text-base">Check back later for new events.</p>
                            </div>
                        )}
                    </div>

                    {/* Past Events */}
                    {past.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                                <div className="w-8 md:w-10 h-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded"></div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-700">Past Events</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 opacity-75">
                                {past.slice(0, 6).map((event) => (
                                    <Card key={event.id} className="overflow-hidden">
                                        <div className="bg-gray-200 text-gray-700 p-3 md:p-4 text-center">
                                            <p className="text-xs md:text-sm font-bold uppercase">
                                                {new Date(event.date).toLocaleString('default', { month: 'short' })} {new Date(event.date).getDate()}, {new Date(event.date).getFullYear()}
                                            </p>
                                        </div>
                                        <CardContent className="p-3 md:p-4">
                                            <h3 className="font-semibold text-gray-700 text-sm md:text-base">{event.name}</h3>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
