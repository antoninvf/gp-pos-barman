namespace flwnStatus.Models;

public class Machine
{
    public bool Online { get; set; } = false; //! Don't include
    public DateTimeOffset LastSeen { get; set; } = DateTimeOffset.UnixEpoch; //! Don't include
    public long LastSeenUnix => LastSeen.ToUnixTimeMilliseconds(); //! Don't include

    public string UUID { get; set; } = string.Empty; //! NEEDS TO BE INCLUDED
    public string Name { get; set; } = string.Empty; //! Should include
    public string Hostname { get; set; } = string.Empty; //! Should include
    public string Type { get; set; } = string.Empty; //! Should include
    public string Description { get; set; } = string.Empty; //! Optional
    public string Location { get; set; } = string.Empty; //! Optional
    public string LocalIp { get; set; } = string.Empty; //! Should include
    public int RamTotalMB { set; get; } //! Should include
    public int RamUsedMB { get; set; } //! Should include
    public int RamFreeMB => RamTotalMB - RamUsedMB; //! Don't include
    public float RamUsedPercent => (float)RamUsedMB / RamTotalMB * 100; //! Don't include
    public float CpuUsedPercent { get; set; } //! Should include
    public string CpuName { get; set; } = string.Empty; //! Should include
    public float CpuTemp { get; set; } //! Should include
    public int CpuCount { get; set; } //! Should include
    public int NetworkDownloadKBps { get; set; } //! Should include
    public int NetworkUploadKBps { get; set; } //! Should include
    public List<Disk> Disks { get; set; } = new(); //! Should include
    public Disk MainDisk => Disks.FirstOrDefault(disk => disk.Letter == "C") ?? new Disk(); //! Don't include
    public string OS { get; set; } = string.Empty; //! Should include
    public string Uptime { get; set; } = string.Empty; //! Should include
}