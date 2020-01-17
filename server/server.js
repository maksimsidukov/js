const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

class Employee{

    constructor(name, login, password, department = null){
        this.name = name;
        this.login = login;
        this.password = password;
        this.department = department;
        this.isAdmin = false;
    }

    arrange(department){
        this.department = department
    }

}

const admin = new Employee('admin', 'admin', 'admin',);
admin.isAdmin = true;

let staff = [
    admin,
];

let departments = [];


app.get('/departments', function(req, res){
    res.send(departments);
});

app.post('/add_department', function(req, res){
    let department = req.body;
    if(_.findIndex(departments, {name: department.name}) >= 0){
        res.send(403);
    } else {
        departments.push(department);
        res.send(200);
    }
});

app.post('/delete_department', function(req, res){
    departments.splice(departments.indexOf(req.body), 1);
    res.send(200)
});


app.get('/get_staff', function (req, res) {
    res.send(staff);
});


app.post('/add_employee', function(req, res){
    let employee = new Employee(req.body.name, req.body.login, req.body.password);
    if(_.findIndex(staff, {login: employee.login}) >= 0){
        res.send(403);
    } else {
        staff.push(employee);
        res.send(200);
    }
});


app.post('/arrange_employee', function(req, res){

    let employeeLogin = req.body.employeeLogin;
    let departmentName = req.body.departmentName;
    let employee = staff[_.findIndex(staff, {login: employeeLogin})];
    let department = departments[_.findIndex(departments, {name: departmentName})];
    employee.arrange(department);
    res.send(200)
});

app.post('/dismiss_employee', function(req, res){
    let employeeLogin = req.body.login;
    let employee = staff[_.findIndex(staff, {login: employeeLogin})];
    employee.arrange(null);
    res.send(200)
});

app.post('/delete_employee', function(req, res){
    let employeeLogin = req.body.login;
    let employee = staff[_.findIndex(staff, {login: employeeLogin})];
    _.pull(staff, employee);
    res.send(200)
});


const server = app.listen(3001, function(){
    console.log('server started');
});