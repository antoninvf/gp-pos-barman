using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace be_barman.Entities;

public class CustomerEntity
{
    public string? UUID { get; set; }
    public TableEntity Table { get; set; }
    public long? CreationTimestamp { get; set; }
}