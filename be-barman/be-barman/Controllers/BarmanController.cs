using be_barman.Data;
using be_barman.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

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

    //? KitchenQueue
    [HttpGet("kitchenQueue")]
    public ActionResult<IEnumerable<KitchenQueueEntity>> GetKitchenQueue()
    {
        return new ActionResult<IEnumerable<KitchenQueueEntity>>(_dbContext.KitchenQueueEntities.OrderByDescending(x => x.Timestamp).ToList());
    }

    [HttpGet("kitchenQueue/{uuid}")]
    public ActionResult<KitchenQueueEntity?> GetKitchenQueue(string uuid)
    {
        return new ActionResult<KitchenQueueEntity?>(_dbContext.KitchenQueueEntities.Find(uuid));
}
    
    [HttpPost("kitchenQueue")]
    public IActionResult PostKitchenQueue([FromBody] KitchenQueueEntity kitchenQueueEntity)
    {
        kitchenQueueEntity.UUID = Guid.NewGuid().ToString();
        kitchenQueueEntity.Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds();
        if (kitchenQueueEntity.ProductID == "") return BadRequest();
        _dbContext.KitchenQueueEntities.Add(kitchenQueueEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
    
    [HttpDelete("kitchenQueue/{uuid}")]
    public IActionResult DeleteKitchenQueue(string uuid)
    {
        var kitchenQueueEntity = _dbContext.KitchenQueueEntities.Find(uuid);
        if (kitchenQueueEntity == null) return NotFound();
        _dbContext.KitchenQueueEntities.Remove(kitchenQueueEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
    
    [HttpDelete("kitchenQueue/clear")]
    public IActionResult ClearKitchenQueue()
    {
        _dbContext.KitchenQueueEntities.RemoveRange(_dbContext.KitchenQueueEntities);
        _dbContext.SaveChanges();
        return Ok();
    }

    //? Products
    [HttpGet("products")]
    public IActionResult GetProducts()
    {
        return Ok(_dbContext.ProductEntities.ToList());
    }

    [HttpGet("product/{uuid}")]
    public IActionResult GetProducts(string uuid)
    {
        return Ok(_dbContext.ProductEntities.Find(uuid));
    }
    
    [HttpPost("products")]
    public IActionResult PostProducts([FromBody] ProductEntity productEntity)
    {
        _dbContext.ProductEntities.Add(productEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
    
    //? Tables
    [HttpGet("tables")]
    public IActionResult GetTables()
    {
        return Ok(_dbContext.TableEntities.ToList());
    }

    [HttpGet("table/{uuid}")]
    public IActionResult GetTables(string uuid)
    {
        return Ok(_dbContext.TableEntities.Find(uuid));
    }
    
    [HttpGet("tables/{room}")]
    public IActionResult GetTablesByRoom(string room)
    {
        return Ok(_dbContext.TableEntities.Where(x => x.Room.ToLower().Equals(room.ToLower())).ToList());
    }
    
    [HttpPost("tables")]
    public IActionResult PostTables([FromBody] TableEntity tableEntity)
    {
        _dbContext.TableEntities.Add(tableEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
}