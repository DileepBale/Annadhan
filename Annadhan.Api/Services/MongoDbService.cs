using Annadhan.Api.Models;
using MongoDB.Driver;

namespace Annadhan.Api.Services
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        public MongoDbService(IConfiguration configuration)
        {
            var connectionString = configuration.GetSection("MongoDbSettings:ConnectionString").Value 
                ?? "mongodb://localhost:27017/";
            var databaseName = configuration.GetSection("MongoDbSettings:DatabaseName").Value 
                ?? "annadhan";

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);

            EnsureDefaultAdmin(configuration);
        }

        public IMongoCollection<Donor> Donors => _database.GetCollection<Donor>("donors");
        public IMongoCollection<Volunteer> Volunteers => _database.GetCollection<Volunteer>("volunteers");
        public IMongoCollection<Recipient> Recipients => _database.GetCollection<Recipient>("recipients");
        public IMongoCollection<Donation> Donations => _database.GetCollection<Donation>("donations");
        public IMongoCollection<Assignment> Assignments => _database.GetCollection<Assignment>("assignments");
        public IMongoCollection<AdminUser> Admins => _database.GetCollection<AdminUser>("admins");
        public IMongoCollection<MonthlyDonor> MonthlyDonors => _database.GetCollection<MonthlyDonor>("monthly_donors");

        private void EnsureDefaultAdmin(IConfiguration configuration)
        {
            try
            {
                var adminEmail = configuration.GetSection("AdminSettings:AdminEmail").Value ?? "admin@annadhan.com";
                var adminPassword = configuration.GetSection("AdminSettings:AdminPassword").Value ?? "admin123";

                var existingAdmin = Admins.Find(a => a.Email == adminEmail).FirstOrDefault();
                if (existingAdmin == null)
                {
                    Admins.InsertOne(new AdminUser
                    {
                        Email = adminEmail,
                        Password = adminPassword,
                        Role = "admin",
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Default admin initialization note: {ex.Message}");
            }
        }
    }
}
