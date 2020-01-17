app.service('StaffService',function ($http) {

    this.loginBusyError = [false];

    class Employee{

        constructor(name, login, password, department, isAdmin = false){
            this.name = name;
            this.login = login;
            this.password = password;
            this.department = department;
            this.isAdmin = isAdmin;
        }

        arrange(department){
            this.department = department
        }

        isArranged(){
            if(this.department){
                return true
            }
        }

    }

    $http.get('http://localhost:3001/get_staff')
        .then((result) => {
            let employee;
            this.notArrangeStaff=[];
            this.arrangeStaff=[];
            for(item of result.data){
                employee = new Employee(item.name, item.login, item.password, item.department, item.isAdmin);
                if(employee.isAdmin === true){
                    continue
                }
                else if(employee.department === null){
                    this.notArrangeStaff.push(employee);
                } else {
                    this.arrangeStaff.push(employee);
                }
            }
        });


    this.addEmployee = function(obj){
        $http.post('http://localhost:3001/add_employee', obj)
            .then(() => {
                let employee = new Employee(obj.name, obj.login, obj.password, obj.department);
                this.notArrangeStaff.push(employee);
                this.loginBusyError[0] = false;
            })
            .catch(() => {
                this.loginBusyError[0] = true;
            })

    };

    this.arrangeEmployee = function(employee, department){
        $http.post('http://localhost:3001/arrange_employee', {employeeLogin: employee.login, departmentName: department.name})
            .then(
                () => {
                    if(employee.isArranged()){
                        employee.arrange(department);
                    } else {
                        _.pull(this.notArrangeStaff, employee);
                        employee.arrange(department);
                        this.arrangeStaff.push(employee);
                    }
            })
    };

    this.dismissEmployee = function(employee){
        $http.post('http://localhost:3001/dismiss_employee', {login: employee.login})
            .then(
                () => {
                    _.pull(this.arrangeStaff, employee);
                    employee.arrange(null);
                    this.notArrangeStaff.push(employee);
            });
    };

    this.deleteEmployee = function(employee){
        $http.post('http://localhost:3001/delete_employee', {login: employee.login})
            .then(
                () => {
                    _.pull(this.notArrangeStaff, employee);
                }
            );
    };
});