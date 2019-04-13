using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Self_Storage_Management_System.Core.Helpers
{
    public class AccountException : Exception
    {
        public AccountException() : base() { }

        public AccountException(string message) : base(message) { }

        public AccountException(string message, params object[] args)
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }
}
