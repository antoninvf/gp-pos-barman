namespace be_barman.Entities;

public class KitchenQueueEntity
{
    public int ID { get; set; }
    public required OrderEntity Order { get; set; }
    public required long Timestamp { get; set; }
}