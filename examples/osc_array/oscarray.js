//Examples Oscillator Array//
var counter = 0;
var counterMax = 2;
var beat = ["4n","8n","16n","32n"];
var oscAmt = 8;
var oscillators = [];
var baseFreq = 50;

  //Tone js Instruments//

  //Single Noise Oscillator//
  var noise = new Tone.Noise().toMaster();
  noise.start();
  noise.volume.value = -20;
  noise.send("reverb");
  noise.send("delay");

  //Array Sine Oscillators//
  for (var i = 0; i < oscAmt; i++){
        oscillators.push(new Tone.Oscillator({
        "frequency" : baseFreq * i,
        "type" :  "triangle",
        "volume" : -10,
        "detune" : Math.random() * 30 - 15
      }).toMaster().start());

      oscillators[i].send("reverb", -10);
      oscillators[i].send("delay", -5);
    }

  //Tone js Effects//
  var reverb = new Tone.Freeverb(0.95, 4000).receive("reverb").toMaster();
  var delay = new Tone.FeedbackDelay(beat[1],0.75).receive("delay").toMaster();

  //Tone js Transport//
  Tone.Master.volume.value = -40;
  Tone.Master.bpm = 160;

  //Logic//

  function loopCallback(time){
      counter++;
      counter = counter % counterMax;
      if(counter == counterMax - 1) {
          var r = Math.random()*10;
          var index = Math.abs(Math.round(Math.random()*oscAmt - 1));
          var vIndex = -Math.round(Math.random()*30);
          oscillators[index].frequency.rampTo(baseFreq * r, 5)
          oscillators[index].volume.rampTo(vIndex, 0.4)
          noise.volume.rampTo(vIndex, 1);
          console.log("Ramp osc at index: " + index + " volume " + vIndex );
        }
      }

    var loop = new Tone.Loop(loopCallback, 2);
    loop.start(0);
    Tone.Transport.start(0);

//note: to change all frequencies//
// window.addEventListener('mousemove', function (e) {
//     //console.log("Mouse X: " + e.x + " Mouse Y: " + e.y);
//     value = e.x * 0.001;
//     console.log(value);
//      oscillators.forEach(function(osc, i){
//            osc.frequency.rampTo(baseFreq * i * value, 0.2);
//       });
// })
