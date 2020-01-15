app.component('addDepartment',{
    templateUrl:'templates/components/addDepartment.html',
    bindings:{
        onUpdate:'&',
        departmentsTypes:'=',
    },
    controller: function(DepartmentService){

        this.addDepartment = function(){
            console.log(this.departmentName, this.departmentSalary, this.departmentType);
            if(this.departmentName !== undefined && this.departmentSalary !== undefined && this.departmentType !== undefined){
                DepartmentService.addDepartment(this.departmentName, {name: this.departmentName, salary: this.departmentSalary, type: this.departmentType});
                this.onUpdate();
            }
        }
    }
});