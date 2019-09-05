$(document).on('turbolinks:load', function() {
  $(function(){

    function buildHTML(message){
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="message">
                  <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.date}
                  </div>
                  </div>
                  <div class="lower-message">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                    ${img}
                  </div>
                  </div>`
      return html;
    }


    var buildMessageHTML = function(message) {
      if (message.content && message.image.url) {
        //data-idが反映されるようにしている
        var html = `<div class="message" data-id= ${ message.id }  >
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>  
                        <img src="${message.image.url}" class="lower-message__image" >
                      </div>
                    </div>`
      } else if (message.content) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-id= ${message.id}>
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                      </div>
                    </div>`
      } else if (message.image.url) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-id= ${message.id}>
                      <div class="upper-message">
                        <div class="upper-message__user-name">' +
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message">
                        <img src="${message.image.url}" class="lower-message__image" >
                      </div>
                    </div>`
    };
    return html;
  };
  $(function(){
    setInterval(update, 10000);
    $("#new_message").on("submit", function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = (window.location.href);
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('input').prop('disabled', false);
        $('.new_message')[0].reset();
      })
      .fail(function(){
        alert('error')
      })
    });

    var reloadMessages =function() {
      last_message_id = $(".message:last").data("id")
      $.ajax({
        url: "/groups/:group_id/api/messages.json",
        type: "GET",
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML ='';

      })
      .fail(function() {
        console.log('error');
      })
    }
  });
  });
});