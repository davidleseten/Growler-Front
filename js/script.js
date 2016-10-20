$(document).ready(function () {
  $('#btn-login').on('click', loadGrowls);
  $('#growl-form').on('submit', createGrowl);
})

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
  img.addClass('growlImage');

  var title = $('<h2 />');
  title.text(growl.title);
  title.addClass('postTitle');

  var name = $('<span />');
  name.text(growl.posterName);
  name.addClass('posterName');

  var handle = $('<span />');
  handle.text(growl.posterHandle);
  handle.addClass('posterHandle');

  var post = $('<p />');
  post.text(growl.post);
  post.addClass('growlPost');

  var time = $('<p />');
  time.text(growl.timestamp);
  time.addClass('timestamp');

  var containerDiv = $('<div />');
  containerDiv.addClass('growlItemContainer')



  var li = $('<li />');
  li.addClass('growlItem')
  li.append(img);
  li.append(title);
  li.append(name);
  li.append(handle);
  li.append(post);
  li.append(time);
  $('#growl-list').append(li);
}
