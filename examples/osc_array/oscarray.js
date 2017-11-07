
var counter = 0;
var counterMax = 16;
var beat = ["4n","8n","16n","32n"]
var oscillators = [];
var oscAmt = 8;
var baseFreq = 210;
var value;

  //Tone js Instruments//
  for (var i = 0; i < oscAmt; i++){
        oscillators.push(new Tone.Oscillator({
        "frequency" : baseFreq * i,
        "type" :  "square",
        "detune" : Math.random() * 30 - 15
      }).toMaster().start());
      oscillators[i].send("reverb", -10);

    }

  //Tone js Effects//
  var reverb = new Tone.Freeverb(0.95, 4000).receive("reverb").toMaster();
  var delay = new Tone.FeedbackDelay(beat[0],15).receive("delay").toMaster();

  //Tone js Transport//
  Tone.Transport.bpm.value = 130;
  Tone.Transport.scheduleRepeat(function(time){
     counter++;
     counter = counter % counterMax;
     //console.log(counter)
   }, beat[0]);
  Tone.Transport.start();
  Tone.Master.volume.value = -40;

//Logic//



window.addEventListener('mousemove', function (e) {
    //console.log("Mouse X: " + e.x + " Mouse Y: " + e.y);
    value = e.x * 0.001;
    console.log(value);
    oscillators.forEach(function(osc, i){
          osc.frequency.rampTo(baseFreq * i * value, 0.2);
     });
})
