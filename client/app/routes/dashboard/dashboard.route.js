import angular from 'angular';
import 'angular-ui-router';

import {appRouteModule} from 'app/routes/app.route';
import serviceOverviewTemplate from 'app/components/dashboard/service-overview/service-overview.html!text';
import settingsTemplate from 'app/components/dashboard/settings/settings.html!text';
import alertsTemplate from 'app/components/dashboard/alerts/alerts.html!text';
import AlertsController from 'app/components/dashboard/alerts/alerts.controller';
import UserSettingsController from 'app/components/dashboard/settings/user-settings.controller';

export var dashboardRouteModule = angular.module('dashboardRouteModule', [
  'ui.router',
  appRouteModule.name
]).config([
  '$stateProvider',
  function dashboardRoute($stateProvider) {
    $stateProvider.state(
      'app.services', {
        url: '/',
        template: serviceOverviewTemplate,
        title:'Services',
        icon:'assets/img/icons/ic_trending_up_24px.svg'
      }
    )
    .state(
      'app.settings', {
        url: '/settings',
        template: settingsTemplate,
        title:'Settings',
        icon:'assets/img/icons/ic_settings_24px.svg',
        controller: UserSettingsController,
        controllerAs: 'settingsCtrl'
      }
    )
    .state(
      'app.alerts', {
        url: '/alerts',
        template: alertsTemplate,
        title: 'Alerts',
        icon: 'assets/img/icons/ic_access_alarm_24px.svg',
        controller: AlertsController,
        controllerAs: 'alertsCtrl'
      }
    );
  }
]);
