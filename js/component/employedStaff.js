app.component('employedStaff', {
    templateUrl:'templates/components/employedStaff.html',
    controller: function(StaffService){

        this.employedStaffList = StaffService.downloadEmployedStaff();

        this.departmentsList = StaffService.downloadDepartmentsList();

        this.updateEmployedStaffList = function(){
            console.log('update');
            this.employedStaffList = StaffService.downloadEmployedStaff();
        }

    }
});