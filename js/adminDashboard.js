app.controller('adminDashboardCtrl', function($scope, employedService, notEmployedService){
    $scope.updateEmployedStaff = function(){
        // console.log('update');
        $scope.employedStaff = employedService.downloadEmployedStaff().slice(-5);
    };
    $scope.employedStaff = employedService.downloadEmployedStaff().slice(-5);

    $scope.departments = notEmployedService.downloadDepartmentsList();

    $scope.changeDepartment = function(staffName, departmentName){
        if(departmentName === undefined){
            return
        }
        notEmployedService.arrangeService(staffName, departmentName);
        $scope.updateEmployedStaff();
    };

    $scope.notArrange = function(name){
        // console.log(name);
        employedService.notArrangeService(name);
        $scope.updateEmployedStaff();
    }
});
