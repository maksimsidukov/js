var app = angular.module('staffList', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/dashboardPage.html'
        })
        .when('/login', {
            templateUrl: 'templates/loginPage.html'
        })
        .when('/registration', {
            templateUrl: 'templates/registrationPage.html'
        })
        .when('/employed', {
            templateUrl: 'templates/listEmployedPage.html'
        })
        .when('/not_employed', {
            templateUrl: 'templates/listNotEmployedPage.html'
        })
});