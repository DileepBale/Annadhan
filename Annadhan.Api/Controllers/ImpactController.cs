using Annadhan.Api.Models;
using Annadhan.Api.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Annadhan.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImpactController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public ImpactController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        [HttpGet]
        public async Task<IActionResult> GetImpact()
        {
            var totalDonations = await _mongoDb.Donations.CountDocumentsAsync(FilterDefinition<Donation>.Empty);
            var totalVolunteers = await _mongoDb.Volunteers.CountDocumentsAsync(FilterDefinition<Volunteer>.Empty);
            var totalRecipients = await _mongoDb.Recipients.CountDocumentsAsync(FilterDefinition<Recipient>.Empty);
            var completedDeliveries = await _mongoDb.Assignments.CountDocumentsAsync(a => a.Status == "completed");

            var currentMonth = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
            var monthlyDonations = await _mongoDb.Donations.CountDocumentsAsync(d => d.CreatedAt >= currentMonth);
            var monthlyDeliveries = await _mongoDb.Assignments.CountDocumentsAsync(a => a.AssignedAt >= currentMonth && a.Status == "completed");

            return Ok(new
            {
                success = true,
                stats = new
                {
                    total_donations = totalDonations,
                    total_volunteers = totalVolunteers,
                    total_recipients = totalRecipients,
                    completed_deliveries = completedDeliveries,
                    monthly_donations = monthlyDonations,
                    monthly_deliveries = monthlyDeliveries
                }
            });
        }
    }
}
