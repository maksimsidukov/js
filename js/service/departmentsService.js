app.service('DepartmentService', function($http){

    this.departmentNameBusyError = [false];

    $http.get('http://localhost:3001/departments')
        .then((result) => {
            this.departmentsList = result.data;
        });

    this.addDepartment = function(department){
        $http.post('http://localhost:3001/add_department', department)
            .then(() => {
                this.departmentsList.push(department);
                this.departmentNameBusyError[0] = false;
            })
            .catch((result) => {
                this.departmentNameBusyError[0] = true;
            })
    };

    this.deleteDepartment = function(department){
        console.log(department);
        $http.post('http://localhost:3001/delete_department', department)
            .then(() => {
                _.pull(this.departmentsList, department)
            });
    };
});