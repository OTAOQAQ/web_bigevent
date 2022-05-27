$.ajaxPrefilter(function(e) {
    e.url = 'http://www.liulongbin.top:3007' + e.url;
    // console.log(e.url);
    if (e.url.indexOf('/my/') !== -1) {
        e.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    e.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})