app.component('notEmployedStaff', {
    templateUrl:'templates/components/notEmployedStaff.html',
    controller: function(StaffService){

        this.notEmployedStaffList = StaffService.downloadNotEmployedStaff();

        this.departmentsList = StaffService.downloadDepartmentsList();

        this.updateNotEmployedStaffList = function(){
            console.log('update');
            this.notEmployedStaffList = StaffService.downloadNotEmployedStaff();
        }

    }
});