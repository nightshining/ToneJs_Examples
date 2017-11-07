
		var merge = new Tone.Merge().toMaster();
		//two oscillators panned hard left / hard right
		var rightOsc = new Tone.Oscillator({
			"type" : "sawtooth",
			"volume" : -20
		}).connect(merge.right).start();
		var leftOsc = new Tone.Oscillator({
			"type" : "square",
			"volume" : -20
		}).connect(merge.left).start();
		//create an oscillation that goes from 0 to 1200
		//connection it to the detune of the two oscillators
		var detuneLFO = new Tone.LFO({
			"type" : "square",
			"min" : 0,
			"max" : 1200
		}).fan(rightOsc.detune, leftOsc.detune).start();
		//the frequency signal
		var frequency = new Tone.Signal(0.5);
		//the move the 0 to 1 value into frequency range
		var scale = new Tone.ScaleExp(110, 440);

		//multiply the frequency by 2.5 to get a 10th above
		var mult = new Tone.Multiply(2.5);

		//chain the components together
		frequency.chain(scale, mult);
		scale.connect(rightOsc.frequency);
		mult.connect(leftOsc.frequency);
		//multiply the frequency by 2 to get the octave above
		var detuneScale = new Tone.Scale(14, 4);
		frequency.chain(detuneScale, detuneLFO.frequency);
		// GUI //
		// Interface.Slider({
		// 	drag : function(value){
		// 		frequency.rampTo(value, 0.1);
		// 	},
		// 	start : function(){
		// 		Tone.Master.mute = false;
		// 	},
		// 	end: function(){
		// 		Tone.Master.mute = true;
		// 	},
		// 	name : "frequency",
		// 	min : 0,
		// 	max : 1,
		// 	exp : 0.5,
		// 	value : 0.5,
		// 	position: 5
		// });
