using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Annadhan.Api.Models
{
    public class Assignment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("donation_id")]
        public string DonationId { get; set; } = string.Empty;

        [BsonElement("volunteer_email")]
        public string VolunteerEmail { get; set; } = string.Empty;

        [BsonElement("status")]
        public string Status { get; set; } = "assigned";

        [BsonElement("assigned_at")]
        public DateTime AssignedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("completed_at")]
        public DateTime? CompletedAt { get; set; }

        [BsonIgnore]
        public Donation? Donation { get; set; }
    }
}
