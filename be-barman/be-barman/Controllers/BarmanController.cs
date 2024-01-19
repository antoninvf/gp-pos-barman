using be_barman.Data;
using be_barman.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public ActionResult<KitchenQueueEntity?> GetKitchenQueueItem(string uuid)
    {
        return new ActionResult<KitchenQueueEntity?>(_dbContext.KitchenQueueEntities.Find(uuid));
    }

    [HttpGet("kitchenQueue/{uuid}/customer")]
    public ActionResult<CustomerEntity?> GetKitchenQueueItemCustomer(string uuid)
    {
        return new ActionResult<CustomerEntity?>(_dbContext.CustomerEntities.FirstOrDefault(x => x.Ordered.Contains(uuid)));
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
    public ActionResult<IEnumerable<ProductEntity>> GetProducts()
    {
        return new ActionResult<IEnumerable<ProductEntity>>(_dbContext.ProductEntities.OrderBy(x => x.Category).ToList());
    }

    [HttpGet("product/{uuid}")]
    public ActionResult<ProductEntity?> GetProduct(string uuid)
    {
        return new ActionResult<ProductEntity?>(_dbContext.ProductEntities.Find(uuid));
    }

    [HttpPost("products")]
    public IActionResult PostProduct([FromBody] ProductEntity productEntity)
    {
        // ID should not have spaces and should have minecraft-like IDs, like chicken_soup or steak
        if (productEntity.ID.Trim() == "") return BadRequest();
        if (productEntity.ID.Any(char.IsWhiteSpace)) return BadRequest();
        if (productEntity.Name.Trim() == "") return BadRequest();

        _dbContext.ProductEntities.Add(productEntity);
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpDelete("products/{id}")]
    public IActionResult DeleteProduct(string id)
    {
        var productEntity = _dbContext.ProductEntities.Find(id);
        if (productEntity == null) return NotFound();
        _dbContext.ProductEntities.Remove(productEntity);
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpDelete("products/clear")]
    public IActionResult ClearProducts()
    {
        _dbContext.ProductEntities.RemoveRange(_dbContext.ProductEntities);
        _dbContext.SaveChanges();
        return Ok();
    }

    //? Tables
    [HttpGet("tables")]
    public ActionResult<IEnumerable<TableEntity>> GetTables()
    {
        return new ActionResult<IEnumerable<TableEntity>>(_dbContext.TableEntities.OrderBy(x => x.RoomID).ToList());
    }

    [HttpGet("table/{id}")]
    public ActionResult<TableEntity?> GetTable(string id)
    {
        return new ActionResult<TableEntity?>(_dbContext.TableEntities.Find(id));
    }

    [HttpGet("table/{id}/customer")]
    public ActionResult<IEnumerable<CustomerEntity?>> GetCustomerByTableId(string id)
    {
        return new ActionResult<IEnumerable<CustomerEntity?>>(_dbContext.CustomerEntities.Where(x => x.TableID.ToLower().Equals(id.ToLower())).ToList());
    }

    [HttpGet("tables/{room}")]
    public ActionResult<IEnumerable<TableEntity>> GetTablesByRoom(string room)
    {
        return new ActionResult<IEnumerable<TableEntity>>(_dbContext.TableEntities.Where(x => x.RoomID.ToLower().Equals(room.ToLower())).ToList());
    }

    [HttpPost("tables")]
    public IActionResult PostTables([FromBody] TableEntity tableEntity)
    {
        // Room IDs shouldn't have spaces
        if (tableEntity.RoomID.Trim() == "") return BadRequest();
        if (tableEntity.RoomID.Any(char.IsWhiteSpace)) return BadRequest();

        _dbContext.TableEntities.Add(tableEntity);
        _dbContext.SaveChanges();
        return Ok();
    }

    //? Customers
    [HttpGet("customers")]
    public ActionResult<IEnumerable<CustomerEntity>> GetCustomers()
    {
        return new ActionResult<IEnumerable<CustomerEntity>>(_dbContext.CustomerEntities.OrderByDescending(x => x.CreationTimestamp).ToList());
    }

    [HttpGet("customers/{uuid}")]
    public ActionResult<CustomerEntity?> GetCustomer(string uuid)
    {
        return new ActionResult<CustomerEntity?>(_dbContext.CustomerEntities.Find(uuid));
    }

    [HttpPost("customers")]
    public IActionResult PostCustomer([FromBody] CustomerEntity customerEntity)
    {
        customerEntity.UUID = Guid.NewGuid().ToString();
        customerEntity.CreationTimestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds();
        if (customerEntity.TableID == "") return BadRequest();

        _dbContext.CustomerEntities.Add(customerEntity);
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpDelete("customers/{uuid}")]
    public IActionResult DeleteCustomer(string uuid)
    {
        var customerEntity = _dbContext.CustomerEntities.Find(uuid);
        if (customerEntity == null) return NotFound();
        _dbContext.CustomerEntities.Remove(customerEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
}