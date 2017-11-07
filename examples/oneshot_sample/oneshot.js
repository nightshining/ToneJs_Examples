//Important Note: (MAC ONLY) To run this example:
// 1. open up terminal
// 2. cd into index.html directory
// 3. python -m SimpleHTTPServer
// 4. open 'chrome' in address bar '0.0.0.0:8000'

var key = [49,50,51,52,32] //key '1','2','3','4','space'
var scale = {49:'C3',50:'D3',51:'E3',52:'F3',32:'G3'}

var sampler = new Tone.Sampler({
			'C3' : 'bark.[mp3|ogg]',
			'D3' : 'blaster.[mp3|ogg]',
			'E3' : 'cymbal.[mp3|ogg]',
			'F3' : 'piano.[mp3|ogg]',
      'G3' : 'synth.[mp3|ogg]',
		}, {
      'release' : 1,
      'baseUrl' : 'samples/'
     }).toMaster();

     sampler.send("reverb", -15)
     sampler.send("delay", -8)

var reverb = new Tone.Freeverb(0.5, 4000).receive("reverb").toMaster();
var delay = new Tone.PingPongDelay(0.1, 0.5).receive("delay").toMaster();


window.addEventListener('keydown', function (e) {
    console.log("Play Note: " + scale[e.keyCode])
    sampler.triggerAttackRelease(scale[e.keyCode])
})
