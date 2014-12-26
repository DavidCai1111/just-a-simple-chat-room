var socket;

//未登录时隐藏聊天界面
$('.chatBox').hide();
$('.contentBox').hide();

//进入聊天室
$('#save').click(function(event) {
    event.preventDefault();
    if ($('#nickName').val() !== '') {

    	//已输入昵称，链接聊天室
        socket = io.connect('http://localhost');

        //收到聊天信息
        socket.on('getChat', function(data) {
            $('.contentBox p:last').after('<p class="text-left">' + data.nickName + '说:' + data.content + '</br></p>');
        	$('.contentBox').scrollTop($('.contentBox')[0].scrollHeight);
        });

        //发出聊天信息
        $('#say').click(function(event) {
            event.preventDefault();
            if ($('#context').val() !== '') {
                socket.emit('sendChat', {
                    nickName: $('.nickNameSay').text(),
                    content: $('#context').val()
                });
                $('#context').val('');
            } else {
                alert('内容不能为空');
            }
        });

        //初始化聊天室界面
        $('.nickNameSay').text($('#nickName').val());
        $('.nickNameBox').fadeOut();
        $('.chatBox').fadeIn();
        $('.contentBox').fadeIn();
    } else {
        alert('输入的昵称不能为空');
    }
});

