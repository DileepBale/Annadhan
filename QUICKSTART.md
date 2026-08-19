# Quick Start Guide - Annasamarpan

## 🚀 Getting Started in 5 Minutes

### Option 1: Local Development Setup

1. **Prerequisites**
   ```bash
   # Make sure you have Python 3.8+ and MongoDB installed
   python --version
   mongod --version
   ```

2. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd annasamarpan
   
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Start MongoDB**
   ```bash
   # Start MongoDB service
   mongod
   ```

4. **Initialize Database**
   ```bash
   python init_db.py
   ```

5. **Run Application**
   ```bash
   python run.py
   ```

6. **Access Application**
   - Open browser: http://localhost:5000
   - Admin login: admin@annasamarpan.com / admin123

### Option 2: Docker Setup

1. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Initialize Database**
   ```bash
   docker exec -it annasamarpan-app python init_db.py
   ```

3. **Access Application**
   - Open browser: http://localhost:5000
   - Admin login: admin@annasamarpan.com / admin123

## 🎯 Key Features to Test

### 1. Donor Experience
- Go to "Donate" page
- Fill out donation form
- Submit food donation
- Check admin dashboard for new donation

### 2. Volunteer Experience
- Go to "Volunteer" page
- Register as volunteer
- Check volunteer dashboard for assignments
- Accept and complete deliveries

### 3. Admin Experience
- Login with admin credentials
- View comprehensive dashboard
- Manage donations and assignments
- Add new recipients
- View impact statistics

### 4. Public Pages
- Browse About, Mission, Contact pages
- View Impact statistics
- Test responsive design on mobile

## 🔧 Configuration

### Environment Variables
Create a `.env` file with:
```
SECRET_KEY=your-secret-key-here
MONGO_URI=mongodb://localhost:27017/
MAIL_SERVER=smtp.gmail.com
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

### Email Setup (Optional)
1. Enable 2-factor authentication on Gmail
2. Generate app-specific password
3. Update MAIL_USERNAME and MAIL_PASSWORD in .env

## 📱 Demo Data

The `init_db.py` script creates:
- **Admin User**: admin@annasamarpan.com / admin123
- **Demo Donors**: 3 sample donors with donations
- **Demo Volunteers**: 3 volunteers in different cities
- **Demo Recipients**: 3 verified recipients
- **Demo Assignments**: Sample completed and pending assignments

## 🎨 UI Features

### Professional Design Elements
- **Gradient Backgrounds**: Beautiful color combinations
- **Hover Effects**: Interactive card animations
- **Responsive Layout**: Mobile-first design
- **Smooth Transitions**: Professional animations
- **Icon Integration**: Font Awesome icons throughout

### Key UI Components
- **Hero Sections**: Eye-catching landing areas
- **Statistics Cards**: Animated counters
- **Form Styling**: Professional form designs
- **Navigation**: Sticky header with mobile menu
- **Footer**: Comprehensive site footer

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Make sure MongoDB is running
   sudo systemctl start mongod
   # Or on macOS
   brew services start mongodb-community
   ```

2. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

3. **Python Dependencies Error**
   ```bash
   # Reinstall dependencies
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Email Not Working**
   - Check Gmail app password
   - Verify SMTP settings
   - Test with different email provider

## 📊 Testing Checklist

- [ ] Home page loads with statistics
- [ ] Donor form submits successfully
- [ ] Volunteer registration works
- [ ] Admin login functions
- [ ] Admin dashboard shows data
- [ ] Email notifications sent
- [ ] Mobile responsive design
- [ ] All static pages accessible
- [ ] Database operations working
- [ ] Error handling functional

## 🎉 Success!

If everything is working, you should see:
- Beautiful, professional UI
- Working donation and volunteer systems
- Functional admin dashboard
- Real-time statistics
- Responsive design on all devices

## 📞 Support

For issues or questions:
- Check the README.md for detailed documentation
- Review the code comments for implementation details
- Test with the provided demo data first

---

**Happy coding! 🚀**
