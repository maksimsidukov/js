app.service('adminDashboardService', function(employedService){
    this.employedStaff = employedService.downloadEmployedStaff();
});

app.controller('adminDashboardCtrl', function($scope, adminDashboardService, employedService){
    $scope.updateEmployedStaff = function(){
        // console.log('update');
        $scope.employedStaff = employedService.downloadEmployedStaff().slice(-5);
    };
    $scope.employedStaff = employedService.downloadEmployedStaff().slice(-5);

    $scope.notArrange = function(name){
        // console.log(name);
        employedService.notArrangeService(name);
        $scope.updateEmployedStaff();
    }
});
