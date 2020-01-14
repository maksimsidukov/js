app.controller('dashboardCtrl', function($scope){
    $scope.user = JSON.parse(localStorage.getItem('loginUser'));

    $scope.hide = function (){
        if(JSON.parse(localStorage.getItem('loginUser')).department === null){
            return false
        } else {
            return true
        }
    };
});