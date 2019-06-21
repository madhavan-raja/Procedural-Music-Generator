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
	musicKey.position(145, 220);
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
	octave.position(545, 220);
	octave.attribute('min', '-3');
	octave.attribute('max', '3');
	octave.style('width', '92px');

	musicMode = createSelect();
	musicMode.position(170, 290);
	musicMode.option('Ionian (Major)');
	musicMode.option('Dorian');
	musicMode.option('Phrygian');
	musicMode.option('Lydian');
	musicMode.option('Mixolydian');
	musicMode.option('Aeolian (Minor)');
	musicMode.option('Locrian');
	musicMode.style('width', '470px');

	vol = createSlider(1, 10, 4, 0.1);
	vol.position(8, 428);
	vol.style('width', '180px');

	playButton = createButton('PLAY');
	playButton.position(10, 455);
	playButton.mousePressed(togglePlayback);

	fill(255);
	textFont(fontRegular);
}

function draw()
{
	background(34);
	textSize(62);
	text('Procedural Music Generator', 10, 62);

	textSize(50);
	text('BPM', 145, 200);
	text('Key', 10, 270);
	text('Octave', 315, 270);
	text('Mode', 10, 340);

	baseFreq = baseFreqs[musicKey.value()];
	currentIntervals = intervals[musicMode.value()];

	if (musicCount % (3600 / constrain(bpm.value(), 50, 400)) == 0)
	{
		curFreq = baseFreq * random(currentIntervals) * pow(2, constrain(octave.value(), -3, 3));
		osc.freq(curFreq, 0.025);
	}

	if (isPlaying)
	{
		osc.amp(map(vol.value(), 1, 10, 0.01, 1), 0.1);
		text(curFreq.toFixed(2) + 'Hz', 215, 498);
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