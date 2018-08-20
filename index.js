/**
 * @file lakrplayer 静音播放插件
 * @author yuhui06
 * @date 2018/8/14
 * @desc 在播放器静音播放时，为用户提供提示与交互
 */


require('./index.less');
import {Component, Plugin, DOM} from 'larkplayer';

class MutedBtn extends Component {
    constructor(player, options) {
        super(player, options);

        this.hideClass = 'larkplayer-play-muted-hide';
        this.aniClass = 'larkplayer-play-muted-shrink';
        this.handleFirstplay = this.handleFirstplay.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.initialEvents();
    }

    initialEvents() {
        this.player.on('firstplay', this.handleFirstplay);
        this.on('click', this.handleClick);
    }

    handleFirstplay() {
        if (this.player.muted()) {
            this.showMutedBtn();
            this.resetAni();
        } else {
            this.hideMutedBtn();
        }
    }

    handleClick() {
        this.player.muted(false);
        this.hideMutedBtn();
    }

    showMutedBtn() {
        this.removeClass(this.hideClass);
    }

    resetAni() {
        this.removeClass(this.aniClass);
        this.addClass(this.aniClass);
    }

    hideMutedBtn() {
        this.addClass(this.hideClass);
    }

    dispose() {
        this.player.off('firstplay', this.handleFirstplay);
        this.off('click', this.handleClick);

        super.dispose();
    }

    createEl() {
        return (
            <div className="larkplayer-play-muted">
                <div className="larkplayer-play-muted-inner-box">
                    <div className="larkplayer-play-muted__icon">
                    </div>
                    <div className="larkplayer-play-muted__text">
                        点按取消静音
                    </div>
                </div>
            </div>
        );
    }
}

Component.register(MutedBtn, {name: 'mutedBtn'});


