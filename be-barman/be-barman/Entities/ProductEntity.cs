namespace be_barman.Entities;

public class ProductEntity
{
    public string UUID = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public string? Category { get; set; }
    public string? Description { get; set; }
    public string? ImageURL { get; set; }
    public int Price { get; set; }
}