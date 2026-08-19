#!/usr/bin/env python3
"""
Database initialization script for Annadhan
This script creates demo data for testing the application
"""

from pymongo import MongoClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB configuration
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client.annadhan

def init_database():
    """Initialize database with demo data"""
    print("🚀 Initializing Annadhan database...")
    
    # Clear existing collections (optional - comment out for production)
    # db.donors.drop()
    # db.volunteers.drop()
    # db.recipients.drop()
    # db.donations.drop()
    # db.assignments.drop()
    # db.admins.drop()
    
    # Create admin user
    admin_data = {
        'email': 'admin@annadhan.com',
        'password': 'admin123',
        'name': 'System Administrator',
        'role': 'admin',
        'created_at': datetime.now()
    }
    
    # Check if admin already exists
    existing_admin = db.admins.find_one({'email': 'admin@annadhan.com'})
    if not existing_admin:
        db.admins.insert_one(admin_data)
        print("✅ Admin user created: admin@annadhan.com / admin123")
    else:
        print("ℹ️  Admin user already exists")
    
    # Create demo donors
    demo_donors = [
        {
            'name': 'Priya Sharma',
            'email': 'priya.sharma@email.com',
            'phone': '+91 98765 43210',
            'address': '123 MG Road, Bandra West',
            'city': 'Mumbai',
            'state': 'Maharashtra',
            'pincode': '400050',
            'created_at': datetime.now() - timedelta(days=5)
        },
        {
            'name': 'Rajesh Kumar',
            'email': 'rajesh.kumar@email.com',
            'phone': '+91 98765 43211',
            'address': '456 Park Street, Salt Lake',
            'city': 'Kolkata',
            'state': 'West Bengal',
            'pincode': '700064',
            'created_at': datetime.now() - timedelta(days=3)
        },
        {
            'name': 'Anita Patel',
            'email': 'anita.patel@email.com',
            'phone': '+91 98765 43212',
            'address': '789 Brigade Road, MG Road',
            'city': 'Bangalore',
            'state': 'Karnataka',
            'pincode': '560001',
            'created_at': datetime.now() - timedelta(days=1)
        }
    ]
    
    for donor in demo_donors:
        existing_donor = db.donors.find_one({'email': donor['email']})
        if not existing_donor:
            db.donors.insert_one(donor)
    
    print(f"✅ Created {len(demo_donors)} demo donors")
    
    # Create demo volunteers
    demo_volunteers = [
        {
            'name': 'Suresh Singh',
            'email': 'suresh.singh@email.com',
            'phone': '+91 98765 43213',
            'address': '321 Linking Road, Bandra West',
            'city': 'Mumbai',
            'state': 'Maharashtra',
            'pincode': '400050',
            'latitude': 19.0544,
            'longitude': 72.8406,
            'availability': 'available',
            'created_at': datetime.now() - timedelta(days=7)
        },
        {
            'name': 'Meera Joshi',
            'email': 'meera.joshi@email.com',
            'phone': '+91 98765 43214',
            'address': '654 New Market, Park Street',
            'city': 'Kolkata',
            'state': 'West Bengal',
            'pincode': '700016',
            'latitude': 22.5726,
            'longitude': 88.3639,
            'availability': 'available',
            'created_at': datetime.now() - timedelta(days=6)
        },
        {
            'name': 'Vikram Reddy',
            'email': 'vikram.reddy@email.com',
            'phone': '+91 98765 43215',
            'address': '987 Commercial Street, Shivajinagar',
            'city': 'Bangalore',
            'state': 'Karnataka',
            'pincode': '560001',
            'latitude': 12.9716,
            'longitude': 77.5946,
            'availability': 'available',
            'created_at': datetime.now() - timedelta(days=4)
        }
    ]
    
    for volunteer in demo_volunteers:
        existing_volunteer = db.volunteers.find_one({'email': volunteer['email']})
        if not existing_volunteer:
            db.volunteers.insert_one(volunteer)
    
    print(f"✅ Created {len(demo_volunteers)} demo volunteers")
    
    # Create demo recipients
    demo_recipients = [
        {
            'name': 'Lakshmi Devi',
            'phone': '+91 98765 43216',
            'address': '111 Dharavi, Mumbai',
            'city': 'Mumbai',
            'state': 'Maharashtra',
            'pincode': '400017',
            'family_size': 4,
            'verification_status': 'verified',
            'created_at': datetime.now() - timedelta(days=10)
        },
        {
            'name': 'Ram Prasad',
            'phone': '+91 98765 43217',
            'address': '222 Howrah, Kolkata',
            'city': 'Kolkata',
            'state': 'West Bengal',
            'pincode': '711101',
            'family_size': 6,
            'verification_status': 'verified',
            'created_at': datetime.now() - timedelta(days=8)
        },
        {
            'name': 'Sunita Kumari',
            'phone': '+91 98765 43218',
            'address': '333 Whitefield, Bangalore',
            'city': 'Bangalore',
            'state': 'Karnataka',
            'pincode': '560066',
            'family_size': 3,
            'verification_status': 'verified',
            'created_at': datetime.now() - timedelta(days=6)
        }
    ]
    
    for recipient in demo_recipients:
        existing_recipient = db.recipients.find_one({'phone': recipient['phone']})
        if not existing_recipient:
            db.recipients.insert_one(recipient)
    
    print(f"✅ Created {len(demo_recipients)} demo recipients")
    
    # Create demo donations
    demo_donations = [
        {
            'donor_email': 'priya.sharma@email.com',
            'food_type': 'cooked_meals',
            'quantity': '25 meals',
            'description': 'Freshly cooked dal, rice, and vegetables from our restaurant. Prepared this morning and ready for pickup.',
            'pickup_address': '123 MG Road, Bandra West, Mumbai',
            'expiry_date': (datetime.now() + timedelta(hours=4)).strftime('%Y-%m-%d'),
            'status': 'completed',
            'created_at': datetime.now() - timedelta(days=2)
        },
        {
            'donor_email': 'rajesh.kumar@email.com',
            'food_type': 'raw_vegetables',
            'quantity': '10 kg',
            'description': 'Fresh vegetables including potatoes, onions, tomatoes, and leafy greens. Excess from our grocery store.',
            'pickup_address': '456 Park Street, Salt Lake, Kolkata',
            'expiry_date': (datetime.now() + timedelta(days=3)).strftime('%Y-%m-%d'),
            'status': 'assigned',
            'created_at': datetime.now() - timedelta(hours=6)
        },
        {
            'donor_email': 'anita.patel@email.com',
            'food_type': 'grains_rice',
            'quantity': '15 kg',
            'description': 'Rice, wheat flour, and pulses. Unopened packages from our pantry cleanup.',
            'pickup_address': '789 Brigade Road, MG Road, Bangalore',
            'expiry_date': (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d'),
            'status': 'pending',
            'created_at': datetime.now() - timedelta(hours=2)
        }
    ]
    
    for donation in demo_donations:
        existing_donation = db.donations.find_one({
            'donor_email': donation['donor_email'],
            'created_at': donation['created_at']
        })
        if not existing_donation:
            db.donations.insert_one(donation)
    
    print(f"✅ Created {len(demo_donations)} demo donations")
    
    # Create demo assignments
    donations = list(db.donations.find())
    volunteers = list(db.volunteers.find())
    
    demo_assignments = [
        {
            'donation_id': donations[0]['_id'] if len(donations) > 0 else None,
            'volunteer_email': volunteers[0]['email'] if len(volunteers) > 0 else 'suresh.singh@email.com',
            'status': 'completed',
            'assigned_at': datetime.now() - timedelta(days=2),
            'completed_at': datetime.now() - timedelta(days=1)
        },
        {
            'donation_id': donations[1]['_id'] if len(donations) > 1 else None,
            'volunteer_email': volunteers[1]['email'] if len(volunteers) > 1 else 'meera.joshi@email.com',
            'status': 'assigned',
            'assigned_at': datetime.now() - timedelta(hours=4)
        }
    ]
    
    for assignment in demo_assignments:
        if assignment['donation_id']:
            existing_assignment = db.assignments.find_one({
                'donation_id': assignment['donation_id']
            })
            if not existing_assignment:
                db.assignments.insert_one(assignment)
    
    print(f"✅ Created {len(demo_assignments)} demo assignments")
    
    # Print summary
    print("\n📊 Database Summary:")
    print(f"   Donors: {db.donors.count_documents({})}")
    print(f"   Volunteers: {db.volunteers.count_documents({})}")
    print(f"   Recipients: {db.recipients.count_documents({})}")
    print(f"   Donations: {db.donations.count_documents({})}")
    print(f"   Assignments: {db.assignments.count_documents({})}")
    print(f"   Admins: {db.admins.count_documents({})}")
    
    print("\n🎉 Database initialization completed!")
    print("\n🔑 Admin Login Credentials:")
    print("   Email: admin@annadhan.com")
    print("   Password: admin123")
    
    print("\n📱 Demo User Credentials:")
    print("   Donor: priya.sharma@email.com")
    print("   Volunteer: suresh.singh@email.com")
    print("   Recipient: Lakshmi Devi (+91 98765 43216)")

if __name__ == '__main__':
    try:
        init_database()
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        print("Make sure MongoDB is running and accessible.")
