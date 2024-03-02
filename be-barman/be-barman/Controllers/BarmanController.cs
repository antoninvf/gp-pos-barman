using be_barman.Data;
using be_barman.Entities;
using be_barman.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be_barman.Controllers;

[EnableCors("CorsPolicy")]
[ApiController]
[Route("")]
public class BarmanController : ControllerBase
{
    // ReSharper disable once NotAccessedField.Local
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
        return new ActionResult<IEnumerable<KitchenQueueEntity>>(_dbContext.KitchenQueueEntities
            .Include(x => x.Order)
            .Include(x => x.Order.Customer)
            .Include(x => x.Order.Customer.Table)
            .Include(x => x.Order.Product)
            .OrderByDescending(x => x.Timestamp).ToList());
    }

    [HttpGet("kitchenQueueItem/{id}")]
    public ActionResult<KitchenQueueEntity> GetKitchenQueueItem(int id)
    {
        var kq = _dbContext.KitchenQueueEntities.Find(id);
        if (kq == null) return NotFound("Kitchen queue item not found");
        return new ActionResult<KitchenQueueEntity>(kq);
    }

    [HttpGet("kitchenQueueItem/{id}/customer")]
    public ActionResult<CustomerEntity> GetKitchenQueueItemCustomer(int id)
    {
        var kq = _dbContext.KitchenQueueEntities
            .Include(x => x.Order.Customer)
            .Include(x => x.Order.Customer.Table)
            .Include(x => x.Order.Product)
            .FirstOrDefault(x => x.ID == id);
        if (kq == null) return NotFound("Kitchen queue item not found");
        return new ActionResult<CustomerEntity>(kq.Order.Customer);
    }

    [HttpDelete("kitchenQueueItem/{id}")]
    public IActionResult DeleteKitchenQueueItem(int id)
    {
        var kitchenQueueEntity = _dbContext.KitchenQueueEntities.Find(id);
        if (kitchenQueueEntity == null) return NotFound("Kitchen queue item not found");
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

    [HttpGet("product/{id}")]
    public ActionResult<ProductEntity?> GetProduct(string id)
    {
        return new ActionResult<ProductEntity?>(_dbContext.ProductEntities.Find(id));
    }
    
    [HttpPut("product/{id}")]
    public IActionResult PutProduct(string id, [FromBody] ProductModel productModel)
    {
        var productEntity = _dbContext.ProductEntities.Find(id);
        if (productEntity == null) return NotFound("Product not found");
        productEntity.Name = productModel.Name;
        productEntity.Category = productModel.Category;
        productEntity.Description = productModel.Description;
        productEntity.ImageURL = productModel.ImageURL;
        productEntity.Price = productModel.Price;
        productEntity.SendToKitchenQueue = productModel.SendToKitchenQueue;
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpPost("product")]
    public IActionResult PostProduct([FromBody] ProductModel productModel)
    {
        if (productModel.ProductID.Trim() == "") return BadRequest("Product ID cannot be empty");
        if (productModel.ProductID.Any(char.IsWhiteSpace)) return BadRequest("Product ID cannot contain spaces");
        if (productModel.Name.Trim() == "") return BadRequest("Product name cannot be empty");
        if (productModel.Category.Trim() == "") return BadRequest("Product category cannot be empty");

        var productEntity = new ProductEntity
        {
            ID = productModel.ProductID,
            Name = productModel.Name,
            Category = productModel.Category,
            Description = productModel.Description,
            ImageURL = productModel.ImageURL,
            Price = productModel.Price,
            SendToKitchenQueue = productModel.SendToKitchenQueue
        };
        _dbContext.ProductEntities.Add(productEntity);
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpDelete("product/{id}")]
    public IActionResult DeleteProduct(string id)
    {
        var productEntity = _dbContext.ProductEntities.Find(id);
        if (productEntity == null) return NotFound("Product not found");
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

    [HttpGet("products/categories")]
    public ActionResult<IEnumerable<string>> GetProductCategories()
    {
        if (!_dbContext.ProductEntities.Any()) return NotFound("No products found");
        var categories = _dbContext.ProductEntities.Select(x => x.Category).Distinct().ToList();
        return new ActionResult<IEnumerable<string>>(categories);
    }

    //? Tables
    [HttpGet("tables")]
    public ActionResult<IEnumerable<TableEntity>> GetTables()
    {
        return new ActionResult<IEnumerable<TableEntity>>(_dbContext.TableEntities.OrderBy(x => x.Room).ToList());
    }

    [HttpGet("table/{id}")]
    public ActionResult<TableEntity?> GetTable(int id)
    {
        return new ActionResult<TableEntity?>(_dbContext.TableEntities.Find(id));
    }
    
    [HttpPut("table/{id}")]
    public IActionResult PutTable(int id, [FromBody] TableModel tableModel)
    {
        var tableEntity = _dbContext.TableEntities.Find(id);
        if (tableEntity == null) return NotFound("Table not found");
        tableEntity.Room = tableModel.Room;
        tableEntity.Name = tableModel.Room[0].ToString().ToUpper() + (_dbContext.TableEntities.Count(x => x.Room.ToLower().Equals(tableModel.Room.ToLower())) + 1);
        
        // go through every table and update the names
        // TODO: fix this
        var tables = _dbContext.TableEntities.Where(x => x.Room.ToLower().Equals(tableModel.Room.ToLower())).ToList();
        for (var i = 0; i < tables.Count; i++)
        {
            tables[i].Name = tableEntity.Room[0].ToString().ToUpper() + (i + 1);
        }
        
        _dbContext.SaveChanges();
        return Ok();
    }
    
    [HttpDelete("table/{id}")]
    public IActionResult DeleteTable(int id)
    {
        var tableEntity = _dbContext.TableEntities.Find(id);
        if (tableEntity == null) return NotFound("Table not found");
        _dbContext.TableEntities.Remove(tableEntity);
        
        // go through every table and update the name if the room matches
        var tables = _dbContext.TableEntities.Where(x => x.Room.ToLower().Equals(tableEntity.Room.ToLower())).ToList();
        for (var i = 0; i < tables.Count; i++)
        {
            tables[i].Name = tableEntity.Room[0].ToString().ToUpper() + (i + 1);
        }
        
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpGet("table/{id}/customer")]
    public ActionResult<IEnumerable<CustomerEntity?>> GetCustomerByTableId(int id)
    {
        return new ActionResult<IEnumerable<CustomerEntity?>>(_dbContext.CustomerEntities
            .Include(x => x.Table)
            .Where(x => x.Table.ID == id)
            .ToList());
    }

    [HttpGet("tables/{room}")]
    public ActionResult<IEnumerable<TableEntity>> GetTablesByRoom(string room)
    {
        return new ActionResult<IEnumerable<TableEntity>>(_dbContext.TableEntities
            .Where(x => x.Room.ToLower().Equals(room.ToLower()))
            .ToList());
    }
    
    [HttpGet("tables/rooms")]
    public ActionResult<IEnumerable<string>> GetRooms()
    {
        if (!_dbContext.TableEntities.Any()) return NotFound("No tables found");
        var rooms = _dbContext.TableEntities.Select(x => x.Room).Distinct().ToList();
        return new ActionResult<IEnumerable<string>>(rooms);
    }

    [HttpPost("table")]
    public IActionResult PostTable([FromBody] TableModel tableModel)
    {
        if (tableModel.Room.Trim() == "") return BadRequest("Room name cannot be empty");

        var tableEntity = new TableEntity
        {
            Name = tableModel.Room[0].ToString().ToUpper() + (_dbContext.TableEntities.Count(x => x.Room.ToLower().Equals(tableModel.Room.ToLower())) + 1),
            Room = tableModel.Room.ToLower()
        };
        _dbContext.TableEntities.Add(tableEntity);
        _dbContext.SaveChanges();
        return Ok();
    }

    //? Customers
    [HttpGet("customers")]
    public ActionResult<IEnumerable<CustomerEntity>> GetCustomers()
    {
        return new ActionResult<IEnumerable<CustomerEntity>>(_dbContext.CustomerEntities
            .Include(x => x.Table)
            .OrderBy(x => x.CreationTimestamp).ToList());
    }

    [HttpGet("customer/{uuid}")]
    public ActionResult<CustomerEntity?> GetCustomer(string uuid)
    {
        return new ActionResult<CustomerEntity?>(_dbContext.CustomerEntities
            .Include(x => x.Table)
            .FirstOrDefault(x => x.UUID == uuid));
    }

    [HttpPost("customer")]
    public IActionResult PostCustomer([FromBody] CustomerModel customerModel)
    {
        var table = _dbContext.TableEntities.Find(customerModel.TableID);
        if (table == null) return NotFound("Table not found");

        var customerEntity = new CustomerEntity
        {
            UUID = Guid.NewGuid().ToString(),
            Table = table,
            CreationTimestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds()
        };

        _dbContext.CustomerEntities.Add(customerEntity);
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpDelete("customer/{uuid}")]
    public IActionResult DeleteCustomer(string uuid)
    {
        var customerEntity = _dbContext.CustomerEntities.Find(uuid);
        if (customerEntity == null) return NotFound("Customer not found");
        _dbContext.CustomerEntities.Remove(customerEntity);
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpDelete("customers/clear")]
    public IActionResult ClearCustomers()
    {
        _dbContext.CustomerEntities.RemoveRange(_dbContext.CustomerEntities);
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpGet("customer/{uuid}/orders")]
    public ActionResult<IEnumerable<OrderEntity>> GetCustomerOrders(string uuid)
    {
        return new ActionResult<IEnumerable<OrderEntity>>(_dbContext.OrderEntities
            .Include(x => x.Product)
            .Include(x => x.Customer)
            .Include(x => x.Customer.Table)
            .Where(x => x.Customer.UUID == uuid)
            .OrderBy(x => x.Timestamp)
            .ToList());
    }

    [HttpGet("customer/{uuid}/orders/total")]
    // Counts the total the customer has to pay
    public ActionResult<int> GetCustomerOrdersTotal(string uuid)
    {
        var orders = _dbContext.OrderEntities
            .Include(x => x.Product)
            .Where(x => x.Customer.UUID == uuid)
            .ToList();
        return new ActionResult<int>(orders.Sum(x => x.Product.Price));
    }

    //? Orders
    [HttpGet("orders")]
    public ActionResult<IEnumerable<OrderEntity>> GetOrders()
    {
        return new ActionResult<IEnumerable<OrderEntity>>(_dbContext.OrderEntities
            .Include(x => x.Customer)
            .Include(x => x.Product)
            .OrderBy(x => x.Timestamp)
            .ToList());
    }

    [HttpGet("order/{id}")]
    public ActionResult<OrderEntity?> GetOrder(int id)
    {
        return new ActionResult<OrderEntity?>(_dbContext.OrderEntities
            .Include(x => x.Customer)
            .Include(x => x.Product)
            .FirstOrDefault(x => x.ID == id));
    }

    [HttpGet("order/{id}/customer")]
    public ActionResult<CustomerEntity?> GetOrderCustomer(int id)
    {
        var order = _dbContext.OrderEntities
            .Include(x => x.Customer)
            .FirstOrDefault(x => x.ID == id);
        if (order == null) return NotFound("Order not found");
        return new ActionResult<CustomerEntity?>(order.Customer);
    }

    [HttpPost("order")]
    public IActionResult PostOrder([FromBody] OrderModel orderModel)
    {
        var customer = _dbContext.CustomerEntities.Find(orderModel.CustomerUUID);
        if (customer == null) return NotFound("Customer not found");
        var product = _dbContext.ProductEntities.Find(orderModel.ProductID);
        if (product == null) return NotFound("Product not found");

        var orderEntity = new OrderEntity
        {
            Customer = customer,
            Product = product,
            Quantity = orderModel.Quantity,
            Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
            Notes = orderModel.Notes
        };

        // When order gets posted, it gets added to orders AND kitchen queue, but only if the order's product has SendToKitchenQueue set to true
        if (product.SendToKitchenQueue)
        {
            var kitchenQueueEntity = new KitchenQueueEntity
            {
                Order = orderEntity,
                Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds()
            };
            _dbContext.KitchenQueueEntities.Add(kitchenQueueEntity);
        }

        _dbContext.OrderEntities.Add(orderEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
    
    //? Users
    [HttpGet("users")]
    public ActionResult<IEnumerable<UserEntity>> GetUsers()
    {
        return new ActionResult<IEnumerable<UserEntity>>(_dbContext.UserEntities.ToList());
    }
    [HttpGet("user/{uuid}")]
    public ActionResult<UserEntity?> GetUser(string uuid)
    {
        return new ActionResult<UserEntity?>(_dbContext.UserEntities.Find(uuid));
    }
    [HttpPost("user")]
    public IActionResult PostUser([FromBody] UserModel userModel)
    {
        if (userModel.Username.Trim() == "") return BadRequest("Username cannot be empty");
        if (userModel.Password.Trim() == "") return BadRequest("Password cannot be empty");
        if (userModel.Password.Length < 8) return BadRequest("Password must be at least 8 characters long");

        var userEntity = new UserEntity
        {
            UUID = Guid.NewGuid().ToString(),
            Username = userModel.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(userModel.Password)
        };
        _dbContext.UserEntities.Add(userEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
    [HttpPost("user/login")]
    public ActionResult<UserModel> PostUserLogin([FromBody] UserModel userModel)
    {
        var user = _dbContext.UserEntities.FirstOrDefault(x => x.Username == userModel.Username);
        if (user == null) return NotFound("User not found");
        if (BCrypt.Net.BCrypt.Verify(userModel.Password, _dbContext.UserEntities.FirstOrDefault(x => x.Username == userModel.Username)?.Password))
        {
            // return user in json
            _logger.LogInformation("User logged in: " + user.Username);
            return new ActionResult<UserModel>(new UserModel {Username = user.Username, Password = user.Password});
        }
        _logger.LogInformation("Incorrect password for user: " + user.Username);
        return Unauthorized("Incorrect password");
    }

    [HttpDelete("user/{uuid}")]
    public IActionResult DeleteUser(string uuid)
    {
        var userEntity = _dbContext.UserEntities.Find(uuid);
        if (userEntity == null) return NotFound("User not found");
        _dbContext.UserEntities.Remove(userEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
    
    //? Configuration

    [HttpGet("configuration")]
    public ActionResult<IEnumerable<ConfigurationEntity>> GetConfiguration()
    {
        return new ActionResult<IEnumerable<ConfigurationEntity>>(_dbContext.ConfigurationEntities.ToList());
    }
    
    [HttpGet("configuration/{settingName}")]
    public ActionResult<string> GetConfiguration(string settingName)
    {
        var configuration = _dbContext.ConfigurationEntities.FirstOrDefault(x => x.SettingName == settingName);
        if (configuration == null) return NotFound("Setting not found");
        return new ActionResult<string>(configuration.Value);
    }
    
    [HttpPost("configuration")]
    public IActionResult PostConfiguration([FromBody] ConfigurationModel configurationModel)
    {
        var configurationEntity = new ConfigurationEntity
        {
            SettingName = configurationModel.SettingName,
            Value = configurationModel.Value
        };
        _dbContext.ConfigurationEntities.Add(configurationEntity);
        _dbContext.SaveChanges();
        return Ok();
    }
}