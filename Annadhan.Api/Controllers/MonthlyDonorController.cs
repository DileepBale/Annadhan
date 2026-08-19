using Annadhan.Api.Models;
using Annadhan.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Annadhan.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MonthlyDonorController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public MonthlyDonorController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterMonthlyDonor([FromBody] MonthlyDonor donor)
        {
            donor.CreatedAt = DateTime.UtcNow;
            donor.Amount = 400;
            donor.Status = "active";

            await _mongoDb.MonthlyDonors.InsertOneAsync(donor);
            return Ok(new { success = true, message = "Thank you for joining our Monthly Donor Circle!" });
        }
    }
}
