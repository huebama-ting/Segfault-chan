using Microsoft.AspNetCore.Mvc;
using Segfault_chan.API.Services.Interfaces.RandomCat;

namespace Segfault_chan.API.Controllers.RandomCat
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RandomCatController : ControllerBase
    {
        private readonly IRandomCatService _randomCatService;

        public RandomCatController(IRandomCatService randomCatService)
        {
            _randomCatService = randomCatService;
        }

        [HttpGet]
        public async Task<IActionResult> RandomCat()
        {
            var file = await _randomCatService.GetRandomCatImage();

            return Ok(file);
        }
    }
}
