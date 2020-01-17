app.component('instanceEmployee',{
    templateUrl: 'templates/components/instanceEmployee.html',
    bindings:{
        employee:'=',
        departments:'=',
        isArrange:'=',
    },
    controller: function(StaffService, LoginService){


        this.changeDepartment = function(employee, department){
            if(department !== undefined){
                StaffService.arrangeEmployee(employee, department);
            }
        };

        this.dismissEmployee = function(employee){
            StaffService.dismissEmployee(employee);
        };

        this.deleteEmployee = function(employee){
            StaffService.deleteEmployee(employee);
        };

        this.isAdmin = function(){
            return LoginService.isAdmin();
        }

    }
});