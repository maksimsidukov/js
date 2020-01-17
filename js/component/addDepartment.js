app.component('addDepartment',{
    templateUrl:'templates/components/addDepartment.html',
    bindings:{
        departmentsTypes:'=',
        departments:'=',
    },
    controller: function(DepartmentService){

        this.inputError = false;
        this.departmentNameBusyError = DepartmentService.departmentNameBusyError;

        this.addDepartment = function(){
            if(this.departmentName !== undefined && this.departmentSalary !== undefined && this.departmentType !== undefined){
                let department = {name: this.departmentName, salary: this.departmentSalary, type: this.departmentType};
                DepartmentService.addDepartment(department);
                this.departmentName = undefined;
                this.departmentSalary = undefined;
                this.departmentType = undefined;
                this.inputError = false;
            } else {
                this.inputError = true;
            }
        }
    }
});