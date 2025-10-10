import React, { useState } from 'react';
import { 
  Plus,
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Image,
  Upload,
  Save,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Settings,
  BarChart3,
  FileText,
  Mail,
  X,
  AlertCircle,
  Check,
  Globe,
  Video,
  Building,
  Tag,
  Star,
  Target,
  TrendingUp
} from 'lucide-react';

// Main Event Creation Modal Component
const CreateEventModal = ({ onClose, onEventCreated, user, theme = 'light' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState({
    basicInfo: {
      title: '',
      description: '',
      category: 'networking',
      tags: []
    },
    dateTimeLocation: {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      timezone: 'America/New_York',
      isVirtual: false,
      location: '',
      virtualLink: ''
    },
    ticketingCapacity: {
      isFree: true,
      ticketPrice: 0,
      maxAttendees: '',
      allowWaitlist: true,
      registrationDeadline: ''
    },
    mediaSettings: {
      eventImage: null,
      imagePreview: null,
      allowPhotography: true,
      recordingPermission: false
    },
    additionalSettings: {
      requireApproval: false,
      sendReminders: true,
      allowCancellation: true,
      cancellationDeadline: 24,
      customFields: []
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Info', icon: FileText },
    { id: 2, title: 'Date & Location', icon: MapPin },
    { id: 3, title: 'Tickets & Capacity', icon: Users },
    { id: 4, title: 'Media & Settings', icon: Settings }
  ];

  const categories = [
    { id: 'networking', label: 'Networking', icon: Users, color: 'blue' },
    { id: 'career', label: 'Career Development', icon: TrendingUp, color: 'green' },
    { id: 'social', label: 'Social', icon: Star, color: 'purple' },
    { id: 'educational', label: 'Educational', icon: FileText, color: 'orange' },
    { id: 'fundraising', label: 'Fundraising', icon: Target, color: 'red' }
  ];

  const updateEventData = (section, field, value) => {
    setEventData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!eventData.basicInfo.title.trim()) newErrors.title = 'Event title is required';
      if (!eventData.basicInfo.description.trim()) newErrors.description = 'Event description is required';
    }

    if (step === 2) {
      if (!eventData.dateTimeLocation.startDate) newErrors.startDate = 'Start date is required';
      if (!eventData.dateTimeLocation.startTime) newErrors.startTime = 'Start time is required';
      if (!eventData.dateTimeLocation.isVirtual && !eventData.dateTimeLocation.location.trim()) {
        newErrors.location = 'Location is required for in-person events';
      }
      if (eventData.dateTimeLocation.isVirtual && !eventData.dateTimeLocation.virtualLink.trim()) {
        newErrors.virtualLink = 'Virtual meeting link is required';
      }
    }

    if (step === 3) {
      if (!eventData.ticketingCapacity.isFree && (!eventData.ticketingCapacity.ticketPrice || eventData.ticketingCapacity.ticketPrice <= 0)) {
        newErrors.ticketPrice = 'Valid ticket price is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newEvent = {
        id: Date.now(),
        ...eventData.basicInfo,
        ...eventData.dateTimeLocation,
        price: eventData.ticketingCapacity.isFree ? 0 : eventData.ticketingCapacity.ticketPrice,
        maxAttendees: parseInt(eventData.ticketingCapacity.maxAttendees) || null,
        attendeeCount: 0,
        isRegistered: false,
        isBookmarked: false,
        date: new Date(`${eventData.dateTimeLocation.startDate}T${eventData.dateTimeLocation.startTime}`).toISOString(),
        image: eventData.mediaSettings.imagePreview || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
        organizer: {
          name: user?.name || 'Event Organizer',
          title: 'Alumni Relations',
          email: user?.email || 'organizer@alumni.edu',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        createdAt: new Date().toISOString(),
        status: 'draft'
      };

      onEventCreated(newEvent);
      setCurrentStep(5); // Success step
    } catch (error) {
      setErrors({ general: 'Failed to create event. Please try again.' });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl shadow-xl ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Create New Event
              </h2>
              <p className={`text-sm mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Set up your alumni event with all the details
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Step Progress */}
          {currentStep < 5 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        currentStep >= step.id
                          ? 'bg-blue-600 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {currentStep > step.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <StepIcon className="w-4 h-4" />
                        )}
                      </div>
                      <span className={`ml-2 text-xs font-medium ${
                        currentStep >= step.id
                          ? 'text-blue-600 dark:text-blue-400'
                          : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`w-8 h-0.5 mx-4 ${
                          currentStep > step.id
                            ? 'bg-blue-600'
                            : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <BasicInfoStep
              data={eventData.basicInfo}
              categories={categories}
              onChange={(field, value) => updateEventData('basicInfo', field, value)}
              errors={errors}
              theme={theme}
            />
          )}

          {currentStep === 2 && (
            <DateTimeLocationStep
              data={eventData.dateTimeLocation}
              onChange={(field, value) => updateEventData('dateTimeLocation', field, value)}
              errors={errors}
              theme={theme}
            />
          )}

          {currentStep === 3 && (
            <TicketingCapacityStep
              data={eventData.ticketingCapacity}
              onChange={(field, value) => updateEventData('ticketingCapacity', field, value)}
              errors={errors}
              theme={theme}
            />
          )}

          {currentStep === 4 && (
            <MediaSettingsStep
              data={eventData.mediaSettings}
              additionalSettings={eventData.additionalSettings}
              onMediaChange={(field, value) => updateEventData('mediaSettings', field, value)}
              onSettingsChange={(field, value) => updateEventData('additionalSettings', field, value)}
              errors={errors}
              theme={theme}
            />
          )}

          {currentStep === 5 && (
            <EventCreatedSuccessStep
              eventData={eventData}
              onClose={onClose}
              theme={theme}
            />
          )}
        </div>

        {/* Footer Navigation */}
        {currentStep < 5 && (
          <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Step {currentStep} of {steps.length}
                </span>
                
                {currentStep < steps.length ? (
                  <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Event
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 1: Basic Information
const BasicInfoStep = ({ data, categories, onChange, errors, theme }) => {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      onChange('tags', [...data.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange('tags', data.tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Event Basic Information
        </h3>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Provide the essential details about your event
        </p>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Event Title *
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder="Enter a compelling event title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Event Description *
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder="Describe your event, its purpose, what attendees can expect, and any special highlights..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.description}
          </p>
        )}
        <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {data.description.length}/500 characters
        </p>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Event Category *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onChange('category', category.id)}
                className={`p-4 border-2 rounded-lg transition-all ${
                  data.category === category.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : theme === 'dark'
                    ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <CategoryIcon className={`w-5 h-5 mr-3 ${
                    data.category === category.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium ${
                    data.category === category.id
                      ? 'text-blue-700 dark:text-blue-300'
                      : theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    {category.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Event Tags (Optional)
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.tags.map((tag, index) => (
            <span key={index} className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 border border-gray-600'
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}>
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Add a tag and press Enter"
          />
          <button
            onClick={addTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Tag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 2: Date, Time & Location
const DateTimeLocationStep = ({ data, onChange, errors, theme }) => {
  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (EST/EDT)' },
    { value: 'America/Chicago', label: 'Central Time (CST/CDT)' },
    { value: 'America/Denver', label: 'Mountain Time (MST/MDT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PST/PDT)' },
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Date, Time & Location
        </h3>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Set when and where your event will take place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Start Date *
          </label>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => onChange('startDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.startDate}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Start Time *
          </label>
          <input
            type="time"
            value={data.startTime}
            onChange={(e) => onChange('startTime', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startTime
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
          {errors.startTime && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.startTime}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            End Date
          </label>
          <input
            type="date"
            value={data.endDate}
            onChange={(e) => onChange('endDate', e.target.value)}
            min={data.startDate || new Date().toISOString().split('T')[0]}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            End Time
          </label>
          <input
            type="time"
            value={data.endTime}
            onChange={(e) => onChange('endTime', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Timezone
        </label>
        <select
          value={data.timezone}
          onChange={(e) => onChange('timezone', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          {timezones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      {/* Event Type Toggle */}
      <div>
        <label className={`block text-sm font-medium mb-3 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Event Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onChange('isVirtual', false)}
            className={`p-4 border-2 rounded-lg transition-all ${
              !data.isVirtual
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : theme === 'dark'
                ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Building className={`w-5 h-5 mr-3 ${
                !data.isVirtual
                  ? 'text-blue-600 dark:text-blue-400'
                  : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span className={`font-medium ${
                !data.isVirtual
                  ? 'text-blue-700 dark:text-blue-300'
                  : theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                In-Person Event
              </span>
            </div>
          </button>

          <button
            onClick={() => onChange('isVirtual', true)}
            className={`p-4 border-2 rounded-lg transition-all ${
              data.isVirtual
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : theme === 'dark'
                ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Video className={`w-5 h-5 mr-3 ${
                data.isVirtual
                  ? 'text-blue-600 dark:text-blue-400'
                  : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span className={`font-medium ${
                data.isVirtual
                  ? 'text-blue-700 dark:text-blue-300'
                  : theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                Virtual Event
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Location or Virtual Link */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {data.isVirtual ? 'Virtual Meeting Link *' : 'Event Location *'}
        </label>
        <input
          type={data.isVirtual ? 'url' : 'text'}
          value={data.isVirtual ? data.virtualLink : data.location}
          onChange={(e) => onChange(data.isVirtual ? 'virtualLink' : 'location', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            (data.isVirtual ? errors.virtualLink : errors.location)
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder={data.isVirtual ? 'https://zoom.us/j/...' : 'Enter venue name and address'}
        />
        {(data.isVirtual ? errors.virtualLink : errors.location) && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {data.isVirtual ? errors.virtualLink : errors.location}
          </p>
        )}
      </div>
    </div>
  );
};

// Step 3: Ticketing & Capacity
const TicketingCapacityStep = ({ data, onChange, errors, theme }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Ticketing & Capacity
        </h3>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Configure pricing and attendance limits for your event
        </p>
      </div>

      {/* Free vs Paid Event */}
      <div>
        <label className={`block text-sm font-medium mb-3 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Event Pricing
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onChange('isFree', true)}
            className={`p-4 border-2 rounded-lg transition-all ${
              data.isFree
                ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                : theme === 'dark'
                ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                data.isFree
                  ? 'bg-green-100 dark:bg-green-800'
                  : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
              }`}>
                <span className={`text-2xl ${
                  data.isFree
                    ? 'text-green-600 dark:text-green-400'
                    : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  🎉
                </span>
              </div>
              <h4 className={`font-medium ${
                data.isFree
                  ? 'text-green-700 dark:text-green-300'
                  : theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                Free Event
              </h4>
              <p className={`text-sm mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No charge for attendees
              </p>
            </div>
          </button>

          <button
            onClick={() => onChange('isFree', false)}
            className={`p-4 border-2 rounded-lg transition-all ${
              !data.isFree
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : theme === 'dark'
                ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                !data.isFree
                  ? 'bg-blue-100 dark:bg-blue-800'
                  : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
              }`}>
                <DollarSign className={`w-6 h-6 ${
                  !data.isFree
                    ? 'text-blue-600 dark:text-blue-400'
                    : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <h4 className={`font-medium ${
                !data.isFree
                  ? 'text-blue-700 dark:text-blue-300'
                  : theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                Paid Event
              </h4>
              <p className={`text-sm mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Charge a ticket fee
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Ticket Price */}
      {!data.isFree && (
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Ticket Price (USD) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="number"
              value={data.ticketPrice}
              onChange={(e) => onChange('ticketPrice', parseFloat(e.target.value) || 0)}
              min="0"
              step="0.01"
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.ticketPrice
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="25.00"
            />
          </div>
          {errors.ticketPrice && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.ticketPrice}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Max Attendees */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Maximum Attendees
          </label>
          <input
            type="number"
            value={data.maxAttendees}
            onChange={(e) => onChange('maxAttendees', e.target.value)}
            min="1"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Leave empty for unlimited"
          />
        </div>

        {/* Registration Deadline */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Registration Deadline
          </label>
          <input
            type="date"
            value={data.registrationDeadline}
            onChange={(e) => onChange('registrationDeadline', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowWaitlist"
            checked={data.allowWaitlist}
            onChange={(e) => onChange('allowWaitlist', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="allowWaitlist" className={`ml-2 text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Enable waitlist when event is full
          </label>
        </div>
      </div>
    </div>
  );
};

// Step 4: Media & Settings
const MediaSettingsStep = ({ data, additionalSettings, onMediaChange, onSettingsChange, theme }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onMediaChange('imagePreview', e.target.result);
        onMediaChange('eventImage', file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Media & Settings
        </h3>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Upload event images and configure additional settings
        </p>
      </div>

      {/* Event Image */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Event Cover Image
        </label>
        <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
          theme === 'dark'
            ? 'border-gray-600 bg-gray-700'
            : 'border-gray-300 bg-gray-50'
        }`}>
          {data.imagePreview ? (
            <div className="space-y-4">
              <img
                src={data.imagePreview}
                alt="Event preview"
                className="mx-auto max-h-48 rounded-lg"
              />
              <button
                onClick={() => {
                  onMediaChange('imagePreview', null);
                  onMediaChange('eventImage', null);
                }}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div>
              <Upload className={`w-12 h-12 mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <p className={`text-lg font-medium mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                Upload Event Image
              </p>
              <p className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                PNG, JPG up to 5MB. Recommended size: 1200x630px
              </p>
              <label className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Event Settings */}
      <div className="space-y-4">
        <h4 className={`font-medium ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Event Settings
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Require Registration Approval
              </label>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Manually approve each registration
              </p>
            </div>
            <input
              type="checkbox"
              checked={additionalSettings.requireApproval}
              onChange={(e) => onSettingsChange('requireApproval', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Send Event Reminders
              </label>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Automatic email reminders to attendees
              </p>
            </div>
            <input
              type="checkbox"
              checked={additionalSettings.sendReminders}
              onChange={(e) => onSettingsChange('sendReminders', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Allow Photography
              </label>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Permit photos during the event
              </p>
            </div>
            <input
              type="checkbox"
              checked={data.allowPhotography}
              onChange={(e) => onMediaChange('allowPhotography', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Allow Cancellations
              </label>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Let attendees cancel their registration
              </p>
            </div>
            <input
              type="checkbox"
              checked={additionalSettings.allowCancellation}
              onChange={(e) => onSettingsChange('allowCancellation', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Cancellation Deadline */}
        {additionalSettings.allowCancellation && (
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Cancellation Deadline (hours before event)
            </label>
            <input
              type="number"
              value={additionalSettings.cancellationDeadline}
              onChange={(e) => onSettingsChange('cancellationDeadline', parseInt(e.target.value))}
              min="0"
              max="168"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Step 5: Success
const EventCreatedSuccessStep = ({ eventData, onClose, theme }) => {
  return (
    <div className="space-y-8 text-center py-8">
      <div>
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        
        <h3 className={`text-2xl font-bold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Event Created Successfully! 🎉
        </h3>
        
        <p className={`text-lg mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          "{eventData.basicInfo.title}" is ready to go live
        </p>
      </div>

      {/* Next Steps */}
      <div className={`p-6 rounded-lg text-left max-w-md mx-auto ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <h4 className={`font-semibold mb-4 text-center ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          What's Next?
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </div>
            <span className={`ml-3 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Preview and publish your event
            </span>
          </div>
          
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Share2 className="w-3 h-3 text-green-600 dark:text-green-400" />
            </div>
            <span className={`ml-3 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Share with your alumni network
            </span>
          </div>
          
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            </div>
            <span className={`ml-3 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Track registrations and engagement
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          <Eye className="w-5 h-5 mr-2" />
          Preview Event
        </button>
        
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
          <Share2 className="w-5 h-5 mr-2" />
          Publish & Share
        </button>
        
        <button 
          onClick={onClose}
          className={`px-8 py-3 rounded-lg border transition-colors ${
            theme === 'dark'
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Done
        </button>
      </div>
    </div>
  );
};

// Demo Component
const EventCreationDemo = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const demoUser = {
    name: 'Event Organizer',
    email: 'organizer@alumni.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };

  const handleEventCreated = (newEvent) => {
    console.log('New event created:', newEvent);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Event Creation System
          </h1>
          <p className="text-gray-600 mb-6">
            Complete 4-step event creation process with all features
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Event
          </button>
          
          <div className="mt-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Features:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Basic information & categories</li>
              <li>• Date, time & location settings</li>
              <li>• Pricing & capacity management</li>
              <li>• Media upload & event settings</li>
              <li>• Virtual & in-person support</li>
            </ul>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateEventModal
          user={demoUser}
          onClose={() => setShowCreateModal(false)}
          onEventCreated={handleEventCreated}
          theme="light"
        />
      )}
    </div>
  );
};

export default EventCreationDemo;