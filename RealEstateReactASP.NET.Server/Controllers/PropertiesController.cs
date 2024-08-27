using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateReactASP.NET.Server.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RealEstateReactASP.NET.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly RealEstateContext _context;
        //dependency injection
        public PropertiesController(RealEstateContext context)
        {
            _context = context;
        }
        //retrieves from the list of properties

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
                Console.Error.WriteLine($"Error retrieving properties: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving properties.");
            }
        }
        //adds to the list of properties
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
                Console.Error.WriteLine($"Error saving property: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the property.");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Unexpected error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }
        //deletes an item from the list of properties
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null)
            {
                return NotFound();
            }

            _context.Properties.Remove(property);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
