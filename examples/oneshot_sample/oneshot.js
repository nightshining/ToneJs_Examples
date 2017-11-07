
var key = [49,50,51,52,32] //key '1','2','3','4','space'
var scale = {49:'C3',50:'D3',51:'E3',52:'F3',32:'G3'}

var piano = new Tone.Sampler({
			'C3' : path + 'bark.[mp3|ogg]',
			'D3' : path + 'blaster.[mp3|ogg]',
			'E3' : path + 'cymbal.[mp3|ogg]',
			'F3' : path + 'piano.[mp3|ogg]',
      'G3' : path + 'synth.[mp3|ogg]',
		}, {
      'release' : 1,
      'baseUrl' : 'samples/'
     }).toMaster();

		// // GUI //
		// var keyboard = Interface.Keyboard();
		// keyboard.keyDown = function (note) {
		//     piano.triggerAttack(note);
		// };
		// keyboard.keyUp = function (note) {
		//     piano.triggerRelease(note);
		// };

    window.addEventListener('keydown', function (e) {
      console.log(scale[e.keyCode])
    })
