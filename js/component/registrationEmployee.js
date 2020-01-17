app.component('registrationEmployee', {
    templateUrl:'templates/components/registrationEmployee.html',
    controller: function(StaffService){

        this.registerError = false;
        this.loginBusyError = StaffService.loginBusyError;

        this.registrationEmployee = function(){
            if(this.nameEmployee !== undefined && this.loginEmployee !== undefined && this.passwordEmployee !== undefined){
                StaffService.addEmployee({name: this.nameEmployee, login: this.loginEmployee, password: this.passwordEmployee, department: null});

                this.nameEmployee = undefined;
                this.loginEmployee = undefined;
                this.passwordEmployee = undefined;
                this.registerError = false;
            } else {
                this.registerError = true;
            }
        }
    }
});