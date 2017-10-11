var channels = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas'
];
function getChannelInfo() {
  for (var i = 0; i < channels.length; i++) {
    (function(i) {
      $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/' + channels[i] + '?callback=?', function(data) {
        console.log(data);
        var game, status;
        if (data.stream == null) {
          game = 'Offline';
          status = 'offline';
        } else if (data.stream === undefined) {
          game = 'Account Closed';
          status = 'offline';
        } else {
          game = data.stream.game;
          status = 'online';
        }
        console.log(i);
        $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/' + channels[i] + '?callback=?', function(data1) {
          console.log(i);
          console.log(data1);
          var channelImage = data1.logo != null ? data1.logo : 'http://i.stack.imgur.com/Dj7eP.jpg';
          var name = data1.display_name != null ? data1.display_name : channels[i];
          var description = status === 'online' ? ': ' + data1.status : '';
          var channelHtml =
            '<a href ="' +
            data1.url +
            '"><div class="program ' +
            status +
            '" > <main class="sidebar-second">' +
            name +
            '</main> <aside class="sidebar-first"> <img id="avatar" src="' +
            channelImage +
            '"/></aside><aside class="main">' +
            game +
            '<i>' +
            description +
            ' </i></aside></div></a>';
          status === 'online' ? $('.programcontent').prepend(channelHtml) : $('.programcontent').append(channelHtml);
        });
      });
    })(i);
  }
}
$(document).ready(function() {
  getChannelInfo();
  $('input').on('click', function() {
    if ($('#all').is(':checked')) {
      $('.program').show();
    } else if ($('#online').is(':checked')) {
      $('.online').show();
      $('.offline').hide();
    } else {
      $('.offline').show();
      $('.online').hide();
    }
  });
});
