using be_barman.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be_barman.Controllers;

[EnableCors("CorsPolicy")]
[ApiController]
[Route("")]
public class BarmanController : ControllerBase
{
    private readonly ILogger<BarmanController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public BarmanController(ApplicationDbContext dbContext, ILogger<BarmanController> logger)
    {
        _logger = logger;
        _dbContext = dbContext;
    }
    
    [HttpGet]
    public ActionResult Get()
    {
        return Ok("Server is running");
    }

    [HttpGet("foodqueue")]
    public ActionResult GetFoodQueue()
    {
        // return json of all foodqueue
        return Ok(_dbContext.FoodQueueEntities.ToList());
    }
    
}