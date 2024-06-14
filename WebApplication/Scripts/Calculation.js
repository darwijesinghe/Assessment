/*jshint esversion: 6 */

// imports
import { Process, Alert, AlertType } from "./helper.js";

// validate spans
const stValidate = document.getElementById("start-validate");
const edValidate = document.getElementById("end-validate");

// button
const button = document.getElementById("calculate");

// result
const result = document.getElementById('cal-result');

// working days
const WorkDays = {
    // calculation
    caculation()
    {
        try
        {
            // start date values
            const stDay = document.getElementById("st-day").value;
            const stMon = document.getElementById("st-mon").value;
            const stYear = document.getElementById("st-year").value;

            // end date values
            const edDay = document.getElementById("ed-day").value;
            const edMon = document.getElementById("ed-mon").value;
            const edYear = document.getElementById("ed-year").value;

            // format user date
            const start = new Date(`${stYear}-${stMon}-${stDay}`);
            const end = new Date(`${edYear}-${edMon}-${edDay}`);

            // validate
            if (!this.validate(start, end))
            {
                return false;
            }

            // start calculation
            let dates = [];

            // get dates between start date and end date
            for (var day = new Date(start); day <= new Date(end); day.setDate(day.getDate() + 1))
            {
                dates.push(new Date(day));
            }

            // filter weekends
            var weekdays = dates.filter((value, index) =>
            {
                return (dates[index].getDay() != 6) & (dates[index].getDay() != 0);
            });

            // holidays of this year this month - 02/2023
            const holidays = [4, 18, 21, 22, 27, 28];

            // filter holidays
            var workdays = weekdays.filter((value, index) =>
            {
                return !holidays.includes(weekdays[index].getDate());
            });

            // working days
            result.innerText = workdays.length;
        }
        catch (error)
        {
            console.log(error);
        }
    },
    // validation
    validate(start, end)
    {
        try
        {
            if (start instanceof Date & !isNaN(start))
            {
                // start date is valid
                stValidate.innerText = "";

                if (end instanceof Date & !isNaN(end))
                {
                    edValidate.innerText = "";

                    // check start date is > than end date
                    if (start > end)
                    {
                        stValidate.innerText = "Start date is not valid";
                        return false;
                    }
                    else
                    {
                        stValidate.innerText = "";
                    }

                    // check start date is weekend or not
                    if ((start.getDay() === 6) | (start.getDay() === 0))
                    {
                        stValidate.innerText = "Start date is should be weekday";
                        return false;
                    } else
                    {
                        stValidate.innerText = "";
                    }
                }
                else
                {
                    edValidate.innerText = "End date is not valid";
                    return false;
                }

                return true;
            }
            else
            {
                stValidate.innerText = "Start date is not valid";
                return false;
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }
};

// hook click event to calculate button
button.addEventListener('click', (e) =>
{
    try
    {
        e.preventDefault();
        WorkDays.caculation();

    } catch (error)
    {
        console.log(error);
    }
})