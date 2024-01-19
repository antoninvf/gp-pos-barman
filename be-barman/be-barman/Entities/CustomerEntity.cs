using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace be_barman.Entities;

public class CustomerEntity
{
    public string? UUID { get; set; }

    [NotMapped]
    public List<string?> Ordered
    {
        get
        {
            return new List<string?>(InternalOrdered.Split(";"));
        }
        set
        {
            var _data = value;
            InternalOrdered = String.Join(";", _data.ToArray());
        }
    }
    [EditorBrowsable(EditorBrowsableState.Never)]
    public string InternalOrdered { get; set; }

    public string TableID { get; set; }
    public long? CreationTimestamp { get; set; }
}