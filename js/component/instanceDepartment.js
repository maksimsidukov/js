app.component('instanceDepartment', {
    templateUrl:'templates/components/instanceDepartment.html',
    bindings:{
        department:'=',
    },
    controller: function(DepartmentService){

        this.deleteDepartment = function(department){
            console.log(department);
            DepartmentService.deleteDepartment(department);
        }
    }
});