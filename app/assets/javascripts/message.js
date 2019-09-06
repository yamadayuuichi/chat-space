$(document).on('turbolinks:load', function() {
  $(function(){
    
    function buildHTML(message){
      var img = message.image ? `<img src= ${ message.image }>` : '';
      var html = `<div class="message" data-message-id="${message.id}">
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
                      <p>
                        ${img}
                      </p>
                    </div>
                  </div>`
      return html;
    }


    


    $(function(){
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
    });
  
    
        
        
      
      var reloadMessages = function () {
        if(window.location.href.match(/\/groups\/\d+\/messages/)){
          var last_message_id = $(".message:last").data("id")
          $.ajax({
            url: "api/messages",
            type: "GET",
            dataType: 'json',
            data: {id: last_message_id}
          })
          .done(function(messages) {
            var insertHTML = "";
            messages.forEach(function(message){
              insertHTML = buildHTML(message)
              $(".messages").append(insertHTML)
            })
    
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    
          })
          .fail(function() {
            alert('error');
          })
        }
    }
    setInterval(reloadMessages, 5000);
  });
});