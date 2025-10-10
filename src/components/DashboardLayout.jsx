import React, { useState } from 'react';
import portalLogo from '../assets/logo.png';
import { 
  Home, 
  Users, 
  Calendar, 
  UserCheck, 
  Briefcase, 
  Heart, 
  User, 
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';

// Dashboard Layout Component
export const DashboardLayout = ({ children, currentPage, onNavigate, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'directory', name: 'Alumni Directory', icon: Users },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'mentorship', name: 'Mentorship', icon: UserCheck },
    { id: 'jobs', name: 'Job Board', icon: Briefcase },
    { id: 'fundraising', name: 'Fundraising', icon: Heart },
    { id: 'profile', name: 'My Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
  <img src={portalLogo} alt="Alumni Portal Logo" className="w-8 h-8 rounded-full" /> {/* <-- YAHAN BADLAV KIYA */}
  <span className={`ml-3 text-lg font-semibold ...`}>
    Alumni Portal
  </span>
</div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-blue-700 dark:text-blue-300' : ''
                  }`} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className={`p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <div className="flex items-center">
              <img
                src={user?.avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-3 flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {user?.name}
                </p>
                <p className={`text-xs truncate ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Class of {user?.graduationYear}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className={`${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b h-16 flex items-center justify-between px-6`}>
          
          {/* Left Section */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:block ml-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="text"
                  placeholder="Search alumni, events, jobs..."
                  className={`block w-80 pl-10 pr-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 relative ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`} />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border`}>
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {user?.name}
                      </p>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {user?.email}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Your Profile
                    </button>
                    
                    <button
                      onClick={() => {
                        onNavigate('settings');
                        setProfileDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </button>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          onLogout();
                          setProfileDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

// Breadcrumb Component
const Breadcrumb = ({ items, theme = 'light' }) => {
  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className={`mx-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`}>
                /
              </span>
            )}
            <span className={`${
              index === items.length - 1
                ? theme === 'dark' ? 'text-white font-medium' : 'text-gray-900 font-medium'
                : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
            } ${index < items.length - 1 ? 'cursor-pointer' : ''}`}>
              {item}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Page Header Component
const PageHeader = ({ title, description, action, theme = 'light' }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h1>
          {description && (
            <p className={`mt-2 text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

// Card Component
const Card = ({ children, className = '', theme = 'light' }) => {
  return (
    <div className={`${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, change, icon: Icon, theme = 'light' }) => {
  const isPositive = change > 0;
  
  return (
    <Card theme={theme} className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </p>
          {change !== undefined && (
            <p className={`text-sm mt-2 flex items-center ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{isPositive ? '+' : ''}{change}%</span>
              <span className="ml-2 text-gray-400">vs last month</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        )}
      </div>
    </Card>
  );
};

// Quick Actions Component
const QuickActions = ({ actions, theme = 'light' }) => {
  return (
    <Card theme={theme} className="p-6">
      <h3 className={`text-lg font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Quick Actions
      </h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
              theme === 'dark'
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <div className="p-2 bg-blue-50 rounded-lg mr-3 dark:bg-blue-900/20">
              <action.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {action.title}
              </p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};

// Demo Component showing the layout in action
const DashboardLayoutDemo = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@alumni.edu',
    graduationYear: 2018,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const quickActions = [
    {
      title: 'Update Profile',
      description: 'Keep your information current',
      icon: User,
      onClick: () => setCurrentPage('profile')
    },
    {
      title: 'Find Mentors',
      description: 'Connect with experienced alumni',
      icon: UserCheck,
      onClick: () => setCurrentPage('mentorship')
    },
    {
      title: 'Browse Jobs',
      description: 'Explore career opportunities',
      icon: Briefcase,
      onClick: () => setCurrentPage('jobs')
    },
    {
      title: 'Join Events',
      description: 'Attend upcoming alumni events',
      icon: Calendar,
      onClick: () => setCurrentPage('events')
    }
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div>
            <Breadcrumb items={['Home', 'Dashboard']} />
            <PageHeader 
              title="Dashboard" 
              description="Welcome back! Here's what's happening with your alumni network."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard 
                title="Network Connections" 
                value="142" 
                change={12}
                icon={Users} 
              />
              <StatsCard 
                title="Upcoming Events" 
                value="8" 
                change={5}
                icon={Calendar} 
              />
              <StatsCard 
                title="Job Matches" 
                value="23" 
                change={-3}
                icon={Briefcase} 
              />
              <StatsCard 
                title="Mentorship Requests" 
                value="4" 
                change={8}
                icon={UserCheck} 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="text-gray-500 text-center py-8">
                    Activity feed will be implemented in Part 4
                  </div>
                </Card>
              </div>
              
              <div>
                <QuickActions actions={quickActions} />
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div>
            <Breadcrumb items={['Home', currentPage]} />
            <PageHeader 
              title={currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} 
              description={`This is the ${currentPage} page - will be implemented in later parts.`}
            />
            <Card className="p-8 text-center">
              <p className="text-gray-500">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} content coming in future parts...
              </p>
            </Card>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      user={mockUser}
      onLogout={handleLogout}
    >
      {renderPageContent()}
    </DashboardLayout>
  );
};

export default DashboardLayoutDemo;