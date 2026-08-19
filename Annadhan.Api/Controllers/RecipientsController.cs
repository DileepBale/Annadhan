using Annadhan.Api.Models;
using Annadhan.Api.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Annadhan.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipientsController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public RecipientsController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecipients()
        {
            var recipients = await _mongoDb.Recipients.Find(FilterDefinition<Recipient>.Empty).ToListAsync();
            return Ok(new { success = true, recipients });
        }

        [HttpPost]
        public async Task<IActionResult> AddRecipient([FromBody] Recipient recipient)
        {
            recipient.CreatedAt = DateTime.UtcNow;
            recipient.VerificationStatus = "verified";

            await _mongoDb.Recipients.InsertOneAsync(recipient);
            return Ok(new { success = true, message = "Recipient added successfully!", id = recipient.Id });
        }
    }
}
