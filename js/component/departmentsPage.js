app.component('departmentsPage', {
    templateUrl:'templates/components/departmentsPage.html',
    controller: function($http, DepartmentService){

        this.departmentsList = DepartmentService.departmentsList;

        this.departmentsTypes = ["Кухня", "Финансы", "Управление", "Уборка"];
    }
});