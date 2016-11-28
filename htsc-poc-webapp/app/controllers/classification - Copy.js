'use strict';
app
// Classification Controller
.controller('ClassificationCtrl', [
    '$scope','$http','$sce', function ($scope,$http,$sce) {

    	$scope.datasources = [
    		{code:"", name:"---请选择数据源---"},
    		{code:"Excel", name:"Excel文件"},
            {code:"Hive", name:"Hive"}
    		//{code:"MySql", name:"MySql数据库"},
    		//{code:"Oracle", name:"Oracle数据库"},
    	];

        $scope.models = [
            {code:"", name:"---请选择数据模型---"},
            {code:"001", name:"RFM客户价值模型"},
            {code:"002", name:"K-Means聚类模型"}
 ];

        $scope.target = {};

    	$scope.datasource = {};
		$scope.datasource.sheets = [];
    	var curWookbook = null;
    	var step1Data = null;
    	var step2Data = null;
    	var step3Data = null;
    	var step4Data = null;
    	var step5Data = null;

        $scope.read = function (workbook) {       	
        	$scope.datasource.sheets = [];
            for (var sheetName in workbook.Sheets) {
	            $scope.datasource.sheets.push(sheetName);
	        }
	        curWookbook = workbook;
        }

      	$scope.error = function (e) {
       		console.log(e);
      	}

	    $scope.gridOptions = {
    	  data: 'curData', 
    	  columnDefs: 'columnDefs',
    	  showFooter: true,	
    	};

        $scope.chgSheet = function () {
	        step1Data = XLSX.utils.sheet_to_json(curWookbook.Sheets[$scope.datasource.sheet]);
	        $scope.curData = step1Data;
	        if ($scope.curData.length > 0) {
	        	var first = $scope.curData[0];
	        	$scope.columnDefs = [];
	        	_.mapKeys(first, function(value,key) {
	        		$scope.columnDefs.push({field:key, displayName:key});	
	        	});
                $scope.criteriaOptions.fields = getFields($scope.columnDefs);

	        }
        }

        $scope.getHiveData = function () {
            step1Data = null; //TODO call hive data service 
            $scope.curData = step1Data;   
            $scope.columnDefs = [];
            getFields($scope.columnDefs);      
        }

        function getFields(columns) {
            var fields = [];
            $scope.target.fields = [];
            _(columns).forEach(function (item){
                fields.push({name:item.field, value: 'o.' + item.field});   
            });
            $scope.target.fields = fields;
            return fields;
        }

        $scope.chgSource = function () {      	
        	$scope.columnDefs = [{field:'', displayName:''}];
        	$scope.curData = null;
        	$scope.datasource.sheets = [];   
            $scope.datasource.sheet = null;   	      	
        }

        $scope.filterData = function () {
            var criteria = createCriteria($scope.criteriaOptions._query.group);      
            step2Data = _.filter(step1Data, function (o) {
                return eval(criteria);
            });
            $scope.curData = step2Data;
        }

        $scope.selFactor = function () {
            $scope.columnDefs = [];
            _($scope.target.fields).forEach( function (item) {
                $scope.columnDefs.push({field:item.name, displayName:item.name});
            });   
        }

        $scope.criteriaOptions = {
/*            fields: [
                { name: 'Firstname', value: 'firstname', attrs: { type: 'text' } },
                { name: 'Birthdate', value: 'birthdate', attrs: { type: 'date' } },
                { name: 'City', value: 'city', attrs: { type: 'text', 'required': true } },
                { name: 'Country', value: 'country', attrs: { type: 'text' } },
            ],*/
            operators: [
                { name: '并且', value: '&&' },
                { name: '或则', value: '||' }
            ],
            conditions: [
                { name: '等于', value: '=' },
                { name: '不等于', value: '!=' },
                { name: '小于', value: '<' },
                { name: '小于等于', value: '<=' },
                { name: '大于', value: '>' },
                { name: '大于等于', value: '>=' }
            ],
        };

        function htmlEntities(str) {
            return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        function createOutput(group) {
            if (!group) return "";
            for (var str = "(", i = 0; i < group.rules.length; i++) {
                i > 0 && (str += " <span class='text-primary'>" + group.operator.name + "</span> ");
                var strData =  isNaN(group.rules[i].data) ? " '" + group.rules[i].data + "'" : " " + group.rules[i].data;
                str += group.rules[i].group ?
                    createOutput(group.rules[i].group) :
                    //group.rules[i].field.name + " " + htmlEntities(group.rules[i].condition.name) + " '" + group.rules[i].data + "'";
                    group.rules[i].field.name + " " + htmlEntities(group.rules[i].condition.name) + strData;
            }

            return str + ")";
        }

        function createCriteria(group) {
            if (!group) return "";
            for (var str = "(", i = 0; i < group.rules.length; i++) {
                i > 0 && (str += " " + group.operator.value + " ");
                var strData =  isNaN(group.rules[i].data) ? " '" + group.rules[i].data + "'" : " " + group.rules[i].data;
                str += group.rules[i].group ?
                    createCriteria(group.rules[i].group) :
                    //group.rules[i].field.value + " " + group.rules[i].condition.value + " " + group.rules[i].data + "";
                    group.rules[i].field.value + " " + group.rules[i].condition.value + strData;
            }

            return str + ")";
        }

        $scope.$watch(function () {
            return $scope.criteriaOptions._query;
        }, function (value) {
            if (value) {
                //$scope.sql = createSql(value.group);
                $scope.output = createOutput(value.group);
            }
        }, true);

    }
]);