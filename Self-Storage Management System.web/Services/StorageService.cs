using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Host;
using Self_Storage_Management_System.Core.Data;
using Self_Storage_Management_System.Core.Models.StorageItem;

namespace Self_Storage_Management_System.web.Services
{
    public interface IStorageService
    {
        Task<List<StorageItem>> GetAll(int userId);
        Task<StorageItem> AddStorage(StorageItemDto newItem);
        Task<StorageItem[]> Update(StorageItem[] newItems);
    }

    public class StorageService : IStorageService
    {
        private IStorageDao _storageDao;

        public StorageService(IStorageDao storageDao)
        {
            _storageDao = storageDao;
        }

        public async Task<List<StorageItem>> GetAll(int userId)
        {
            return await _storageDao.GetAll(userId);
        }

        public async Task<StorageItem> AddStorage(StorageItemDto newItem)
        {
            return await _storageDao.AddStorage(newItem);
        }

        public async Task<StorageItem[]> Update(StorageItem[] newItems)
        {
            return await _storageDao.Update(newItems);
        }
    }
}
