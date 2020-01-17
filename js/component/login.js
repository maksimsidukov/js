app.component('login', {
    templateUrl:'templates/components/login.html',
    controller: function(LoginService){

        this.loginError = false;

        this.login = function(){
            if(!LoginService.login(this.userLogin, this.userPassword)){
                this.loginError = true;
                this.userLogin = null;
                this.userPassword = null;
            }
        };
    }
});