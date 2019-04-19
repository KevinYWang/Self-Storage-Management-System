using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Self_Storage_Management_System.Core.Models.Account;
using Self_Storage_Management_System.Core.Models.StorageItem;
using Self_Storage_Management_System.web.Models;
using Self_Storage_Management_System.web.Services;

namespace Self_Storage_Management_System.web.Controllers
{
//    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private IStorageService _storageService;
        private UserManager<Account> _userManager;
        private Account _account = null;


        public HomeController(IStorageService storageService, UserManager<Account> userManager)
        {
            _storageService = storageService;
            _userManager = userManager;
        }

        public async Task<IActionResult> GetAll()
        {
            try
            {
                if (_account == null)
                    _account = await _userManager.GetUserAsync(HttpContext.User);
                var results = await _storageService.GetAll(_account.Id);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }

        public async Task<IActionResult> AddStorage(StorageItemDto newItem)
        {
            try
            {
                if (_account == null)
                    _account = await _userManager.GetUserAsync(HttpContext.User);
                newItem.AccountId = _account.Id;
                var result = await _storageService.AddStorage(newItem);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }

        public async Task<IActionResult> Update(StorageItem[] newItems)
        {
            try
            {
                var result = await _storageService.Update(newItems);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }
    }
}