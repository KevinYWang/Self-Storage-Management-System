using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Self_Storage_Management_System.web.Models.Account;
using AutoMapper;

namespace Self_Storage_Management_System.web.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Core.Entities.Account, AccountDto>();
            CreateMap<AccountDto, Core.Entities.Account>();
        }
    }
}