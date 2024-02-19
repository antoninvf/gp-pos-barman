using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace be_barman.Entities;

public class OrderEntity
{
    public int ID { get; set; }
    public required CustomerEntity Customer { get; set; }
    public required ProductEntity Product { get; set; }
    public required int Quantity { get; set; }
    public required long Timestamp { get; set; }
    public string? Notes { get; set; }
}