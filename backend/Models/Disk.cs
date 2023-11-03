namespace flwnStatus.Models;

public class Disk
{
    public string Letter { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public float TotalSpaceMB { get; set; }
    public float UsedSpaceMB { get; set; }
    public float FreeSpaceMB => TotalSpaceMB - UsedSpaceMB;
}