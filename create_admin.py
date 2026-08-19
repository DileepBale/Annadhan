from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB configuration
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb+srv://kasheesh:kashees@sonu.0qkexwl.mongodb.net/?retryWrites=true&w=majority&appName=sonu')
client = MongoClient(MONGO_URI)
db = client.annasamarpan

# Admin credentials from .env or default
admin_email = os.environ.get('ADMIN_EMAIL', 'admin@annasamarpan.com')
admin_password = os.environ.get('ADMIN_PASSWORD', 'admin123')

# Check if admin already exists
existing_admin = db.admins.find_one({'email': admin_email})

if existing_admin:
    print(f"Admin with email {admin_email} already exists.")
else:
    # Create admin account
    admin_data = {
        'email': admin_email,
        'password': admin_password,
        'role': 'admin'
    }
    
    result = db.admins.insert_one(admin_data)
    print(f"Admin account created with ID: {result.inserted_id}")
    print(f"Login credentials: {admin_email} / {admin_password}")

print("You can now log in to the admin dashboard with these credentials.")