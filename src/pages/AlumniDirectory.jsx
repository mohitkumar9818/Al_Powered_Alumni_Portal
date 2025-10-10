import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  GraduationCap, 
  Users, 
  Mail, 
  MessageCircle, 
  UserPlus,
  Star,
  Eye,
  Calendar,
  Award,
  Briefcase,
  X,
  ChevronDown,
  Grid,
  List,
  SortAsc,
  Globe,
  Linkedin,
  Twitter,
  ExternalLink,
  Heart,
  Share2,
  BookOpen
} from 'lucide-react';

// Main Alumni Directory Component
const AlumniDirectory = ({ theme = 'light' }) => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    graduationYear: '',
    major: '',
    company: '',
    location: '',
    mentorshipStatus: '',
    industry: ''
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);

  useEffect(() => {
    loadAlumniData();
  }, []);

  useEffect(() => {
    filterAndSortAlumni();
  }, [alumni, searchTerm, filters, sortBy]);

  const loadAlumniData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    //const mockAlumni = generateMockAlumniData();
    const mockAlumni = myAlumniData;
    setAlumni(mockAlumni);
    setFilteredAlumni(mockAlumni);
    setLoading(false);
  };

  const filterAndSortAlumni = () => {
    let filtered = alumni.filter(person => {
      const matchesSearch = 
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.major.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters = 
        (!filters.graduationYear || person.graduationYear.toString() === filters.graduationYear) &&
        (!filters.major || person.major === filters.major) &&
        (!filters.company || person.company === filters.company) &&
        (!filters.location || person.location.includes(filters.location)) &&
        (!filters.mentorshipStatus || person.mentorshipStatus === filters.mentorshipStatus) &&
        (!filters.industry || person.industry === filters.industry);

      return matchesSearch && matchesFilters;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'graduationYear':
          return b.graduationYear - a.graduationYear;
        case 'company':
          return a.company.localeCompare(b.company);
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    setFilteredAlumni(filtered);
  };

  const clearFilters = () => {
    setFilters({
      graduationYear: '',
      major: '',
      company: '',
      location: '',
      mentorshipStatus: '',
      industry: ''
    });
    setSearchTerm('');
  };

  const getUniqueValues = (field) => {
    return [...new Set(alumni.map(person => person[field]))].filter(Boolean).sort();
  };

  if (loading) {
    return <DirectorySkeleton theme={theme} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Alumni Directory
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Connect with {filteredAlumni.length.toLocaleString()} alumni worldwide
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} theme={theme} />
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} theme={theme} />
        </div>
      </div>

      {/* Search and Filter Bar */}
      <SearchAndFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onClearFilters={clearFilters}
        getUniqueValues={getUniqueValues}
        theme={theme}
      />

      {/* Active Filters */}
      <ActiveFilters filters={filters} setFilters={setFilters} searchTerm={searchTerm} setSearchTerm={setSearchTerm} theme={theme} />

      {/* Directory Grid/List */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
      }`}>
        {filteredAlumni.map((person) => 
          viewMode === 'grid' ? (
            <AlumniCard 
              key={person.id} 
              alumnus={person} 
              onViewProfile={setSelectedAlumnus}
              theme={theme} 
            />
          ) : (
            <AlumniListItem 
              key={person.id} 
              alumnus={person} 
              onViewProfile={setSelectedAlumnus}
              theme={theme} 
            />
          )
        )}
      </div>

      {/* No Results */}
      {filteredAlumni.length === 0 && (
        <NoResults onClearFilters={clearFilters} theme={theme} />
      )}

      {/* Profile Modal */}
      {selectedAlumnus && (
        <AlumniProfileModal
          alumnus={selectedAlumnus}
          onClose={() => setSelectedAlumnus(null)}
          theme={theme}
        />
      )}
    </div>
  );
};

// Search and Filter Bar
const SearchAndFilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  filters, 
  setFilters, 
  showFilters, 
  setShowFilters,
  onClearFilters,
  getUniqueValues,
  theme 
}) => {
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
          <input
            type="text"
            placeholder="Search by name, company, title, or major..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${
            showFilters
              ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300'
              : theme === 'dark'
              ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          getUniqueValues={getUniqueValues}
          onClearFilters={onClearFilters}
          theme={theme}
        />
      )}
    </div>
  );
};

// Filter Panel
const FilterPanel = ({ filters, setFilters, getUniqueValues, onClearFilters, theme }) => {
  const updateFilter = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`p-6 rounded-lg border ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-medium ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Filter Alumni
        </h3>
        <button
          onClick={onClearFilters}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FilterSelect
          label="Graduation Year"
          value={filters.graduationYear}
          onChange={(value) => updateFilter('graduationYear', value)}
          options={getUniqueValues('graduationYear').map(year => ({ value: year, label: year }))}
          theme={theme}
        />
        
        <FilterSelect
          label="Major"
          value={filters.major}
          onChange={(value) => updateFilter('major', value)}
          options={getUniqueValues('major').map(major => ({ value: major, label: major }))}
          theme={theme}
        />
        
        <FilterSelect
          label="Company"
          value={filters.company}
          onChange={(value) => updateFilter('company', value)}
          options={getUniqueValues('company').map(company => ({ value: company, label: company }))}
          theme={theme}
        />
        
        <FilterSelect
          label="Industry"
          value={filters.industry}
          onChange={(value) => updateFilter('industry', value)}
          options={getUniqueValues('industry').map(industry => ({ value: industry, label: industry }))}
          theme={theme}
        />
        
        <FilterSelect
          label="Location"
          value={filters.location}
          onChange={(value) => updateFilter('location', value)}
          options={getUniqueValues('location').map(location => ({ value: location, label: location }))}
          theme={theme}
        />
        
        <FilterSelect
          label="Mentorship"
          value={filters.mentorshipStatus}
          onChange={(value) => updateFilter('mentorshipStatus', value)}
          options={[
            { value: 'Willing to mentor', label: 'Available as Mentor' },
            { value: 'Seeking mentorship', label: 'Seeking Mentorship' },
            { value: 'Not available', label: 'Not Available' }
          ]}
          theme={theme}
        />
      </div>
    </div>
  );
};

// Filter Select Component
const FilterSelect = ({ label, value, onChange, options, theme }) => {
  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-900'
        }`}
      >
        <option value="">All {label}s</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Active Filters Display
const ActiveFilters = ({ filters, setFilters, searchTerm, setSearchTerm, theme }) => {
  const activeFilters = Object.entries(filters).filter(([_, value]) => value);
  
  if (activeFilters.length === 0 && !searchTerm) return null;

  const removeFilter = (key) => {
    if (key === 'search') {
      setSearchTerm('');
    } else {
      setFilters(prev => ({ ...prev, [key]: '' }));
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {searchTerm && (
        <FilterTag
          label={`Search: "${searchTerm}"`}
          onRemove={() => removeFilter('search')}
          theme={theme}
        />
      )}
      {activeFilters.map(([key, value]) => (
        <FilterTag
          key={key}
          label={`${key.replace(/([A-Z])/g, ' $1').toLowerCase()}: ${value}`}
          onRemove={() => removeFilter(key)}
          theme={theme}
        />
      ))}
    </div>
  );
};

// Filter Tag Component
const FilterTag = ({ label, onRemove, theme }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
      theme === 'dark'
        ? 'bg-blue-900/30 text-blue-300 border border-blue-700'
        : 'bg-blue-50 text-blue-700 border border-blue-200'
    }`}>
      {label}
      <button
        onClick={onRemove}
        className="ml-2 hover:opacity-70"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
};

// View Toggle Component
const ViewToggle = ({ viewMode, setViewMode, theme }) => {
  return (
    <div className={`flex rounded-lg border ${
      theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
    }`}>
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-l-lg transition-colors ${
          viewMode === 'grid'
            ? 'bg-blue-600 text-white'
            : theme === 'dark'
            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <Grid className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-r-lg transition-colors ${
          viewMode === 'list'
            ? 'bg-blue-600 text-white'
            : theme === 'dark'
            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
};

// Sort Dropdown Component
const SortDropdown = ({ sortBy, setSortBy, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'graduationYear', label: 'Graduation Year' },
    { value: 'company', label: 'Company' },
    { value: 'location', label: 'Location' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <SortAsc className="w-4 h-4 mr-2" />
        Sort
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  sortBy === option.value
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Alumni Card Component (Grid View)
const AlumniCard = ({ alumnus, onViewProfile, theme }) => {
  return (
    <div className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-lg cursor-pointer ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}
    onClick={() => onViewProfile(alumnus)}
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={alumnus.avatar}
          alt={alumnus.name}
          className="w-20 h-20 rounded-full mb-4"
        />
        
        <h3 className={`text-lg font-semibold mb-1 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {alumnus.name}
        </h3>
        
        <p className={`text-sm mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {alumnus.title}
        </p>
        
        <p className={`text-sm mb-3 flex items-center ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Building className="w-4 h-4 mr-1" />
          {alumnus.company}
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center">
            <GraduationCap className="w-3 h-3 mr-1" />
            Class of {alumnus.graduationYear}
          </span>
          <span className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {alumnus.location.split(',')[0]}
          </span>
        </div>
        
        <div className="flex space-x-2 w-full">
          <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors">
            <MessageCircle className="w-4 h-4 mx-auto" />
          </button>
          <button className={`flex-1 py-2 px-3 rounded-md text-sm border transition-colors ${
            theme === 'dark'
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            <UserPlus className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Alumni List Item Component (List View)
const AlumniListItem = ({ alumnus, onViewProfile, theme }) => {
  return (
    <div className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}
    onClick={() => onViewProfile(alumnus)}
    >
      <div className="flex items-center space-x-4">
        <img
          src={alumnus.avatar}
          alt={alumnus.name}
          className="w-16 h-16 rounded-full flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {alumnus.name}
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {alumnus.title} at {alumnus.company}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </button>
              <button className={`py-2 px-4 rounded-md text-sm border transition-colors ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                <UserPlus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-1" />
              {alumnus.major} • Class of {alumnus.graduationYear}
            </span>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {alumnus.location}
            </span>
            <span className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              {alumnus.industry}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alumni Profile Modal
const AlumniProfileModal = ({ alumnus, onClose, theme }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-xl ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Alumni Profile
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={alumnus.avatar}
              alt={alumnus.name}
              className="w-32 h-32 rounded-full mx-auto sm:mx-0"
            />
            
            <div className="flex-1">
              <h3 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {alumnus.name}
              </h3>
              
              <p className={`text-lg mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {alumnus.title} at {alumnus.company}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-gray-400" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {alumnus.major} • {alumnus.graduationYear}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {alumnus.location}
                  </span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-gray-400" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {alumnus.industry}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-400" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {alumnus.connections} connections
                  </span>
                </div>
              </div>

              {/* Bio */}
              {alumnus.bio && (
                <div className="mb-6">
                  <h4 className={`font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    About
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {alumnus.bio}
                  </p>
                </div>
              )}

              {/* Skills */}
              {alumnus.skills && (
                <div className="mb-6">
                  <h4 className={`font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {alumnus.skills.map((skill, index) => (
                      <span key={index} className={`px-3 py-1 rounded-full text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Message
                </button>
                <button className={`flex-1 py-3 px-4 rounded-lg border transition-colors flex items-center justify-center ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Connect
                </button>
              </div>

              {/* Social Links */}
              {(alumnus.linkedin || alumnus.twitter) && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className={`font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Social Links
                  </h4>
                  <div className="flex space-x-3">
                    {alumnus.linkedin && (
                      <a
                        href={alumnus.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {alumnus.twitter && (
                      <a
                        href={alumnus.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// No Results Component
const NoResults = ({ onClearFilters, theme }) => {
  return (
    <div className={`text-center py-12 ${
      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
    }`}>
      <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
      <h3 className="text-lg font-medium mb-2">No alumni found</h3>
      <p className="mb-4">Try adjusting your search or filters to find more alumni.</p>
      <button
        onClick={onClearFilters}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
};

// Directory Skeleton Loading
const DirectorySkeleton = ({ theme }) => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className={`h-8 w-64 rounded mb-2 ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
        }`}></div>
        <div className={`h-4 w-48 rounded ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
        }`}></div>
      </div>
      
      {/* Search Bar Skeleton */}
      <div className={`h-12 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}></div>
      
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}></div>
            <div className={`h-4 rounded mb-2 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}></div>
            <div className={`h-3 rounded mb-2 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}></div>
            <div className={`h-3 rounded mb-4 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}></div>
            <div className="flex space-x-2">
              <div className={`flex-1 h-8 rounded ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
              <div className={`flex-1 h-8 rounded ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//our alumini

const myAlumniData = [
  {
    id: 1,
    name: 'Harsh Mishra', 
    avatar: 'https://imgs.search.brave.com/7tZkNX9nnJO9dpyWElc0atkppahz_fwb4tdZ5ghdej4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2hpa3NoYS53/cy9wd2EvcHVibGlj/L2ltYWdlcy9yZWVs/cy9hZG1pc3Npb25Q/cm9jZXNzLmpwZz92/PTE', // Unki photo ka URL
    title: 'Software Engineer', // Unka job title
    company: 'GLA University', // Unki company
    major: 'Computer Science and AIML ', // Unki padhai ki branch
    industry: 'Technology', // Kis industry mein kaam karte hain
    graduationYear: 2027,
    location: 'Mathura , UP', // Unka location
    mentorshipStatus: 'Willing to mentor', // Mentor karne ki sthiti
    connections:1090,
    bio: '🚀Pre Final Student @ GLA University | Research Scholar@ NIT JALANDHAR| ML Intern @ iNeuron.ai | Winner - CODE-A-VITA | Python | Java | C | 5🌟 HackerRank| 500+ Problems Solved @ Hyperskill | Web Developer |',
    skills: ['Java', 'Python', 'AWS', 'Machine Learning'],
    linkedin: 'https://www.linkedin.com/in/harsh-mishra-5a5031266/',
    twitter: null,
  },
  {
    id: 2,
    name: 'Nakul Upadhyay', // Doosre Alumnus ka naam
    avatar: 'https://imgs.search.brave.com/eyRY5uaiLGM5frGLLGO6FeKUxOITJRXh-mf56aSPzWY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2hvbWVw/YWdlLWZlYXR1cmUt/Y2FyZC9mb3Rvci0z/ZC1hdmF0YXIuanBn',
    title: 'Software Engineer',
    company: 'GLA',
    major: 'Computer Science',
    industry: 'Technology',
    graduationYear: 2027,
    location: 'GLA, Mathura',
    mentorshipStatus: 'Seeking mentorship',
    connections: 450,
    bio: 'Experienced in product strategy and user-centric design. Looking to connect with tech leaders.',
    skills: ['Product Management', 'Agile', 'JIRA', 'Market Research'],
    linkedin: 'https://www.linkedin.com/in/nakul-upadhyay-108319289/',
    twitter: 'https://twitter.com/priyaverma-example',
  },
  // Aap yahan aur alumni add kar sakte hain...
];

// Mock Data Generation
const generateMockAlumniData = () => {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'William', 'Jennifer', 'James', 'Mary', 'Christopher', 'Patricia', 'Daniel', 'Linda', 'Matthew', 'Elizabeth', 'Anthony', 'Barbara'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  
  const companies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'Spotify', 'Adobe', 'Salesforce', 'IBM', 'Oracle', 'Uber', 'Airbnb', 'LinkedIn', 'Twitter', 'Slack', 'Zoom', 'Dropbox', 'Square'];
  
  const majors = ['Computer Science', 'Business Administration', 'Engineering', 'Marketing', 'Finance', 'Psychology', 'Biology', 'Economics', 'Political Science', 'Communications', 'Mathematics', 'Physics', 'Chemistry', 'History', 'English'];
  
  const industries = ['Technology', 'Finance', 'Healthcare', 'Consulting', 'Media', 'Retail', 'Manufacturing', 'Education', 'Real Estate', 'Non-profit'];
  
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Los Angeles, CA', 'Chicago, IL', 'Boston, MA', 'Denver, CO', 'Atlanta, GA', 'Miami, FL'];
  
  const titles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Marketing Manager', 'Sales Director', 'UX Designer', 'Business Analyst', 'Project Manager', 'Consultant', 'VP of Engineering'];
  
  const skills = ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Machine Learning', 'Data Analysis', 'Project Management', 'Leadership', 'Marketing', 'Sales', 'Design', 'Strategy', 'Communication'];
  
  const mentorshipStatuses = ['Willing to mentor', 'Seeking mentorship', 'Not available'];

  return Array.from({ length: 150 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const graduationYear = 2010 + Math.floor(Math.random() * 15);
    
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=150&h=150&fit=crop&crop=face`,
      title: titles[Math.floor(Math.random() * titles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      major: majors[Math.floor(Math.random() * majors.length)],
      industry: industries[Math.floor(Math.random() * industries.length)],
      graduationYear,
      location: locations[Math.floor(Math.random() * locations.length)],
      mentorshipStatus: mentorshipStatuses[Math.floor(Math.random() * mentorshipStatuses.length)],
      connections: Math.floor(Math.random() * 500) + 50,
      bio: `Passionate ${titles[Math.floor(Math.random() * titles.length)].toLowerCase()} with ${Math.floor(Math.random() * 15) + 1} years of experience in ${industries[Math.floor(Math.random() * industries.length)].toLowerCase()}. Always excited to connect with fellow alumni and share insights about career growth.`,
      skills: Array.from(new Set(Array.from({ length: Math.floor(Math.random() * 5) + 3 }, () => skills[Math.floor(Math.random() * skills.length)]))),
      linkedin: Math.random() > 0.3 ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : null,
      twitter: Math.random() > 0.7 ? `https://twitter.com/${firstName.toLowerCase()}_${lastName.toLowerCase()}` : null
    };
  });
};

export default AlumniDirectory;