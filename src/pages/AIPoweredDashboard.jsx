import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Briefcase, 
  UserCheck, 
  Heart,
  Star,
  ArrowRight,
  MapPin,
  Building,
  GraduationCap,
  Clock,
  DollarSign,
  Award,
  MessageCircle,
  Eye,
  ChevronRight,
  Sparkles,
  Target,
  Activity,
  BookOpen
} from 'lucide-react';

// AI-Powered Dashboard Component
const AIPoweredDashboard = ({ user, onNavigate, theme = 'light' }) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState({});
  const [aiInsights, setAiInsights] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate AI recommendation loading
    const loadRecommendations = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock AI recommendations based on user profile
      const mockRecommendations = {
        mentors: generateMentorRecommendations(user),
        jobs: generateJobRecommendations(user),
        events: generateEventRecommendations(user),
        connections: generateConnectionRecommendations(user)
      };
      
      const mockInsights = generateAIInsights(user);
      const mockActivity = generateRecentActivity();
      
      setRecommendations(mockRecommendations);
      setAiInsights(mockInsights);
      setRecentActivity(mockActivity);
      setLoading(false);
    };

    loadRecommendations();
  }, [user]);

  if (loading) {
    return <DashboardSkeleton theme={theme} />;
  }

  return (
    <div className="space-y-8">
      {/* AI Welcome Banner */}
      <AIWelcomeBanner user={user} theme={theme} />
      
      {/* Key Metrics */}
      <MetricsGrid theme={theme} />
      
      {/* AI Insights */}
      <AIInsightsPanel insights={aiInsights} theme={theme} />
      
      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIRecommendationCard
          title="Recommended Mentors"
          subtitle="AI-matched based on your career goals"
          items={recommendations.mentors}
          onViewAll={() => onNavigate('mentorship')}
          theme={theme}
          type="mentor"
        />
        
        <AIRecommendationCard
          title="Job Opportunities"
          subtitle="Personalized job matches for you"
          items={recommendations.jobs}
          onViewAll={() => onNavigate('jobs')}
          theme={theme}
          type="job"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIRecommendationCard
          title="Upcoming Events"
          subtitle="Events you might be interested in"
          items={recommendations.events}
          onViewAll={() => onNavigate('events')}
          theme={theme}
          type="event"
        />
        
        <AIRecommendationCard
          title="Suggested Connections"
          subtitle="Alumni you should connect with"
          items={recommendations.connections}
          onViewAll={() => onNavigate('directory')}
          theme={theme}
          type="connection"
        />
      </div>
      
      {/* Activity Feed */}
      <ActivityFeed activities={recentActivity} theme={theme} />
    </div>
  );
};

// AI Welcome Banner
const AIWelcomeBanner = ({ user, theme }) => {
  const [currentInsight, setCurrentInsight] = useState(0);
  
  const insights = [
    "Your network has grown by 15% this month!",
    "3 new job opportunities match your profile",
    "Alumni in your field are most active on Tuesdays",
    "You have 2 pending mentorship requests"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [insights.length]);

  return (
    <div className={`relative overflow-hidden rounded-xl p-6 ${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-blue-900 to-purple-900' 
        : 'bg-gradient-to-r from-blue-600 to-purple-600'
    }`}>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-white text-sm font-medium">AI-Powered Insights</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Good morning, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p className="text-blue-100 transition-all duration-500">
              {insights[currentInsight]}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Target className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Metrics Grid
const MetricsGrid = ({ theme }) => {
  const metrics = [
    {
      title: "Network Growth",
      value: "142",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      subtitle: "Total connections"
    },
    {
      title: "AI Match Score",
      value: "94%",
      change: "+5%",
      changeType: "positive",
      icon: Target,
      subtitle: "Recommendation accuracy"
    },
    {
      title: "Engagement Rate",
      value: "78%",
      change: "+23%",
      changeType: "positive",
      icon: Activity,
      subtitle: "Monthly activity"
    },
    {
      title: "Learning Hours",
      value: "24h",
      change: "+8h",
      changeType: "positive",
      icon: BookOpen,
      subtitle: "This month"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} metric={metric} theme={theme} />
      ))}
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ metric, theme }) => {
  const Icon = metric.icon;
  
  return (
    <div className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-lg ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${
          theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'
        }`}>
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          metric.changeType === 'positive'
            ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
            : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
        }`}>
          {metric.change}
        </span>
      </div>
      
      <div>
        <h3 className={`text-2xl font-bold mb-1 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {metric.value}
        </h3>
        <p className={`text-sm font-medium mb-1 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {metric.title}
        </p>
        <p className={`text-xs ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {metric.subtitle}
        </p>
      </div>
    </div>
  );
};

// AI Insights Panel
const AIInsightsPanel = ({ insights, theme }) => {
  return (
    <div className={`p-6 rounded-lg border ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          AI Insights
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-start">
              <div className={`p-2 rounded-full mr-3 ${
                insight.type === 'opportunity' ? 'bg-green-100 dark:bg-green-900/30' :
                insight.type === 'trending' ? 'bg-blue-100 dark:bg-blue-900/30' :
                'bg-purple-100 dark:bg-purple-900/30'
              }`}>
                <insight.icon className={`w-4 h-4 ${
                  insight.type === 'opportunity' ? 'text-green-600 dark:text-green-400' :
                  insight.type === 'trending' ? 'text-blue-600 dark:text-blue-400' :
                  'text-purple-600 dark:text-purple-400'
                }`} />
              </div>
              <div>
                <p className={`font-medium text-sm mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {insight.title}
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// AI Recommendation Card
const AIRecommendationCard = ({ title, subtitle, items, onViewAll, theme, type }) => {
  return (
    <div className={`rounded-lg border ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold mb-1 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {subtitle}
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center"
          >
            View all
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {items.slice(0, 3).map((item, index) => (
            <RecommendationItem 
              key={index} 
              item={item} 
              theme={theme} 
              type={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Recommendation Item Component
const RecommendationItem = ({ item, theme, type }) => {
  const renderContent = () => {
    switch (type) {
      case 'mentor':
        return (
          <>
            <img
              src={item.avatar}
              alt={item.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <p className={`font-medium truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.name}
                </p>
                <div className="flex items-center ml-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-yellow-600 ml-1">{item.rating}</span>
                </div>
              </div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {item.title} at {item.company}
              </p>
              <div className="flex items-center mt-1 text-xs text-green-600 dark:text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                {item.matchScore}% match
              </div>
            </div>
          </>
        );
        
      case 'job':
        return (
          <>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {item.title}
              </p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {item.company} • {item.location}
              </p>
              <div className="flex items-center mt-1 text-xs text-blue-600 dark:text-blue-400">
                <DollarSign className="w-3 h-3 mr-1" />
                {item.salary}
              </div>
            </div>
          </>
        );
        
      case 'event':
        return (
          <>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {item.title}
              </p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {item.date} • {item.attendees} attending
              </p>
              <div className="flex items-center mt-1 text-xs text-purple-600 dark:text-purple-400">
                <MapPin className="w-3 h-3 mr-1" />
                {item.location}
              </div>
            </div>
          </>
        );
        
      case 'connection':
        return (
          <>
            <img
              src={item.avatar}
              alt={item.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {item.name}
              </p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {item.title} • Class of {item.graduationYear}
              </p>
              <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                <Users className="w-3 h-3 mr-1" />
                {item.mutualConnections} mutual connections
              </div>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
      theme === 'dark' 
        ? 'hover:bg-gray-700' 
        : 'hover:bg-gray-50'
    }`}>
      {renderContent()}
      <ArrowRight className={`w-4 h-4 ml-2 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
      }`} />
    </div>
  );
};

// Activity Feed
const ActivityFeed = ({ activities, theme }) => {
  return (
    <div className={`rounded-lg border ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Recent Activity
        </h3>
      </div>
      
      <div className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, index) => (
              <li key={index}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 && (
                    <span className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`} />
                  )}
                  <div className="relative flex space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'connection' ? 'bg-blue-500' :
                      activity.type === 'event' ? 'bg-purple-500' :
                      activity.type === 'job' ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`}>
                      <activity.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {activity.description}
                        </p>
                        <p className={`text-xs mt-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Dashboard Skeleton Loading
const DashboardSkeleton = ({ theme }) => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <div className={`h-32 rounded-xl ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}></div>
      
      {/* Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`h-32 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>
        ))}
      </div>
      
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`h-64 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>
        ))}
      </div>
    </div>
  );
};

// Mock Data Generation Functions
const generateMentorRecommendations = (user) => {
  return [
    {
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b5b3c3d3?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      matchScore: 95,
      expertise: ["React", "Machine Learning", "Leadership"]
    },
    {
      name: "Michael Rodriguez",
      title: "Product Manager",
      company: "Microsoft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      matchScore: 89,
      expertise: ["Product Strategy", "Data Analytics", "Team Management"]
    },
    {
      name: "Emily Johnson",
      title: "Tech Lead",
      company: "Amazon",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      matchScore: 92,
      expertise: ["System Design", "Cloud Architecture", "Mentoring"]
    }
  ];
};

const generateJobRecommendations = (user) => {
  return [
    {
      title: "Senior Frontend Developer",
      company: "TechStart Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      postedDays: 2
    },
    {
      title: "Full Stack Engineer",
      company: "Innovation Labs",
      location: "Remote",
      salary: "$100k - $130k",
      type: "Full-time",
      postedDays: 5
    },
    {
      title: "React Developer",
      company: "Digital Solutions",
      location: "New York, NY",
      salary: "$110k - $140k",
      type: "Contract",
      postedDays: 1
    }
  ];
};

const generateEventRecommendations = (user) => {
  return [
    {
      title: "Alumni Tech Meetup",
      date: "Oct 15, 2025",
      location: "San Francisco",
      attendees: 45,
      type: "Networking"
    },
    {
      title: "Career Development Workshop",
      date: "Oct 22, 2025",
      location: "Virtual",
      attendees: 120,
      type: "Workshop"
    },
    {
      title: "Homecoming 2025",
      date: "Nov 5, 2025",
      location: "Campus",
      attendees: 300,
      type: "Social"
    }
  ];
};

const generateConnectionRecommendations = (user) => {
  return [
    {
      name: "Alex Thompson",
      title: "Software Engineer",
      company: "Stripe",
      graduationYear: 2019,
      mutualConnections: 12,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Rachel Kim",
      title: "Data Scientist",
      company: "Uber",
      graduationYear: 2017,
      mutualConnections: 8,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Park",
      title: "Product Designer",
      company: "Airbnb",
      graduationYear: 2018,
      mutualConnections: 15,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];
};

const generateAIInsights = (user) => {
  return [
    {
      title: "Career Growth",
      description: "Software engineers in your network got promoted 23% faster this year",
      type: "trending",
      icon: TrendingUp
    },
    {
      title: "Skill Demand",
      description: "React and Python skills are highly sought after in your area",
      type: "opportunity",
      icon: Award
    },
    {
      title: "Network Effect",
      description: "Alumni from your graduation year are 40% more likely to refer you",
      type: "insight",
      icon: Users
    }
  ];
};

const generateRecentActivity = () => {
  return [
    {
      type: "connection",
      description: "Sarah Chen accepted your mentorship request",
      timestamp: "2 hours ago",
      icon: UserCheck
    },
    {
      type: "job",
      description: "New job match: Senior Frontend Developer at TechStart Inc.",
      timestamp: "4 hours ago",
      icon: Briefcase
    },
    {
      type: "event",
      description: "You registered for Alumni Tech Meetup",
      timestamp: "1 day ago",
      icon: Calendar
    },
    {
      type: "connection",
      description: "Alex Thompson viewed your profile",
      timestamp: "2 days ago",
      icon: Eye
    }
  ];
};

export default AIPoweredDashboard;