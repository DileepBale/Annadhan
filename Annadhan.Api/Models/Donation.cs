using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Annadhan.Api.Models
{
    public class Donation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("donor_email")]
        public string DonorEmail { get; set; } = string.Empty;

        [BsonElement("donor_name")]
        public string DonorName { get; set; } = string.Empty;

        [BsonElement("donor_phone")]
        public string DonorPhone { get; set; } = string.Empty;

        [BsonElement("food_type")]
        public string FoodType { get; set; } = string.Empty;

        [BsonElement("quantity")]
        public string Quantity { get; set; } = string.Empty;

        [BsonElement("description")]
        public string Description { get; set; } = string.Empty;

        [BsonElement("pickup_address")]
        public string PickupAddress { get; set; } = string.Empty;

        [BsonElement("expiry_date")]
        public string? ExpiryDate { get; set; }

        [BsonElement("status")]
        public string Status { get; set; } = "pending";

        [BsonElement("assigned_volunteer")]
        public string? AssignedVolunteer { get; set; }

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
