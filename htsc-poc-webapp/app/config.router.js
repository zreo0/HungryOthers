﻿'use strict';
angular.module('app')
    .constant('_', window._) // define constant for lodash
    .run(
        [
            '$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/app/dashboard');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'views/layout.html'
                    })
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'views/dashboard.html',
                        ncyBreadcrumb: {
                            label: '仪表盘',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/jquery/charts/sparkline/jquery.sparkline.js',
                                            'lib/jquery/charts/easypiechart/jquery.easypiechart.js',
                                            'lib/jquery/charts/flot/jquery.flot.js',
                                            'lib/jquery/charts/flot/jquery.flot.resize.js',
                                            'lib/jquery/charts/flot/jquery.flot.pie.js',
                                            'lib/jquery/charts/flot/jquery.flot.tooltip.js',
                                            'lib/jquery/charts/flot/jquery.flot.orderBars.js',
                                            'app/controllers/dashboard.js',
                                            'app/directives/realtimechart.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    
                    .state('app.profile', {
                        url: '/profile',
                        templateUrl: 'views/profile.html',
                        ncyBreadcrumb: {
                            label: '客户画像'
                        },
/*                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/jquery/charts/flot/jquery.flot.js',
                                            'lib/jquery/charts/flot/jquery.flot.resize.js',
                                            'app/controllers/profile.js'
                                        ]
                                    });
                                }
                            ]
                        }*/
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/profile.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })

                    .state('app.classification', {
                        url: '/classification',
                        templateUrl: 'views/classification.html',
                        ncyBreadcrumb: {
                            label: '群体分析'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.select','ngGrid','toaster']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'lib/jquery/fuelux/wizard/wizard-custom.js',
                                                    'app/controllers/classification.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })

                    .state('app.personality', {
                        url: '/personality',
                        templateUrl: 'views/personality.html',
                        ncyBreadcrumb: {
                            label: '个体分析'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.select']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/personality.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })

                    .state('app.product', {
                        url: '/personality',
                        templateUrl: 'views/product.html',
                        ncyBreadcrumb: {
                            label: '产品分析'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.select']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/product.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    // below are the settings of templates
                    .state('app.elements', {
                        url: '/elements',
                        templateUrl: 'views/elements.html',
                        ncyBreadcrumb: {
                            label: 'UI Elements',
                            description: 'Basics'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'app/controllers/pagination.js',
                                            'app/controllers/progressbar.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.fontawesome', {
                        url: '/fontawesome',
                        templateUrl: 'views/font-awesome.html',
                        ncyBreadcrumb: {
                            label: 'FontAwesome',
                            description: 'Iconic Fonts'
                        }
                    })
                    .state('app.glyphicons', {
                        url: '/glyphicons',
                        templateUrl: 'views/glyph-icons.html',
                        ncyBreadcrumb: {
                            label: 'GlyphIcons',
                            description: 'Sharp and clean symbols'
                        }
                    })
                    .state('app.typicons', {
                        url: '/typicons',
                        templateUrl: 'views/typicons.html',
                        ncyBreadcrumb: {
                            label: 'Typicons',
                            description: 'Vector icons'
                        }
                    })
                    .state('app.weathericons', {
                        url: '/weathericons',
                        templateUrl: 'views/weather-icons.html',
                        ncyBreadcrumb: {
                            label: 'Weather Icons',
                            description: 'Beautiful forcasting icons'
                        }
                    })
                    .state('app.tabs', {
                        url: '/tabs',
                        templateUrl: 'views/tabs.html',
                        ncyBreadcrumb: {
                            label: 'Tabs',
                            description: 'Tabs and Accordions'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'app/controllers/accordion.js',
                                            'app/controllers/tab.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.alerts', {
                        url: '/alerts',
                        templateUrl: 'views/alerts.html',
                        ncyBreadcrumb: {
                            label: 'Alerts',
                            description: 'Tooltips and Notifications'
                        },
                        resolve: {
                            deps:
                            [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return $ocLazyLoad.load({
                                                    serie: true,
                                                    files: [
                                                        'app/controllers/alert.js',
                                                        'app/controllers/toaster.js'
                                                    ]
                                                }
                                            );
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.modals', {
                        url: '/modals',
                        templateUrl: 'views/modals.html',
                        ncyBreadcrumb: {
                            label: 'Modals',
                            description: 'Modals and Wells'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'app/controllers/modal.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.buttons', {
                        url: '/buttons',
                        templateUrl: 'views/buttons.html',
                        ncyBreadcrumb: {
                            label: 'Buttons'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'app/controllers/button.js',
                                            'app/controllers/dropdown.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.nestablelist', {
                        url: '/nestablelist',
                        templateUrl: 'views/nestable-list.html',
                        ncyBreadcrumb: {
                            label: 'Nestable Lists',
                            description: 'Dragable list items'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ng-nestable']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/nestable.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.treeview', {
                        url: '/treeview',
                        templateUrl: 'views/treeview.html',
                        ncyBreadcrumb: {
                            label: 'Treeview',
                            description: "Fuel UX's tree"
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['angularBootstrapNavTree']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/treeview.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.simpletables', {
                        url: '/simpletables',
                        templateUrl: 'views/tables-simple.html',
                        ncyBreadcrumb: {
                            label: 'Tables',
                            description: 'simple and responsive tables'
                        }
                    })
                    .state('app.datatables', {
                        url: '/datatables',
                        templateUrl: 'views/tables-data.html',
                        ncyBreadcrumb: {
                            label: 'Datatables',
                            description: 'jquery plugin for data management'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ngGrid']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/nggrid.js',
                                                    'lib/jquery/datatable/dataTables.bootstrap.css',
                                                    'lib/jquery/datatable/jquery.dataTables.min.js',
                                                    'lib/jquery/datatable/ZeroClipboard.js',
                                                    'lib/jquery/datatable/dataTables.tableTools.min.js',
                                                    'lib/jquery/datatable/dataTables.bootstrap.min.js',
                                                    'app/controllers/datatable.js'
                                                ]
                                            });
                                        }
                                    );

                                }
                            ]
                        }

                    })
                    .state('app.formlayout', {
                        url: '/formlayout',
                        templateUrl: 'views/form-layout.html',
                        ncyBreadcrumb: {
                            label: 'Form Layouts'
                        }
                    })
                    .state('app.forminputs', {
                        url: '/forminputs',
                        templateUrl: 'views/form-inputs.html',
                        ncyBreadcrumb: {
                            label: 'Form Inputs'
                        }
                    })
                    .state('app.formpickers', {
                        url: '/formpickers',
                        templateUrl: 'views/form-pickers.html',
                        ncyBreadcrumb: {
                            label: 'Form Pickers',
                            description: 'Data Pickers '
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.select', 'ngTagsInput', 'daterangepicker', 'vr.directives.slider', 'minicolors', 'dropzone']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/select2.js',
                                                    'app/controllers/tagsinput.js',
                                                    'app/controllers/datepicker.js',
                                                    'app/controllers/timepicker.js',
                                                    'app/controllers/daterangepicker.js',
                                                    'lib/jquery/fuelux/spinbox/fuelux.spinbox.js',
                                                    'lib/jquery/knob/jquery.knob.js',
                                                    'lib/jquery/textarea/jquery.autosize.js',
                                                    'app/controllers/slider.js',
                                                    'app/controllers/minicolors.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.formwizard', {
                        url: '/formwizard',
                        templateUrl: 'views/form-wizard.html',
                        ncyBreadcrumb: {
                            label: 'Form Wizard'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/jquery/fuelux/wizard/wizard-custom.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.formvalidation', {
                        url: '/formvalidation',
                        templateUrl: 'views/form-validation.html',
                        ncyBreadcrumb: {
                            label: 'Form Validation',
                            description: 'Bootstrap Validator'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'app/controllers/validation.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.formeditors', {
                        url: '/formeditors',
                        templateUrl: 'views/form-editors.html',
                        ncyBreadcrumb: {
                            label: 'Form Editors'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['textAngular']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/textangular.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.forminputmask', {
                        url: '/forminputmask',
                        templateUrl: 'views/form-inputmask.html',
                        ncyBreadcrumb: {
                            label: 'Form Input Mask'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/jquery/inputmask/jasny-bootstrap.min.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })



            }
        ]
    );