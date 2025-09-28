import { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Users, 
  Stethoscope, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Phone,
  Navigation,
  Zap,
  Shield
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import vanData from '../data/vanLocations.json';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function haversineDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) { return x * Math.PI / 180; }
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const VanIntegration = () => {
  const { t } = useTranslation();
  const [selectedVan, setSelectedVan] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    symptoms: '',
    preferredTime: '',
    location: ''
  });
  const [userLocation, setUserLocation] = useState(null);
  const [sortedVans, setSortedVans] = useState(vanData.vans);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ latitude, longitude });
        },
        () => setUserLocation(null)
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const vansWithDistance = vanData.vans.map(van => ({
        ...van,
        distance: haversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          van.location.latitude,
          van.location.longitude
        )
      }));
      const closeVans = vansWithDistance.filter(van => van.distance < 10);
      if (closeVans.length > 0) {
        closeVans.sort((a, b) => a.distance - b.distance);
        setSortedVans(closeVans);
      } else {
        setSortedVans(vansWithDistance); // fallback: show all
      }
    } else {
      setSortedVans(vanData.vans);
    }
  }, [userLocation]);

  const vans = vanData.vans;

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4" />;
      case 'busy': return <Clock className="h-4 w-4" />;
      case 'offline': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    alert('Booking request submitted! You will receive a confirmation call shortly.');
    setShowBooking(false);
    setBookingForm({
      name: '',
      phone: '',
      email: '',
      symptoms: '',
      preferredTime: '',
      location: ''
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleString();
  };

  // Find closest van if userLocation and sortedVans exist
  const closestVan = userLocation && sortedVans.length > 0 ? sortedVans[0] : null;
  const mapCenter = closestVan ? [closestVan.location.latitude, closestVan.location.longitude] : [34.0, 9.0];
  const mapZoom = closestVan ? 12 : 6;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary-100 rounded-full">
              <Truck className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('vanIntegration.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('vanIntegration.subtitle')}
          </p>
        </div>

        {/* Map of Van Locations */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Van Locations</h2>
          <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '350px', width: '100%' }} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sortedVans.map((van) => (
              <Marker key={van.id} position={[van.location.latitude, van.location.longitude]}>
                <Popup>
                  <strong>{van.name}</strong><br />
                  {van.location.address}
                  {van.distance !== undefined && userLocation && (
                    <div style={{marginTop: 8}}><b>Distance:</b> {van.distance.toFixed(1)} km</div>
                  )}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Van Cards */}
        {userLocation && sortedVans.length === 0 && (
          <div className="text-center text-red-600 mb-8">No vans are within 10km of your location.</div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {sortedVans.slice(0, 3).map((van) => (
            <div key={van.id} className="card hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{van.name}</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(van.status)}`}>
                  {getStatusIcon(van.status)}
                  <span className="ml-1 capitalize">{van.status}</span>
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{van.location.address}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    {t('vanIntegration.nextAvailable')} {formatTime(van.nextAvailable)}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{van.staff.length} {t('vanIntegration.medicalStaff')}</span>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('vanIntegration.servicesAvailable')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {van.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">{t('vanIntegration.equipment')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {van.equipment.slice(0, 3).map((equipment, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {equipment}
                      </span>
                    ))}
                    {van.equipment.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{van.equipment.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedVan(van);
                    setShowBooking(true);
                  }}
                  disabled={van.status === 'offline'}
                  className={`w-full mt-4 ${
                    van.status === 'offline'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {van.status === 'available' ? t('vanIntegration.bookVisit') : 
                   van.status === 'busy' ? t('vanIntegration.joinWaitlist') : t('vanIntegration.currentlyOffline')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Features */}
        <div className="card mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            {t('vanIntegration.advancedTechnology')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('vanIntegration.aiDiagnosticScanner')}</h3>
              <p className="text-gray-600 text-sm">{t('vanIntegration.aiDiagnosticScannerDesc')}</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-secondary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('vanIntegration.portableEquipment')}</h3>
              <p className="text-gray-600 text-sm">{t('vanIntegration.portableEquipmentDesc')}</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-accent-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Navigation className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('vanIntegration.realTimeTracking')}</h3>
              <p className="text-gray-600 text-sm">{t('vanIntegration.realTimeTrackingDesc')}</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('vanIntegration.secureData')}</h3>
              <p className="text-gray-600 text-sm">{t('vanIntegration.secureDataDesc')}</p>
            </div>
          </div>
        </div>

        {/* Staff Information */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            {t('vanIntegration.ourMedicalTeam')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vans.flatMap(van => van.staff).map((staff, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{staff.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{staff.role}</p>
                <p className="text-gray-600 text-sm">{staff.specialization}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        {showBooking && selectedVan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {t('vanIntegration.bookVanVisit')} {selectedVan.name}
                  </h3>
                  <button
                    onClick={() => setShowBooking(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('vanIntegration.fullName')}
                    </label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('vanIntegration.phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      required
                      className="input-field"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('vanIntegration.emailOptional')}
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('vanIntegration.symptomsReason')}
                    </label>
                    <textarea
                      required
                      rows={3}
                      className="input-field"
                      value={bookingForm.symptoms}
                      onChange={(e) => setBookingForm({...bookingForm, symptoms: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('vanIntegration.preferredTime')}
                    </label>
                    <input
                      type="datetime-local"
                      required
                      className="input-field"
                      value={bookingForm.preferredTime}
                      onChange={(e) => setBookingForm({...bookingForm, preferredTime: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('vanIntegration.yourLocation')}
                    </label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      placeholder={t('vanIntegration.locationPlaceholder')}
                      value={bookingForm.location}
                      onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowBooking(false)}
                      className="flex-1 btn-outline"
                    >
                      {t('vanIntegration.cancel')}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary"
                    >
                      {t('vanIntegration.submitBooking')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VanIntegration;
