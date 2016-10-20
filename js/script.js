var lock = new Auth0Lock('P5EDxUyc02sAmpwjQuOAlkrr9GXCgwrZ', 'spiders1999.auth0.com', {
    auth: {
      params: {
        scope: 'openid email'
      }
    }
  });

$(document).ready(function () {
  $('#btn-login').on('click', login);
  $('#growl-form').on('submit', createGrowl);
})

function login(e){
  e.preventDefault();
  lock.show();
}
function logout(e){
  e.preventDefault();
  localStorage.removeItem('id_token');
  window.location.href = "/";
}

function createGrowl(e) {
  e.preventDefault();
  $.ajax({
    url: 'https://daveandjordangrowler.herokuapp.com/growls',
    method: 'POST',
    data: {
      title: $('#title').val(),
      content: $('#text-area').val()
    }
  })
  .done(function (growl) {
    console.log('running');
    loadGrowl(growl);
  })

}

function loadGrowls() {
  console.log('loadGrowls');
  $.ajax({
    url: 'https://daveandjordangrowler.herokuapp.com/growls'
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
  console.log(img);
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

  var post = $('<p />');
  post.text(growl.post);
  post.addClass('growlPost');

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
  growlContentDiv.append(post);
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
