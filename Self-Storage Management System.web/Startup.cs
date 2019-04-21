using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Self_Storage_Management_System.Core.Data;
using Self_Storage_Management_System.Core.Models;
using Self_Storage_Management_System.web.Config;
using Self_Storage_Management_System.web.Services;

namespace Self_Storage_Management_System.web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddDbContext<DataContext>(x => x.UseInMemoryDatabase("TestDb"));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            Mapper.Initialize(cfg => { cfg.AddProfile<AutoMapperProfile>(); });
            services.AddAutoMapper();

            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "App/dist/storage-system-app"; });

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppConfig>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppConfig>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = context =>
                        {
                            var accountService =
                                context.HttpContext.RequestServices.GetRequiredService<IAccountService>();
                            var accountId = int.Parse(context.Principal.Identity.Name);
                            var account = accountService.GetAccountById(accountId);
                            if (account == null)
                            {
                                context.Fail("Unauthorized");
                            }

                            return Task.CompletedTask;
                        }
                    };
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            //DI for application services
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<IStorageDao, StorageDao>();
            services.AddScoped<AppConfig, AppConfig>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();


            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());


            app.UseSpaStaticFiles();

            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}"
                );
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "App";

                if (env.IsDevelopment())
                {
//                    spa.UseAngularCliServer(npmScript: "start");
//                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                    spa.Options.StartupTimeout =
                        TimeSpan.FromSeconds(520); // Increase the timeout if angular app is taking longer to startup
                }
            });
        }
    }
}