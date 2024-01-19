namespace be_barman.Entities;

public class TableEntity
{
    public int? ID { get; set; } // Tables are autoincremented IDs for easier use
    public required string Name { get; set; }
    public required string RoomID { get; set; }
    public int PositionX { get; set; }
    public int PositionY { get; set; }
}