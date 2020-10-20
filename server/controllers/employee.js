let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Employee = require('../models/employee');

module.exports.displayEmployeeList = (req, res, next) => {
    Employee.find((err, employeeList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(employeeList);

            res.render('employee/list', 
            {title: 'Employees', 
            EmployeeList: employeeList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('employee/add', {title: 'Add Employee', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newEmployee = Employee({
        "name": req.body.name,
        "password": req.body.password,
        "email": req.body.email,
        "age": req.body.age
    });

    Employee.create(newEmployee, (err, Employee) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the employee list
            res.redirect('/employee-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Employee.findById(id, (err, EmployeeToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('employee/edit', {title: 'Edit Employee', employee: EmployeeToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedEmployee = Employee({
        "_id": id,
        "name": req.body.name,
        "password": req.body.password,
        "email": req.body.email,
        "age": req.body.age
    });

    Employee.updateOne({_id: id}, updatedEmployee, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the employee list
            res.redirect('/employee-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Employee.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the employee list
             res.redirect('/employee-list');
        }
    });
}