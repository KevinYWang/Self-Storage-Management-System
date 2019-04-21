using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Self_Storage_Management_System.Core.Models.StorageItem;

namespace Self_Storage_Management_System.Core.Data
{
    public interface IStorageDao
    {
        Task<List<StorageItem>> GetAll(int userId);
        Task<StorageItem> AddStorage(StorageItemDto newItem);
        Task<StorageItem[]> Update(StorageItem[] newItems);
    }

    public class StorageDao : IStorageDao
    {
        private DataContext _dataContext;

        private IMapper _mapper;

        public StorageDao(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<List<StorageItem>> GetAll(int userId)
        {
            var results = await Task.Run(() =>
                _dataContext.StorageItems.Where(x => x.AccountId == userId)
                    .OrderByDescending(y => y.FromDate).ToList()
            );
            return results;
        }

        public async Task<StorageItem> AddStorage(StorageItemDto newItem)
        {
            var newStorageItem = _mapper.Map<StorageItem>(newItem);
            try
            {
                await _dataContext.StorageItems.AddAsync(newStorageItem);
                await _dataContext.SaveChangesAsync();
                return newStorageItem;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<StorageItem[]> Update(StorageItem[] newItems)
        {
            var itemIds = newItems.Select(y => y.Id).ToList();
            var oldItems = _dataContext.StorageItems
                .Where(x => itemIds.Contains(x.Id))
                .ToList();


            if (oldItems.Count != newItems.Length)
            {
                throw new Exception("Not all items can be updated. Please check and try again.");
            }

            oldItems.ForEach(x =>
            {
                var newItem = newItems.FirstOrDefault(y => y.Id == x.Id);
                if (newItem != null)
                {
                    x.FromDate = newItem.FromDate;
                    x.ToDate = newItem.ToDate;
                    x.ItemName = newItem.ItemName;
                }
            });


            _dataContext.StorageItems.UpdateRange(oldItems);
            await _dataContext.SaveChangesAsync();

            return newItems;
        }
    }
}