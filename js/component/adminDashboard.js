app.component('adminDashboard', {
    templateUrl:'templates/components/adminDashboard.html',
    controller: function(StaffService){

        this.employedStaffList = StaffService.downloadEmployedStaff().slice(-5);

        this.departmentsList = StaffService.downloadDepartmentsList();

        this.updateEmployedStaffList = function(){
            this.employedStaffList = StaffService.downloadEmployedStaff().slice(-5);
        }

    }
});