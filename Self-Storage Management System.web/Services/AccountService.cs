using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Self_Storage_Management_System.Core.Data;
using Self_Storage_Management_System.Core.Helpers;
using Self_Storage_Management_System.Core.Models.Account;
using Self_Storage_Management_System.web.Models.Account;

namespace Self_Storage_Management_System.web.Services
{
    public interface IAccountService
    {
        Task<Account> AuthenticateAccount(string userEmail, string password);
        Task<IEnumerable<Account>> GetAll();
        Task<Account> GetAccountById(int id);
        Task<Account> CreatAccount(AccountDto account);
        Task<Account> UpdateAccount(AccountDto account);
        Task Delete(int id);
    }

    public class AccountService : IAccountService
    {
        private DataContext _dataContext;

        public AccountService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Account> AuthenticateAccount(string userEmail, string password)
        {
            if (string.IsNullOrEmpty(userEmail) || string.IsNullOrEmpty(password))
                return null;

            var account = await Task.Run(()=>_dataContext.Accounts.SingleOrDefault((x => x.Email == userEmail)));

            if (account == null)
                return null;

            if (!VerifyPassword(password, account.PasswordHash, account.PasswordSalt))
                return null;


            return account;
        }

        public async Task<IEnumerable<Account>> GetAll()
        {
            return await Task.Run(() => _dataContext.Accounts);
        }

        public async Task<Account> GetAccountById(int id)
        {
            return await Task.Run(() =>  _dataContext.Accounts.Find(id));
        }

        public async Task<Account> CreatAccount(AccountDto account)
        {
            if (_dataContext.Accounts.Any(x => x.Email == account.Email))
                throw new AccountException($"The email address, {account.Email}, has been used.");
            byte[] passwordHash, passwordSalt;

            GenerateWordHash(account.PassWord, out passwordHash, out passwordSalt);
            var newAccount = new Account()
            {
                FirstName = account.FirstName,
                LastName = account.LastName,
                Email = account.Email,
                PhoneNumber = account.PhoneNumber,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                LastVisited = DateTime.Now
            };

            _dataContext.Accounts.Add(newAccount);
            _dataContext.SaveChanges();

            var savedAccount = await Task.Run(() => _dataContext.Accounts.SingleOrDefault(x => x.Email == account.Email));
            if (savedAccount == null)
                throw new AccountException("Error in signing up");

            return savedAccount;
        }


        public async Task<Account> UpdateAccount(AccountDto account)
        {

            var savedAccount = _dataContext.Accounts.SingleOrDefault(x=>x.Id==account.Id && x.Email==account.Email);
            if (savedAccount==null)
                throw  new AccountException("Error in updating your account");


            byte[] passwordHash, passwordSalt;
            GenerateWordHash(account.PassWord, out passwordHash, out passwordSalt);

            await Task.Run(() =>
            {

                savedAccount.FirstName = account.FirstName;
                savedAccount.LastName = account.LastName;
                savedAccount.Email = account.Email;
                savedAccount.PhoneNumber = account.PhoneNumber;
                savedAccount.PasswordHash = passwordHash;
                savedAccount.PasswordSalt = passwordSalt;
                savedAccount.LastVisited = DateTime.Now;

                _dataContext.Accounts.Update(savedAccount);
                _dataContext.SaveChanges();
            });
            return savedAccount;
        }


        public async Task Delete(int id)
        {
            var account = await Task.Run(() =>_dataContext.Accounts.Find(id));
            if (account != null)
            {
                _dataContext.Accounts.Remove(account);
                _dataContext.SaveChanges();
            }
        }

        private static void GenerateWordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64)
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128)
                throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}