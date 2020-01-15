app.component('instanceDepartment', {
    templateUrl:'templates/components/instanceDepartment.html',
    bindings:{
        department:'=',
        onUpdate:'&',
    },
    controller: function(DepartmentService){

        this.deleteDepartment = function(name){
            DepartmentService.deleteDepartment(name);
            this.onUpdate();
        }
    }
});