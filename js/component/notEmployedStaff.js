app.component('notEmployedStaff', {
    templateUrl:'templates/components/notEmployedStaff.html',
    controller: function(StaffService, DepartmentService){

        this.notEmployedStaffList = StaffService.notArrangeStaff;

        this.departmentsList = DepartmentService.departmentsList;

    }
});