import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor() {
    super();

    this.state = {
      file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      is_playing: false,
      progress: 0.2,
      in_set_progress_mode: false,
      is_progress_dirty: false
    };

    this.is_progress_dirty = false;
  }

  togglePlay() {
    this.setState({ is_playing: !this.state.is_playing });
  }

  startSetProgress(e) {
    this.setState({
      in_set_progress_mode: true
    });
    this.setProgress(e)
  }

  stopSetProgress(e) {
    this.setState({
      in_set_progress_mode: false
    });
    this.setProgress(e);
  }

  setProgress(e) {
    if (this.state.in_set_progress_mode) {
      var progress = (e.clientX - offsetLeft(this.refs.progress_bar)) / this.refs.progress_bar.clientWidth;
      this.setState({
        progress: progress,
      });
      this.is_progress_dirty = true;
    }
  }

  render() {
    if (this.refs.player) {
      const player = this.refs.player;

      if (player.paused) {
        if (this.state.is_playing) {
          player.play();
        }
      }
      else if (!this.state.is_playing) {
        player.pause();
      }

      if (this.is_progress_dirty) {
        this.is_progress_dirty = false;

        player.currentTime = player.duration * this.state.progress;
      }

    }

    var playerClassName = {
      "fa": true,
      "fa-play": !this.state.is_playing,
      "fa-pause": this.state.is_playing
    }

    return (
      <div className="player">
        <div className="controls">
          <a href="javascript:void();">
            <i className="fas fa-chevron-left"></i>
          </a>
          <a onClick={this.togglePlay.bind(this)}>
            <i className={classnames(playerClassName)} aria-hidden="true"></i>
          </a>
          <a href="javascript:void();">
            <i className="fas fa-chevron-right"></i>
          </a>
        </div>
        <div
          onMouseDown={this.startSetProgress.bind(this)}
          onMouseMove={this.setProgress.bind(this)}
          onMouseLeave={this.stopSetProgress.bind(this)}
          onMouseUp={this.stopSetProgress.bind(this)}
          className="progress">

          <div ref="progress_bar" className="bar">
            <div style={{ width: (this.state.progress * 100) + '%' }}></div>
          </div>
        </div>
        <audio ref="player">
          <source src={this.state.file} autoPlay="true" />
        </audio>
      </div>

    );
  }
}

function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}

function classnames(obj) {
  var css = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      css.push(key);
    }
  });
  return css.join(' ');
}


export default Player;
