function Footer() {
  return (
    <footer className="footer-section">

      <div className="container py-5">

        <div className="row g-4">

          {/* Hospital */}
          <div className="col-md-4">
            <h4>Hospital Management System</h4>
            <p>
              Providing quality healthcare and better patient experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h5>Quick Links</h5>
            <p>Home</p>
            <p>Doctors</p>
            <p>Appointments</p>
          </div>

          {/* Services */}
          <div className="col-md-3">
            <h5>Services</h5>
            <p>Doctor Consultation</p>
            <p>Appointment Booking</p>
            <p>Patient Management</p>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h5>Contact</h5>
            <p>📞 Emergency: 112</p>
            <p>📧 support@hospital.com</p>
            <p>📍 Maharashtra, India</p>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Hospital Management System. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;