namespace be_barman.Entities;

// This entity is used for storing settings and configuration
public class ConfigurationEntity
{
    public int? ID { get; set; }
    public required string SettingName { get; set; }
    public required string Value { get; set; }
}