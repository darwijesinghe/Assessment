﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Data.DataModel
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class AssessmentEntities : DbContext
    {
        public AssessmentEntities()
            : base("name=AssessmentEntities")
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
