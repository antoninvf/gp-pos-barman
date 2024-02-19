namespace be_barman.Entities;

public class TableEntity
{
    public int? ID { get; set; } // Tables are auto-incremented IDs for easier use
    public required string Name { get; set; }
    public required string Room { get; set; }
}