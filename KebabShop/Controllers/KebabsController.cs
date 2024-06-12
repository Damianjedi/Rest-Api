using KebabShop.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KebabShop.Models;

namespace KebabShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KebabsController : ControllerBase
    {
        private readonly KebabContext _context;

        public KebabsController(KebabContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kebab>>> GetKebabs()
        {
            return await _context.Kebabs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kebab>> GetKebab(int id)
        {
            var kebab = await _context.Kebabs.FindAsync(id);

            if (kebab == null)
            {
                return NotFound(new { Message = "Kebab not found" });
            }

            return kebab;
        }

        [HttpPost]
        public async Task<ActionResult<Kebab>> PostKebab(Kebab kebab)
        {
            _context.Kebabs.Add(kebab);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetKebab), new { id = kebab.Id }, kebab);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutKebab(int id, Kebab kebab)
        {
            if (id != kebab.Id)
            {
                return BadRequest(new {Message = "Id mismatch"});
            }
            _context.Entry(kebab).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KebabExists(id))
                {
                    return NotFound(new {Message = "Kebab not found"});
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKebab(int id)
        {
            var kebab = await _context.Kebabs.FindAsync(id);
            if (kebab == null)
            {
                return NotFound(new { Message = "Kebab not found" });
            }

            _context.Kebabs.Remove(kebab);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KebabExists(int id)
        {
            return _context.Kebabs.Any(e => e.Id == id);
        }
    }
}
