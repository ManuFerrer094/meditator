let phases = [];
let currentPhaseIndex = 0;
let intervalId;

function addPhase() {
    const phaseContainer = document.createElement('div');
    phaseContainer.className = 'phase';

    const durationInput = document.createElement('input');
    durationInput.type = 'number';
    durationInput.placeholder = 'Duración (minutos)';
    
    const soundSelect = document.createElement('select');
    const gongOption = document.createElement('option');
    gongOption.value = 'gong';
    gongOption.text = 'Gong';
    const bellOption = document.createElement('option');
    bellOption.value = 'bell';
    bellOption.text = 'Campana';

    soundSelect.appendChild(gongOption);
    soundSelect.appendChild(bellOption);

    phaseContainer.appendChild(durationInput);
    phaseContainer.appendChild(soundSelect);

    document.getElementById('phases').appendChild(phaseContainer);

    phases.push({ durationInput, soundSelect });
}

function startMeditation() {
    currentPhaseIndex = 0;
    if (phases.length > 0) {
        startPhase();
    }
}

function startPhase() {
    const phase = phases[currentPhaseIndex];
    const duration = parseInt(phase.durationInput.value) * 60; // Convertir minutos a segundos
    const sound = phase.soundSelect.value;
    startTimer(duration, sound);
}

function startTimer(duration, sound) {
    let timer = duration;
    updateTitle(timer);
    intervalId = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        updateTitle(timer);
        if (--timer < 0) {
            clearInterval(intervalId);
            playSound(sound);
        }
    }, 1000);
}

function updateTitle(timer) {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.title = `Meditator - ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function playSound(sound) {
    const audio = document.getElementById(sound);
    audio.play();
    audio.onended = () => {
        currentPhaseIndex++;
        if (currentPhaseIndex < phases.length) {
            startPhase();
        } else {
            document.getElementById('timer').textContent = '00:00';
            document.title = 'Meditator';
        }
    };
}
