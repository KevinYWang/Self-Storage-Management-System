using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Self_Storage_Management_System.Core.Entities;
using Self_Storage_Management_System.Core.Helpers;
using Self_Storage_Management_System.web.Config;
using Self_Storage_Management_System.web.Models.Account;
using Self_Storage_Management_System.web.Services;

namespace Self_Storage_Management_System.web.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;
        private IMapper _mapper;
        private readonly AppConfig _appConfig;

        public AccountController(IAccountService accountService, IMapper mapper, AppConfig appConfig)
        {
            _accountService = accountService;
            _mapper = mapper;
            _appConfig = appConfig;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]AccountDto accountDto)
        {
            var account = await  _accountService.AuthenticateAccount(accountDto.Email, accountDto.PassWord);

            if (account == null)
                return BadRequest(new { message = "incorrect Username/password" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appConfig.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, account.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic info (without password) and token to store client side
            return Ok(new
            {
                Id = account.Id,
                Email = account.Email,
                FirstName = account.FirstName,
                LastName = account.LastName,
                Token = tokenString,
                PhoneNumber=account.PhoneNumber
            });
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]AccountDto accountDto)
        {
            var account = _mapper.Map<Account>(accountDto);

            try
            {
                // save 
                await _accountService.CreatAccount(accountDto);
                return Ok();
            }
            catch (AccountException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = _accountService.GetAll();
            var accountDtos = _mapper.Map<IList<AccountDto>>(users);
            return Ok(accountDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var account = await _accountService.GetAccountById(id);
            var accountDto = _mapper.Map<AccountDto>(account);
            return Ok(accountDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]AccountDto accountDto)
        {
            // map dto to entity and set id
            var user = _mapper.Map<Account>(accountDto);
            user.Id = id;

            try
            {
                // save 
                await _accountService.UpdateAccount(accountDto);
                return Ok();
            }
            catch (AccountException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _accountService.Delete(id);
            return Ok();
        }
    }
}