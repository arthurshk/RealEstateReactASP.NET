using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateReactASP.NET.Server.Models;

namespace RealEstateReactASP.NET.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly RealEstateContext _context;

        public PropertiesController(RealEstateContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
        {
            try
            {
                var properties = await _context.Properties.ToListAsync();
                return Ok(properties);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving properties.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Property>> PostProperty([FromBody] Property property)
        {
            if (property == null)
            {
                return BadRequest("Property cannot be null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Properties.Add(property);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetProperties), new { id = property.Id }, property);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the property.");
            }
        }
    }
}
