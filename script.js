let startTime;
let gameStarted = false;
let reactionTimes = []; // Array to store reaction times

document.getElementById('startButton').addEventListener('click', startGame);
document.addEventListener('keydown', handleResponse);
document.addEventListener('click', handleResponse);

function startGame() {
    gameStarted = false;
    hideElement('result');
    hideElement('rankDisplay'); // Hide the rank display
    hideElement('reactionPrompt');

    let delayTime = Math.random() * 2000 + 1000; // Random delay
    setTimeout(function() {
        showElement('reactionPrompt');
        gameStarted = true;
        startTime = new Date().getTime();
    }, delayTime);
}

function handleResponse(event) {
    if (gameStarted && (event.type === 'click' || event.code === 'Space')) {
        gameStarted = false;
        let reactionTime = new Date().getTime() - startTime;
        document.getElementById('result').innerText = 'Your reaction time: ' + reactionTime + ' ms';
        reactionTimes.push(reactionTime);
        updateReactionTimesList();
        showElement('result');
        showElement('startButton');

        // Determine and display the rank
        let rank = classifyReactionTime(reactionTime);
        document.getElementById('rankDisplay').innerText = 'Rank: ' + rank;
        showElement('rankDisplay'); // Show the rank
    }
}

function classifyReactionTime(reactionTime) {
    if (reactionTime <= 209) return 'Gibbon';
    else if (reactionTime <= 229) return 'Super Professional';
    else if (reactionTime <= 249) return 'Professional';
    else if (reactionTime <= 279) return 'Expert';
    else if (reactionTime <= 330) return 'Amateur';
    else return 'Unranked';
}

function updateReactionTimesList() {
    const list = document.getElementById('reactionTimesList');
    list.innerHTML = ''; // Clear existing list
    reactionTimes.slice().reverse().forEach(time => {
        const li = document.createElement('li');
        li.textContent = `${time} ms`;
        list.appendChild(li);
    });
}

function showElement(elementId) {
    document.getElementById(elementId).classList.remove('hidden');
}

function hideElement(elementId) {
    document.getElementById(elementId).classList.add('hidden');
}

// Sample data for the chart (assuming you've already added this)
const chartData = {
    // ... chart data ...
};

// ... rest of the chart setup code ...

