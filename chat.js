$(document).ready(function() {
    var Messages = [];
    var LastId = 0;
    var UserName = '';

    var App = {
        init: function() {
            this.loadData();
            this.bindEvents();
        },
        bindEvents: function() {
            $('.content__window').on('click', '.message__delete', this.removeMessage);
            $('.content__window').on('click', '.message__edit', this.editMessage);
            $('#nameButton').on('click', this.beginChat);
            $('#sendButton').on('click', this.sendMessage);

        },
        loadData: function() {
            if (localStorage.length) {
                Messages = $.parseJSON(localStorage.getItem('result'));
                LastId = Messages[Messages.length - 1].id;
                $.each(Messages, function(index, element) {
                    $(".content__window").append('<div class="message" data-id="' + element.id + '"><div class="message__info">'
                        + '<div class="user-info"><div class="message__author">' + element.name + '</div>'
                        + '<div class="message__date">' + element.date +'</div></div><div class="user-control">'
                        + '<div class="message__edit">edit</div><div class="message__delete">delete</div>'
                        + '</div></div><div class="message__text">' + element.text + '</div></div>');
                });
            }
        },
        beginChat: function() {
            UserName = $('#nameText').val();
            $('.login').css('display', 'none');
            $('.content__window').css('display', 'block');
            $('#sendText').attr('placeholder', 'Hello, ' + UserName + '!');
        },
        sendMessage: function() {
            var date = new Date();
            Messages.push({
                id: ++LastId,
                name: UserName,
                date: date.toLocaleString(),
                text: $('#sendText').val()
            });
            $('#sendText').val('');

            localStorage.setItem('result', JSON.stringify(Messages));

            /*$.ajax({
                type: 'POST',
                url: 'ajax.php',
                data: Messages,
                dataType : "json",
                success: function(data) {
                    $(".content__window").append('<div class="message" data-id="' + Messages[Messages.length-1].id + '"><div class="message__info">'
                        + '<div class="user-info"><div class="message__author">' + Messages[Messages.length-1].name + '</div>'
                        + '<div class="message__date">' + Messages[Messages.length-1].date.toLocaleString() +'</div></div><div class="user-control">'
                        + '<div class="message__edit">edit</div><div class="message__delete">delete</div>'
                        + '</div></div><div class="message__text">' + Messages[Messages.length-1].text + '</div></div>');
                },
                failure: function() {
                    alert("Ajax request broken");
                }
            });*/

            //locally
            $(".content__window").append('<div class="message" data-id="' + Messages[Messages.length-1].id + '"><div class="message__info">'
                + '<div class="user-info"><div class="message__author">' + Messages[Messages.length-1].name + '</div>'
                + '<div class="message__date">' + Messages[Messages.length-1].date.toLocaleString() +'</div></div><div class="user-control">'
                + '<div class="message__edit">edit</div><div class="message__delete">delete</div>'
                + '</div></div><div class="message__text">' + Messages[Messages.length-1].text + '</div></div>');
        },
        editMessage: function(event) {
            var messageIndex = $(event.currentTarget).parents('.message').attr('data-id');
            var messageText = $(event.currentTarget).parents('.message').find('.message__text');

            for (var i = Messages.length - 1; i >= 0; i--) {
                if (Messages[i].id == messageIndex) {
                    var changeMessage = $('.message')[i];
                    var editButton = $(event.currentTarget)[i];
                    $(editButton).css('background-color', 'red');
                    $('.content__window').off('click', '.message__delete', this.removeMessage);
                    $('.content__window').off('click', '.message__edit', this.editMessage);
                    $('#sendButton').off('click', this.sendMessage);
                    $(changeMessage).append('<div class="changeField"><input type="text" size="158" value="' + $(messageText).text()
                        + '"><input id="changeButton"type="button" value="Change"></div>');
                    $(messageText).css('display', 'none');
                    $('#changeButton').click(function(event) {
                        var changeText = $('.changeField input:first').val();
                        var messageIndex = $('.changeField').parents('.message').attr('data-id');
                        for (var i = Messages.length - 1; i >= 0; i--) {
                            if (Messages[i].id == messageIndex) {
                                var currentText = $('.message__text')[i];
                                $(currentText).text(changeText);
                            }
                        }
                        $('.message__edit').css('background-color', 'blue');
                        $('.changeField').remove();
                        $(messageText).css('display', 'block');
                        App.bindEvents();
                    });
                }

            }
            localStorage.clear();
            localStorage.setItem('result', JSON.stringify(Messages));
        },
        removeMessage: function(event) {
            var messageIndex = $(event.currentTarget).parents('.message').attr('data-id');
            for (var i = Messages.length - 1; i >= 0; i--) {
                if (Messages[i].id == messageIndex) {
                    $('.message[data-id=\"' + Messages[i].id + '\"]').remove();
                    Messages.splice(i, 1);
                }
            }
        }
    };
    App.init();
});
