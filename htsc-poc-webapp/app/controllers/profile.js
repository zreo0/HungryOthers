'use strict';
app
// Profile Controller
.controller('ProfileCtrl', [
    '$scope','$http','$timeout','Restangular', function ($scope, $http, $timeout, Restangular) {


    //var yieldData = null;
/*    $http.get("http://localhost:8080/HtscPoC/restsvr?target=yieldData")
    .success(function (response) {
        //yieldData = response;
        $scope.yieldData = [response];
    });*/


    Restangular.one('restsvr').get({target:'yieldData'})
    .then(function (response) {
      $scope.yieldData = [response];
    }, function(error) {
      console.log(error); 
    });

/*    var yieldData = {
        name: '收益率（%）',
        datapoints: [
            { x: '2015-11', y: 2.23 },
            { x: '2015-12', y: 4.21 },
            { x: '2016-01', y: 3.67 },
            { x: '2016-02', y: 1.21 },
            { x: '2016-03', y: 3.45 },
            { x: '2016-04', y: 5.51 },
            { x: '2016-05', y: 3.12 },
            { x: '2016-06', y: 5.41 },
            { x: '2016-07', y: 3.41 },
            { x: '2016-08', y: 6.44 },
            { x: '2016-09', y: 3.09 },
            { x: '2016-10', y: 5.21 },
        ]
    };*/


    Restangular.one('restsvr').get({target:'contributionData'})
    .then(function (response) {
      $scope.contributionData = [response];
    }, function(error) {
      console.log(error); 
    });

/*    var contributionData = {
        name: '贡献度（元）',
        datapoints: [
            { x: '2015-11', y: 1103 },
            { x: '2015-12', y: 1402 },
            { x: '2016-01', y: 739 },
            { x: '2016-02', y: 0 },
            { x: '2016-03', y: 309 },
            { x: '2016-04', y: 689 },
            { x: '2016-05', y: 908 },
            { x: '2016-06', y: 876 },
            { x: '2016-07', y: 1209 },
            { x: '2016-08', y: 1409 },
            { x: '2016-09', y: 1200 },
            { x: '2016-10', y: 709 },
        ]
    };*/

    Restangular.one('restsvr').get({target:'propertyData'})
    .then(function (response) {
      $scope.propertyData = [response];
    }, function(error) {
      console.log(error); 
    });

/*    var propertyData = {
        datapoints: [
            { x: '股票', y: 1010562 },
            { x: '开放基金', y: 528761 },
            { x: '封闭基金', y: 908800 },
            { x: '理财', y: 2009080 },
            { x: '现金', y: 200980 },
        ]
    };*/

    var stockWeightData;
    Restangular.one('restsvr').get({target:'stockWeightData'})
    .then(function (response) {
      stockWeightData = response;
      $scope.stockWeightData = [response];
    }, function(error) {
      console.log(error); 
    });

/*    var stockWeightData = {
        name: '股票',
        datapoints: [
            { x: '2015-11', y: 0.31 },
            { x: '2015-12', y: 0.23 },
            { x: '2016-01', y: 0.32 },
            { x: '2016-02', y: 0.12 },
            { x: '2016-03', y: 0.19 },
            { x: '2016-04', y: 0.21 },
            { x: '2016-05', y: 0.23 },
            { x: '2016-06', y: 0.27 },
            { x: '2016-07', y: 0.36 },
            { x: '2016-08', y: 0.44 },
            { x: '2016-09', y: 0.51 },
            { x: '2016-10', y: 0.57 },
        ]
    };*/

    var fundWeightData;
    Restangular.one('restsvr').get({target:'fundWeightData'})
    .then(function (response) {
      fundWeightData = response;
      $scope.fundWeightData = [response];
    }, function(error) {
      console.log(error); 
    });

/*    var fundWeightData = {
        name: '基金',
        datapoints: [
            { x: '2015-11', y: 0.11 },
            { x: '2015-12', y: 0.23 },
            { x: '2016-01', y: 0.22 },
            { x: '2016-02', y: 0.32 },
            { x: '2016-03', y: 0.29 },
            { x: '2016-04', y: 0.41 },
            { x: '2016-05', y: 0.23 },
            { x: '2016-06', y: 0.17 },
            { x: '2016-07', y: 0.26 },
            { x: '2016-08', y: 0.14 },
            { x: '2016-09', y: 0.21 },
            { x: '2016-10', y: 0.17 },
        ]
    };*/

    var prodWeightData;
    Restangular.one('restsvr').get({target:'prodWeightData'})
    .then(function (response) {
      prodWeightData = response;
      $scope.prodWeightData = [response];
    }, function(error) {
      console.log(error); 
    });

/*    var prodWeightData = {
        name: '理财产品',
        datapoints: [prodWeightData;
            { x: '2015-11', y: 0.31 },
            { x: '2015-12', y: 0.21 },
            { x: '2016-01', y: 0.19 },
            { x: '2016-02', y: 0.12 },
            { x: '2016-03', y: 0.21 },
            { x: '2016-04', y: 0.11 },
            { x: '2016-05', y: 0.32 },
            { x: '2016-06', y: 0.21 },
            { x: '2016-07', y: 0.21 },
            { x: '2016-08', y: 0.31 },
            { x: '2016-09', y: 0.24 },
            { x: '2016-10', y: 0.09 },
        ]
    };*/

    $timeout(function() {
        $scope.propWeightData = [ stockWeightData,fundWeightData, prodWeightData ];
    },2000);

    

    Restangular.one('restsvr').get({target:'stockData'})
    .then(function (response) {
      $scope.stockData = response.stockDataItems;
    }, function(error) {
      console.log(error); 
    });
/*    
    $scope.stockData =  [
        {code:'601688', name:'华泰证券', quantity:200, price: 18.71, trend:0.59, amount:374200},
        {code:'601688', name:'华泰证券', quantity:200, price: 18.71, trend:0.59, amount:374200},
        {code:'601688', name:'华泰证券', quantity:200, price: 18.71, trend:0.59, amount:374200},
        {code:'601688', name:'华泰证券', quantity:200, price: 18.71, trend:0.59, amount:374200},
        {code:'601688', name:'华泰证券', quantity:200, price: 18.71, trend:0.59, amount:374200},
    ];*/

    Restangular.one('restsvr').get({target:'fundData'})
    .then(function (response) {
      $scope.fundData = response.fundDataItems;
    }, function(error) {
      console.log(error); 
    });

/*    $scope.fundData =  [
        {code:'160638', name:'鹏华一带一路分级', trend:1.74, price: 0.7710},
        {code:'160638', name:'鹏华一带一路分级', trend:1.74, price: 0.7710},
        {code:'160638', name:'鹏华一带一路分级', trend:1.74, price: 0.7710},
        {code:'160638', name:'鹏华一带一路分级', trend:1.74, price: 0.7710},
        {code:'160638', name:'鹏华一带一路分级', trend:1.74, price: 0.7710},
    ];*/


    Restangular.one('restsvr').get({target:'finaProdData'})
    .then(function (response) {
      $scope.finaProdData = response.finaProdDataItems;
    }, function(error) {
      console.log(error); 
    });

/*    $scope.finaProdData = [
        {code:'209876', name:'宏康2年期', yearYield:5.5, period: '2年'},
        {code:'209876', name:'宏康2年期', yearYield:5.5, period: '2年'},
        {code:'209876', name:'宏康2年期', yearYield:5.5, period: '2年'},
        {code:'209876', name:'宏康2年期', yearYield:5.5, period: '2年'},
        {code:'209876', name:'宏康2年期', yearYield:5.5, period: '2年'},
    ];*/



    $scope.lineConfig = {
        grid: {show:false, left:40, top:30, right:60, bottom:30},
    };

    $scope.barConfig = {
        grid: {show:false, left:40, top:30, right:60, bottom:30},
    };

    $scope.pieConfig = {
        center: ['55%', '50%'],
        radius : '75%',
        //grid: {show:false, left:40, top:30, right:160, bottom:30},
    };


    //$scope.yieldData = [ yieldData ];
/*    $scope.contributionData = [ contributionData ];
    $scope.propertyData = [ propertyData ];
    $scope.propWeightData = [ stockWeightData,fundWeightData, prodWeightData ];*/
    $scope.propertyType = "股票";


   Restangular.one('restsvr').get({target:'nodes'})
    .then(function (response) {
      $scope.nodes = response;
    }, function(error) {
      console.log(error); 
    });

    /*$scope.nodes = 

{
  "name": "欧阳股神",
  "children": [
    {
      "name": "社会特征",
      "children": [
        {
          "name": "工作"
        },
        {
          "name": "社交",
          "children": [
            {
              "name": "社交强度"
            },
            {
              "name": "社交广度"
            },
            {
              "name": "关注情况"
            },
            {
              "name": "粉丝情况"
            }
          ]
        },
        {
          "name": "生活"
        },
        {
          "name": "移动"
        }
      ]
    },
    {
      "name": "信用特征",
      "children": [
        {
          "name": "征信"
        },
        {
          "name": "负债"
        },
        {
          "name": "违约"
        }
      ]
    },
    {
      "name": "客户价值",
      "children": [
        {
          "name": "客户资产"
        },
        {
          "name": "忠诚度"
        },
        {
          "name": "投资能力"
        },
        {
          "name": "客户类别"
        },
        {
          "name": "生命周期"
        },
        {
          "name": "客户贡献"
        },
        {
          "name": "收入支出"
        }
      ]
    },
    {
      "name": "消费特征",
      "children": [
        {
          "name": "支付渠道",
          "children": [
            {
              "name": "银行卡"
            },
            {
              "name": "信用卡"
            },
            {
              "name": "支付宝"
            }
          ]
        }
      ]
    },
    {
      "name": "投资特征",
      "children": [
        {
          "name": "融资融券",
          "children": [
            {
              "name": "盈利情况"
            },
            {
              "name": "投资额度"
            },
            {
              "name": "风险特征"
            },
            {
              "name": "专业程度"
            }
          ]
        },
        {
          "name": "基金理财",
          "children": [
            {
              "name": "盈利情况"
            },
            {
              "name": "投资额度"
            },
            {
              "name": "风险特征"
            },
            {
              "name": "专业程度"
            }
          ]
        },
        {
          "name": "股票交易",
          "children": [
            {
              "name": "盈利情况"
            },
            {
              "name": "投资额度"
            },
            {
              "name": "风险特征"
            },
            {
              "name": "专业程度"
            },
            {
              "name": "操作类型"
            }
          ]
        },
        {
          "name": "开户特征",
          "children": [
            {
              "name": "开户时间"
            },
            {
              "name": "股龄"
            },
            {
              "name": "开户年龄段"
            }
          ]
        }
      ]
    },
    {
      "name": "行为特征",
      "children": [
        {
          "name": "投资欲望",
          "children": [
            {
              "name": "关注度"
            },
            {
              "name": "参与度"
            },
            {
              "name": "阅读深度"
            }
          ]
        },
        {
          "name": "行为类型",
          "children": [
            {
              "name": "直达型"
            },
            {
              "name": "闲逛型"
            },
            {
              "name": "纠结型"
            }
          ]
        },
        {
          "name": "营销特征",
          "children": [
            {
              "name": "参与度"
            },
            {
              "name": "排斥度"
            },
            {
              "name": "信息阅读率"
            }
          ]
        }
      ]
    },
    {
      "name": "兴趣偏好",
      "children": [
        {
          "name": "投资偏好",
          "children": [
            {
              "name": "持仓偏好",
              "children": [
                {
                  "name": "行业偏好"
                },
                {
                  "name": "概念偏好"
                },
                {
                  "name": "风险偏好"
                }
              ]
            },
            {
              "name": "股票达人"
            },
            {
              "name": "基金达人"
            },
            {
              "name": "理财达人"
            }
          ]
        }
      ]
    }
  ]
};*/



    }
]);