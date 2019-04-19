using System;

namespace Self_Storage_Management_System.Core.Models.StorageItem
{
    public class StorageItemDto
    {
        public int? Id { get; set; }
        public string ItemName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int? AccountId { get; set; }
    }
}
