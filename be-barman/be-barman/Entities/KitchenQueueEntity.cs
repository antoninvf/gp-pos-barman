namespace be_barman.Entities;

public class KitchenQueueEntity
{
    public string? UUID { get; set; }
    public required string ProductID { get; set; }
    public string? Note { get; set; }
    public long? Timestamp { get; set; }
}