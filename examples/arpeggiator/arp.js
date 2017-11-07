
var counter = 0;
var counterMax = 4;
var beat = ["4n","8n","16n","32n"]
var note = ["C#2","D2","F#3","G#4"]

//Tone js Instruments//
var synth = new Tone.Synth({
  "oscillator" : {
    "type" : "sawtooth"
  }
});
synth.toMaster();
synth.send("reverb", -10);

//Tone js Effects//
var reverb = new Tone.Freeverb(0.8, 4000).receive("reverb").toMaster();
var delay = new Tone.FeedbackDelay(beat[1],0.9).receive("delay").toMaster();
//Tone js Transport//
Tone.Transport.bpm.value = 160;
Tone.Transport.scheduleRepeat(function(time){
   counter++;
   counter = counter % counterMax;
   synth.triggerAttackRelease(note[counter], 0.02);

 }, beat[1]);
Tone.Transport.start();
Tone.Master.volume.value = -10;
