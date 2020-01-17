app.service('LoginService', function($http, $state){

    $http.get('http://localhost:3001/get_staff')
        .then((result) => {
            console.log(result);
            this.staff = result.data;
        });

    this.login = function (login, password) {
        if (_.findIndex(this.staff, {login: login, password: password}) >= 0) {
            localStorage.setItem('loginUser', JSON.stringify(this.staff[_.findIndex(this.staff, {login: login, password: password})]));
            if (JSON.parse(localStorage.getItem('loginUser')).isAdmin) {
                $state.go('adminDashboard');
            } else {
                $state.go('dashboard');
            }
        } else {
            return false
        }
    };

    this.logout = function(){
        localStorage.setItem('loginUser', null);
        $state.go('login')
    };

    this.isLogin = function() {
        if (JSON.parse(localStorage.getItem('loginUser')) !== null) {
            return true
        }
    };

    this.isAdmin = function(){
        if(this.isLogin()){
            if(JSON.parse(localStorage.getItem('loginUser')).isAdmin){
                return true
            } else {
                return false
            }
        }
    };
});