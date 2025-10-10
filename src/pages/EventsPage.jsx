import React, { useState, useEffect } from 'react';
import CreateEventModal from './CreateEventModal.jsx';
import { 
  Calendar, MapPin, Users, Clock, DollarSign, Star, Share2, Bookmark, BookmarkCheck,
  Filter, Search, Plus, Eye, Edit, Trash2, ExternalLink, Tag, User, Building, Globe,
  Video, Coffee, Briefcase, GraduationCap, Heart, TrendingUp, ChevronRight, ChevronLeft,
  Grid, List, SortAsc, X, CreditCard, Check, AlertCircle, Gift, Ticket, Mail, Phone,
  Lock, Shield, Award
} from 'lucide-react';

// ###################################################################################
// ## ALL HELPER COMPONENTS FOR THE EVENTS PAGE ARE NOW DEFINED HERE ##
// ###################################################################################

const generateMockEvents = () => {
  const categories = ['networking', 'career', 'social', 'educational', 'fundraising'];
  const eventTitles = ['Alumni Tech Meetup', 'Career Workshop', 'Homecoming Celebration', 'Networking Happy Hour', 'Industry Leaders Panel'];
  return Array.from({ length: 12 }, (_, i) => {
    const category = categories[i % categories.length];
    const price = Math.random() > 0.6 ? Math.floor(Math.random() * 50) + 20 : 0;
    const eventDate = new Date(Date.now() + (i + 1) * 3 * 24 * 60 * 60 * 1000);
    return {
      id: i + 1,
      title: `${eventTitles[i % eventTitles.length]} #${i+1}`,
      description: 'A brief but engaging description of the event, highlighting its key benefits and objectives for the alumni network.',
      date: eventDate.toISOString(),
      location: i % 3 === 0 ? 'Virtual Event' : 'San Francisco, CA',
      category,
      price,
      maxAttendees: 150,
      attendeeCount: Math.floor(Math.random() * 100),
      isVirtual: i % 3 === 0,
      isRegistered: Math.random() > 0.8,
      isBookmarked: Math.random() > 0.7,
      image: `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&q=80`,
      organizer: { name: 'Alumni Association', title: 'Event Coordinator', avatar: `https://i.pravatar.cc/150?u=org${i}` }
    };
  });
};

const EventsHeader = ({ onCreateEvent, theme }) => (
  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
    <div>
      <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Alumni Events</h1>
      <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Connect, learn, and grow with your alumni community</p>
    </div>
    <button onClick={onCreateEvent} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mt-4 lg:mt-0"><Plus className="w-4 h-4 mr-2" />Create Event</button>
  </div>
);

const EventsStats = ({ events, theme }) => {
    const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;
    const registeredEvents = events.filter(e => e.isRegistered).length;
    const totalAttendees = events.reduce((sum, e) => sum + e.attendeeCount, 0);
    const stats = [
        { title: 'Upcoming Events', value: upcomingEvents, icon: Calendar },
        { title: 'My Registrations', value: registeredEvents, icon: User },
        { title: 'Total Attendees', value: totalAttendees.toLocaleString(), icon: Users }
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => <StatCard key={i} stat={stat} theme={theme} />)}
        </div>
    );
};

const StatCard = ({ stat, theme }) => (
    <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{stat.title}</p>
        <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
    </div>
);

const EventsFilters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, dateFilter, setDateFilter, viewMode, setViewMode, resultCount, theme }) => {
  const categories = [ { id: 'all', label: 'All Events', icon: Calendar }, { id: 'networking', label: 'Networking', icon: Users }, { id: 'career', label: 'Career', icon: Briefcase }, { id: 'social', label: 'Social', icon: Coffee }, { id: 'educational', label: 'Educational', icon: GraduationCap }, { id: 'fundraising', label: 'Fundraising', icon: Heart } ];
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} /></div>
          <input type="text" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
        </div>
        <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className={`px-4 py-3 border rounded-lg text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
          <option value="all">All Dates</option><option value="upcoming">Upcoming</option><option value="today">Today</option><option value="week">This Week</option><option value="month">This Month</option>
        </select>
        <div className={`flex rounded-lg border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
          <button onClick={() => setViewMode('grid')} className={`p-3 rounded-l-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}><Grid className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('list')} className={`p-3 rounded-r-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}><List className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${selectedCategory === c.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}><c.icon className="w-4 h-4 mr-2" />{c.label}</button>)}
      </div>
      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Showing {resultCount} events</div>
    </div>
  );
};

const EventCard = ({ event, onClick, onRegisterClick, theme }) => {
    const [isBookmarked, setIsBookmarked] = useState(event.isBookmarked);
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formatTime = (date) => new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const getCategoryColor = (category) => ({ networking: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', career: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', social: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', educational: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400', fundraising: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300');
    return (
      <div className={`rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-lg group ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
        <div className="relative h-48 overflow-hidden cursor-pointer" onClick={onClick}>
          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
          <div className="absolute top-4 left-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>{event.category}</span></div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button onClick={(e) => { e.stopPropagation(); setIsBookmarked(!isBookmarked); }} className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">{isBookmarked ? <BookmarkCheck className="w-4 h-4 text-blue-600" /> : <Bookmark className="w-4 h-4 text-gray-600" />}</button>
            <button onClick={(e) => { e.stopPropagation(); }} className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"><Share2 className="w-4 h-4 text-gray-600" /></button>
          </div>
        </div>
        <div className="p-6">
          <h3 onClick={onClick} className={`text-lg font-semibold mb-2 line-clamp-2 cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{event.title}</h3>
          <div className="space-y-2 mb-4">
            <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}><Calendar className="w-4 h-4 mr-2" />{formatDate(event.date)} at {formatTime(event.date)}</div>
            <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}><MapPin className="w-4 h-4 mr-2" />{event.location}</div>
            <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}><Users className="w-4 h-4 mr-2" />{event.attendeeCount} attending</div>
          </div>
          <button onClick={() => onRegisterClick(event)} className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${event.isRegistered ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{event.isRegistered ? 'View Registration' : event.price > 0 ? `Register - $${event.price}` : 'Register Free'}</button>
        </div>
      </div>
    );
};

const EventsDisplay = ({ events, viewMode, onEventSelect, onRegisterClick, theme }) => {
    if (events.length === 0) return <div className="text-center py-16"><Calendar className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No Events Found</h3><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters.</p></div>;
    return <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>{events.map(event => <EventCard key={event.id} event={event} onClick={() => onEventSelect(event)} onRegisterClick={onRegisterClick} theme={theme} />)}</div>
};

const EventDetailsModal = ({ event, onClose, onRegisterClick, theme }) => {
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in"><div className={`max-w-3xl w-full max-h-[90vh] flex flex-col rounded-xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="relative h-64 bg-gray-200"><img src={event.image} alt={event.title} className="w-full h-full object-cover" /><button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-opacity-75"><X/></button></div>
      <div className="p-6 flex-1 overflow-y-auto"><h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{event.title}</h1><p className={`text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4`}>{formatDate(event.date)}</p><p className={`whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{event.description}</p></div>
      <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}><span className="text-2xl font-bold">{event.price > 0 ? `$${event.price}`: 'Free'}</span><button onClick={() => { onRegisterClick(event); onClose(); }} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Register Now</button></div>
    </div></div>);
};

const EventRegistrationModal = ({ event, onClose, onRegister, user, theme }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const handleSuccess = () => { onRegister({ eventId: event.id }); setCurrentStep(2); setTimeout(onClose, 2000); };
    return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`max-w-lg w-full rounded-xl shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6 border-b flex justify-between items-center"><h2 className="text-2xl font-bold">{currentStep === 1 ? 'Confirm Registration' : 'Registration Successful!'}</h2><button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X /></button></div>
        <div className="p-8">{currentStep === 1 ? (<div><p className="mb-2">You are registering for:</p><h3 className="text-xl font-bold mb-4">{event.title}</h3><p className="text-lg font-bold">{event.price > 0 ? `Price: $${event.price}`: 'This is a free event.'}</p></div>) : (<div className="text-center"><Check className="w-16 h-16 text-green-500 mx-auto mb-4" /><h3>You're all set!</h3><p>A confirmation has been sent to your email.</p></div>)}</div>
        <div className="p-6 border-t text-right">{currentStep === 1 && <button onClick={handleSuccess} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Complete Registration</button>}</div>
      </div>
    </div>);
};

const EventsSkeleton = ({ theme }) => (
  <div className="space-y-6 animate-pulse">
    <div className={`h-16 w-full rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className={`h-24 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div><div className={`h-24 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div><div className={`h-24 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div></div>
    <div className={`h-20 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <div key={i} className={`h-80 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}></div>)}</div>
  </div>
);


// #############################################################
// ## THE MAIN EVENTS PAGE COMPONENT                          ##
// #############################################################

const EventsPage = ({ user, theme = 'light' }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedEventForDetails, setSelectedEventForDetails] = useState(null);
  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => { loadEvents(); }, []);
  useEffect(() => { filterEvents(); }, [events, selectedCategory, searchTerm, dateFilter]);
  
  const loadEvents = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockEvents = generateMockEvents();
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
    setLoading(false);
  };

  const filterEvents = () => {
    let currentEvents = [...events];
    let filtered = currentEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        const eventDate = new Date(event.date);
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Start of today
        const matchesDate = 
            dateFilter === 'all' ||
            (dateFilter === 'upcoming' && eventDate >= now) ||
            (dateFilter === 'today' && eventDate.toDateString() === now.toDateString()) ||
            (dateFilter === 'week' && eventDate >= now && eventDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)) ||
            (dateFilter === 'month' && eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear());
        return matchesSearch && matchesCategory && matchesDate;
    });
    setFilteredEvents(filtered);
  };
  
  const handleRegister = (registrationDetails) => {
    console.log("Registration Complete:", registrationDetails);
    // In a real app, you would mark the event as registered and update the state
  };

  const handleEventCreated = (newEvent) => {
    const finalEvent = {
        ...newEvent,
        id: Date.now(), // Ensure a unique ID
        attendeeCount: 0,
        isRegistered: false, // Newly created event can't be registered by the creator yet
        isBookmarked: false,
    };
    setEvents(prevEvents => [finalEvent, ...prevEvents]);
    console.log("New Event Added:", finalEvent);
    setShowCreateModal(false);
  };

  if (loading) return <EventsSkeleton theme={theme} />;

  return (
    <div className="space-y-6">
      <EventsHeader onCreateEvent={() => setShowCreateModal(true)} theme={theme} />
      <EventsStats events={events} theme={theme} />
      <EventsFilters
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        dateFilter={dateFilter} setDateFilter={setDateFilter}
        viewMode={viewMode} setViewMode={setViewMode}
        resultCount={filteredEvents.length} theme={theme}
      />
      <EventsDisplay
        events={filteredEvents} viewMode={viewMode}
        onEventSelect={setSelectedEventForDetails}
        onRegisterClick={setSelectedEventForRegistration}
        theme={theme}
      />
      
      {selectedEventForDetails && (
        <EventDetailsModal
          event={selectedEventForDetails}
          onClose={() => setSelectedEventForDetails(null)}
          onRegisterClick={setSelectedEventForRegistration}
          theme={theme}
        />
      )}

      {selectedEventForRegistration && (
          <EventRegistrationModal
              event={selectedEventForRegistration}
              user={user}
              onClose={() => setSelectedEventForRegistration(null)}
              onRegister={handleRegister}
              theme={theme}
          />
      )}
      
      {showCreateModal && (
        <CreateEventModal
          user={user}
          theme={theme}
          onClose={() => setShowCreateModal(false)}
          onEventCreated={handleEventCreated}
        />
      )}
    </div>
  );
};

export default EventsPage;