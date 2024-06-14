using DataAccess.ViewModels;
using System.Collections.Generic;

namespace DataAccess.Interfaces
{
    // delegate
    public delegate List<T> EmpDelegate<T>();
    public interface IEmployee
    {
        // get all employee list
        List<EmployeeViewModel> AllEmployee();

        // get employee by id
        List<EmployeeViewModel> EmployeeById(int id);

        // insert new employee
        bool AddEmployee(EmployeeViewModel data);

        // update employee
        bool UpdateEmployee(EmployeeViewModel data);

        // delete employee
        bool DeleteEmployee(int id);

        // caching data
        List<T> CachingData<T>(string cacheset, EmpDelegate<T> method);

        // remove cache for refresh page after update and delete
        void ClearCache(string cacheset);

    }
}
