var app = angular.module('staffList', ['ui.router', 'ngMaterial', 'ngMessages']);

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
            templateUrl : 'templates/pages/loginPage.html',
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
            templateUrl : 'templates/pages/dashboardPage.html',
            controller: function ($state) {
                if(JSON.parse(localStorage.getItem('loginUser')) === null){
                    $state.go('login');
                }
            },
        })
        .state('registration', {
            url: '/registration',
            templateUrl : 'templates/pages/registrationPage.html',
            controller: checkLoginAndAccess(),
        })
        .state('adminDashboard', {
            url: '/admin_dashboard',
            templateUrl : 'templates/pages/adminDashboardPage.html',
            controller: checkLoginAndAccess(),
        })
        .state('employed', {
            url: '/employed',
            templateUrl : 'templates/pages/listEmployedPage.html',
            controller: function($state,MainService, DepartmentService){
                if(MainService.isAdmin()){
                } else if (JSON.parse(localStorage.getItem('loginUser')).department === null){
                    $state.go("login")
                } else if (!DepartmentService.isAccountant((JSON.parse(localStorage.getItem('loginUser')).department.name))){
                    $state.go("login")
                }
            },
        })
        .state('not_employed', {
            url: '/not_employed',
            templateUrl : 'templates/pages/listNotEmployedPage.html',
            controller: checkLoginAndAccess(),
        })
        .state('departments', {
            url: '/departments',
            templateUrl : 'templates/pages/departmentPage.html',
            controller: checkLoginAndAccess(),
        })
});