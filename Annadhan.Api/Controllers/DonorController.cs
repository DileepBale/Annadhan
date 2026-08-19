using Annadhan.Api.Models;
using Annadhan.Api.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Annadhan.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DonorController : ControllerBase
    {
        private readonly MongoDbService _mongoDb;

        public DonorController(MongoDbService mongoDb)
        {
            _mongoDb = mongoDb;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitDonation([FromBody] DonorSubmissionDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.FoodType))
            {
                return BadRequest(new { success = false, message = "Email and Food Type are required." });
            }

            var existingDonor = await _mongoDb.Donors.Find(d => d.Email == request.Email).FirstOrDefaultAsync();
            if (existingDonor == null)
            {
                await _mongoDb.Donors.InsertOneAsync(new Donor
                {
                    Name = request.Name,
                    Email = request.Email,
                    Phone = request.Phone,
                    Address = request.Address,
                    City = request.City,
                    State = request.State,
                    Pincode = request.Pincode,
                    CreatedAt = DateTime.UtcNow
                });
            }

            var donation = new Donation
            {
                DonorEmail = request.Email,
                DonorName = request.Name,
                DonorPhone = request.Phone,
                FoodType = request.FoodType,
                Quantity = request.Quantity,
                Description = request.Description,
                PickupAddress = request.Address,
                ExpiryDate = request.ExpiryDate,
                Status = "pending",
                CreatedAt = DateTime.UtcNow
            };

            await _mongoDb.Donations.InsertOneAsync(donation);

            return Ok(new
            {
                success = true,
                message = "Donation submitted successfully! A volunteer will be assigned soon.",
                donation_id = donation.Id
            });
        }
    }

    public class DonorSubmissionDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Pincode { get; set; } = string.Empty;
        public string FoodType { get; set; } = string.Empty;
        public string Quantity { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ExpiryDate { get; set; }
    }
}
