using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BiljeskeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BiljeskeController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Biljeska>>> Get()
        {
            try
            {
                var biljeske = await _context.Biljeske.ToListAsync();

                return Ok(biljeske);
            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                 ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Biljeska>> GetBiljeska(int id)
        {
            try
            {
                var biljeska = await _context.Biljeske.FirstOrDefaultAsync(x => x.Id == id);
                return Ok(biljeska);
            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                  ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Biljeska>> Insert(InsertDto insertDto)
        {
            try
            {
                var biljeska = new Biljeska
                {
                    Naziv = insertDto.Naziv,
                    Sadrzaj = insertDto.Sadrzaj
                };

                _context.Biljeske.Add(biljeska);
                await _context.SaveChangesAsync();

                return Ok(biljeska);

            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                            ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, UpdateDto updateDto)
        {
            try
            {
                if(id == 0 || updateDto == null)
                {
                    return BadRequest(ModelState);
                }

                var biljeska = await _context.Biljeske.FirstOrDefaultAsync(b => b.Id == id);

                if (biljeska == null) return NotFound();

                _mapper.Map(updateDto, biljeska);

                _context.Biljeske.Update(biljeska);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                           ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var biljeska = await _context.Biljeske.FindAsync(id);
                if(biljeska != null)
                {
                    _context.Biljeske.Remove(biljeska);
                    _context.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                         ex.Message);
            }
        }
    }
}
