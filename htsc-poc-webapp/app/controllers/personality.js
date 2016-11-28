'use strict';
app
// Personality Controller
.controller('PersonalityCtrl', [
    '$scope','$http','$filter', function ($scope,$http,$filter) {

        $scope.open = function ($event, idx) {
            $event.preventDefault();
            $event.stopPropagation();
            if (idx==1) {
                $scope.fromOpened = true;
                $scope.toOpened = false;
            } else if (idx==2) {
                $scope.toOpened = true;
                $scope.fromOpened = false;
            }
        };

        $scope.searcher = {};
        $scope.search = function(){
            alert("Start Date: " + $filter('date')($scope.searcher.dtStart,'yyyy-MM-dd'));
            alert("End Date: " + $filter('date')($scope.searcher.dtEnd,'yyyy-MM-dd'));
            alert("Channel: " + $scope.searcher.channel.code);
             
        }

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'yyyy-MM-dd';

        $scope.channels = [
            {code:'001', name:'移动APP'},
            {code:'002', name:'PC端'},
            {code:'003', name:'营业部'},
        ];

        $scope.customers = [
            {tel:'13812345678', name:'刘德华'},
            {tel:'13812345678', name:'刘德华'},
            {tel:'13812345678', name:'刘德华'},
            {tel:'13812345678', name:'刘德华'},
            {tel:'13812345678', name:'刘德华'},
            {tel:'13812345678', name:'刘德华'},
            {tel:'13812345678', name:'刘德华'},
            {tel:'13812345678', name:'刘德华'},
        ];

    }
]);