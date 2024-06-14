/*jshint esversion: 6 */

// imports
import { Error, Process, Alert, AlertType, submitForm, Confirm } from "../Scripts/helper.js";

// variables
const addEmployee = document.getElementById("add-emp");
const editEmployee = document.querySelectorAll(".edit");
const deleteEmployee = document.querySelectorAll(".delete");
let employee = {
    id: 0,
    name: "",
    email: "",
    position: ""
};

// token
const token = document.getElementsByName("__RequestVerificationToken")[0].value;

// submit new employee data
const SaveEmployee = {
    // open modal
    show(title, url)
    {
        try
        {
            // render html form
            const html = submitForm
            (
                title,
                employee.id,
                employee.name,
                employee.email,
                employee.position
            );

            // template to hold modal
            const template = document.createElement("template");
            template.innerHTML = html;

            // events
            const backDrop = template.content.getElementById("modal");
            const btnClose = template.content.getElementById("mod-close");

            // backdrop click
            backDrop.addEventListener("click", (e) =>
            {
                if (e.target === backDrop)
                {
                    this.hide(backDrop);
                }
            });

            // close button click
            btnClose.addEventListener("click", (e) =>
            {
                this.hide(backDrop);
            });

            // form submit
            const myForm = template.content.getElementById("myform");
            const empId = template.content.getElementById("id");
            const empName = template.content.getElementById("name");
            const empMail = template.content.getElementById("email");
            const empPosition = template.content.getElementById("position");

            this.submit(myForm, backDrop, url, empId, empName, empMail, empPosition);

            // modal append to body
            document.body.appendChild(template.content);

            // clear employee object
            employee = {};
        }
        catch (error)
        {
            console.log(error);
        }
    },
    // submit data
    submit(form, element, url, id, name, email, position)
    {
        try
        {
            form.addEventListener('submit', (e) =>
            {
                try
                {
                    e.preventDefault();

                    // validation
                    if (!this.validate(name, email, position))
                    {
                        return false;
                    }

                    // bind form data to model
                    const formData = new FormData();
                    formData.append("__RequestVerificationToken", token);
                    formData.append("Id", id.value.trim());
                    formData.append("Name", name.value.trim());
                    formData.append("Email", email.value.trim());
                    formData.append("Position", position.value.trim());

                    this.hide(element);
                    Process.show();

                    // fetch
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        body: formData,
                    }).then(response =>
                    {
                        Process.hide();
                        return response.json();
                    }).then(data =>
                    {
                        if (data.success)
                        {
                            Alert.show(AlertType.success,
                                data.message, "alert-message");

                            /**
                            * reload current page to refresh data. we can use partial view to achieve this.
                            * for the simplicity i used replace method
                            */

                            setTimeout(() =>
                            {
                                var directlink = "/";
                                window.window.location.replace(directlink);
                            }, 6000);
                        }
                        else
                        {
                            Alert.show(AlertType.error,
                                data.message, "alert-message");
                        }
                    }).catch(error =>
                    {
                        Process.hide();
                        console.log(error);
                    })
                }
                catch (error)
                {
                    Process.hide();
                    console.log(error);
                }
            });
        }
        catch (e)
        {
            console.log(error);
        }
    },
    // validate form
    validate(name, email, position)
    {
        try
        {
            //basic validations for simplicity

            if (name.value.trim() === "")
            {
                Error.seterror(name, "Name can not be empty");
                return false;
            } else
            {
                Error.diserror(name);
            }
            if (email.value.trim() === "")
            {
                Error.seterror(email, "Email can not be empty");
                return false;
            } else
            {
                Error.diserror(email);
            }
            if (position.value.trim() === "")
            {
                Error.seterror(position, "Position can not be empty");
                return false;
            } else
            {
                Error.diserror(position);
            }
            return true;
        }
        catch (error)
        {
            console.log(error);
        }
    },
    // hide modal
    hide(element)
    {
        try
        {
            document.body.removeChild(element);
        }
        catch (error)
        {
            console.log(error);
        }
    }
};

// update employee data
const UpdateEmployee = {
    // retrieve data to update record
    async retrieve(id)
    {
        try
        {
            // send request
            Process.show();
            fetch(`/home/employeebyid?id=${id}`, {
                method: "GET",
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            }).then(response =>
            {
                Process.hide();
                return response.json();
            }).then(data =>
            {
                if (data.success)
                {
                    employee =
                    {
                        id: data.employee[0].Id,
                        name: data.employee[0].Name,
                        email: data.employee[0].Email,
                        position: data.employee[0].Position
                    };

                    // submit form modal
                    SaveEmployee.show("Update employee", "/home/updateemployee");
                }
            }).catch(error =>
            {
                Process.hide();
                console.log(error);
            });
        }
        catch (error)
        {
            Process.hide();
            console.log(error);
        }
    }
};

// hook click event to add button
addEmployee.addEventListener('click', (e) =>
{
    try
    {
        // submit form modal
        SaveEmployee.show("Add new employee", "/home/addemployee");
    }
    catch (error)
    {
        console.log(error);
    }
});

// hook click event to edit button
editEmployee.forEach(button =>
{
    try
    {
        button.addEventListener('click', (e) =>
        {
            // get user selected employee id
            let employee = e.currentTarget.getAttribute("data-id");

            // update form modal
            UpdateEmployee.retrieve(employee);

        })
    }
    catch (error)
    {
        console.log(error);
    }
});

// hook click event to delete button
deleteEmployee.forEach(button =>
{
    try
    {
        button.addEventListener('click', (e) =>
        {
            // get user selected employee id
            let employee = e.currentTarget.getAttribute("data-id");

            // get confirmation
            Confirm.show(
                "Delete Confirmation",
                "Are you sure to delete this employee?",
                (e) =>
                {
                    // callback request
                    Process.show();
                    fetch(`/home/deleteemployee?id=${employee}`, {
                        method: "GET",
                        headers: {
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    }).then(response =>
                    {
                        Process.hide();
                        return response.json();
                    }).then(data =>
                    {
                        if (data.success)
                        {
                            Alert.show(AlertType.success,
                                data.message, "alert-message");

                            /**
                            * reload current page to refresh data. we can use partial view to achieve this.
                            * for the simplicity i used replace method
                            */

                            setTimeout(() =>
                            {
                                var directlink = "/";
                                window.window.location.replace(directlink);
                            }, 6000);
                        }
                        else
                        {
                            Alert.show(AlertType.error,
                                data.message, "alert-message");
                        }
                    }).catch(error =>
                    {
                        Process.hide();
                        console.log(error);
                    });
                }
            );
        })
    }
    catch (error)
    {
        console.log(error);
    }
});