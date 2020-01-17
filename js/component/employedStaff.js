app.component('employedStaff', {
    templateUrl:'templates/components/employedStaff.html',
    controller: function(StaffService, DepartmentService){

        this.employedStaffList = StaffService.arrangeStaff;

        this.departmentsList = DepartmentService.departmentsList;

    }
});