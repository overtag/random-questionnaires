var app;

var mainView;
var $$ = Dom7;
var cordovaCall;
$$(document).on('deviceready', function() {
  console.log('cordova.plugins.CordovaCall is now available');
  cordovaCall = cordova.plugins.CordovaCall;
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://randomuser.me/api/?results=30', false);
xhr.onload = function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // вывести результат
      var data = JSON.parse(xhr.responseText);
      const element = document.getElementById('debug');
      element.innerHTML = "xhr.responseText";

      var data = JSON.parse(xhr.responseText);
      addList(data.results);

      var searchbar = app.searchbar.create({
        el: ".searchbar",
        searchContainer: ".list",
        searchIn: ".item-title",     
      });   
    }
};

xhr.send();

function addList (arr) {
  var element = document.getElementById('page-content-1');
  var routes = []
  for (var i = 0; i < arr.length; i++) {
    var li = document.createElement('li');
    li.className = 'item-content';
     li.innerHTML = '<a href="/user-'+ i +'/" class="item-content item-link">' +
      '<div class="item-inner">' +
        '<div class="item-title">' +
          arr[i].name.first + ' ' + arr[i].name.last +
        '</div>' +
        '<img src="' + arr[i].picture.thumbnail + '">' +
      '</div>' +
    '</a>`';

    element.appendChild(li);

     var route = {
      path: "/user-" + i + "/",
      url: 'user.html',
      options: {
        context: arr[i],
      },
      on: {
        pageAfterIn: routePageAfterIn,
      },
    }
    routes.push(route);
  } 

  init(routes); 
} 

function init(routes) {
  app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: routes,
    // ... other parameters
  });

  mainView = app.views.create('.view-main')
}


function routePageAfterIn(event, page) {

  var route = event.detail.route;
  var name = document.getElementById('user-info');
  /*name.innerHTML = 
    '<li class="item-content">' +
      '<img src="' + route.context.picture.medium + 'class="pb-standalone" alt="photo">' +
    '</li>' +
    '<li class="item-content">' +
     'name: ' + route.context.name.first + ' ' + route.context.name.last +
    '</li>' +
    '<li class="item-content">' +
      'email: '+ route.context.email +
    '</li>' +
   ' <li class="item-content">' +
      'phone:' + route.context.phone +
    '</li>';

  var myPhotoBrowserStandalone = app.photoBrowser.create({
      photos : [route.context.picture.large]
  });
  //Open photo browser on click
  $$(`.pb-standalone`).on('click', function () {
      myPhotoBrowserStandalone.open();
  });*/
}