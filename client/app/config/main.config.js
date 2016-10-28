import angular from 'angular';
import 'angular-ui-router';

import {errorsRouteModule} from 'app/routes/errors/errors.route';

export var mainConfigModule = angular.module('mainConfigModule', [
  'ui.router',
  'ngMaterial',
  errorsRouteModule.name
]).config([
  '$locationProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider',
  '$controllerProvider', '$rootScopeProvider',
  function ($locationProvider, $urlRouterProvider, $httpProvider, $compileProvider,
            $controllerProvider, $rootScopeProvider) {
    $locationProvider.html5Mode(true);

    $httpProvider.useApplyAsync(true);

    $compileProvider.debugInfoEnabled(true);

    $rootScopeProvider.digestTtl(8);

    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();

      // Remove trailing slashes from path
      if (path !== '/' && path.slice(-1) === '/') {
        $location.replace().path(path.slice(0, -1));
      }
    });

    $urlRouterProvider.otherwise('/404');
  }
]).config(['$mdThemingProvider', function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '900'
    })
    .accentPalette('blue-grey')
    .warnPalette('red', {
      'default': '800'
    });

  $mdThemingProvider.theme('default-dark')
    .primaryPalette('blue', {
      'default': '900'
    })
    .accentPalette('blue-grey')
    .warnPalette('red', {
      'default': '800'
    }).dark();

  $mdThemingProvider.theme('docs-dark')
    .primaryPalette('yellow')
    .accentPalette('blue-grey')
    .warnPalette('red')
    .dark()
}])
  .run([
    '$rootScope',
    function ($rootScope) {
      $rootScope.$on('$stateChangeError', function $stateChangeError(event, toState,
                                                                     toParams, fromState, fromParams, error) {
        console.group();
        console.error('$stateChangeError', error);
        console.error(error.stack);
        console.info('event', event);
        console.info('toState', toState);
        console.info('toParams', toParams);
        console.info('fromState', fromState);
        console.info('fromParams', fromParams);
        console.groupEnd();
      });
    }
  ]);
