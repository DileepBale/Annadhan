using Annadhan.Api.Models;
using Annadhan.Api.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Annadhan.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public AdminController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AdminLoginDto dto)
        {
            var admin = await _mongoDb.Admins.Find(a => a.Email == dto.Email && a.Password == dto.Password).FirstOrDefaultAsync();
            if (admin != null)
            {
                return Ok(new { success = true, admin = new { email = admin.Email, role = admin.Role } });
            }
            return Unauthorized(new { success = false, message = "Invalid credentials" });
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var totalDonations = await _mongoDb.Donations.CountDocumentsAsync(FilterDefinition<Donation>.Empty);
            var pendingDonations = await _mongoDb.Donations.CountDocumentsAsync(d => d.Status == "pending");
            var totalVolunteers = await _mongoDb.Volunteers.CountDocumentsAsync(FilterDefinition<Volunteer>.Empty);
            var totalRecipients = await _mongoDb.Recipients.CountDocumentsAsync(FilterDefinition<Recipient>.Empty);
            var completedDeliveries = await _mongoDb.Assignments.CountDocumentsAsync(a => a.Status == "completed");

            var recentDonations = await _mongoDb.Donations.Find(FilterDefinition<Donation>.Empty)
                .SortByDescending(d => d.CreatedAt)
                .Limit(10)
                .ToListAsync();

            var recentVolunteers = await _mongoDb.Volunteers.Find(FilterDefinition<Volunteer>.Empty)
                .SortByDescending(v => v.CreatedAt)
                .Limit(10)
                .ToListAsync();

            var allVolunteers = await _mongoDb.Volunteers.Find(FilterDefinition<Volunteer>.Empty).ToListAsync();

            return Ok(new
            {
                success = true,
                stats = new
                {
                    total_donations = totalDonations,
                    pending_donations = pendingDonations,
                    total_volunteers = totalVolunteers,
                    total_recipients = totalRecipients,
                    completed_deliveries = completedDeliveries
                },
                recent_donations = recentDonations,
                recent_volunteers = recentVolunteers,
                all_volunteers = allVolunteers
            });
        }

        [HttpPost("assign-volunteer/{donationId}")]
        public async Task<IActionResult> AssignVolunteer(string donationId, [FromBody] AssignVolunteerDto dto)
        {
            var donation = await _mongoDb.Donations.Find(d => d.Id == donationId).FirstOrDefaultAsync();
            if (donation == null)
            {
                return NotFound(new { success = false, message = "Donation not found" });
            }

            Volunteer? volunteer = null;
            if (!string.IsNullOrWhiteSpace(dto.VolunteerEmail))
            {
                volunteer = await _mongoDb.Volunteers.Find(v => v.Email == dto.VolunteerEmail).FirstOrDefaultAsync();
            }
            else
            {
                volunteer = await _mongoDb.Volunteers.Find(FilterDefinition<Volunteer>.Empty).FirstOrDefaultAsync();
            }

            if (volunteer == null)
            {
                return NotFound(new { success = false, message = "No available volunteers found." });
            }

            var assignment = new Assignment
            {
                DonationId = donation.Id!,
                VolunteerEmail = volunteer.Email,
                Status = "assigned",
                AssignedAt = DateTime.UtcNow
            };

            await _mongoDb.Assignments.InsertOneAsync(assignment);

            var updateDonation = Builders<Donation>.Update
                .Set(d => d.Status, "assigned")
                .Set(d => d.AssignedVolunteer, volunteer.Email);

            await _mongoDb.Donations.UpdateOneAsync(d => d.Id == donationId, updateDonation);

            return Ok(new
            {
                success = true,
                message = $"Volunteer {volunteer.Name} assigned successfully!",
                assigned_volunteer = volunteer
            });
        }
    }

    public class AdminLoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class AssignVolunteerDto
    {
        public string? VolunteerEmail { get; set; }
    }
}
