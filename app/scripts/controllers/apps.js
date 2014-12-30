'use strict';

angular.module('app')
  .controller('AppsCtrl', function ($scope, Gateway) {
    $scope.showLoading = true;

    var topicsPromise = Gateway.getTopics();

    topicsPromise.then(function (topics) {
      var appIdMap = {};

      _.each(topics, function (topic) {
        var appId = topic.appId;

        if (appIdMap.hasOwnProperty(appId)) {
          var app = appIdMap[appId];
          app.topicCount++;
        } else {
          var newApp = {
            id: appId,
            name: topic.appName,
            startedTime: topic.appStartedTime,
            topicCount: 1
          };
          appIdMap[appId] = newApp;
        }
      });

      $scope.apps = _.sortBy(_.values(appIdMap), function (app) {
        return (-app.startedTime);
      });
      $scope.showLoading = false;
    }, function () {
      $scope.showLoading = false;
    });

    var linkTemplate = '<a href="#/apps/{{row.id}}">{{row.id}}</a>';

    $scope.tableColumns = [
      { id: 'id', key: 'id',          label: 'Id', template: linkTemplate, width: 250 },
      { id: 'name', key: 'name',        label: 'Name' },
      { id: 'startedTime', key: 'startedTime', label: 'Start Time', template: '<span>{{ row.startedTime | date:\'yyyy-MM-dd HH:mm:ss\' }}</span>', width: 200 },
      { id: 'topicCount', key: 'topicCount',  label: 'Topic Count', width: 150 }
    ];

    $scope.tableOptions = {};
  });
