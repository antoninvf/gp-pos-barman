﻿namespace be_barman.Entities;

public class KitchenQueueEntity
{
    public string UUID = Guid.NewGuid().ToString();
    public string ProductUUID { get; set; }
    public string Note { get; set; }
    public DateTime TimeAdded = DateTime.Now;
}