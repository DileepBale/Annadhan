# Annasamarpan - Food Donation & Distribution Platform

> **"No meal should go wasted, no hand should go empty"**

Annasamarpan is a comprehensive food donation and distribution platform that connects food donors, volunteers, and needy recipients. Built with Flask (Python) backend, MongoDB database, and modern HTML/CSS with Tailwind CSS frontend.

## 🌟 Features

### Core Functionality
- **Donor Dashboard**: Submit food donations with detailed information
- **Volunteer System**: Register volunteers and assign delivery tasks based on proximity
- **Recipient Management**: Admin-verified recipient registration and management
- **Admin Dashboard**: Comprehensive management interface with analytics
- **Real-time Tracking**: Track donations from submission to delivery
- **Email Notifications**: Automated notifications for volunteer assignments

### Professional UI/UX
- **Modern Design**: Professional Tailwind CSS styling with gradients and animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Hover effects, transitions, and smooth animations
- **Accessibility**: Clean, humanitarian visual theme with intuitive navigation

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd annasamarpan
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp env_example.txt .env
   # Edit .env with your configuration
   ```

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on localhost:27017
   ```

6. **Run the application**
   ```bash
   python app.py
   ```

7. **Access the application**
   - Open your browser and go to `http://localhost:5000`

## 📁 Project Structure

```
annasamarpan/
├── app.py                 # Main Flask application
├── requirements.txt      # Python dependencies
├── env_example.txt       # Environment variables template
├── templates/            # Jinja2 HTML templates
│   ├── base.html        # Base template with navigation
│   ├── index.html       # Home page
│   ├── donor.html       # Donor registration form
│   ├── volunteer.html   # Volunteer registration
│   ├── volunteer_dashboard.html
│   ├── admin.html       # Admin login
│   ├── admin_dashboard.html
│   ├── manage_recipients.html
│   ├── impact.html      # Impact statistics page
│   ├── about.html       # About us page
│   ├── contact.html     # Contact form
│   └── mission.html     # Mission page
└── static/             # Static files (CSS, JS, images)
```

## 🎨 Design Features

### Professional Styling
- **Tailwind CSS**: Modern utility-first CSS framework
- **Gradient Backgrounds**: Beautiful gradient combinations
- **Card Hover Effects**: Interactive elements with smooth transitions
- **Responsive Grid**: Mobile-first responsive design
- **Icon Integration**: Font Awesome icons throughout
- **Custom Animations**: Fade-in, slide-up, and bounce effects

### UI Components
- **Hero Sections**: Eye-catching landing areas
- **Statistics Cards**: Animated counters and metrics
- **Form Styling**: Professional form designs with validation
- **Navigation**: Sticky navigation with mobile menu
- **Footer**: Comprehensive footer with links and social media

## 🗄️ Database Schema

### MongoDB Collections

#### Donors
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "pincode": "string",
  "created_at": "datetime"
}
```

#### Volunteers
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "pincode": "string",
  "latitude": "float",
  "longitude": "float",
  "availability": "string",
  "created_at": "datetime"
}
```

#### Recipients
```json
{
  "name": "string",
  "phone": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "pincode": "string",
  "family_size": "integer",
  "verification_status": "string",
  "created_at": "datetime"
}
```

#### Donations
```json
{
  "donor_email": "string",
  "food_type": "string",
  "quantity": "string",
  "description": "string",
  "pickup_address": "string",
  "expiry_date": "date",
  "status": "string",
  "created_at": "datetime"
}
```

#### Assignments
```json
{
  "donation_id": "ObjectId",
  "volunteer_email": "string",
  "status": "string",
  "assigned_at": "datetime"
}
```

## 🔧 Configuration

### Environment Variables
- `SECRET_KEY`: Flask secret key for sessions
- `MONGO_URI`: MongoDB connection string
- `MAIL_SERVER`: SMTP server for email notifications
- `MAIL_USERNAME`: Email username
- `MAIL_PASSWORD`: Email password

### Admin Access
- **Email**: admin@annasamarpan.com
- **Password**: admin123

## 📱 Pages & Features

### Public Pages
- **Home**: Impact statistics and call-to-action
- **About**: Company story and team information
- **Mission**: Detailed mission and vision
- **Contact**: Contact form and business information
- **Impact**: Comprehensive impact statistics

### User Pages
- **Donor Form**: Food donation submission
- **Volunteer Registration**: Volunteer signup
- **Volunteer Dashboard**: Assignment management

### Admin Pages
- **Admin Login**: Secure admin authentication
- **Admin Dashboard**: Comprehensive management interface
- **Recipient Management**: Add and manage recipients

## 🚀 Deployment

### Production Setup
1. Set `FLASK_ENV=production` in environment variables
2. Use a production WSGI server (Gunicorn)
3. Set up MongoDB Atlas or production MongoDB
4. Configure production email settings
5. Set up reverse proxy (Nginx)

### Docker Deployment
```bash
# Build Docker image
docker build -t annasamarpan .

# Run container
docker run -p 5000:5000 annasamarpan
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Tailwind CSS for the beautiful styling framework
- Font Awesome for the comprehensive icon set
- Flask community for the excellent web framework
- MongoDB for the flexible database solution

## 📞 Support

For support, email contact@annasamarpan.com or join our community discussions.

---

**Made with ❤️ for humanity**
