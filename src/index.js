/**
 * @file lakrplayer 静音播放插件
 * @author yuhui06
 * @date 2018/8/14
 * @desc 在播放器静音播放时，为用户提供提示与交互
 */


import './index.css';
import {Component, Plugin, DOM} from 'larkplayer';

class MutedBtn extends Component {
    constructor(player, options) {
        super(player, options);

        this.hideClass = 'larkplayer-play-muted-hide';
        this.aniClass = 'larkplayer-play-muted-shrink';
        this.handleFirstplay = this.handleFirstplay.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleReady = this.handleReady.bind(this);

        this.initialEvents();
    }

    initialEvents() {
        this.player.on('ready', this.handleReady);
        this.player.on('firstplay', this.handleFirstplay);
        this.on('click', this.handleClick);
    }

    handleReady() {
        this.player.muted() ? this.showMutedBtn() : this.hideMutedBtn();
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
        DOM.removeClass(this.el, this.hideClass);
    }

    resetAni() {
        DOM.removeClass(this.el, this.aniClass);
        DOM.addClass(this.el, this.aniClass);
    }

    hideMutedBtn() {
        DOM.addClass(this.el, this.hideClass);
    }

    dispose() {
        this.player.off('ready', this.handleReady);
        this.player.off('firstplay', this.handleFirstplay);
        this.off('click', this.handleClick);

        super.dispose();
    }

    createEl() {
        return (
            <div className="larkplayer-play-muted larkplayer-play-muted-hide" title="取消静音">
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


