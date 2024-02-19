namespace be_barman.Models;

public class ProductModel
{
    public required string ProductID { get; set; }
    public required string Name { get; set; }
    public required string Category { get; set; }
    public string? Description { get; set; }
    public string? ImageURL { get; set; }
    public required int Price { get; set; }
    public required bool SendToKitchenQueue { get; set; }
}