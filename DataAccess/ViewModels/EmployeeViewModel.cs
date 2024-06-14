using System.Collections.Generic;

namespace DataAccess.ViewModels
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Position { get; set; }
        public List<EmployeeViewModel> Employees { get; set; }
    }
}
