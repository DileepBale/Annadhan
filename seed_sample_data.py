"""Seed sample data for Annasamarpan.
This script connects to the MongoDB configured in MONGO_URI (or falls back to mongomock)
and inserts sample documents into the common collections.
"""
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

try:
    import mongomock
except Exception:
    mongomock = None


def create_mongo_client(uri):
    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=2000)
        client.admin.command('ping')
        print('Connected to MongoDB at', uri)
        return client
    except Exception as exc:
        if mongomock is None:
            raise
        print('MongoDB unavailable, using in-memory mongomock:', exc)
        return mongomock.MongoClient()


def main():
    load_dotenv()
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
    client = create_mongo_client(MONGO_URI)
    db = client.annasamarpan

    # Clear some collections (idempotent-ish for local testing)
    db.donors.delete_many({})
    db.volunteers.delete_many({})
    db.recipients.delete_many({})
    db.donations.delete_many({})
    db.assignments.delete_many({})
    db.monthly_donors.delete_many({})

    # Insert admin if not exists
    admin_email = os.environ.get('ADMIN_EMAIL', 'admin@annasamarpan.com')
    admin_password = os.environ.get('ADMIN_PASSWORD', 'admin123')
    if not db.admins.find_one({'email': admin_email}):
        db.admins.insert_one({'email': admin_email, 'password': admin_password, 'role': 'admin', 'created_at': datetime.now()})
        print('Inserted admin', admin_email)

    # Sample donors
    donors = [
        {'name': 'Green Kitchen', 'email': 'donor1@example.com', 'phone': '9000000001', 'address': '12 Food St', 'city': 'CityA', 'state': 'StateA', 'pincode': '100001', 'created_at': datetime.now()},
        {'name': 'Happy Meals', 'email': 'donor2@example.com', 'phone': '9000000002', 'address': '34 Kind Ave', 'city': 'CityB', 'state': 'StateB', 'pincode': '100002', 'created_at': datetime.now()},
        {'name': 'Community Canteen', 'email': 'donor3@example.com', 'phone': '9000000003', 'address': '56 Serve Rd', 'city': 'CityC', 'state': 'StateC', 'pincode': '100003', 'created_at': datetime.now()},
    ]
    donor_ids = db.donors.insert_many(donors).inserted_ids
    print('Inserted donors:', donor_ids)

    # Sample volunteers
    volunteers = [
        {'name': 'Ravi', 'email': 'vol1@example.com', 'phone': '9100000001', 'address': '10 Volunteer Ln', 'city': 'CityA', 'state': 'StateA', 'pincode': '100001', 'latitude': 12.9716, 'longitude': 77.5946, 'availability': 'available', 'created_at': datetime.now()},
        {'name': 'Priya', 'email': 'vol2@example.com', 'phone': '9100000002', 'address': '20 Volunteer Ln', 'city': 'CityB', 'state': 'StateB', 'pincode': '100002', 'latitude': 12.2958, 'longitude': 76.6394, 'availability': 'available', 'created_at': datetime.now()},
        {'name': 'Asha', 'email': 'vol3@example.com', 'phone': '9100000003', 'address': '30 Volunteer Ln', 'city': 'CityC', 'state': 'StateC', 'pincode': '100003', 'latitude': 11.0168, 'longitude': 76.9558, 'availability': 'available', 'created_at': datetime.now()},
    ]
    vol_ids = db.volunteers.insert_many(volunteers).inserted_ids
    print('Inserted volunteers:', vol_ids)

    # Sample recipients
    recipients = [
        {'name': 'Family One', 'phone': '8000000001', 'address': '100 Home St', 'city': 'CityA', 'state': 'StateA', 'pincode': '100001', 'family_size': 4, 'verification_status': 'verified', 'created_at': datetime.now()},
        {'name': 'Family Two', 'phone': '8000000002', 'address': '200 Home St', 'city': 'CityB', 'state': 'StateB', 'pincode': '100002', 'family_size': 6, 'verification_status': 'verified', 'created_at': datetime.now()},
        {'name': 'Family Three', 'phone': '8000000003', 'address': '300 Home St', 'city': 'CityC', 'state': 'StateC', 'pincode': '100003', 'family_size': 3, 'verification_status': 'verified', 'created_at': datetime.now()},
    ]
    rec_ids = db.recipients.insert_many(recipients).inserted_ids
    print('Inserted recipients:', rec_ids)

    # Sample donations (link to donors by email)
    donations = [
        {'donor_email': donors[0]['email'], 'food_type': 'Cooked Meals', 'quantity': '20 boxes', 'description': 'Hot meals', 'pickup_address': donors[0]['address'], 'expiry_date': None, 'status': 'pending', 'created_at': datetime.now()},
        {'donor_email': donors[1]['email'], 'food_type': 'Fruits', 'quantity': '10 kg', 'description': 'Fresh fruits', 'pickup_address': donors[1]['address'], 'expiry_date': None, 'status': 'pending', 'created_at': datetime.now()},
        {'donor_email': donors[2]['email'], 'food_type': 'Bread', 'quantity': '50 loaves', 'description': 'Baked goods', 'pickup_address': donors[2]['address'], 'expiry_date': None, 'status': 'pending', 'created_at': datetime.now()},
    ]
    donation_ids = db.donations.insert_many(donations).inserted_ids
    print('Inserted donations:', donation_ids)

    # Sample assignment: assign first donation to first volunteer
    assignment = {
        'donation_id': str(donation_ids[0]),
        'volunteer_email': volunteers[0]['email'],
        'status': 'assigned',
        'assigned_at': datetime.now()
    }
    assign_id = db.assignments.insert_one(assignment).inserted_id
    # Update donation status
    db.donations.update_one({'_id': donation_ids[0]}, {'$set': {'status': 'assigned', 'assigned_volunteer': volunteers[0]['email']}})
    print('Inserted assignment:', assign_id)

    # Sample monthly donor
    md = {'name': 'Supporter One', 'email': 'monthly1@example.com', 'phone': '9200000001', 'amount': 400, 'type': 'monthly', 'status': 'active', 'created_at': datetime.now()}
    md_id = db.monthly_donors.insert_one(md).inserted_id
    print('Inserted monthly donor:', md_id)

    # Summary counts
    print('Summary counts:')
    print(' donors=', db.donors.count_documents({}), ' volunteers=', db.volunteers.count_documents({}), ' recipients=', db.recipients.count_documents({}), ' donations=', db.donations.count_documents({}), ' assignments=', db.assignments.count_documents({}), ' monthly_donors=', db.monthly_donors.count_documents({}))


if __name__ == '__main__':
    main()
