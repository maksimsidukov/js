app.component('menu', {
    templateUrl:'templates/components/menu.html',
    controller: function(LoginService, DepartmentService){

        this.isLogin = function(){
            return LoginService.isLogin();
        };

        this.isAdmin = function(){
            return LoginService.isAdmin();
        };

        this.isAccountant = function(){
            if(JSON.parse(localStorage.getItem('loginUser')) === null || JSON.parse(localStorage.getItem('loginUser')).department === null){
                return false
            } else if(this.isAdmin() || DepartmentService.isAccountant(JSON.parse(localStorage.getItem('loginUser')).department.name)){
                return true
            }
        };

        this.logout = function(){
            LoginService.logout();
        }
    }
});