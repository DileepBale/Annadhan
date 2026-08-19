using Microsoft.AspNetCore.Mvc;

namespace Annadhan.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        [HttpPost]
        public IActionResult SubmitContact([FromBody] ContactMessageDto dto)
        {
            return Ok(new { success = true, message = "Thank you for your message! We will get back to you soon." });
        }
    }

    public class ContactMessageDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
