using dotenv.net;
using flwnStatus.Data;
using flwnStatus.Entities;
using flwnStatus.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace flwnStatus.Controllers;

[EnableCors("CorsPolicy")]
[ApiController]
[Route("")]
public class StatusController : ControllerBase
{
    private readonly ILogger<StatusController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public StatusController(ApplicationDbContext dbContext, ILogger<StatusController> logger)
    {
        _logger = logger;
        _dbContext = dbContext;

        if (MachineList.Machines.Count == 0)
        {
           MachineList.Machines = _dbContext.StatusEntities.ToList().Select(statusEntity => new Machine
            {
                Name = statusEntity.Name,
                Type = statusEntity.Type,
                Description = statusEntity.Description,
                UUID = statusEntity.UUID,
                Location = statusEntity.Location
            }).ToList();
        }
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(MachineList.Machines);
    }

    [HttpPost]
    public IActionResult Post(Machine postMachine)
    {
        DotEnv.Load(options: new DotEnvOptions(envFilePaths: new [] { ".env" }));
        //? Authorization
        if (!Request.Headers.ContainsKey("Authorization")) return Unauthorized();
        if (Request.Headers["Authorization"] != DotEnv.Read()["AUTH_KEY"]) return Unauthorized();

        postMachine.LastSeen = DateTime.Now;
        postMachine.Online = true;
        
        // update or create machine in MachineList.Machines
        var existingMachine = MachineList.Machines.FirstOrDefault(existingMachine => existingMachine.UUID == postMachine.UUID);
        if (existingMachine != null)
        {
            MachineList.Machines.Remove(existingMachine);
            MachineList.Machines.Add(postMachine);
        }
        else
        {
            MachineList.Machines.Add(postMachine);
        }

        // check if in db
        var statusEntityExists = _dbContext.StatusEntities.Any(statusEntity => statusEntity.UUID == postMachine.UUID);

        var newStatusEntity = new StatusEntity
        {
            Name = postMachine.Name,
            Type = postMachine.Type,
            Description = postMachine.Description,
            UUID = postMachine.UUID,
            Location = postMachine.Location
        };

        if (statusEntityExists) _dbContext.StatusEntities.Update(newStatusEntity);
        else _dbContext.StatusEntities.Add(newStatusEntity);

        _dbContext.SaveChanges();

        return Ok();
    }
}