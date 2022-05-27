$.ajaxPrefilter(function(e) {
    e.url = 'http://www.liulongbin.top:3007' + e.url;
    // console.log(e.url);
})