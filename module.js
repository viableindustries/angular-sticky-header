'use strict';

/**
 * @ngdoc directive
 * @name managerApp.directive:stickyHeader
 * @description
 *   Creates a "sticky" behaviour for any element it is attached to
 */
angular.module('angularStickyHeader', [])
  .directive('sticky', ['$window', function ($window) {
     
    return {
        restrict: 'A',
        scope: {
          stickyParent: '=?',
          stickyActive: '=?'
        },
        link: function(scope, element, attrs) {

          //
          // See if there is a height set in the Directive, otherwise default
          // to 126px tall
          //
          var parent = document.getElementsByClassName('site-header');

          //
          // Watch the Angular scoll behaviour and switch the Active status
          // when the Height limit (e.g., 126) is set.
          //
          angular.element($window).bind('scroll', function() { 
          
            //
            // We need to get the displayed height of the block being fixed at
            // the top of the page
            //
            var height = element[0].clientHeight,
                offsetLimit = (parent[0].clientHeight) ? parent[0].clientHeight: 0;

            scope.$apply(function() {
              if (window.pageYOffset > offsetLimit) {
                scope.stickyActive = true;
                element[0].nextElementSibling.style.marginTop = height + 'px';
              } else if (window.pageYOffset < offsetLimit) {
                scope.stickyActive = false;
                if (element[0].nextElementSibling.style.marginTop) {
                  element[0].nextElementSibling.style.marginTop = 0;
                }
              }
            });
          });          
        }
    };
  }]);

