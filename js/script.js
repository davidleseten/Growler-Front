var lock = new Auth0Lock('P5EDxUyc02sAmpwjQuOAlkrr9GXCgwrZ', 'spiders1999.auth0.com', {
    auth: {
      params: {
        scope: 'openid email'
      }
    }
  });

$(document).ready(function () {
  $('#btn-login').on('click', login);
  $('#btn-logout').on('click', logout);
  $('#growl-form').on('submit', createGrowl);
})

function login(e){
  e.preventDefault();
  lock.show();
}
function logout(e){
  e.preventDefault();
  localStorage.removeItem('idToken');
  $('#user-page').hide();
  $('#login-page').show();
  window.location.href = "/";
}

function loginTest(){
  if (isLoggedIn){
    $('#user-page').show();
    $('#login-page').hide();
    loadGrowls();
  } else {
    $('#user-page').hide();
    $('#login-page').show();
  }
}
lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      return;
    }

    localStorage.setItem('idToken', authResult.idToken);
    $('#user-page').show();
    $('#login-page').hide();
    loadGrowls();
  });
});

function createGrowl(e) {
  e.preventDefault();
  $.ajax({
    url: 'https://daveandjordangrowler.herokuapp.com/growls',
    method: 'POST',
    data: {
      title: $('#title').val(),
      content: $('#text-area').val()
    },
    headers:
    {'Authorization':'Bearer ' + localStorage.getItem('idToken')}
  })
  .done(function (growl) {
    console.log('running');
    loadGrowl(growl);
  })

}

function loadGrowls() {
  console.log('loadGrowls');
  $.ajax({
    url: 'https://daveandjordangrowler.herokuapp.com/growls',
    headers:{
      'Authorization':'Bearer ' + localStorage.getItem('idToken')
    }
  })
  .done(function (data) {
    data.forEach(function (datum) {
      loadGrowl(datum);
    });
  });
}

function loadGrowl(growl) {
  console.log(growl);

  var img = $('<img />');
  img.attr('src', growl.posterIcon);


  var title = $('<h2 />');
  title.text(growl.title);
  title.addClass('postTitle');

  var name = $('<span />');
  name.text(growl.posterName);
  name.addClass('posterName');

  var handle = $('<span />');
  handle.text(growl.posterHandle);
  handle.addClass('posterHandle');

  var nameHandle = $('<h3 />')
  nameHandle.text(name.text() + handle.text())

  var content = $('<p />');
  content.text(growl.content);
  content.addClass('growlPost');

  var time = $('<p />');
  time.text(growl.timestamp);
  time.addClass('timestamp');



  var growlImageDiv = $('<div />');
  growlImageDiv.addClass('growlImage');
  growlImageDiv.append(img)

  var growlContentDiv = $('<div />');
  growlContentDiv.addClass('growlcontent');
  growlContentDiv.append(title);
  growlContentDiv.append(nameHandle);
  growlContentDiv.append(content);
  growlContentDiv.append(time);


  var containerDiv = $('<div />');
  containerDiv.addClass('growlItemContainer');
  containerDiv.append(growlImageDiv);
  containerDiv.append(growlContentDiv);

  var li = $('<li />');
  li.addClass('growlItem');

  li.append(containerDiv);

  $('#growl-list').append(li);
}
function isLoggedIn(){
  if(localStorage.getItem('idToken')){
    return true;
  } else {
    return false;
  }
}
