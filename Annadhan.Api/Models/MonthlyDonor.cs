using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Annadhan.Api.Models
{
    public class MonthlyDonor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;

        [BsonElement("phone")]
        public string Phone { get; set; } = string.Empty;

        [BsonElement("amount")]
        public int Amount { get; set; } = 400;

        [BsonElement("type")]
        public string Type { get; set; } = "monthly";

        [BsonElement("status")]
        public string Status { get; set; } = "active";

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
