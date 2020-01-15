app.component('departmentsPage', {
    templateUrl:'templates/components/departmentsPage.html',
    controller: function(DepartmentService){

        this.departmentsList = DepartmentService.downloadDepartments();

        this.updateDepartmentsList = function(){
            this.departmentsList = DepartmentService.downloadDepartments();
        };

        this.deleteDepartment = function(name){
            DepartmentService.deleteDepartment(name);
        };

        this.departmentsTypes = ["Кухня", "Финансы", "Управление", "Уборка"];
    }
});