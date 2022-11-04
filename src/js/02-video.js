import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
    
const localStorageKey = 'videoplayer-current-time'

const videoStart = JSON.parse(localStorage.getItem(localStorageKey))
if (videoStart !== null) {
    player.setCurrentTime(videoStart.seconds)
}
    
player.on('timeupdate',
    throttle(({ seconds }) => {
    localStorage.setItem(localStorageKey, JSON.stringify({ seconds }))
    }, 1000)
)
 