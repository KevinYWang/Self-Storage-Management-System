using AutoMapper;
using Self_Storage_Management_System.Core.Models.StorageItem;
using Self_Storage_Management_System.web.Models.Account;

namespace Self_Storage_Management_System.Core.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Account.Account, AccountDto>();
            CreateMap<AccountDto, Account.Account>();

            CreateMap<StorageItemDto, StorageItem.StorageItem>();
            CreateMap<StorageItem.StorageItem, StorageItemDto>();
        }
    }
}