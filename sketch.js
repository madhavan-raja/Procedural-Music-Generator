let fontRegular;
let isPlaying = false;

let baseFreq;
let curFreq;
let currentIntervals;

let musicCount = 0;

function preload()
{
	fontRegular = loadFont("assets/SourceCodePro-Light.otf");
}

function setup()
{
	createCanvas(1000, 600);

	osc = new p5.Oscillator();
  	osc.setType('triangle');
  	osc.amp(0);
  	osc.start();

	bpm = createInput('240', 'number');
	bpm.position(10, 150);
	bpm.attribute('min', '50');
	bpm.attribute('max', '400');

	musicKey = createSelect();
	musicKey.position(145, 230);
	musicKey.option('C');
	musicKey.option('C#');
	musicKey.option('D');
	musicKey.option('D#');
	musicKey.option('E');
	musicKey.option('F');
	musicKey.option('F#');
	musicKey.option('G');
	musicKey.option('G#');
	musicKey.option('A');
	musicKey.option('A#');
	musicKey.option('B');

	
	octave = createInput('0', 'number');
	octave.position(580, 230);
	octave.attribute('min', '-3');
	octave.attribute('max', '3');
	octave.style('width', '92px');

	musicMode = createSelect();
	musicMode.position(210, 310);
	musicMode.option('Ionian (Major)');
	musicMode.option('Dorian');
	musicMode.option('Phrygian');
	musicMode.option('Lydian');
	musicMode.option('Mixolydian');
	musicMode.option('Aeolian (Minor)');
	musicMode.option('Locrian');
	musicMode.style('width', '600px');

	playButton = createButton('PLAY');
	playButton.position(10, 440);
	playButton.mousePressed(togglePlayback);

	fill(255);
	textFont(fontRegular);
	textSize(62);
}

function draw()
{
	background(34);
	text('PROCEDURAL MUSIC GENERATOR', 10, 70);

	text('BPM', 145, 212);
	text('Octave', 330, 292);
	text('Key', 10, 292);
	text('Mode', 10, 372);

	baseFreq = baseFreqs[musicKey.value()];
	currentIntervals = intervals[musicMode.value()];

	console.log(currentIntervals);

	if (musicCount % (3600 / constrain(bpm.value(), 50, 400)) == 0)
	{
		curFreq = baseFreq * random(currentIntervals) * pow(2, constrain(octave.value(), -3, 3));
		osc.freq(curFreq, 0.025);
	}

	if (isPlaying)
	{
		text(curFreq.toFixed(2) + 'Hz', 215, 503);
		musicCount++;
	}
}

function keyPressed()
{
	if (key == ' ')
		togglePlayback();
}

function togglePlayback()
{
	if (isPlaying)
		stopPlaying();
	else
		startPlaying();
}

function startPlaying()
{
	osc.amp(2, 0.5);
	isPlaying = true;
	musicCount = 0;

	playButton.style('background-color', 'white');
	playButton.style('color', 'black');
	playButton.style('border-style', 'none');
}


function stopPlaying()
{
	osc.amp(0, 0.5);
	isPlaying = false;

	playButton.style('background-color', '#222222');
	playButton.style('color', 'white');
	playButton.style('border-style', 'solid');
}