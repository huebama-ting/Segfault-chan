using Microsoft.AspNetCore.Mvc;
using Segfault_chan.API.Services.Interfaces.UrbanDictionary;

namespace Segfault_chan.API.Controllers.UrbanDictionary
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UrbanDictionaryController : ControllerBase
    {
        private readonly IUrbanDictionaryService _urbanDictionaryService;

        public UrbanDictionaryController(IUrbanDictionaryService urbanDictionaryService)
        {
            _urbanDictionaryService = urbanDictionaryService;
        }

        [HttpGet("define")]
        public async Task<IActionResult> TermDefinition(string term)
        {
            var definitions = await _urbanDictionaryService.GetDefinitions(term);

            return Ok(definitions);
        }
    }
}
