using be_barman.Data;
using be_barman.Entities;
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

    //? KitchenQueue
    [HttpGet("kitchenQueue")]
    public ActionResult GetKitchenQueue()
    {
        return Ok(_dbContext.KitchenQueueEntities.ToList());
    }

    [HttpGet("kitchenQueue/{uuid}")]
    public ActionResult GetKitchenQueue(string uuid)
    {
        return Ok(_dbContext.KitchenQueueEntities.Find(uuid));
    }
    
    [HttpPost("kitchenQueue")]
    public ActionResult PostKitchenQueue([FromBody] KitchenQueueEntity kitchenQueueEntity)
    {
        _dbContext.KitchenQueueEntities.Add(kitchenQueueEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
    
    [HttpDelete("kitchenQueue/{uuid}")]
    public ActionResult DeleteKitchenQueue(string uuid)
    {
        if (_dbContext.KitchenQueueEntities.Find(uuid) == null) return NotFound();
        _dbContext.KitchenQueueEntities.Remove(_dbContext.KitchenQueueEntities.Find(uuid));
        _dbContext.SaveChanges();
        return Ok();
    }
    
    [HttpDelete("kitchenQueue/clear")]
    public ActionResult ClearKitchenQueue()
    {
        _dbContext.KitchenQueueEntities.RemoveRange(_dbContext.KitchenQueueEntities);
        _dbContext.SaveChanges();
        return Ok();
    }

    //? Products
    [HttpGet("products")]
    public ActionResult GetProducts()
    {
        return Ok(_dbContext.ProductEntities.ToList());
    }

    [HttpGet("product/{uuid}")]
    public ActionResult GetProducts(string uuid)
    {
        return Ok(_dbContext.ProductEntities.Find(uuid));
    }
    
    [HttpPost("products")]
    public ActionResult PostProducts([FromBody] ProductEntity productEntity)
    {
        _dbContext.ProductEntities.Add(productEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
    
    //? Tables
    [HttpGet("tables")]
    public ActionResult GetTables()
    {
        return Ok(_dbContext.TableEntities.ToList());
    }

    [HttpGet("table/{uuid}")]
    public ActionResult GetTables(string uuid)
    {
        return Ok(_dbContext.TableEntities.Find(uuid));
    }
    
    [HttpGet("tables/{room}")]
    public ActionResult GetTablesByRoom(string room)
    {
        return Ok(_dbContext.TableEntities.Where(x => x.Room.ToLower().Equals(room.ToLower())).ToList());
    }
    
    [HttpPost("tables")]
    public ActionResult PostTables([FromBody] TableEntity tableEntity)
    {
        _dbContext.TableEntities.Add(tableEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
}