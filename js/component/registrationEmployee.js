app.component('registrationEmployee', {
    templateUrl:'templates/components/registrationEmployee.html',
    controller: function(StaffService){

        this.registrationEmployee = function(){
            if(this.nameEmployee !== undefined && this.loginEmployee !== undefined && this.passwordEmployee !== undefined){
            StaffService.addEmployee(this.loginEmployee,{name: this.nameEmployee, login: this.loginEmployee, password: this.passwordEmployee, department: null});

            this.nameEmployee = undefined;
            this.loginEmployee = undefined;
            this.passwordEmployee = undefined;
            }
        }
    }
});