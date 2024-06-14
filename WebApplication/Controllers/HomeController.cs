using DataAccess.Interfaces;
using DataAccess.Services;
using DataAccess.ViewModels;
using System;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly IEmployee employee;

        public HomeController()
        {
            employee = new EmployeeService();
        }

        // landing action
        [HttpGet]
        public ActionResult Index()
        {
            try
            {
                // get all employees
                var viewModel = new EmployeeViewModel()
                {
                    Employees = employee.CachingData("employee", employee.AllEmployee)
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // get employee by id
        [HttpGet]
        public JsonResult EmployeeById(int id)
        {
            try
            {
                // get employee
                var result = employee.EmployeeById(id);
                if (result.Count <= 0)
                {
                    return Json(new
                    {
                        success = false
                    });
                }

                return Json(new
                {
                    success = true,
                    employee = result
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // save new employee
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult AddEmployee(EmployeeViewModel data)
        {
            try
            {
                // send data to save
                var result = employee.AddEmployee(data);
                if (!result)
                {
                    return Json(new
                    {
                        success = false,
                        message = "Something went wrong, Please try again"
                    });
                }

                return Json(new
                {
                    success = true,
                    message = "New employee save successful"
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // update employee
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult UpdateEmployee(EmployeeViewModel data)
        {
            try
            {
                // send data to update
                var result = employee.UpdateEmployee(data);
                if (!result)
                {
                    return Json(new
                    {
                        success = false,
                        message = "Something went wrong, Please try again"
                    });
                }

                return Json(new
                {
                    success = true,
                    message = "Employee update successful"
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // delete employee
        [HttpGet]
        public JsonResult DeleteEmployee(int id)
        {
            try
            {
                // send id to delete
                var result = employee.DeleteEmployee(id);
                if (!result)
                {
                    return Json(new
                    {
                        success = false,
                        message = "Something went wrong, Please try again"
                    });
                }

                return Json(new
                {
                    success = true,
                    message = "Employee delete successful"
                }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}