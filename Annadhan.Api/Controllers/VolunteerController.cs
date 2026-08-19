using Annadhan.Api.Models;
using Annadhan.Api.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Annadhan.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VolunteerController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public VolunteerController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Volunteer volunteerData)
        {
            if (string.IsNullOrWhiteSpace(volunteerData.Email))
            {
                return BadRequest(new { success = false, message = "Email is required" });
            }

            var existing = await _mongoDb.Volunteers.Find(v => v.Email == volunteerData.Email).FirstOrDefaultAsync();
            if (existing != null)
            {
                volunteerData.Id = existing.Id;
                await _mongoDb.Volunteers.ReplaceOneAsync(v => v.Email == volunteerData.Email, volunteerData);
            }
            else
            {
                volunteerData.CreatedAt = DateTime.UtcNow;
                await _mongoDb.Volunteers.InsertOneAsync(volunteerData);
            }

            return Ok(new { success = true, message = "Volunteer registration successful!", email = volunteerData.Email });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] VolunteerLoginDto login)
        {
            var volunteer = await _mongoDb.Volunteers.Find(v => v.Email == login.Email).FirstOrDefaultAsync();
            if (volunteer == null)
            {
                return NotFound(new { success = false, message = "Volunteer not found. Please register first." });
            }

            return Ok(new { success = true, volunteer });
        }

        [HttpGet("assignments")]
        public async Task<IActionResult> GetAssignments([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest(new { success = false, message = "Email is required" });
            }

            var volunteer = await _mongoDb.Volunteers.Find(v => v.Email == email).FirstOrDefaultAsync();
            if (volunteer == null)
            {
                return NotFound(new { success = false, message = "Volunteer not found" });
            }

            var assignments = await _mongoDb.Assignments.Find(a => a.VolunteerEmail == email).ToListAsync();
            foreach (var a in assignments)
            {
                if (!string.IsNullOrEmpty(a.DonationId))
                {
                    a.Donation = await _mongoDb.Donations.Find(d => d.Id == a.DonationId).FirstOrDefaultAsync();
                }
            }

            return Ok(new { success = true, volunteer, assignments });
        }

        [HttpPost("complete-task/{assignmentId}")]
        public async Task<IActionResult> CompleteTask(string assignmentId)
        {
            var assignment = await _mongoDb.Assignments.Find(a => a.Id == assignmentId).FirstOrDefaultAsync();
            if (assignment == null)
            {
                return NotFound(new { success = false, message = "Assignment not found" });
            }

            var updateAssignment = Builders<Assignment>.Update
                .Set(a => a.Status, "completed")
                .Set(a => a.CompletedAt, DateTime.UtcNow);

            await _mongoDb.Assignments.UpdateOneAsync(a => a.Id == assignmentId, updateAssignment);

            if (!string.IsNullOrEmpty(assignment.DonationId))
            {
                var updateDonation = Builders<Donation>.Update.Set(d => d.Status, "completed");
                await _mongoDb.Donations.UpdateOneAsync(d => d.Id == assignment.DonationId, updateDonation);
            }

            return Ok(new { success = true, message = "Delivery completed successfully!" });
        }
    }

    public class VolunteerLoginDto
    {
        public string Email { get; set; } = string.Empty;
    }
}
