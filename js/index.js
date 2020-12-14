let PHOTOS = "";
let VISIBLE_PHOTO_COUNT = "";
let TOTAL_PHOTO_COUNT = "";

let MESSAGES = "";
let VISIBLE_MESSAGE_COUNT = "";
let TOTAL_MESSAGE_COUNT = "";

$(document).ready(function() {
    try {
        dbInitialize();
        updateMessages();
    } catch (error) {
        console.error(error);
    }
});

function setPhotos(json) {
    PHOTOS = json["photo_list"];
    VISIBLE_PHOTO_COUNT = json["visible_photo_count"];
    TOTAL_PHOTO_COUNT = Object.keys(PHOTOS).length;

    $.each(PHOTOS, function(index, photo) {
        $("#thumbnail_list").append(
            "<div id='"+index+"' class='thumbnail-box'>" +
            "<div class='thumbnail-wrapper'>" +
                "<img class='thumbnail' src='"+photo+"' onclick='javascript: openGallery("+index+")'>" +
            "</div>" +
            "</div>"
        );

        if(index > VISIBLE_PHOTO_COUNT) $("#"+index).hide();

        if(index == 1) {
            $("#carousel_list").append(
                "<div class='carousel-item active'>" +
                    "<img class='d-block w-100' src='"+photo+"'>" +
                "</div>"
            );
        } else {
            $("#carousel_list").append(
                "<div class='carousel-item'>" +
                    "<img class='d-block w-100' src='"+photo+"'>" +
                "</div>"
            );
        }
    });
}

$.getJSON("resource/photo.json", function(json) {
    setPhotos(json);
});

function showMorePhotos() {
    for(index=VISIBLE_PHOTO_COUNT+1; index<=TOTAL_PHOTO_COUNT; index++) {
        $("#"+index).show();
    }
    $("#more_button").hide();
}

function openGallery(photo_index) {
    $(".carousel").carousel(photo_index-1);
    $("#gallery").css("display", "block");
    disableScroll();
}

function closeGallery() {
    $("#gallery").css("display", "none");
    enableScroll();
}

function disableScroll() {
    $("body").css("overflow", "hidden");
    $("html").css("scrollTop", window.scrollY);
}

function enableScroll() {
    $("body").css("overflow", "visible");
}

(function() {
  'use strict';
  window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                $('#add_message').modal('hide')

                const name = $("#name").val();
                const comment = $("#comment").val();
                const password = $("#password").val();

                try {
                    dbCreateMessage(name, comment, password);
                } catch (error) {
                    console.error(error);
                }
            }
            form.classList.add('was-validated');
        }, false);
    });
  }, false);
})();

function initializeMessageForm() {
    var forms = document.getElementsByClassName('needs-validation');
    $.each(forms, function(index, form) {
        form.reset();
        form.classList.remove('was-validated');
    });
}

function validateNumber() {
    if((event.keyCode<48)||(event.keyCode>57)) {
        event.returnValue=false;
    }
}

function updateMessages() {
    try {
        dbReadAllMessages();
    } catch (error) {
        console.error(error);
    }
}

function setMessages(messages) {
    MESSAGES = messages;
    TOTAL_MESSAGE_COUNT = Object.keys(MESSAGES).length;
    VISIBLE_MESSAGE_COUNT = 5;

    $("#message_list").empty();

    $.each(MESSAGES, function(index, message) {
        $("#message_list").append(
            "<li id='m"+index+"' class='list-group-item message-item'>" +
                "<div class='card-body message-card'>" +
                    "<div class='row'>" +
                        "<div class='col'>" +
                            "<h5 class='card-title message-name'>" + message["name"] + "</h5>" +
                        "</div>" +
                        "<div class='col'>" +
                            "<button type='button' class='close message-delete-button' data-toggle='modal' data-target='#delete_message' onclick='javascript: deleteMessage(" + index + ")'>" +
                                "<span aria-hidden='true'>&times;</span>" +
                            "</button>" +
                        "</div>" +
                    "</div>" +
                    "<p class='card-text message-comment'>" + message["comment"] + "</p>" +
                    "<p class='card-text message-time'><small class='text-muted'>" + formatDate(message["timestamp"].toDate()) + "</small></p>" +
                    "<input type='hidden' id='p"+index+"' value='" + message["password"] + "'>" +
                "</div>" +
            "</li>"
        );

        if(index > VISIBLE_MESSAGE_COUNT) $("#m"+index).hide();
    });
}

function formatDate(timestamp){
    let year = timestamp.getFullYear();
    let month = timestamp.getMonth() + 1;
    let day = timestamp.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    let hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    let seconds = timestamp.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

function showMoreMessages() {
//    $("#gallery").css("display", "block");
    for(index=VISIBLE_MESSAGE_COUNT+1; index<=TOTAL_MESSAGE_COUNT; index++) {
        $("#m"+index).show();
    }
    $("#more_button").hide();
}

function deleteMessage(message) {
    try {

    } catch (error) {
        console.error(error);
    }
}