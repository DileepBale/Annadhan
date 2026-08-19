from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from flask_mail import Mail, Message
import uuid
import math
from bson.objectid import ObjectId

try:
    import mongomock
except ImportError:
    mongomock = None

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# Enable CORS for React frontend integration
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"])

def create_mongo_client(uri):
    """Create a Mongo client, falling back to an in-memory mock if needed."""
    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=2000)
        client.admin.command('ping')
        return client
    except Exception as exc:
        if mongomock is None:
            raise
        print(f"MongoDB unavailable, using in-memory mock database: {exc}")
        return mongomock.MongoClient()

# MongoDB configuration
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb+srv://kasheesh:kashees@sonu.0qkexwl.mongodb.net/?retryWrites=true&w=majority&appName=sonu')
client = create_mongo_client(MONGO_URI)
db = client.annadhan

# Collections
donors_collection = db.donors
volunteers_collection = db.volunteers
recipients_collection = db.recipients
donations_collection = db.donations
assignments_collection = db.assignments
admins_collection = db.admins
monthly_donors_collection = db.monthly_donors

# Ensure default admin accounts
admin_emails = ['admin@annadhan.com', 'admin@annadhan.com']
admin_password = os.environ.get('ADMIN_PASSWORD', 'admin123')
for a_email in admin_emails:
    try:
        existing_admin = admins_collection.find_one({'email': a_email})
        if not existing_admin:
            admins_collection.insert_one({
                'email': a_email,
                'password': admin_password,
                'role': 'admin',
                'created_at': datetime.now()
            })
            print(f"Inserted default admin: {a_email}")
    except Exception as e:
        print(f"Error ensuring admin exists for {a_email}: {e}")

# Email configuration
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')

mail = Mail(app)

# Helper functions
def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two coordinates using Haversine formula"""
    R = 6371  # Earth's radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat/2) * math.sin(dlat/2) + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * 
         math.sin(dlon/2) * math.sin(dlon/2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

def send_volunteer_notification(volunteer_email, donation_details):
    """Send email notification to volunteer about new assignment"""
    try:
        if not app.config['MAIL_USERNAME']:
            print("Skipping email: MAIL_USERNAME not configured")
            return True
        msg = Message(
            subject='New Donation Assignment - Annadhan',
            sender=app.config['MAIL_USERNAME'],
            recipients=[volunteer_email]
        )
        msg.body = f"""
Dear Volunteer,

You have been assigned a new donation to deliver:

Donation Details:
- Food Type: {donation_details.get('food_type')}
- Quantity: {donation_details.get('quantity')}
- Description: {donation_details.get('description')}
- Pickup Address: {donation_details.get('pickup_address')}
- Donor Email: {donation_details.get('donor_email')}

Please log in to your volunteer dashboard to confirm and complete this assignment.

Thank you for your service to the community!

Best regards,
Annadhan Team
        """
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def serialize_doc(doc):
    """Convert MongoDB BSON types to JSON serializable objects"""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    if isinstance(doc, dict):
        new_doc = {}
        for k, v in doc.items():
            if k == '_id':
                new_doc[k] = str(v)
            elif isinstance(v, datetime):
                new_doc[k] = v.isoformat()
            elif isinstance(v, ObjectId):
                new_doc[k] = str(v)
            elif isinstance(v, dict):
                new_doc[k] = serialize_doc(v)
            elif isinstance(v, list):
                new_doc[k] = serialize_doc(v)
            else:
                new_doc[k] = v
        return new_doc
    return doc

# API Routes
@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get home impact statistics"""
    stats = {
        'total_donations': donations_collection.count_documents({}),
        'total_volunteers': volunteers_collection.count_documents({}),
        'total_recipients': recipients_collection.count_documents({}),
        'completed_deliveries': assignments_collection.count_documents({"status": "completed"})
    }
    return jsonify({'success': True, 'stats': stats})

@app.route('/api/donor', methods=['POST'])
def api_donor():
    """Submit donor registration & food donation"""
    data = request.get_json() or request.form
    email = data.get('email')
    if not email or not data.get('food_type'):
        return jsonify({'success': False, 'message': 'Email and food type are required'}), 400

    donor_data = {
        'name': data.get('name', ''),
        'email': email,
        'phone': data.get('phone', ''),
        'address': data.get('address', ''),
        'city': data.get('city', ''),
        'state': data.get('state', ''),
        'pincode': data.get('pincode', ''),
        'created_at': datetime.now()
    }
    
    donation_data = {
        'donor_email': email,
        'donor_name': data.get('name', ''),
        'donor_phone': data.get('phone', ''),
        'food_type': data.get('food_type', ''),
        'quantity': data.get('quantity', ''),
        'description': data.get('description', ''),
        'pickup_address': data.get('address', ''),
        'expiry_date': data.get('expiry_date'),
        'status': 'pending',
        'created_at': datetime.now()
    }
    
    if not donors_collection.find_one({'email': email}):
        donors_collection.insert_one(donor_data)
        
    result = donations_collection.insert_one(donation_data)
    
    return jsonify({
        'success': True,
        'message': 'Donation submitted successfully! A volunteer will be assigned soon.',
        'donation_id': str(result.inserted_id)
    })

@app.route('/api/volunteer', methods=['POST'])
def api_volunteer_register():
    """Register a new volunteer"""
    data = request.get_json() or request.form
    email = data.get('email')
    if not email or not data.get('name'):
        return jsonify({'success': False, 'message': 'Name and Email are required'}), 400

    volunteer_data = {
        'name': data.get('name'),
        'email': email,
        'phone': data.get('phone', ''),
        'address': data.get('address', ''),
        'city': data.get('city', ''),
        'state': data.get('state', ''),
        'pincode': data.get('pincode', ''),
        'latitude': float(data.get('latitude', 0) or 0),
        'longitude': float(data.get('longitude', 0) or 0),
        'availability': data.get('availability', 'available'),
        'created_at': datetime.now()
    }
    
    existing = volunteers_collection.find_one({'email': email})
    if existing:
        volunteers_collection.update_one({'email': email}, {'$set': volunteer_data})
    else:
        volunteers_collection.insert_one(volunteer_data)
        
    return jsonify({'success': True, 'message': 'Volunteer registration successful!', 'email': email})

@app.route('/api/volunteer/login', methods=['POST'])
def api_volunteer_login():
    """Volunteer login by email"""
    data = request.get_json() or request.form
    email = data.get('email')
    volunteer = volunteers_collection.find_one({'email': email})
    if not volunteer:
        return jsonify({'success': False, 'message': 'Volunteer not found. Please register first.'}), 404
        
    session['volunteer_email'] = email
    return jsonify({'success': True, 'volunteer': serialize_doc(volunteer)})

@app.route('/api/volunteer/assignments', methods=['GET'])
def api_volunteer_assignments():
    """Get assigned tasks for volunteer"""
    email = request.args.get('email') or session.get('volunteer_email')
    if not email:
        return jsonify({'success': False, 'message': 'Email parameter required'}), 400
        
    volunteer = volunteers_collection.find_one({'email': email})
    if not volunteer:
        return jsonify({'success': False, 'message': 'Volunteer not found'}), 404
        
    assignments = list(assignments_collection.find({'volunteer_email': email}))
    for assignment in assignments:
        try:
            donation_id = assignment.get('donation_id')
            if donation_id:
                donation = donations_collection.find_one({'_id': ObjectId(donation_id)})
                assignment['donation'] = serialize_doc(donation)
        except Exception:
            pass
            
    return jsonify({'success': True, 'volunteer': serialize_doc(volunteer), 'assignments': serialize_doc(assignments)})

@app.route('/api/volunteer/complete-task/<assignment_id>', methods=['POST'])
def api_complete_task(assignment_id):
    """Mark an assignment as completed"""
    try:
        assignment = assignments_collection.find_one({'_id': ObjectId(assignment_id)})
        if not assignment:
            return jsonify({'success': False, 'message': 'Assignment not found'}), 404

        assignments_collection.update_one({'_id': ObjectId(assignment_id)}, {'$set': {'status': 'completed', 'completed_at': datetime.now()}})
        
        donation_id = assignment.get('donation_id')
        if donation_id:
            donations_collection.update_one({'_id': ObjectId(donation_id)}, {'$set': {'status': 'completed'}})
            
        return jsonify({'success': True, 'message': 'Delivery completed successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/admin/login', methods=['POST'])
def api_admin_login():
    """Admin Login Endpoint"""
    data = request.get_json() or request.form
    email = (data.get('email') or '').strip().lower()
    password = (data.get('password') or '').strip()
    
    admin_user = admins_collection.find_one({'email': email, 'password': password})
    if not admin_user and (email in ['admin@annadhan.com', 'admin@annadhan.com']) and password == 'admin123':
        admin_user = {
            'email': email,
            'password': password,
            'role': 'admin',
            'created_at': datetime.now()
        }
        admins_collection.update_one({'email': email}, {'$set': admin_user}, upsert=True)

    if admin_user:
        session['admin_email'] = email
        return jsonify({'success': True, 'admin': {'email': email, 'role': admin_user.get('role', 'admin')}})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials. Please use admin@annadhan.com / admin123'}), 401

@app.route('/api/admin/dashboard', methods=['GET'])
def api_admin_dashboard():
    """Get admin metrics, donations, and volunteers"""
    stats = {
        'total_donations': donations_collection.count_documents({}),
        'pending_donations': donations_collection.count_documents({'status': 'pending'}),
        'total_volunteers': volunteers_collection.count_documents({}),
        'total_recipients': recipients_collection.count_documents({}),
        'completed_deliveries': assignments_collection.count_documents({'status': 'completed'})
    }
    
    recent_donations = list(donations_collection.find().sort('created_at', -1).limit(10))
    recent_volunteers = list(volunteers_collection.find().sort('created_at', -1).limit(10))
    volunteers_list = list(volunteers_collection.find())
    
    return jsonify({
        'success': True,
        'stats': stats,
        'recent_donations': serialize_doc(recent_donations),
        'recent_volunteers': serialize_doc(recent_volunteers),
        'all_volunteers': serialize_doc(volunteers_list)
    })

@app.route('/api/admin/assign-volunteer/<donation_id>', methods=['POST'])
def api_assign_volunteer(donation_id):
    """Assign volunteer to donation"""
    data = request.get_json() or {}
    specified_volunteer_email = data.get('volunteer_email')
    
    try:
        donation = donations_collection.find_one({'_id': ObjectId(donation_id)})
        if not donation:
            return jsonify({'success': False, 'message': 'Donation not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'message': f'Invalid ID: {str(e)}'}), 400

    if specified_volunteer_email:
        assigned_volunteer = volunteers_collection.find_one({'email': specified_volunteer_email})
    else:
        assigned_volunteer = volunteers_collection.find_one({})

    if not assigned_volunteer:
        return jsonify({'success': False, 'message': 'No available volunteers found.'}), 404

    assignment_data = {
        'donation_id': str(donation['_id']),
        'volunteer_email': assigned_volunteer['email'],
        'status': 'assigned',
        'assigned_at': datetime.now()
    }
    
    assignments_collection.insert_one(assignment_data)
    donations_collection.update_one(
        {'_id': ObjectId(donation_id)},
        {'$set': {'status': 'assigned', 'assigned_volunteer': assigned_volunteer['email']}}
    )
    
    send_volunteer_notification(assigned_volunteer['email'], donation)
    
    return jsonify({
        'success': True,
        'message': f'Volunteer {assigned_volunteer.get("name")} assigned successfully!',
        'assigned_volunteer': serialize_doc(assigned_volunteer)
    })

@app.route('/api/recipients', methods=['GET', 'POST'])
def api_recipients():
    """Get or add recipients"""
    if request.method == 'POST':
        data = request.get_json() or request.form
        recipient_data = {
            'name': data.get('name'),
            'phone': data.get('phone', ''),
            'address': data.get('address', ''),
            'city': data.get('city', ''),
            'state': data.get('state', ''),
            'pincode': data.get('pincode', ''),
            'family_size': int(data.get('family_size', 1)),
            'verification_status': 'verified',
            'created_at': datetime.now()
        }
        res = recipients_collection.insert_one(recipient_data)
        return jsonify({'success': True, 'message': 'Recipient added successfully!', 'id': str(res.inserted_id)})

    recipients = list(recipients_collection.find())
    return jsonify({'success': True, 'recipients': serialize_doc(recipients)})

@app.route('/api/impact', methods=['GET'])
def api_impact():
    """Impact data API"""
    total_donations = donations_collection.count_documents({})
    total_volunteers = volunteers_collection.count_documents({})
    total_recipients = recipients_collection.count_documents({})
    completed_deliveries = assignments_collection.count_documents({'status': 'completed'})
    
    current_month = datetime.now().replace(day=1, hour=0, minute=0, second=0)
    monthly_donations = donations_collection.count_documents({'created_at': {'$gte': current_month}})
    monthly_deliveries = assignments_collection.count_documents({
        'assigned_at': {'$gte': current_month},
        'status': 'completed'
    })
    
    stats = {
        'total_donations': total_donations,
        'total_volunteers': total_volunteers,
        'total_recipients': total_recipients,
        'completed_deliveries': completed_deliveries,
        'monthly_donations': monthly_donations,
        'monthly_deliveries': monthly_deliveries
    }
    return jsonify({'success': True, 'stats': stats})

@app.route('/api/monthly-donor', methods=['POST'])
def api_monthly_donor():
    """Register for monthly donor circle"""
    data = request.get_json() or request.form
    donor_data = {
        'name': data.get('name'),
        'email': data.get('email'),
        'phone': data.get('phone'),
        'amount': int(data.get('amount', 400)),
        'type': 'monthly',
        'status': 'active',
        'created_at': datetime.now()
    }
    monthly_donors_collection.insert_one(donor_data)
    return jsonify({'success': True, 'message': 'Thank you for joining our Monthly Donor Circle!'})

@app.route('/api/contact', methods=['POST'])
def api_contact():
    """Contact form submission"""
    data = request.get_json() or request.form
    return jsonify({'success': True, 'message': 'Thank you for your message! We will get back to you soon.'})

# Standard HTML Template Fallback Routes
@app.route('/')
def index():
    stats = {
        'total_donations': donations_collection.count_documents({}),
        'total_volunteers': volunteers_collection.count_documents({}),
        'total_recipients': recipients_collection.count_documents({}),
        'completed_deliveries': assignments_collection.count_documents({"status": "completed"})
    }
    return render_template('index.html', stats=stats)

@app.route('/donor', methods=['GET', 'POST'])
def donor():
    if request.method == 'POST':
        return api_donor()
    return render_template('donor.html')

@app.route('/volunteer', methods=['GET', 'POST'])
def volunteer():
    if request.method == 'POST':
        return api_volunteer_register()
    return render_template('volunteer.html')

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    return render_template('admin.html')

@app.route('/impact')
def impact():
    return render_template('impact.html')

@app.route('/monthly-donor')
def monthly_donor():
    return render_template('monthly_donor.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/mission')
def mission():
    return render_template('mission.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
