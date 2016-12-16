angular.module('leukemiapp').controller('graphDataMeasurementsController', GraphDataMeasurementsController);

function GraphDataMeasurementsController($scope, $reactive, $timeout, $ionicActionSheet, $translate, $location, WizardStateAccessor) {
    $reactive(this).attach($scope);
    var vm = this;

    //Subscriptions
    //-------------
    $scope.$on('$ionicView.beforeEnter', function (event, data) {
     //   vm.autorun(() => {
            vm.subscribe('smartWatchView',
                () => [vm.getReactively('dataType')],
                {
                    onReady: () => {
                        showDateSelect();
                        vm.processData();
                    }
                }
            );
     //   });
    });

    //Code to be run every time view becomes visible
    //----------------------------------------------
    $scope.$on('$ionicView.beforeEnter', function (event, data) {
        showDateSelect();
        vm.processData();
    });

    //Init
    //----------
    vm.dataType = Session.get('graphDataType');
    vm.viewTitle = $translate.instant(vm.dataType);


    //Stores property names, colors, and visibility attributes
    // object = { name: String, color: String, visible: bool }
    vm.graphProperties = [];

    //Helpers
    //-------
    vm.helpers({
        isSmallScreen: () => {
            return window.innerWidth < 768;
        }
    });


    function formatDate(inputDatabaseDate) {
        return inputDatabaseDate.replace(/(\d\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)/g, '$3. $2. $1 $4:$5:$6');
    }

    function showDateSelect() {
        vm.recordDates = SmartWatchView.find({}, {sort: {date: -1}});
        vm.recordDates = vm.recordDates.fetch();

        for (var i = 0; i < vm.recordDates.length; i++) {
            vm.recordDates[i].formatted = formatDate(vm.recordDates[i].date);
        }
        console.log(vm.recordDates);

        // by default, select the newest set of data
        vm.startDate = vm.recordDates[0];
    }

    function getDataForPeriod() {
        console.log("looking for:" + vm.startDate.date);
        var r = SmartWatchView.findOne({date: vm.startDate.date});
        console.log("getperiod");
        console.log(r);
        return r;
    }

    //Table display helper methods
    //----------------------------
    vm.processData = () => {


        // from  before ↓

        vm.tableObject = {};
        vm.graphProperties = [];

        //Add any properties to be ignored from table/graph display
        var ignoredProperties = [
            'date', 'userId', 'device', 'timestamp', 'button'
        ];

        var data = getDataForPeriod();
        data = data.data;
        if (data[0] != null) {

            //Generating table object by extracting data
            //object = { 'property': [value, value, value ...], ... }
            vm.tableObject['timestamp'] = _.pluck(data, 'timestamp');
            vm.tableObject['timestamp'].forEach(function (timestamp, index) {
                var value = vm.tableObject['timestamp'][index];
                vm.tableObject['timestamp'][index] = moment(value);
            });

            var propertyIndex = 0;
            for (var property in data[0]) {
                if (data[0].hasOwnProperty(property) && !_.contains(ignoredProperties, property)) {
                    //Setup table object
                    vm.tableObject[property] = _.pluck(data, property);

                    //Setup graph object
                    // _.every *
                    // * Returns true if all of the values in the list pass the predicate truth test
                    var isPropertyDisabled = _.every(vm.tableObject[property],
                        (property) => {
                            var isProperty = property != null;

                            //property value invalid if string or array or null
                            return typeof property == 'string' || $.isArray(property) || !isProperty;
                        });

                /*    var propertyName;
                    if (property == 'G') propertyName = 'graphDataMeasurements.activity';
                    if (property == 'T') propertyName = 'graphDataMeasurements.temperature';
                    if (property == 'L') propertyName = 'graphDataMeasurements.lightIntensity';
                    else propertyName = property;*/

                    var graphProperty = {
                        name: property,
                        color: vm.colors[propertyIndex],
                        visible: false,
                        disabled: isPropertyDisabled    //graph disabled for string values
                    };
                    vm.graphProperties.push(graphProperty);
                    propertyIndex++;
                }
            }
            console.log('vm.tableObject is ', vm.tableObject);
            console.log('vm.graphProperties is ', vm.graphProperties);


            //Setup graph by updating datasource
            vm.graphData = generateGraphData();

        } else {
            console.log('No data found :(');
            vm.tableObject = undefined;
            vm.graphProperties = undefined;
            vm.graphData = [];
        }
    }

    //Init of graph options
    //---------------------

    //Colors
    vm.colors = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf",
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf",
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf"
    ];

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    //Options
    vm.graph = {};
    vm.graph.options = {
        chart: {
            type: 'lineChart',
            height: window.innerHeight / 3 * 2,
            showLegend: false,
            interpolate: 'linear',
            noData: $translate.instant('graphData.noData'),
            margin: {
                top: 30,
                right: 30,
                bottom: 30,
                left: 50
            },
            transitionDuration: 500,
            xAxis: {
                tickFormat: function (d) {
                    if (d == null) {
                        return 'N/A';
                    }
                    return d3.time.format('%d/%m %X')(new Date(d));
                }
            },
            yAxis: {
                tickFormat: function (d) {
                    if (!d)if (d == null) {
                        return 'N/A';
                    }
                    return d3.format('.4f')(d);
                }
            }
        }
    };
    vm.graph.config = {
        visible: true, // default: true
        extended: false, // default: false
        disabled: false, // default: false
        autorefresh: true, // default: true
        refreshDataOnly: true, // default: true
        deepWatchOptions: true, // default: true
        deepWatchData: true, // default: false
        deepWatchConfig: true, // default: true
        debounce: 10 // default: 10
    };

    function generateGraphData() {
        var data = [];
        if (vm.graphProperties != null && vm.graphProperties.length > 0) {

            var propertyToShow = _.find(vm.graphProperties, (p) => {
                return p.visible;
            });

            //sets default to first if none
            if (propertyToShow == null) {
                propertyToShow = _.find(vm.graphProperties, (property) => {
                    return property.disabled == false;
                });
                if (propertyToShow == null) {
                    vm.graphData = [];
                } else {
                    propertyToShow.visible = true;
                }
            }

            var graphLine = [];
            if (vm.tableObject != null) {

                var timestampValues = vm.tableObject['timestamp'];
                var propertyValues = vm.tableObject[propertyToShow.name];

                if (Array.isArray(timestampValues) && Array.isArray(propertyValues) && timestampValues.length == propertyValues.length) {

                    //Data found!
                    timestampValues.forEach(function (timestamp, index, array) {
                        var value = propertyValues[index];
                        if (typeof value == 'number' && !isNaN(value) && timestamp) {
                            graphLine.push({
                                x: timestamp,
                                y: value
                            });
                        }
                    });

                } else {
                    console.log('timestampValues or propertyValues is null or undefined!');
                    return [];
                }

            } else {
                console.log('vm.tableObject is null or undefined!');
                return [];
            }

            data.push({
                color: propertyToShow.color,
                values: graphLine
            });

        }

        return data;
    }

    vm.showPropertyGraph = (propertyName) => {

        var propertyToHide = _.find(vm.graphProperties, (p) => {
            return p.visible;
        });

        if (propertyToHide != null) {
            propertyToHide.visible = false;
        } else {
            console.log('No property to hide!');
        }

        var propertyToShow = _.find(vm.graphProperties, (p) => {
            return p.name === propertyName;
        });

        if (propertyToShow != null) {
            propertyToShow.visible = true;
        } else {
            console.log('No matching property to show found for ', propertyName);
        }

        vm.graphData = generateGraphData();
    };

    //Color settings for background and buttons
    //-----------------------------------------

    vm.btnBackground = (property) => {
        var hex = property.color;
        var selected = property.visible;

        var background;
        if (selected) {
            background = 'rgba(' + hexToRgb(hex).r + ',' + hexToRgb(hex).g + ',' + hexToRgb(hex).b
                + ',' + '0.6)';
        } else {
            background = 'rgba(230,230,230,0.6)';
        }

        return background;
    };

    vm.rowBackground = (propertyName) => {

        if (propertyName !== 'timestamp') {
            var property = _.find(vm.graphProperties, (p) => {
                return p.name === propertyName;
            });

            var background;
            if (property != null) {

                var hex = property.color;
                background = 'rgba(' + hexToRgb(hex).r + ',' + hexToRgb(hex).g + ',' + hexToRgb(hex).b
                    + ',' + '0.1)';

            } else {
                console.log('No matching property found for ', propertyName);
            }

            return background;
        } else {
            //console.log('Running vm.rowBackground for property timestamp!');
        }
    };


    $scope.$watch(
        function () {
            return vm.graphData;
        },
        function (newValue, oldValue) {
            console.log('vm.graphData is ', newValue);
            vm.isData = Array.isArray(newValue) && newValue.length > 0;
        }
    );
}

