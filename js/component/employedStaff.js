app.component('employedStaff', {
    templateUrl:'templates/components/employedStaff.html',
    controller: function(StaffService){

        this.employedStaffList = StaffService.downloadEmployedStaff();

        this.departmentsList = StaffService.downloadDepartmentsList();

        this.updateEmployedStaffList = function(){
            this.employedStaffList = StaffService.downloadEmployedStaff();
        }

    }
});