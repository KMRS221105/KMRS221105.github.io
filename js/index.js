let PHOTOS = "";
let VISIBLE_COUNT = "";
let TOTAL_COUNT = "";

function setPhotos(json) {
    PHOTOS = json["photo_list"];
    VISIBLE_COUNT = json["visible_photo_count"];
    TOTAL_COUNT = Object.keys(PHOTOS).length;

    $.each(PHOTOS, function(index, photo) {
        $("#thumbnail_list").append(
            "<div id='"+index+"' class='thumbnail-box'>" +
            "<div class='thumbnail-wrapper'>" +
                "<img class='thumbnail' src='"+photo+"' onclick='javascript:openGallery("+index+")'>" +
            "</div>" +
            "</div>"
        );

        if(index > VISIBLE_COUNT) $("#"+index).hide();
    });

    $.each(PHOTOS, function(index, photo) {
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
    for(index=VISIBLE_COUNT+1; index<=TOTAL_COUNT; index++) {
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