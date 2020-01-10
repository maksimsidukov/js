app.controller('dashboardCtrl', function($scope){
    $scope.name = JSON.parse(localStorage.getItem('loginUser')).name;
    if(JSON.parse(localStorage.getItem('loginUser')).isArranged){
        $scope.arranged = 'Устроен'
    } else {
        $scope.arranged = 'не устроен'
    }
});