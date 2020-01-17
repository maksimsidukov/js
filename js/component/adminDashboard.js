app.component('adminDashboard', {
    templateUrl:'templates/components/adminDashboard.html',
    controller: function(StaffService, DepartmentService){

        this.employedStaffList = StaffService.arrangeStaff.slice(-5);

        this.departmentsList = DepartmentService.departmentsList;

        this.updateEmployedStaffList = function(){
            this.employedStaffList = StaffService.downloadEmployedStaff().slice(-5);
        }

    }
});