//Examples Modulate Oscillator//

		var filter = new Tone.Filter({
			"type"  : "lowpass",
			"frequency"  : 1000 ,
			"rolloff"  : -12 ,
			"Q"  : 1 ,
			"gain"  : 0
		}).toMaster();

		var osc = new Tone.Oscillator({
			"type" : "square",
			"volume" : -10
		}).connect(filter).start();

		var lfo = new Tone.LFO({
			"type" : "square",
			"min" : 0,
			"max" : 1200
		}).chain(osc.detune, filter.detune).start();

		osc.send("delay", -10);
		var feeback = new Tone.FeedbackDelay("8n", 0.6).receive("delay").toMaster();


		var frequency = new Tone.Signal(0.5); //a signal 0-1
		var scale = new Tone.ScaleExp(50, 110); //a scaling 50-440
		var mult = new Tone.Multiply(2.5); //a multiplication * 2.5
		//Connect frequency -> scale -> oscillator.frequency
		frequency.chain(scale, mult);
		scale.chain(osc.frequency);
		//Connect tuning -> lfo
		var tuning = new Tone.Scale(1, 10);
		frequency.chain(tuning, lfo.frequency);

		Tone.Master.volume.value = -20;


window.addEventListener('mousemove', function (e) {
    //console.log("Mouse X: " + e.x + " Mouse Y: " + e.y);
    value = e.x * 0.005;
		frequency.rampTo(value, 5)
});
