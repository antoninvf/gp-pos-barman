namespace be_barman.Models;

public class OrderModel
{
    public required string CustomerUUID { get; set; }
    public required string ProductID { get; set; }
    public required int Quantity { get; set; }
    public string? Notes { get; set; }
}