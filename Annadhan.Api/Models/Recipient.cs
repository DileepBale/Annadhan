using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Annadhan.Api.Models
{
    public class Recipient
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("phone")]
        public string Phone { get; set; } = string.Empty;

        [BsonElement("address")]
        public string Address { get; set; } = string.Empty;

        [BsonElement("city")]
        public string City { get; set; } = string.Empty;

        [BsonElement("state")]
        public string State { get; set; } = string.Empty;

        [BsonElement("pincode")]
        public string Pincode { get; set; } = string.Empty;

        [BsonElement("family_size")]
        public int FamilySize { get; set; } = 1;

        [BsonElement("verification_status")]
        public string VerificationStatus { get; set; } = "verified";

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
