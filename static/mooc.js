const PLAYBACK_RATE = 8;
const TOGGLE_TIMESLICE = 15 * 1000;
const BACKWARD_TIMESLICE = 25;
const BACKWARD_TIMEDELTA = BACKWARD_TIMESLICE / 1000 * PLAYBACK_RATE;
const video_document = $('#iframe').contents().find('iframe').contents().get(0);
const video = $(video_document).find('#video_html5_api').get(0);

var backward_token = null;
var toggle_state = true;

function forward() {
	clearInterval(backward_token);
	backward_token = null;
	
	video.playbackRate = PLAYBACK_RATE;
	video.play();
}

function backward() {
	video.pause();
	video.playbackRate = 1;
	
	backward_token = setInterval(() => {
		video.currentTime = video.currentTime - BACKWARD_TIMEDELTA;
	}, BACKWARD_TIMESLICE);
}

function toggle() {
	if(toggle_state)
		forward();
	else
		backward();
	toggle_state = !toggle_state;
}

$(video_document.body).append(`
<style>
	#video_html5_api {
		animation: hue-spin 1s infinite;
	}

	@keyframes hue-spin {
		0%   { filter: saturate(200%) hue-rotate(0deg); }
		100% { filter: saturate(200%) hue-rotate(360deg); }
	}
</style>
`);

video.muted = true;
video.currentTime = 345; // 音乐鉴赏 6.6 音乐万花筒——十面埋伏等赏析

var cancel_toggle = (token => () => (
	clearInterval(token),
	forward(),
	video.playbackRate = 1
))(
	setInterval(toggle, TOGGLE_TIMESLICE)
);
toggle();

