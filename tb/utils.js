export function loadString(url) { return fetch(url).then(r=>r.text())  }
export class Sound {
  static masterVolume
  vol=1 //; buf=null; node=null; static ctx     
  constructor(filename) {
    if(!Sound.ctx) Sound.ctx=new(window.AudioContext||window.webkitAudioContext)()
    let ajax =new XMLHttpRequest()
    ajax.open("GET", filename, true); ajax.responseType="arraybuffer"
    ajax.onerror=()=>{debugger}
    ajax.onload=()=>{ Sound.ctx.decodeAudioData(ajax.response, success=>{this.buf=success}, failure=>{debugger}) }
    ajax.send()
  }
  play() {    
    if(!this.buf)return false
    let src=Sound.ctx.createBufferSource(); if(!src)return false
    src.buffer=this.buf; if(!src.start) src.start=src.noteOn; if(!src.start)return false
    this.node=Sound.ctx.createGain()
    this.node.gain.value=this.vol * Sound.masterVolume  // !!!!!
    src.connect(this.node);this.node.connect(Sound.ctx.destination)
    src.start(0); return true
  }
  stop() {
    if(this.node) this.node.gain.value=0
  }
}
export class Animation {
  //frames=null
  // static ctx
  constructor(frames) {this.frames=frames} // list of images
  draw(x,y,w,h,i) {
    let im=this.frames[Math.floor(i)%this.frames.length]; 
    Animation.ctx.drawImage(im,x,y,w,h)   //w*im.height/im.width)
  }
}
export const isKeyDown = (()=>{
      const state={};
      window.addEventListener('keyup',  (e)=>state[e.key]=false);
      window.addEventListener('keydown',(e)=>state[e.key]=true);
      return (key)=>state.hasOwnProperty(key)&&state[key]||false;
    })();
