using Data.DataModel;
using DataAccess.Interfaces;
using DataAccess.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;

namespace DataAccess.Services
{
    public class EmployeeService : IEmployee
    {
        // data model
        private readonly AssessmentEntities context;

        public EmployeeService()
        {
            context = new AssessmentEntities();
        }

        // get all employees
        public List<EmployeeViewModel> AllEmployee()
        {
            var employees = new List<EmployeeViewModel>();

            // loda from db
            employees = context.Employees.Select(x => new EmployeeViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
                Position = x.Position
            })
            .ToList();

            return employees;
        }

        // get employee by id
        public List<EmployeeViewModel> EmployeeById(int id)
        {
            var employees = new List<EmployeeViewModel>();
            employees = context.Employees.Select(x => new EmployeeViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
                Position = x.Position
            })
            .Where(x => x.Id == id)
            .ToList();

            return employees;
        }

        // save new employee
        public bool AddEmployee(EmployeeViewModel data)
        {
            var employee = new Employee()
            {
                Name = data.Name,
                Email = data.Email,
                Position = data.Position
            };

            context.Employees.Add(employee);
            context.SaveChanges();

            // clear cache to refrsh page with new data
            ClearCache("employee");

            return true;
        }

        // update employee
        public bool UpdateEmployee(EmployeeViewModel data)
        {
            var employee = context.Employees.FirstOrDefault(x => x.Id == data.Id);

            employee.Name = data.Name;
            employee.Email = data.Email;
            employee.Position = data.Position;

            context.SaveChanges();

            // clear cache to refrsh page with new data
            ClearCache("employee");

            return true;
        }

        // delete employee
        public bool DeleteEmployee(int id)
        {
            var delete = context.Employees.Find(id);
            context.Employees.Remove(delete);
            context.SaveChanges();

            // clear cache to refrsh page with new data
            ClearCache("employee");

            return true;
        }

        // caching data with delegate
        public List<T> CachingData<T>(string cacheset, EmpDelegate<T> method)
        {
            // memory cache
            var cache = MemoryCache.Default;

            // check available cache
            var data = (List<T>)cache.Get(cacheset);
            if (data != null)
            {
                System.Diagnostics.Debug.WriteLine("Yep, Load from cache");

                return data.ToList();
            }
            else
            {
                // get data from delegate method
                var result = method.Invoke();

                // set cache up to 5 minutes
                var policy = new CacheItemPolicy()
                {
                    AbsoluteExpiration = DateTime.UtcNow.AddMinutes(1),
                    RemovedCallback = new CacheEntryRemovedCallback(CacheRemovedCallback)
                };

                cache.Set(cacheset, result.ToList(), policy);

                System.Diagnostics.Debug.WriteLine("No cache, Load from db");

                return result.ToList();
            }

        }

        // cache removed callback
        public void CacheRemovedCallback(CacheEntryRemovedArguments arguments)
        {
            System.Diagnostics.Debug.WriteLine(arguments.RemovedReason.ToString());
        }

        // clear cache
        public void ClearCache(string cacheset)
        {
            // memory cache
            var cache = MemoryCache.Default;
            cache.Remove(cacheset);
        }

    }
}
