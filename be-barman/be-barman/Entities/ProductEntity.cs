namespace be_barman.Entities;

public class ProductEntity
{
    public required string ID { get; set; }
    public required string Name { get; set; }
    public string? Category { get; set; }
    public string? Description { get; set; }
    public string? ImageURL { get; set; }
    public required int Price { get; set; }
}