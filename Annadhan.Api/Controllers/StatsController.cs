using Annadhan.Api.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Annadhan.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public StatsController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        [HttpGet]
        public async Task<IActionResult> GetStats()
        {
            var totalDonations = await _mongoDb.Donations.CountDocumentsAsync(FilterDefinition<Models.Donation>.Empty);
            var totalVolunteers = await _mongoDb.Volunteers.CountDocumentsAsync(FilterDefinition<Models.Volunteer>.Empty);
            var totalRecipients = await _mongoDb.Recipients.CountDocumentsAsync(FilterDefinition<Models.Recipient>.Empty);
            var completedDeliveries = await _mongoDb.Assignments.CountDocumentsAsync(a => a.Status == "completed");

            return Ok(new
            {
                success = true,
                stats = new
                {
                    total_donations = totalDonations,
                    total_volunteers = totalVolunteers,
                    total_recipients = totalRecipients,
                    completed_deliveries = completedDeliveries
                }
            });
        }
    }
}
