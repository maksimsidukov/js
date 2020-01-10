var app = angular.module('staffList', ['ui.router', 'ngMaterial', 'ngMessages']);

app.controller('menuCtrl', function($scope, $rootScope, MainService){
    $scope.logout = function(){
        MainService.logout()
    };

    $scope.isLogin = function() {
        if (JSON.parse(localStorage.getItem('loginUser')) !== null) {
            return  true
        } else {
            return  false
        }
    };

    $scope.isAdmin = function(){
        if($scope.isLogin()){
            if(JSON.parse(localStorage.getItem('loginUser')).isAdmin){
                return true
            } else {
                return false
            }
        }
    }
});

app.service('MainService', function($state){
    this.saveUserInLocalStorage = function(map){
        localStorage.setItem('StaffList', JSON.stringify([...map]))
    };

    this.downloadUserOfLocalStorage = function(){
        let map;
        if(localStorage.getItem('StaffList') === null){
            map = new Map([["admin",{"name":"admin","login":"admin","password":"admin","isAdmin":true}]]);
        } else {
            map = new Map(JSON.parse(localStorage.getItem('StaffList')));
        }
        return map;
    };

    this.logout = function () {
        // console.log('logout');
        localStorage.setItem('loginUser', null);
        $state.go('login')

    }
});

function checkLoginAndAccess(){
    return function($state){
        if(JSON.parse(localStorage.getItem('loginUser')) === null || JSON.parse(localStorage.getItem('loginUser')).isAdmin !== true){
            $state.go('dashboard');
        }
    }
}



app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl : 'templates/loginPage.html',
            controller: function ($state) {
                if(JSON.parse(localStorage.getItem('loginUser')) !== null){
                    if(JSON.parse(localStorage.getItem('loginUser')).isAdmin){
                        $state.go('adminDashboard')
                    } else {
                        $state.go('dashboard')
                    }
                }
            }
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl : 'templates/dashboardPage.html',
            controller: function ($state) {
                if(JSON.parse(localStorage.getItem('loginUser')) === null){
                    $state.go('login');
                }
            },
        })
        .state('registration', {
            url: '/registration',
            templateUrl : 'templates/registrationPage.html',
            controller: checkLoginAndAccess(),
        })
        .state('adminDashboard', {
            url: '/admin_dashboard',
            templateUrl : 'templates/adminDashboardPage.html',
            controller: checkLoginAndAccess(),
        })
        .state('employed', {
            url: '/employed',
            templateUrl : 'templates/listEmployedPage.html',
            controller: checkLoginAndAccess(),
        })
        .state('not_employed', {
            url: '/not_employed',
            templateUrl : 'templates/listNotEmployedPage.html',
            controller: checkLoginAndAccess(),
        })
});