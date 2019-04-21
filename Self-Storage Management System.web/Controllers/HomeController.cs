using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Self_Storage_Management_System.Core.Models.StorageItem;
using Self_Storage_Management_System.web.Services;

namespace Self_Storage_Management_System.web.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private IStorageService _storageService;

        private int _accountId;

        public HomeController(IStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpGet("/storage/getall")]
        public async Task<IActionResult> GetAll()
        {
            if (_accountId < 1)
            {
                var ctx = HttpContext.Authentication.HttpContext;
                _accountId = int.Parse(ctx.User.Identity.Name);
            }

            try
            {
                var results = await _storageService.GetAll(_accountId);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }

        [HttpPost("/storage/add")]
        public async Task<IActionResult> AddStorage(StorageItemDto newItem)
        {
            if (_accountId < 1)
            {
                var ctx = HttpContext.Authentication.HttpContext;
                _accountId = int.Parse(ctx.User.Identity.Name);
            }

            try
            {
                newItem.AccountId = _accountId;
                var result = await _storageService.AddStorage(newItem);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }

        [HttpPost("/storage/update")]
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