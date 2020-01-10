app.service('LoginService', function(MainService, $state, $rootScope){

    this.login = function (login, password) {
        // console.log("login function");
        let staffMap = MainService.downloadUserOfLocalStorage();
        if(staffMap.has(login)){
            // console.log('login true');
            if(staffMap.get(login).password === password){
                // console.log('password true');
                localStorage.setItem('loginUser', JSON.stringify(staffMap.get(login)));
                $rootScope.isLogin = true;
                if(JSON.parse(localStorage.getItem('loginUser')).isAdmin){
                    $state.go('adminDashboard');
                } else {
                    $state.go('dashboard');
                }
            }
        } else {
            return false
        }
    }
});

app.controller('loginCtrl', function ($scope, LoginService) {
    $scope.loginFunc = function () {
        LoginService.login($scope.login, $scope.password);
        if(LoginService.login($scope.login, $scope.password) === false){
            $scope.error = 'Неверный логин или пароль!'
        }
    };
});