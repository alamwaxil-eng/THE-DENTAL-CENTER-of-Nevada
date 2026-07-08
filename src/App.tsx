/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Check, 
  ChevronRight, 
  User, 
  Mail, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  HeartHandshake, 
  Award, 
  Sparkles, 
  Menu, 
  X, 
  Stethoscope, 
  Sparkle, 
  BriefcaseMedical, 
  ShieldAlert, 
  Activity, 
  Smile, 
  Heart, 
  CheckCircle2, 
  Settings, 
  Filter,
  Eye,
  Trash2,
  CalendarCheck2
} from 'lucide-react';

// Use local image paths directly as strings to prevent TypeScript compilation errors
const lobbyHeroImg = '/src/assets/images/dental_hero_lobby_1783464188708.jpg';
const drSmithImg = '/src/assets/images/dental_dentist_dr_smith_1783464205298.jpg';

interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  message: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'canceled';
  createdAt: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  treatment: string;
  date: string;
  verified: boolean;
}

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Appointment Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Local state for interactive elements
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTreatmentExplorer, setSelectedTreatmentExplorer] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'default' | 'satellite' | 'clinic'>('default');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showStaffPortal, setShowStaffPortal] = useState(false);
  const [staffFilter, setStaffFilter] = useState<'all' | 'pending' | 'confirmed'>('all');

  // New review form state
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: '',
    treatment: 'Teeth Cleaning'
  });

  // Seed default appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('tcdn_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: '1',
        name: 'James Reynolds',
        phone: '(702) 555-0198',
        email: 'james.r@example.com',
        date: '2026-07-09',
        time: '10:00 AM',
        service: 'Teeth Cleaning',
        message: 'Looking forward to my routine cleaning with Dr. Smith.',
        status: 'confirmed',
        createdAt: '2026-07-07T10:00:00.000Z'
      },
      {
        id: '2',
        name: 'Maria Gonzalez',
        phone: '(702) 555-0241',
        email: 'maria.g@example.com',
        date: '2026-07-10',
        time: '02:30 PM',
        service: 'Cosmetic Dentistry',
        message: 'Interested in teeth whitening options.',
        status: 'pending',
        createdAt: '2026-07-07T11:30:00.000Z'
      }
    ];
  });

  // Seed default reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('tcdn_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'r1',
        name: 'Robert Vance',
        rating: 5,
        text: 'From the moment you make your appointment, the staff make you feel comfortable and welcome.',
        treatment: 'Teeth Cleaning',
        date: 'June 28, 2026',
        verified: true
      },
      {
        id: 'r2',
        name: 'Elena Rostova',
        rating: 5,
        text: 'The staff are very friendly and courteous. My dentist explains everything thoroughly. Best dental team in Las Vegas!',
        treatment: 'Dental Crowns',
        date: 'July 2, 2026',
        verified: true
      },
      {
        id: 'r3',
        name: 'Marcus Brody',
        rating: 5,
        text: 'Excellent customer service, attention to detail, and a very organized office. The pain-free freezing was fantastic.',
        treatment: 'Emergency Care',
        date: 'July 5, 2026',
        verified: true
      }
    ];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tcdn_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('tcdn_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Handle appointment submission
  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, email, date, time, service } = formData;
    
    if (!name || !phone || !email || !date || !time || !service) {
      setValidationError('Please fill in all required fields.');
      return;
    }

    setValidationError('');
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      phone,
      email,
      date,
      time,
      service,
      message: formData.message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setAppointments([newAppointment, ...appointments]);
    setFormSubmitted(true);
  };

  const resetAppointmentForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      service: '',
      message: ''
    });
    setFormSubmitted(false);
  };

  // Handle adding a review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const reviewObj: Review = {
      id: Math.random().toString(36).substring(2, 9),
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text,
      treatment: newReview.treatment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: false
    };

    setReviews([reviewObj, ...reviews]);
    setShowReviewModal(false);
    setNewReview({ name: '', rating: 5, text: '', treatment: 'Teeth Cleaning' });
  };

  // Staff action handlers
  const updateAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  // Service list with modern content
  const services = [
    {
      title: 'General Dentistry',
      shortDesc: 'Routine checkups, cleanings, and diagnostic digital imaging to maintain optimal health.',
      icon: Stethoscope,
      category: 'General',
      duration: '45-60 mins',
      longDesc: 'Our general dental services are designed to protect and preserve your natural smile. Dr. Smith and our expert hygienists perform thorough diagnostics, dental scaling, gum health analysis, and custom treatment planning. We utilize low-radiation digital x-rays to ensure the safest and most accurate diagnosis possible.'
    },
    {
      title: 'Preventive Dental Care',
      shortDesc: 'Stop cavities before they start with custom sealants, fluoride therapy, and screening.',
      icon: ShieldCheck,
      category: 'Preventive',
      duration: '30-45 mins',
      longDesc: 'Preventive care is the foundation of a lifelong healthy smile. We focus on active defense with pediatric and adult fluoride applications, high-durability dental sealants for groove protection, and early oral cancer screenings using advanced fluorescence visualization technology.'
    },
    {
      title: 'Teeth Cleaning',
      shortDesc: 'Professional scaling and polishing to remove stubborn plaque, tartar, and surface stains.',
      icon: Smile,
      category: 'General',
      duration: '45 mins',
      longDesc: 'Experience a sparkling-clean feeling with our clinical teeth polishing and scaling. Our team removes microscopic biofilm, calcified plaque, and dark coffee or nicotine stains using gentle ultrasonic cleanings. We finish with a therapeutic prophy-polish to leave your enamel smooth and glossy.'
    },
    {
      title: 'Dental Fillings',
      shortDesc: 'Premium composite, tooth-colored restorations that blend seamlessly with natural enamel.',
      icon: BriefcaseMedical,
      category: 'Restorative',
      duration: '30-60 mins',
      longDesc: 'We exclusively use BPA-free, biocompatible composite resins for our fillings. Unlike dark silver amalgams, composite restorations are matched exactly to your natural tooth shade, bond structurally to the enamel to prevent fracturing, and conserve as much of your healthy tooth structure as possible.'
    },
    {
      title: 'Crowns & Bridges',
      shortDesc: 'Durable, realistic porcelain restorations designed to protect and replace damaged teeth.',
      icon: Award,
      category: 'Restorative',
      duration: '60-90 mins (2 sessions)',
      longDesc: 'Restore fractured or missing teeth with our military-grade zirconia and porcelain-fused-to-metal crowns. A bridge can fill the gaps of missing teeth, anchoring firmly to neighboring teeth. Each restoration is custom-crafted by premium regional labs for an impeccable bite and beautiful symmetry.'
    },
    {
      title: 'Cosmetic Dentistry',
      shortDesc: 'Transformative smile makeovers focusing on alignment, shape harmony, and color.',
      icon: Sparkles,
      category: 'Cosmetic',
      duration: 'Varies',
      longDesc: 'A beautiful smile boosts confidence instantly. From minor contour modifications to complete digital smile design makeovers, we tailor every aesthetic enhancement to match your facial features, skin tone, and personal aesthetic goals.'
    },
    {
      title: 'Teeth Whitening',
      shortDesc: 'In-office clinical whitening and custom take-home trays for up to 8 shades of bright.',
      icon: Sparkle,
      category: 'Cosmetic',
      duration: '60 mins',
      longDesc: 'Say goodbye to stains and yellowing. Our professional whitening systems use activated clinical hydrogen peroxide gels coupled with comfortable cool-blue light arrays to lift years of deep discoloration safely and comfortably without triggering severe tooth sensitivity.'
    },
    {
      title: 'Dental Implants',
      shortDesc: 'The gold standard for permanent single or multi-tooth replacement with titanium roots.',
      icon: Activity,
      category: 'Restorative',
      duration: 'Varies',
      longDesc: 'Restore maximum chewing power and preserve your jawbone structure. Dental implants act as artificial titanium roots surgically integrated with the bone, topped with highly life-like porcelain crowns. They function, look, and feel exactly like strong, healthy natural teeth.'
    },
    {
      title: 'Veneers',
      shortDesc: 'Ultra-thin custom porcelain shells that correct spacing, chips, and deep staining.',
      icon: HeartHandshake,
      category: 'Cosmetic',
      duration: '2 sessions',
      longDesc: 'Achieve a flawless Hollywood smile with handcrafted laminate veneers. These microscopic porcelain shields are custom sculpted and chemically bonded to the front surface of your teeth, correcting slight misalignments, crooked shapes, chips, gaps, and severe internal enamel staining.'
    },
    {
      title: 'Root Canal Therapy',
      shortDesc: 'Pain-free, advanced endodontic treatment to save infected teeth and relieve severe pain.',
      icon: ShieldAlert,
      category: 'Restorative',
      duration: '60-90 mins',
      longDesc: 'Root canals do not cause pain—they relieve it! When the inner pulp of a tooth becomes inflamed or abscessed due to deep decay, our micro-endodontic procedures gently clear the infected tissue, sterilize the root canals, and seal the space to save the natural tooth from extraction.'
    },
    {
      title: 'Tooth Extractions',
      shortDesc: 'Safe, comfortable, and gentle extraction of unsalvageable or crowded teeth.',
      icon: Heart,
      category: 'General',
      duration: '30-45 mins',
      longDesc: 'We prioritize saving natural teeth, but when severe trauma, deep decay, or crowding makes a tooth unsalvageable, we perform gentle, atraumatic extractions. We use premium local anesthetics to ensure absolute comfort throughout the short procedure.'
    },
    {
      title: 'Emergency Dental Care',
      shortDesc: 'Immediate, same-day relief for toothaches, cracked teeth, lost crowns, or dental trauma.',
      icon: Activity,
      category: 'Emergency',
      duration: 'Immediate',
      longDesc: 'Dental emergencies require rapid, professional attention. We hold designated daily emergency blocks open in our schedule. Whether you are dealing with a severe abscess, a knocked-out tooth, sharp pain, or a broken filling, call us for immediate same-day evaluation.'
    }
  ];

  // Interactive Treatment Advisor options
  const treatmentScenarios = [
    {
      id: 'cleaning',
      question: '✨ Routine Maintenance',
      text: 'I want a professional cleaning, exam, and plaque removal.',
      suggestedService: 'Teeth Cleaning',
      badge: 'Preventive'
    },
    {
      id: 'pain',
      question: '🚨 Pain or Discomfort',
      text: 'I am experiencing a severe toothache, hot/cold sensitivity, or gum swelling.',
      suggestedService: 'Emergency Dental Care',
      badge: 'Urgent Action'
    },
    {
      id: 'whitening',
      question: '💎 Aesthetic Upgrade',
      text: 'I want a brighter, more aligned smile, and to address gaps or chips.',
      suggestedService: 'Teeth Whitening',
      badge: 'Cosmetic'
    },
    {
      id: 'missing',
      question: '🦷 Missing or Broken Teeth',
      text: 'I need to replace missing teeth or restore a cracked/decayed tooth.',
      suggestedService: 'Dental Implants',
      badge: 'Restorative'
    }
  ];

  // Scrolling utility
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-sky-100 selection:text-sky-900">
      
      {/* Sticky Header */}
      <header id="site-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('home')}>
              <div className="bg-sky-600 p-2.5 rounded-xl text-white shadow-md shadow-sky-100 flex items-center justify-center">
                <Smile className="h-6 w-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-none">
                  THE DENTAL CENTER
                </span>
                <span className="text-xs font-semibold text-sky-600 tracking-wider uppercase block mt-1">
                  of Nevada
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              <button onClick={() => scrollTo('home')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Home</button>
              <button onClick={() => scrollTo('services')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === 'services' ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Services</button>
              <button onClick={() => scrollTo('why-choose-us')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === 'why-choose-us' ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Why Us</button>
              <button onClick={() => scrollTo('about')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === 'about' ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>About Practice</button>
              <button onClick={() => scrollTo('reviews')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === 'reviews' ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Reviews</button>
              <button onClick={() => scrollTo('contact')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === 'contact' ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Contact</button>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setShowStaffPortal(!showStaffPortal)}
                className={`p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors relative group`}
                title="Staff Portal Demonstration"
              >
                <Settings className={`h-5 w-5 ${showStaffPortal ? 'text-sky-600 animate-spin-slow' : ''}`} />
                {appointments.filter(a => a.status === 'pending').length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
                {/* Tooltip */}
                <span className="absolute top-12 right-0 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                  Staff Workspace Demo
                </span>
              </button>
              
              <a 
                href="tel:7023851166" 
                className="flex items-center text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
              >
                <Phone className="h-4 w-4 mr-2 text-sky-600" />
                (702) 385-1166
              </a>

              <button 
                onClick={() => scrollTo('contact')} 
                className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-sky-100 transition-all hover:translate-y-[-1px]"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center space-x-2">
              <button 
                onClick={() => setShowStaffPortal(!showStaffPortal)}
                className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-6 space-y-3 shadow-lg">
            <button onClick={() => scrollTo('home')} className="w-full text-left py-3 px-4 rounded-xl font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Home</button>
            <button onClick={() => scrollTo('services')} className="w-full text-left py-3 px-4 rounded-xl font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Services</button>
            <button onClick={() => scrollTo('why-choose-us')} className="w-full text-left py-3 px-4 rounded-xl font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Why Choose Us</button>
            <button onClick={() => scrollTo('about')} className="w-full text-left py-3 px-4 rounded-xl font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">About Practice</button>
            <button onClick={() => scrollTo('reviews')} className="w-full text-left py-3 px-4 rounded-xl font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Reviews</button>
            <button onClick={() => scrollTo('contact')} className="w-full text-left py-3 px-4 rounded-xl font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Contact</button>
            
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <a 
                href="tel:7023851166" 
                className="flex items-center justify-center w-full bg-slate-100 text-slate-800 py-3 rounded-xl font-bold transition-colors"
              >
                <Phone className="h-4 w-4 mr-2 text-sky-600" />
                Call Now: (702) 385-1166
              </a>
              <button 
                onClick={() => scrollTo('contact')} 
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold shadow-md text-center transition-colors hover:bg-sky-700"
              >
                Request Appointment
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Staff Workspace Overlay Drawer */}
      {showStaffPortal && (
        <div id="staff-workspace" className="bg-slate-900 text-slate-100 border-b border-slate-800 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 bg-sky-500/20 text-sky-400 text-xs font-bold uppercase rounded tracking-wider">Demo Mode</span>
                  <h2 className="text-xl font-extrabold tracking-tight">Staff Workspace Panel</h2>
                </div>
                <p className="text-slate-400 text-sm mt-1">Real-time simulator. Review, approve or reschedule client appointment requests.</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                  <button 
                    onClick={() => setStaffFilter('all')} 
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${staffFilter === 'all' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    All ({appointments.length})
                  </button>
                  <button 
                    onClick={() => setStaffFilter('pending')} 
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${staffFilter === 'pending' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Pending ({appointments.filter(a => a.status === 'pending').length})
                  </button>
                  <button 
                    onClick={() => setStaffFilter('confirmed')} 
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${staffFilter === 'confirmed' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Confirmed ({appointments.filter(a => a.status === 'confirmed').length})
                  </button>
                </div>
                <button 
                  onClick={() => setShowStaffPortal(false)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Appointments Grid */}
            {appointments.length === 0 ? (
              <div className="text-center py-8 bg-slate-800/45 rounded-2xl border border-dashed border-slate-700">
                <Calendar className="mx-auto h-8 w-8 text-slate-500 mb-2" />
                <p className="text-slate-400">No appointments submitted yet. Try filling out the contact form below!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments
                  .filter(app => {
                    if (staffFilter === 'pending') return app.status === 'pending';
                    if (staffFilter === 'confirmed') return app.status === 'confirmed';
                    return true;
                  })
                  .map(app => (
                    <div key={app.id} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-600 transition-all">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-100 text-lg">{app.name}</h4>
                            <span className="text-xs text-slate-400 block mt-0.5">Submitted: {new Date(app.createdAt).toLocaleDateString()}</span>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                            app.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            app.status === 'canceled' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                            'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {app.status}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="mt-4 space-y-2 text-sm text-slate-300 border-t border-slate-700/60 pt-3">
                          <div className="flex items-center">
                            <Phone className="h-3.5 w-3.5 text-sky-400 mr-2 shrink-0" />
                            <span>{app.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-3.5 w-3.5 text-sky-400 mr-2 shrink-0" />
                            <span className="truncate">{app.email}</span>
                          </div>
                          <div className="flex items-center">
                            <CalendarCheck2 className="h-3.5 w-3.5 text-emerald-400 mr-2 shrink-0" />
                            <span className="font-medium text-white">{app.date} at {app.time}</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-3.5 w-3.5 text-indigo-400 mr-2 shrink-0" />
                            <span className="bg-indigo-950/60 px-2 py-0.5 rounded text-indigo-300 font-medium text-xs">{app.service}</span>
                          </div>
                          {app.message && (
                            <div className="mt-3 bg-slate-900/40 p-2.5 rounded-lg border border-slate-700/30">
                              <span className="text-xs text-slate-400 font-semibold block mb-0.5">Patient Note:</span>
                              <p className="text-xs italic text-slate-300 leading-relaxed">"{app.message}"</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between space-x-2">
                        <button 
                          onClick={() => deleteAppointment(app.id)}
                          className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors hover:text-rose-300"
                          title="Delete Request"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="flex space-x-1.5">
                          {app.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => updateAppointmentStatus(app.id, 'canceled')}
                                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
                              >
                                Decline
                              </button>
                              <button 
                                onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-sky-900/20"
                              >
                                Approve Slot
                              </button>
                            </>
                          )}
                          {app.status === 'confirmed' && (
                            <button 
                              onClick={() => updateAppointmentStatus(app.id, 'pending')}
                              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                            >
                              Move back to Pending
                            </button>
                          )}
                          {app.status === 'canceled' && (
                            <button 
                              onClick={() => updateAppointmentStatus(app.id, 'pending')}
                              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                            >
                              Restore Request
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50/30 to-white pt-10 pb-20 md:py-28">
        
        {/* Decorative ambient background spots */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Column 1: Copy & Call-to-actions */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              
              {/* Patient Badge */}
              <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-100/80 px-4 py-2 rounded-full text-sky-700">
                <Sparkles className="h-4 w-4 animate-pulse text-sky-500" />
                <span className="text-xs font-bold tracking-wider uppercase">Now Accepting New Patients</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  Healthy Smiles <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">Start Here</span>
                </h1>
                <p className="text-lg font-bold text-sky-800 tracking-wide uppercase">
                  Trusted Family & Cosmetic Dentistry in Las Vegas
                </p>
                <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Providing compassionate, high-quality dental care in a comfortable environment for patients of all ages. From teeth cleanings to advanced dental implants, your comfort is our absolute priority.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => scrollTo('contact')}
                  className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-sky-200 transition-all hover:scale-[1.02] hover:translate-y-[-1px] cursor-pointer flex items-center justify-center"
                >
                  Book an Appointment
                  <ChevronRight className="h-5 w-5 ml-2" />
                </button>
                <a 
                  href="tel:7023851166"
                  className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-800 hover:border-sky-600 hover:text-sky-600 font-extrabold px-8 py-4 rounded-2xl transition-all flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-3 text-sky-600 animate-bounce-slow" />
                  Call Now: (702) 385-1166
                </a>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 max-w-md mx-auto lg:mx-0">
                <div>
                  <span className="block text-2xl font-black text-slate-900">4.8★</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">330+ Patients</span>
                </div>
                <div className="border-x border-slate-100">
                  <span className="block text-2xl font-black text-slate-900">Same-Day</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Emergency Care</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-slate-900">100%</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Digital Safety</span>
                </div>
              </div>

            </div>

            {/* Column 2: Large Styled Lobby Image */}
            <div className="lg:col-span-6 relative flex justify-center">
              
              {/* Backing stylized frames */}
              <div className="absolute -inset-4 bg-sky-200/30 rounded-[2.5rem] blur-xl transform rotate-3 -z-10"></div>
              <div className="absolute inset-0 bg-blue-100/20 rounded-[2rem] transform -rotate-2 -z-10"></div>

              {/* Image Container with floating cards */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl max-w-md lg:max-w-full">
                <img 
                  src={lobbyHeroImg} 
                  alt="The Dental Center of Nevada modern welcoming lobby" 
                  className="w-full h-[400px] lg:h-[480px] object-cover hover:scale-[1.03] transition-transform duration-700"
                />

                {/* Rating floating overlay */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-sky-100 max-w-xs flex items-center space-x-3.5">
                  <div className="bg-sky-500 p-2 rounded-xl text-white">
                    <Star className="h-5 w-5 fill-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-extrabold text-slate-950">4.8 / 5.0</span>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold block leading-tight">Patient Satistaction Score</span>
                  </div>
                </div>

                {/* Digital office overlay */}
                <div className="absolute top-6 right-6 bg-sky-900/90 backdrop-blur-sm px-4 py-2 rounded-xl text-white border border-white/10 text-xs font-bold tracking-wider uppercase">
                  ✨ Las Vegas, NV
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Interactive Treatment Explorer Selector */}
      <section className="bg-white border-y border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50/50 rounded-3xl p-6 sm:p-10 border border-sky-100/50">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-2">Smart Treatment Advisor</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">What are you looking for today?</h3>
              <p className="text-slate-600 text-sm sm:text-base mt-2">Select a scenario below to find the perfect service option and prepare your appointment request.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {treatmentScenarios.map((scenario) => (
                <div 
                  key={scenario.id}
                  onClick={() => {
                    setSelectedTreatmentExplorer(scenario.id);
                    // Automatically scroll to services and select it, or alert
                    const targetSvc = services.find(s => s.title === scenario.suggestedService);
                    if (targetSvc) {
                      setSelectedService(targetSvc.title);
                      // Update form default service
                      setFormData(prev => ({ ...prev, service: targetSvc.title }));
                    }
                  }}
                  className={`cursor-pointer p-5 rounded-2xl transition-all border ${
                    selectedTreatmentExplorer === scenario.id 
                      ? 'bg-white border-sky-500 shadow-lg shadow-sky-100/50 scale-[1.02]' 
                      : 'bg-white/60 hover:bg-white border-slate-200/60 hover:border-sky-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2.5 py-0.5 bg-sky-50 text-sky-700 text-xs font-bold rounded-full">{scenario.badge}</span>
                    {selectedTreatmentExplorer === scenario.id && <Check className="h-4 w-4 text-sky-600 font-extrabold" />}
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{scenario.question}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{scenario.text}</p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-sky-600">
                    <span>Explore {scenario.suggestedService}</span>
                    <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </div>
                </div>
              ))}
            </div>

            {selectedTreatmentExplorer && (
              <div className="mt-8 bg-white p-5 rounded-2xl border border-sky-100 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">RECOMMENDED SERVICE</span>
                  <h5 className="font-extrabold text-slate-900 text-lg mt-0.5">
                    {treatmentScenarios.find(s => s.id === selectedTreatmentExplorer)?.suggestedService}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">We have locked in this selection in the appointment scheduler below.</p>
                </div>
                <button 
                  onClick={() => {
                    scrollTo('contact');
                  }}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md shadow-sky-100 transition-colors shrink-0"
                >
                  Book with this recommendation
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-2">The Difference</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Why Patients Choose Us</h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4">We are dedicated to redesigning the dental experience. From gentle care techniques to high-end dental technologies, we cover all parameters of comfort.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Trait 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all group">
              <div className="bg-sky-50 text-sky-600 h-14 w-14 rounded-2xl flex items-center justify-center mb-6 font-extrabold text-2xl group-hover:bg-sky-600 group-hover:text-white transition-all">
                🦷
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Experienced Dental Team</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Led by skilled clinicians with decades of combined training, dedicated to staying abreast of advanced methodologies and materials.
              </p>
            </div>

            {/* Trait 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all group">
              <div className="bg-emerald-50 text-emerald-600 h-14 w-14 rounded-2xl flex items-center justify-center mb-6 font-extrabold text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                😊
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gentle & Comfortable Care</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We understand dental anxieties. Our cozy clinical rooms, warm blankets, and ultra-gentle injection techniques guarantee relaxation.
              </p>
            </div>

            {/* Trait 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all group">
              <div className="bg-amber-50 text-amber-600 h-14 w-14 rounded-2xl flex items-center justify-center mb-6 font-extrabold text-2xl group-hover:bg-amber-600 group-hover:text-white transition-all">
                ⭐
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">4.8-Star Rated Experience</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Over 330 verified local patients trust us with their families. Check out our rave reviews emphasizing our thoroughness and customer service.
              </p>
            </div>

            {/* Trait 4 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all group">
              <div className="bg-rose-50 text-rose-600 h-14 w-14 rounded-2xl flex items-center justify-center mb-6 font-extrabold text-2xl group-hover:bg-rose-600 group-hover:text-white transition-all">
                📅
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Same-Day Emergencies</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sudden cracked enamel or toothache? We offer reserved daily emergency slots so you never have to navigate excruciating dental pain alone.
              </p>
            </div>

            {/* Trait 5 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all group">
              <div className="bg-indigo-50 text-indigo-600 h-14 w-14 rounded-2xl flex items-center justify-center mb-6 font-extrabold text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                🏥
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Modern Dental Tech</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Equipped with low-radiation digital x-rays, ergonomic motorized chairs, intraoral HD cameras, and gentle ultrasonic scalers for high-precision treatment.
              </p>
            </div>

            {/* Trait 6 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all group">
              <div className="bg-sky-50 text-sky-600 h-14 w-14 rounded-2xl flex items-center justify-center mb-6 font-extrabold text-2xl group-hover:bg-sky-600 group-hover:text-white transition-all">
                💙
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized Treatment Plans</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No standardized, cookie-cutter quotas. We listen closely, detail all paths clearly, and proceed only with treatments aligned with your health.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-xl">
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-2">Our Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Full-Scope Professional Dental Care</h2>
              <p className="text-slate-600 mt-4 text-sm sm:text-base">We provide premium general, restorative, preventative, and cosmetic dental services in our state-of-the-art Las Vegas clinic.</p>
            </div>
            <div className="mt-6 md:mt-0">
              <button 
                onClick={() => setSelectedService(null)}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 underline uppercase tracking-wider"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComp = service.icon;
              const isSelected = selectedService === service.title;
              return (
                <div 
                  key={index} 
                  onClick={() => setSelectedService(isSelected ? null : service.title)}
                  className={`cursor-pointer group flex flex-col justify-between p-6 rounded-2xl transition-all border ${
                    isSelected 
                      ? 'bg-gradient-to-br from-sky-600 to-blue-700 text-white border-sky-600 scale-[1.02] shadow-xl shadow-sky-100' 
                      : 'bg-slate-50 hover:bg-white border-slate-100 hover:border-sky-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-sky-50 text-sky-600'
                      } transition-colors`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-600'
                      }`}>
                        {service.category}
                      </span>
                    </div>

                    <h3 className={`font-bold text-base mb-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center justify-between text-[11px] font-bold">
                    <span className={isSelected ? 'text-sky-200' : 'text-slate-400'}>
                      Duration: {service.duration}
                    </span>
                    <span className={`flex items-center ${isSelected ? 'text-white' : 'text-sky-600'}`}>
                      {isSelected ? 'Hide Details' : 'Details'}
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </span>
                  </div>

                  {/* Expanded Detailed Copy Panel */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-white/20 text-xs text-sky-50 leading-relaxed animate-fadeIn">
                      <p>{service.longDesc}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, service: service.title }));
                          scrollTo('contact');
                        }}
                        className="mt-4 w-full bg-white text-sky-700 hover:bg-sky-50 py-2 rounded-xl text-center font-bold text-xs transition-colors"
                      >
                        Select this service & Book
                      </button>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* About Our Practice Section */}
      <section id="about" className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Dr. Smith Photo Side */}
            <div className="lg:col-span-5 relative flex justify-center lg:order-last">
              
              <div className="absolute -inset-4 bg-sky-200/30 rounded-[2.5rem] blur-xl transform -rotate-3 -z-10"></div>
              
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl max-w-sm lg:max-w-full">
                <img 
                  src={drSmithImg} 
                  alt="Dr. Sarah Smith, DDS - The Dental Center of Nevada lead dentist" 
                  className="w-full h-[450px] object-cover hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Info Overlay Tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-sky-100 text-center">
                  <span className="text-xs font-black text-sky-600 tracking-widest uppercase block">Lead Dentist</span>
                  <h4 className="font-extrabold text-slate-900 text-lg mt-0.5">Dr. Sarah Smith, DDS</h4>
                  <p className="text-xs text-slate-500 font-medium">Doctor of Dental Surgery, UNLV School of Dental Medicine</p>
                </div>
              </div>

            </div>

            {/* Copy Side */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-2">About Our Practice</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Providing Compassionate & Professional Care
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  At <strong className="text-slate-900">The Dental Center of Nevada</strong>, we believe every patient deserves exceptional dental care delivered with profound compassion and clinical professionalism. Our experienced, patient-centric team is committed to creating healthy, confident smiles using cutting-edge equipment and highly personalized treatment pathways.
                </p>
                <p>
                  Whether you're visiting for a simple routine hygienist cleaning, or looking to undergo a complete cosmetic smile transformation with porcelain veneers, we are here to make every single step of your appointment completely comfortable, anxiety-free, and straightforward.
                </p>
                <p>
                  Our modern medical suites are fully computerized and equipped with high-resolution imaging that allows us to walk you through your diagnostics on high-definition screens. We do not believe in hiding clinical findings—we empower you to play an active role in choosing the treatment that best aligns with your goals and budget.
                </p>
              </div>

              {/* Bullet checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <div className="flex items-center text-slate-800 text-sm font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-sky-500 mr-2.5 shrink-0" />
                  <span>Fully Digital Diagnostics & Low X-Ray</span>
                </div>
                <div className="flex items-center text-slate-800 text-sm font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-sky-500 mr-2.5 shrink-0" />
                  <span>Strict Autoclave & OSHA Sterilization</span>
                </div>
                <div className="flex items-center text-slate-800 text-sm font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-sky-500 mr-2.5 shrink-0" />
                  <span>State Dental Board Registered Clinicians</span>
                </div>
                <div className="flex items-center text-slate-800 text-sm font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-sky-500 mr-2.5 shrink-0" />
                  <span>Comfort Blankets & Noise-Cancelling</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <button 
                  onClick={() => scrollTo('contact')}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md hover:translate-y-[-1px]"
                >
                  Meet Dr. Smith & Schedule
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="max-w-xl">
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-2">Patient Voices</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Rave Reviews From Our Families</h2>
              <p className="text-slate-600 mt-4 text-sm sm:text-base">We strive to render every dental visit therapeutic and premium. Here are stories from our actual verified dental patients in Las Vegas.</p>
            </div>
            <div className="mt-6 md:mt-0 shrink-0">
              <button 
                onClick={() => setShowReviewModal(true)}
                className="bg-sky-50 text-sky-700 hover:bg-sky-100 px-5 py-3 rounded-xl text-sm font-extrabold border border-sky-200/50 transition-colors"
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg hover:border-sky-100 transition-all">
                <div>
                  {/* Rating stars */}
                  <div className="flex items-center space-x-1 text-amber-500 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-amber-500" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="mt-6 pt-5 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">{review.name}</span>
                    <span className="text-[10px] bg-slate-200/60 text-slate-600 px-2 py-0.5 rounded-full font-semibold inline-block mt-1">
                      {review.treatment}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-medium block">{review.date}</span>
                    {review.verified && (
                      <span className="text-[9px] text-emerald-600 font-extrabold uppercase tracking-wide">
                        ✓ Verified Patient
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick write-up call */}
          <div className="mt-12 bg-sky-50/50 border border-sky-100/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto text-center sm:text-left">
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Are you a current patient of The Dental Center of Nevada?</h4>
              <p className="text-xs text-slate-500 mt-1">We would love to hear your story. Your clinical feedback helps us preserve premium healthcare standards.</p>
            </div>
            <button 
              onClick={() => setShowReviewModal(true)}
              className="mt-4 sm:mt-0 text-xs font-bold text-sky-600 hover:text-sky-800 underline uppercase tracking-widest shrink-0"
            >
              Share your story
            </button>
          </div>

        </div>
      </section>

      {/* Review Modal Form Dialog */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Write a Patient Review</h3>
                <p className="text-xs text-slate-500 mt-0.5">Share your real-time experience with our dental team.</p>
              </div>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Sarah Connor"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white px-4 py-2.5 rounded-xl text-sm transition-colors outline-none"
                />
              </div>

              {/* Treatment Selected */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Treatment Received</label>
                <select 
                  value={newReview.treatment}
                  onChange={(e) => setNewReview({ ...newReview, treatment: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white px-4 py-2.5 rounded-xl text-sm transition-colors outline-none cursor-pointer"
                >
                  {services.map((s, idx) => (
                    <option key={idx} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              {/* Star Rating Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      type="button"
                      key={stars}
                      onClick={() => setNewReview({ ...newReview, rating: stars })}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`h-6 w-6 ${newReview.rating >= stars ? 'fill-amber-500' : 'text-slate-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs text-slate-500 font-bold ml-2">({newReview.rating} of 5 Stars)</span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Review Feedback</label>
                <textarea 
                  required
                  rows={4}
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Tell us what you liked about your visit..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white px-4 py-2.5 rounded-xl text-sm transition-colors outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-sky-100 transition-colors"
                >
                  Submit Review
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Office Information, Directions & Map Component */}
      <section id="office-info" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Office Info Card */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-2">Office Information</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Come Visit Us in Las Vegas
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-4">We are conveniently located on S Rancho Dr, offering generous free clinical parking and wheelchair accessible ground-floor entry.</p>
              </div>

              {/* Details List */}
              <div className="space-y-6">
                
                {/* Contact: Address */}
                <div className="flex items-start">
                  <div className="bg-sky-50 border border-sky-100 text-sky-600 p-3 rounded-xl mr-4 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-950 text-base">The Dental Center of Nevada</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      601 S Rancho Dr, Suite B-15 <br />
                      Las Vegas, NV 89106
                    </p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=The+Dental+Center+of+Nevada+601+S+Rancho+Dr+Suite+B-15+Las+Vegas+NV+89106" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:text-sky-800 font-bold text-xs underline inline-block mt-2"
                    >
                      Get Directions via Google Maps
                    </a>
                  </div>
                </div>

                {/* Contact: Phone */}
                <div className="flex items-start">
                  <div className="bg-sky-50 border border-sky-100 text-sky-600 p-3 rounded-xl mr-4 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-950 text-base">Telephone Helpline</h4>
                    <a href="tel:7023851166" className="text-slate-600 hover:text-sky-600 text-sm font-semibold mt-1 block">
                      (702) 385-1166
                    </a>
                    <span className="text-xs text-slate-400 block mt-1">Call us for fast emergency appointment advice</span>
                  </div>
                </div>

                {/* Contact: Business Hours */}
                <div className="flex items-start">
                  <div className="bg-sky-50 border border-sky-100 text-sky-600 p-3 rounded-xl mr-4 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-950 text-base">Business Hours</h4>
                    <div className="grid grid-cols-2 gap-x-6 text-sm text-slate-600 mt-2">
                      <div>
                        <span className="font-semibold text-slate-800">Monday – Friday</span>
                        <span className="block text-xs text-slate-500">9:00 AM – 6:00 PM</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">Saturday & Sunday</span>
                        <span className="block text-xs text-slate-500">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Vector Map Side */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-[2rem] p-4 shadow-xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></span>
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Live Clinic Locator</span>
                  </div>
                  <div className="flex bg-slate-100 rounded-lg p-0.5 text-[10px] font-bold border border-slate-200/50">
                    <button 
                      onClick={() => setMapType('default')}
                      className={`px-3 py-1 rounded-md transition-colors ${mapType === 'default' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500'}`}
                    >
                      Map Style
                    </button>
                    <button 
                      onClick={() => setMapType('satellite')}
                      className={`px-3 py-1 rounded-md transition-colors ${mapType === 'satellite' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500'}`}
                    >
                      Satellite
                    </button>
                    <button 
                      onClick={() => setMapType('clinic')}
                      className={`px-3 py-1 rounded-md transition-colors ${mapType === 'clinic' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500'}`}
                    >
                      Clinic Layout
                    </button>
                  </div>
                </div>

                {/* Map Graphics Canvas Mock */}
                <div className="relative h-[340px] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  
                  {mapType === 'default' && (
                    <div className="absolute inset-0 bg-[#e5e9f0] p-4 flex flex-col justify-between select-none">
                      {/* Grid representation */}
                      <div className="w-full h-full relative overflow-hidden bg-[#f0f4f8] border border-slate-300 rounded-xl">
                        
                        {/* Major roads */}
                        <div className="absolute top-1/2 left-0 right-0 h-10 bg-white border-y border-slate-300 transform -rotate-6 flex items-center pl-10 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                          S Rancho Dr
                        </div>
                        <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-white border-x border-slate-300 transform rotate-12 flex items-end justify-center pb-8 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                          Alta Dr
                        </div>

                        {/* Surrounding blocks */}
                        <div className="absolute top-8 right-12 bg-white/60 p-2 text-[10px] rounded border border-slate-300 font-semibold text-slate-500">
                          Rancho Plaza Shopping Center
                        </div>
                        <div className="absolute bottom-10 left-10 bg-slate-200/50 p-2 text-[10px] rounded border border-slate-300 font-semibold text-slate-400">
                          Lorenzi Park (North)
                        </div>

                        {/* Clinic Marker Pin */}
                        <div className="absolute top-[45%] left-[54%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          {/* Pulsing glow ring */}
                          <div className="absolute top-1 w-10 h-10 bg-sky-500/20 rounded-full animate-ping"></div>
                          
                          {/* Map Pin */}
                          <div className="relative bg-sky-600 text-white p-2.5 rounded-full shadow-lg border-2 border-white cursor-pointer z-10 flex items-center justify-center">
                            <Smile className="h-5 w-5" />
                          </div>
                          
                          {/* Label Box */}
                          <div className="mt-2 bg-slate-900 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg shadow-xl tracking-wider text-center whitespace-nowrap border border-slate-700">
                            The Dental Center of Nevada
                            <span className="block text-[8px] text-sky-400 font-bold mt-0.5">Suite B-15</span>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-3 right-3 bg-white px-2.5 py-1 rounded border border-slate-300 text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">
                          Scale: 1 : 150m
                        </div>
                      </div>
                    </div>
                  )}

                  {mapType === 'satellite' && (
                    <div className="absolute inset-0 bg-slate-950 p-4 flex flex-col justify-between select-none">
                      <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-teal-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-xl">
                        
                        {/* Map Lines Overlay */}
                        <div className="absolute top-1/2 left-0 right-0 h-10 bg-white/5 border-y border-white/10 transform -rotate-6"></div>
                        <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-white/5 border-x border-white/10 transform rotate-12"></div>

                        {/* High altitude thermal / color blobs */}
                        <div className="absolute top-8 right-12 bg-emerald-950/40 p-2 text-[10px] rounded border border-white/10 text-emerald-400 font-semibold">
                          Building Blocks View
                        </div>

                        {/* Pin */}
                        <div className="absolute top-[45%] left-[54%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          <div className="absolute top-1 w-10 h-10 bg-emerald-500/20 rounded-full animate-ping"></div>
                          <div className="relative bg-emerald-600 text-white p-2.5 rounded-full shadow-lg border-2 border-white cursor-pointer z-10">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div className="mt-2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xl text-center border border-slate-700">
                            Clinical Parking & Entry
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white/80 px-2 py-1 rounded border border-slate-700 text-[8px] font-bold">
                          SATELLITE ORBIT ID: NV-902
                        </div>
                      </div>
                    </div>
                  )}

                  {mapType === 'clinic' && (
                    <div className="absolute inset-0 bg-[#f8fafc] p-4 flex flex-col justify-between select-none">
                      <div className="w-full h-full relative overflow-hidden bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                        
                        {/* Blueprint grid */}
                        <div className="grid grid-cols-3 gap-3 h-full">
                          
                          {/* Suite compartments */}
                          <div className="border border-sky-100 rounded-xl p-3 bg-sky-50/20 flex flex-col justify-between">
                            <span className="text-[9px] font-black text-sky-600 block uppercase">Suite B-15 Lobby</span>
                            <span className="text-[8px] text-slate-400">Welcoming waiting room, soft seating, check-in kiosk.</span>
                          </div>

                          <div className="border border-indigo-100 rounded-xl p-3 bg-indigo-50/20 flex flex-col justify-between">
                            <span className="text-[9px] font-black text-indigo-600 block uppercase">Operatory 1 & 2</span>
                            <span className="text-[8px] text-slate-400">Digital dental suites, motorized chairs, HD x-ray sensors.</span>
                          </div>

                          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between">
                            <span className="text-[9px] font-black text-slate-600 block uppercase">Sanitation & Lab</span>
                            <span className="text-[8px] text-slate-400">Ultraviolet sterilizer, autoclave, dental modeling.</span>
                          </div>

                        </div>

                        <div className="text-center mt-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          Clinical Floor Map — Clean, Safe Environment
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer bar of map widget */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                  <span className="font-medium text-slate-600">601 S Rancho Dr Suite B-15, Las Vegas, NV</span>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=The+Dental+Center+of+Nevada+601+S+Rancho+Dr+Suite+B-15+Las+Vegas+NV+89106" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-bold shadow-md shadow-sky-100 transition-colors w-full sm:w-auto text-center"
                  >
                    Open Google Maps
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Online Appointment Request & Contact Form */}
      <section id="contact" className="py-20 bg-white relative">
        
        {/* Visual Background Glows */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-50 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-2">Patient Intake</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Request an Appointment</h2>
              <p className="text-slate-600 text-sm mt-3">
                Complete the brief medical intake form below. Our administrative coordinator will call you to confirm your exact session time slot.
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-12 px-4 space-y-6 animate-scaleUp">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Appointment Request Received!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our clinical scheduler is reviewing slots for <strong className="text-slate-900">{formData.date}</strong> and will call you at <strong className="text-slate-900">{formData.phone}</strong> within 2 hours.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 max-w-sm mx-auto flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      setShowStaffPortal(true);
                      scrollTo('site-header');
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold px-5 py-3 rounded-xl transition-all"
                  >
                    View submitted list (Staff Workspace Demo)
                  </button>
                  <button 
                    onClick={resetAppointmentForm}
                    className="text-xs text-sky-600 hover:text-sky-800 underline font-semibold"
                  >
                    Submit another booking request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                
                {validationError && (
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center text-rose-800 text-xs font-semibold">
                    <ShieldAlert className="h-5 w-5 mr-3 text-rose-500 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Patient Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Robert Reynolds"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white pl-11 pr-4 py-3.5 rounded-2xl text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. (702) 385-1166"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white pl-11 pr-4 py-3.5 rounded-2xl text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. robert@example.com"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white pl-11 pr-4 py-3.5 rounded-2xl text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Service Needed *</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white px-4 py-3.5 rounded-2xl text-sm transition-all outline-none cursor-pointer appearance-none"
                      >
                        <option value="">-- Choose Dental Service --</option>
                        {services.map((svc, idx) => (
                          <option key={idx} value={svc.title}>{svc.title}</option>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-4 top-4 h-4 w-4 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Preferred Appointment Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="date" 
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white pl-11 pr-4 py-3.5 rounded-2xl text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Time slot */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Preferred Time Slot *</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white px-4 py-3.5 rounded-2xl text-sm transition-all outline-none cursor-pointer appearance-none"
                      >
                        <option value="">-- Choose Preferred Time --</option>
                        <option value="09:00 AM">Morning (09:00 AM – 11:00 AM)</option>
                        <option value="11:30 AM">Mid-day (11:30 AM – 01:00 PM)</option>
                        <option value="02:00 PM">Afternoon (02:00 PM – 04:00 PM)</option>
                        <option value="04:30 PM">Late Afternoon (04:30 PM – 06:00 PM)</option>
                      </select>
                      <ChevronRight className="absolute right-4 top-4 h-4 w-4 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Additional Patient Notes or Symptoms (Optional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. I am experiencing occasional sensitivity on the bottom right side..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white pl-11 pr-4 py-3.5 rounded-2xl text-sm transition-all outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 flex justify-center">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-12 py-4 rounded-2xl shadow-xl shadow-sky-200 transition-all hover:scale-[1.01] hover:translate-y-[-1px] cursor-pointer"
                  >
                    Request Appointment
                  </button>
                </div>

                {/* Medical safety reassurance */}
                <p className="text-center text-[10px] text-slate-400 max-w-md mx-auto">
                  🔒 HIPAA Compliant Simulator. Your clinical and contact coordinates are encrypted and kept entirely within this browser session.
                </p>

              </form>
            )}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Brand column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('home')}>
                <div className="bg-sky-500 p-2 rounded-xl text-white">
                  <Smile className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <span className="font-extrabold text-white text-base tracking-tight block">
                    THE DENTAL CENTER
                  </span>
                  <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase block mt-0.5">
                    of Nevada
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-2">
                Providing compassionate, elite general & cosmetic dental procedures to the families of Las Vegas and surrounding areas since 2012. Your trust and wellness are our premium standards.
              </p>
              <div className="flex space-x-3 pt-2">
                {/* Visual Social handles */}
                <span className="h-8 w-8 bg-slate-800 hover:bg-sky-600 rounded-lg text-white font-bold flex items-center justify-center text-xs cursor-pointer transition-colors">f</span>
                <span className="h-8 w-8 bg-slate-800 hover:bg-sky-600 rounded-lg text-white font-bold flex items-center justify-center text-xs cursor-pointer transition-colors">t</span>
                <span className="h-8 w-8 bg-slate-800 hover:bg-sky-600 rounded-lg text-white font-bold flex items-center justify-center text-xs cursor-pointer transition-colors">in</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Quick Navigation</h4>
              <ul className="space-y-2.5 text-xs">
                <li><button onClick={() => scrollTo('home')} className="hover:text-white transition-colors text-left">Home & Welcome</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-white transition-colors text-left">Our Services</button></li>
                <li><button onClick={() => scrollTo('why-choose-us')} className="hover:text-white transition-colors text-left">Why Choose Us</button></li>
                <li><button onClick={() => scrollTo('about')} className="hover:text-white transition-colors text-left">About Practice & Dr. Smith</button></li>
                <li><button onClick={() => scrollTo('reviews')} className="hover:text-white transition-colors text-left">Patient Reviews</button></li>
                <li><button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors text-left">Request Appointment</button></li>
              </ul>
            </div>

            {/* Services shortcut */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Top Services</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><button onClick={() => { setSelectedService('Teeth Cleaning'); scrollTo('services'); }} className="hover:text-white transition-colors text-left">Teeth Cleaning</button></li>
                <li><button onClick={() => { setSelectedService('Cosmetic Dentistry'); scrollTo('services'); }} className="hover:text-white transition-colors text-left">Cosmetic Makeovers</button></li>
                <li><button onClick={() => { setSelectedService('Dental Implants'); scrollTo('services'); }} className="hover:text-white transition-colors text-left">Dental Implants</button></li>
                <li><button onClick={() => { setSelectedService('Teeth Whitening'); scrollTo('services'); }} className="hover:text-white transition-colors text-left">Teeth Whitening</button></li>
                <li><button onClick={() => { setSelectedService('Emergency Dental Care'); scrollTo('services'); }} className="hover:text-white transition-colors text-left">Emergency Treatment</button></li>
              </ul>
            </div>

            {/* Direct Contact column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Clinic Location</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                601 S Rancho Dr Suite B-15 <br />
                Las Vegas, NV 89106
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center text-slate-400">
                  <Phone className="h-3.5 w-3.5 text-sky-400 mr-2 shrink-0" />
                  <a href="tel:7023851166" className="hover:text-white transition-colors font-semibold">(702) 385-1166</a>
                </div>
                <div className="flex items-center text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-sky-400 mr-2 shrink-0" />
                  <span>Mon – Fri: 9:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom strip */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 The Dental Center of Nevada. All rights reserved.</p>
            <div className="flex space-x-6">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span 
                onClick={() => {
                  setShowStaffPortal(!showStaffPortal);
                  scrollTo('site-header');
                }} 
                className="hover:text-sky-400 font-bold cursor-pointer text-slate-400 flex items-center"
              >
                <Settings className="h-3.5 w-3.5 mr-1" />
                Staff Login Demo
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
