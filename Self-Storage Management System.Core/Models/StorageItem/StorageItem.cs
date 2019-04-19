using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Self_Storage_Management_System.Core.Models.StorageItem
{
    public class StorageItem
    {

        [Key]
        public int Id { get; set; }
        public string ItemName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        [ForeignKey("Account")]
        public int AccountId { get; set; }
    }
}