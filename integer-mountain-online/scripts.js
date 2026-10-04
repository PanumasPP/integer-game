// --- Game Configuration ---
const NUM_SQUARES = 50;
let players = [];
// NEW: State for single player mode
let isSinglePlayerMode = false;
let gameMode = 'local';
const escapeGameText = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const defaultPlayerEmojis = ['🚀', '🌟', '🐢', '🦊', '😀', '😂', '😍', '🥳', '🍔', '🍕', '⚽️', '🎨', '💡', '💖', '👍', '💯'];
const commonEmojisForPicker = [
    '🚀', '🌟', '🐢', '🦊', '😀', '😂', '😍', '🥳', '🍔', '🍕', '⚽️', '🎨', '💡', '💖', '👍', '💯',
    '😊', '😎', '🤩', '🤔', '🎉', '🎈', '🎁', '🏆', '🐱', '🐶', '🐼', '🦄', '🤖', '👽', '👾', '👻',
    '👑', '💎', '🍀', '🍄', '🍓', '🍉', '🍎', '🍊', '🍋', '🍌', '🍍', '🥭', '🍑', '🍒', '🥝', '🍅'
];
const fireworkColors = ['#FF5252', '#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#FFEB3B', '#00BCD4', '#E91E63'];

let currentPlayerIndex = 0;
let gameActive = false;
let currentPlayerEmojiSelectionIndex = 0;
let isHandlingBonusMoveQuestion = false;
let currentGameQuestionPool = {};
let pendingAction = null;
let currentRound = 1;
let pendingSetbackCard = null;
let isAnsweringSetbackSave = false;
let isAnsweringFinalQuestion = false;
let isSoundEnabled = true;

const boardConfig = [
    { type: 'start', text: 'เริ่มต้น', icon: 'fas fa-mountain', instruction: 'จุดเริ่มต้นการผจญภัย!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'power-up', text: 'บวกพลัง', icon: 'fas fa-arrow-up', instruction: 'ตอบถูกเพื่อรับพลัง!' },
    { type: 'event', text: 'อีเวนต์', icon: 'fas fa-users', instruction: 'เกิดเหตุการณ์พิเศษ!' }, // Event 1
    { type: 'setback', text: 'อุปสรรค', icon: 'fas fa-arrow-down', instruction: 'เผชิญหน้ากับอุปสรรค!' },
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'setback', text: 'อุปสรรค', icon: 'fas fa-arrow-down', instruction: 'เผชิญหน้ากับอุปสรรค!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'power-up', text: 'บวกพลัง', icon: 'fas fa-arrow-up', instruction: 'ตอบถูกเพื่อรับพลัง!' },
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'setback', text: 'อุปสรรค', icon: 'fas fa-arrow-down', instruction: 'เผชิญหน้ากับอุปสรรค!' },
    { type: 'event', text: 'อีเวนต์', icon: 'fas fa-users', instruction: 'เกิดเหตุการณ์พิเศษ!' }, // Event 2
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'power-up', text: 'บวกพลัง', icon: 'fas fa-arrow-up', instruction: 'ตอบถูกเพื่อรับพลัง!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'setback', text: 'อุปสรรค', icon: 'fas fa-arrow-down', instruction: 'เผชิญหน้ากับอุปสรรค!' },
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'power-up', text: 'บวกพลัง', icon: 'fas fa-wind', instruction: 'ตอบถูกเพื่อรับพลัง!' },
    { type: 'event', text: 'อีเวนต์', icon: 'fas fa-users', instruction: 'เกิดเหตุการณ์พิเศษ!' }, // Event 3
    { type: 'bonus', text: 'โบนัส', icon: 'fas fa-star', instruction: 'ตอบถูกเพื่อรับโบนัส!' },
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'setback', text: 'อุปสรรค', icon: 'fas fa-skull-crossbones', instruction: 'เผชิญหน้ากับอุปสรรค!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'power-up', text: 'บวกพลัง', icon: 'fas fa-arrow-up', instruction: 'ตอบถูกเพื่อรับพลัง!' },
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'setback', text: 'อุปสรรค', icon: 'fas fa-arrow-down', instruction: 'เผชิญหน้ากับอุปสรรค!' },
    { type: 'event', text: 'อีเวนต์', icon: 'fas fa-users', instruction: 'เกิดเหตุการณ์พิเศษ!' }, // Event 4
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'power-up', text: 'บวกพลัง', icon: 'fas fa-bolt', instruction: 'ตอบถูกเพื่อรับพลัง!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'setback', text: 'อุปสรรค', icon: 'fas fa-poo-storm', instruction: 'เผชิญหน้ากับอุปสรรค!' },
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'setback', text: 'อุปสรรค', icon: 'fas fa-arrow-down', instruction: 'เผชิญหน้ากับอุปสรรค!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'power-up', text: 'บวกพลัง', icon: 'fas fa-shield-alt', instruction: 'ตอบถูกเพื่อรับพลัง!' },
    { type: 'event', text: 'อีเวนต์', icon: 'fas fa-users', instruction: 'เกิดเหตุการณ์พิเศษ!' }, // Event 5
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'setback', text: 'อุปสรรค', icon: 'fas fa-arrow-down', instruction: 'เผชิญหน้ากับอุปสรรค!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'puzzle', text: 'ปริศนา', icon: 'fas fa-question-circle', instruction: 'หยิบการ์ดปริศนา!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'normal', text: 'ภารกิจ', icon: 'fas fa-tasks', instruction: 'หยิบการ์ดภารกิจ!' },
    { type: 'finish', text: 'ยอดเขา!', icon: 'fas fa-flag-checkered', instruction: 'ตอบคำถามสุดท้ายเพื่อชนะ!' }
];

// Short layouts use Golden Master proportions, with deterministic, distributed encounters.
// The 50-square entry is the original array itself, including its icon variants.
const BOARD_CONFIGS = {50: boardConfig};
const shortBoardLayouts = {
    20: 'start normal puzzle normal power-up setback event normal puzzle setback bonus normal puzzle power-up event normal setback puzzle normal finish',
    30: 'start normal puzzle normal power-up setback event normal puzzle setback normal power-up puzzle normal setback bonus event normal puzzle power-up setback normal puzzle event normal power-up setback puzzle normal finish',
    40: 'start normal puzzle normal power-up setback event normal puzzle setback normal power-up puzzle normal setback event normal puzzle normal bonus setback normal power-up puzzle event normal setback normal puzzle power-up normal setback event normal puzzle power-up setback normal puzzle finish'
};
for (const [size, layout] of Object.entries(shortBoardLayouts)) {
    BOARD_CONFIGS[size] = layout.split(' ').map(type => ({...boardConfig.find(square => square.type === type)}));
}
let activeOnlineBoardSize = 50;
function getBoardConfig(size) {
    if (![20,30,40,50].includes(size)) throw Error('ขนาดแผนที่ไม่ถูกต้อง');
    return BOARD_CONFIGS[size];
}
function getBoardSize() { return gameMode === 'online' ? activeOnlineBoardSize : NUM_SQUARES; }
function getLastSquareIndex() { return getBoardSize() - 1; }
function getActiveBoardConfig() { return getBoardConfig(getBoardSize()); }

const effectCards = {
    powerUp: [
        { text: "เดินหน้า 2 ช่อง", action: "move_forward", value: 2, icon: "fas fa-shoe-prints" },
        { text: "เดินหน้า 3 ช่อง", action: "move_forward", value: 3, icon: "fas fa-running" },
        { text: "ได้รับเกราะป้องกัน", action: "get_shield", icon: "fas fa-shield-alt" },
        { text: "ทอยลูกเต๋าอีกครั้ง", action: "roll_again", icon: "fas fa-dice-d6" }
    ],
    setback: [
        { text: "ถอยหลัง 3 ช่อง", action: "move_backward", value: 3, icon: "fas fa-undo-alt" },
        { text: "ถอยหลัง 5 ช่อง", action: "move_backward", value: 5, icon: "fas fa-angle-double-left" },
        { text: "ให้เพื่อนหยุดเดิน 1 ตา", action: "prank_skip_turn", value: 1, icon: "fas fa-user-clock" },
    ],
    bonus: [
        { text: "เดินไปช่องที่ 35", action: "go_to_square", value: 34, icon: "fas fa-route" },
        { text: "ทอยลูกเต๋าอีกครั้ง!", action: "roll_again", icon: "fas fa-redo" }
    ]
};

function getBoardEffects(size) {
    if(size === 50) return effectCards;
    // Preserve the original destination and clamp it to the active finish; text matches resolution.
    return {...effectCards, bonus:effectCards.bonus.map(card => card.action === 'go_to_square'
        ? {...card, value:Math.min(card.value,size-1), text:`เดินไปช่องที่ ${Math.min(card.value,size-1)+1}`} : card)};
}

const prankEffects = [
    { text: "ให้เพื่อนถอยหลัง 1 ช่อง", action: "prank_move_backward", value: 1, icon: "fas fa-user-minus" },
    { text: "ให้เพื่อนถอยหลัง 2 ช่อง", action: "prank_move_backward", value: 2, icon: "fas fa-users-cog" },
    { text: "ให้เพื่อนหยุดเดิน 1 ตา", action: "prank_skip_turn", value: 1, icon: "fas fa-user-clock", cost: 10 }
];

const punishmentEffects = [
    { text: "ถอย 1 ช่อง", action: "punish_move_backward", value: 1 },
    { text: "ถอย 2 ช่อง", action: "punish_move_backward", value: 2 },
    { text: "ถอย 5 ช่อง", action: "punish_move_backward", value: 5, for3plusPlayers: true }
];

const groupEvents = OriginalGameRules.GROUP_EVENTS;
// Serializable event metadata is shared with online. These render callbacks remain local-only.
const groupEventResolvers = Object.fromEntries(groupEvents.map(event => [event.id, (players, index, single) => {
    const result = OriginalGameRules.resolveEvent(players, index, single, event);
    showMessage(result.text, result.type, result.duration);
}]));
const gameSounds = {
    diceRoll: new Audio("sounds/dice_roll.mp3"),
    playerMove: new Audio("sounds/player_move.mp3"),
    correctAnswer: new Audio("sounds/correct.mp3"),
    incorrectAnswer: new Audio("sounds/incorrect.mp3"),
    powerUp: new Audio("sounds/power_up.mp3"),
    setback: new Audio("sounds/setback.mp3"),
    bonus: new Audio("sounds/bonus.mp3"),
    cardSelect: new Audio("sounds/card_select.mp3"),
    victory: new Audio("sounds/victory.mp3"),
    buttonClick: new Audio("sounds/button_click.mp3"),
    prank: new Audio("sounds/prank_effect.mp3"),
    countdownTick: new Audio("sounds/countdown_tick.mp3")
};

function playSound(soundName) {
    if (!isSoundEnabled) return;
    const sound = gameSounds[soundName];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.warn(`ไม่สามารถเล่นเสียง "${soundName}" อัตโนมัติ: `, error);
        });
    } else {
        console.warn(`ไม่พบเสียง: ${soundName}`);
    }
}

// --- DOM Elements ---
const mainMenuModal = document.getElementById('mainMenuModal');
const learningHubModal = document.getElementById('learningHubModal');
const settingsModal = document.getElementById('settingsModal');
const reportModal = document.getElementById('reportModal');
const gameSetupScreen = document.getElementById('gameSetupScreen');
const boardContainer = document.getElementById('boardContainer');
const numPlayersSelect = document.getElementById('numPlayersSelect');
const playerConfigArea = document.getElementById('playerConfigArea');
const startGameBtn = document.getElementById('startGameBtn');
const gameBoard = document.getElementById('gameBoard');
const rollDiceButton = document.getElementById('rollDiceButton');
const messageArea = document.getElementById('messageArea');
const centralMessageOverlay = document.getElementById('centralMessageOverlay');
const centralMessageContent = document.getElementById('centralMessageContent');
const cardSelectionModal = document.getElementById('cardSelectionModal');
const cardSelectionTitle = document.getElementById('cardSelectionTitle');
const cardSelectionGrid = document.getElementById('cardSelectionGrid');
const playersInfoPanel = document.getElementById('playersInfoPanel');
const currentPlayerTurnDisplay = document.getElementById('currentPlayerTurn');
const currentRoundCounterDisplay = document.getElementById('currentRoundCounter');
const movementDieValueDisplay = document.getElementById('movementDieValue');
const modal = document.getElementById('questionModal');
const modalTitle = document.getElementById('modalTitle');
const modalQuestion = document.getElementById('modalQuestion');
const modalAnswerInput = document.getElementById('modalAnswerInput');
const modalSubmitButton = document.getElementById('modalSubmitButton');
const modalCloseButton = document.getElementById('modalCloseButton');
const modalFeedback = document.getElementById('modalFeedback');
const questionTimerDisplay = document.getElementById('questionTimerDisplay');
let currentQuestionTimeoutCallback = null;
const emojiPickerModal = document.getElementById('emojiPickerModal');
const emojiGrid = document.getElementById('emojiGrid');
const closeEmojiPickerBtn = document.getElementById('closeEmojiPickerBtn');
const victoryOverlay = document.getElementById('victoryOverlay');
const fireworksContainer = document.getElementById('fireworksContainer');
const winnerNameDisplay = document.getElementById('winnerNameDisplay');
const playAgainBtn = document.getElementById('playAgainBtn');
const reportBtn = document.getElementById('reportBtn');
const prankModal = document.getElementById('prankModal');
const prankTitle = document.getElementById('prankTitle');
const prankOptionsContainer = document.getElementById('prankOptionsContainer');
const prankButtonsContainer = document.getElementById('prankButtonsContainer');
const backgroundMusicElement = document.getElementById('backgroundMusic');
const diceAnimationOverlay = document.getElementById('diceAnimationOverlay');
const diceAnimationText = document.getElementById('diceAnimationText');
const heartbeatOverlay = document.getElementById('heartbeatOverlay');
const soundToggle = document.getElementById('soundToggle');

const explanationModal = document.getElementById('explanationModal');
const explanationContent = document.getElementById('explanationContent');
const closeExplanationBtn = document.getElementById('closeExplanationBtn');

let currentCardData = null;
let cardsForSelection = [];
let currentEffectCards = [];
let questionTimerInterval = null;
let timeLeft = 0;
const QUESTION_TIME_LIMIT = 30;

// --- Event Listeners & Setup ---
document.getElementById('mainMenuStartGameBtn').addEventListener('click', () => {
    playSound('buttonClick');
    gameMode = 'local';
    isSinglePlayerMode = false;
    mainMenuModal.style.display = 'none';
    gameSetupScreen.classList.remove('hidden');
});

document.getElementById('mainMenuSinglePlayerBtn').addEventListener('click', () => {
    playSound('buttonClick');
    gameMode = 'single';
    isSinglePlayerMode = true;
    mainMenuModal.style.display = 'none';
    startSinglePlayerGame();
});

document.getElementById('mainMenuLearningHubBtn').addEventListener('click', () => {
    playSound('buttonClick');
    mainMenuModal.style.display = 'none';
    learningHubModal.style.display = 'flex';
});

document.getElementById('closeLearningHubBtn').addEventListener('click', () => {
    playSound('buttonClick');
    learningHubModal.style.display = 'none';
    mainMenuModal.style.display = 'flex';
});

document.getElementById('mainMenuSettingsBtn').addEventListener('click', () => {
    playSound('buttonClick');
    mainMenuModal.style.display = 'none';
    settingsModal.style.display = 'flex';
});

document.getElementById('closeSettingsBtn').addEventListener('click', () => {
    playSound('buttonClick');
    settingsModal.style.display = 'none';
    mainMenuModal.style.display = 'flex';
});

soundToggle.addEventListener('change', (e) => {
    isSoundEnabled = e.target.checked;
    if (isSoundEnabled && backgroundMusicElement.paused) {
        backgroundMusicElement.play().catch(err => console.log("Autoplay was prevented. User must interact with the page first."));
    } else {
        backgroundMusicElement.pause();
    }
});

numPlayersSelect.addEventListener('change', (e) => {
    playSound('buttonClick');
    createPlayerConfigInputs(parseInt(e.target.value));
});

startGameBtn.addEventListener('click', () => {
    playSound('buttonClick');
    const num = parseInt(numPlayersSelect.value);
    const emojiButtons = document.querySelectorAll('.player-emoji-select-btn');
    const nameInputs = document.querySelectorAll('.player-name-input');
    players = [];
    for (let i = 0; i < num; i++) {
        players.push({
            id: i + 1,
            name: nameInputs[i].value.trim() || `ผู้เล่น ${i + 1}`,
            emoji: emojiButtons[i].textContent.trim(),
            position: 0,
            onBoardPosition: 0,
            score: 0,
            hasShield: false,
            extraTurnsToTake: 0,
            hasBeenPrankedThisRound: false,
            performanceLog: []
        });
    }
    startGameFlow();
});

closeEmojiPickerBtn.addEventListener('click', () => {
    playSound('buttonClick');
    emojiPickerModal.style.display = 'none';
});

rollDiceButton.addEventListener('click', async () => {
    if (gameMode === 'online') { window.OnlineGame.send('ROLL_DICE'); return; }
    if (!gameActive || modal.style.display === 'flex' || cardSelectionModal.style.display === 'flex' || prankModal.style.display === 'flex' || !players[currentPlayerIndex]) return;
    playSound('buttonClick');
    rollDiceButton.disabled = true;
    const movementDieResult = await animateDiceRoll(rollMainGameDie);
    setTimeout(() => {
        movePlayer(movementDieResult, false);
    }, 100);
});

reportBtn.addEventListener('click', () => {
    playSound('buttonClick');
    victoryOverlay.style.display = 'none';
    generateAndShowReport();
});

playAgainBtn.addEventListener('click', resetGame);
document.getElementById('playAgainFromReportBtn').addEventListener('click', resetGame);

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    populateAllCards();
    createPlayerConfigInputs(parseInt(numPlayersSelect.value));
    boardContainer.classList.add('hidden');
    gameSetupScreen.classList.add('hidden');
    mainMenuModal.style.display = 'flex';
});

// --- Core Game Functions ---

function createPlayerConfigInputs(num) {
    playerConfigArea.innerHTML = '';
    for (let i = 0; i < num; i++) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('player-config-entry', 'p-3', 'bg-gray-50', 'rounded-lg', 'shadow-sm');
        entryDiv.innerHTML = `
            <label class="font-semibold text-gray-700 w-1/4">ผู้เล่น ${i + 1}:</label>
            <button type="button" class="player-emoji-select-btn" data-player-index="${i}">${defaultPlayerEmojis[i] || '😃'}</button>
            <input type="text" class="player-name-input setup-input flex-grow" placeholder="ชื่อ (ไม่บังคับ)">
        `;
        playerConfigArea.appendChild(entryDiv);
    }
    document.querySelectorAll('.player-emoji-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            playSound('buttonClick');
            currentPlayerEmojiSelectionIndex = parseInt(e.target.dataset.playerIndex);
            openEmojiPicker();
        });
    });
}

function openEmojiPicker() {
    emojiGrid.innerHTML = '';
    commonEmojisForPicker.forEach(emoji => {
        const btn = document.createElement('button');
        btn.classList.add('emoji-btn');
        btn.textContent = emoji;
        btn.addEventListener('click', () => {
            playSound('buttonClick');
            selectEmoji(emoji);
        });
        emojiGrid.appendChild(btn);
    });
    emojiPickerModal.style.display = 'flex';
}

function selectEmoji(emoji) {
    const playerEmojiButton = document.querySelector(`.player-emoji-select-btn[data-player-index="${currentPlayerEmojiSelectionIndex}"]`);
    if (playerEmojiButton) {
        playerEmojiButton.textContent = emoji;
    }
    emojiPickerModal.style.display = 'none';
}

function startSinglePlayerGame() {
    players = [{
        id: 1,
        name: 'นักผจญภัย',
        emoji: '🧑‍🚀',
        position: 0,
        onBoardPosition: 0,
        score: 0,
        hasShield: false,
        extraTurnsToTake: 0,
        hasBeenPrankedThisRound: false,
        performanceLog: []
    }];
    startGameFlow();
}

function startGameFlow() {
    currentGameQuestionPool = JSON.parse(JSON.stringify(allCards));
    currentRound = 1;
    gameSetupScreen.classList.add('hidden');
    boardContainer.classList.remove('hidden');
    victoryOverlay.style.display = 'none';
    fireworksContainer.innerHTML = '';
    gameActive = true;
    currentPlayerIndex = 0;
    initializeBoard();
    initializePlayersInfoPanel();
    showMessage(`เกมเริ่มต้น! ตาของ ${players[currentPlayerIndex].name}`, 'turn_info');
    rollDiceButton.disabled = false;
    if (isSoundEnabled && backgroundMusicElement.paused) {
        backgroundMusicElement.volume = 0.1;
        backgroundMusicElement.play().catch(error => console.warn("Autoplay was prevented:", error));
    }
}

function resetGame() {
    if (gameMode === 'online') { window.OnlineGame.leave(); return; }
    playSound('buttonClick');
    if (backgroundMusicElement) {
        backgroundMusicElement.pause();
        backgroundMusicElement.currentTime = 0;
    }
    victoryOverlay.style.display = 'none';
    reportModal.style.display = 'none';
    fireworksContainer.innerHTML = '';
    boardContainer.classList.add('hidden');
    gameSetupScreen.classList.add('hidden');
    mainMenuModal.style.display = 'flex';
    createPlayerConfigInputs(parseInt(numPlayersSelect.value));
}

function getVisualBoardColumns() { return window.innerWidth < 700 ? 5 : 10; }
function layoutBoardSquares() {
    const columns = getVisualBoardColumns(), rows = gameBoard.children.length / columns;
    if (!rows) return;
    gameBoard.style.setProperty('--visual-board-columns', columns);
    gameBoard.style.gridTemplateRows = `repeat(${rows}, ${window.innerWidth < 900 ? 'auto' : '75px'})`;
    gameBoard.dataset.visualColumns = String(columns);
    gameBoard.dataset.visualWidth = String(window.innerWidth);
    Array.from(gameBoard.children).forEach((square, index) => {
        const row = Math.floor(index / columns);
        square.style.gridRowStart = rows - row;
        square.style.gridColumnStart = (row % 2 ? columns - 1 - index % columns : index % columns) + 1;
    });
}
function initializeBoard() {
    gameBoard.innerHTML = '';
    const activeBoard = getActiveBoardConfig();
    const numRows = activeBoard.length / 10;
    const numCols = 10;
    gameBoard.style.gridTemplateRows = `repeat(${numRows}, 75px)`;
    gameBoard.dataset.boardSize = String(activeBoard.length);
    for (let i = 0; i < activeBoard.length; i++) {
        const squareData = activeBoard[i];
        const squareDiv = document.createElement('div');
        squareDiv.id = `square-${i}`;
        squareDiv.classList.add('board-square', `${squareData.type}-square`);
        const visualRowFromBottom = Math.floor(i / numCols);
        let visualColInRow;
        if (visualRowFromBottom % 2 === 0) {
            visualColInRow = i % numCols;
        } else {
            visualColInRow = (numCols - 1) - (i % numCols);
        }
        const cssGridRow = numRows - visualRowFromBottom;
        const cssGridColumn = visualColInRow + 1;
        squareDiv.style.gridRowStart = cssGridRow;
        squareDiv.style.gridColumnStart = cssGridColumn;
        squareDiv.innerHTML = `
            <span class="square-number">${i + 1}</span>
            <i class="${squareData.icon} square-icon"></i>
            <span class="square-text">${squareData.text}</span>
            <div class="player-slots-container" id="slots-sq-${i}"></div>
        `;
        gameBoard.appendChild(squareDiv);
    }
    layoutBoardSquares();
    renderPlayerPieces();
}

function initializePlayersInfoPanel() {
    playersInfoPanel.innerHTML = '';
    players.forEach(player => {
        const playerInfoDiv = document.createElement('div');
        playerInfoDiv.id = `player${player.id}InfoDisplay`;
        playerInfoDiv.classList.add('text-lg', 'mb-2', 'p-2', 'border', 'border-gray-200', 'rounded-lg');
        playerInfoDiv.innerHTML = `
            <div class="font-bold">${escapeGameText(player.name)} (${escapeGameText(player.emoji)})</div>
            <div>ช่อง: <span id="player${player.id}Pos" class="font-bold">1</span>
            <span id="player${player.id}ShieldIcon" class="ml-2">${player.hasShield ? '<i class="fas fa-shield-alt text-blue-500"></i>' : ''}</span></div>
            <div><i class="fas fa-star text-yellow-500"></i> คะแนน: <span id="player${player.id}Score" class="font-bold">0</span></div>
        `;
        playersInfoPanel.appendChild(playerInfoDiv);
    });
    updatePlayerInfo();
}

function renderPlayerPieces() {
    document.querySelectorAll('.player-piece').forEach(p => p.remove());
    players.forEach(player => {
        if (player.onBoardPosition < getBoardSize() && player.onBoardPosition >= 0) {
            const slotsContainer = document.getElementById(`slots-sq-${player.onBoardPosition}`);
            if (slotsContainer) {
                const pieceDiv = document.createElement('div');
                pieceDiv.classList.add('player-piece');
                pieceDiv.textContent = player.emoji;
                slotsContainer.appendChild(pieceDiv);
                pieceDiv.classList.add('player-piece-landed');
                playSound('playerMove');
        const schedule = gameMode === 'online' ? window.GameCore.schedule : setTimeout;
        schedule(() => {
            if (pieceDiv) pieceDiv.classList.remove('player-piece-landed');
                }, 700);
            }
        }
    });
}

function updatePlayerInfo() {
    players.forEach(player => {
        const posDisplay = document.getElementById(`player${player.id}Pos`);
        if (posDisplay) posDisplay.textContent = player.position + 1;
        const shieldIconDisplay = document.getElementById(`player${player.id}ShieldIcon`);
        if (shieldIconDisplay) shieldIconDisplay.innerHTML = player.hasShield ? '<i class="fas fa-shield-alt text-blue-500" title="มีเกราะป้องกัน"></i>' : '';
        const scoreDisplay = document.getElementById(`player${player.id}Score`);
        if (scoreDisplay) scoreDisplay.textContent = player.score;
    });
    if (players.length > 0 && players[currentPlayerIndex]) {
        currentPlayerTurnDisplay.textContent = players[currentPlayerIndex].name;
    } else {
        currentPlayerTurnDisplay.textContent = "-";
    }
    currentRoundCounterDisplay.textContent = currentRound;
    window.MobileGameUI?.refresh();
}

function showMessage(msg, type = 'info', duration = 3500) {
    if (type === 'turn_info') {
        messageArea.innerHTML = msg;
        messageArea.className = 'mt-6 p-5 bg-blue-100 text-blue-800 rounded-xl shadow-lg text-center text-lg min-h-[60px]';
        return;
    }
    centralMessageContent.innerHTML = `<div class="p-4">${msg}</div>`;
    centralMessageOverlay.style.display = 'flex';
    const schedule = gameMode === 'online' ? window.GameCore.schedule : setTimeout;
    schedule(() => {
        centralMessageOverlay.style.display = 'none';
    }, duration);
}

function rollMainGameDie() {
    return getRandomInt(1, 6);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getCurrentDifficulty(playerPosition) { return OriginalGameRules.difficulty(playerPosition); }

async function animateDiceRoll(finalRollFunction, duration = 2000) {
    playSound('diceRoll');
    const diceCube = document.getElementById('diceCube');
    diceAnimationOverlay.style.display = 'flex';
    diceAnimationText.textContent = "กำลังทอยลูกเต๋า...";
    diceCube.classList.add('spinning');
    return new Promise(resolve => {
        setTimeout(() => {
            const finalValue = finalRollFunction();
            diceCube.classList.remove('spinning');
            const displayFace = Math.min(6, Math.max(1, finalValue > 0 ? finalValue : (Math.floor(Math.random() * 6) + 1)));
            const rotations = {
                1: 'rotateY(0deg) rotateX(0deg)',
                2: 'rotateY(-90deg) rotateX(0deg)',
                3: 'rotateY(-180deg) rotateX(0deg)',
                4: 'rotateY(90deg) rotateX(0deg)',
                5: 'rotateX(-90deg) rotateY(0deg)',
                6: 'rotateX(90deg) rotateY(0deg)'
            };
            diceCube.style.transform = rotations[displayFace];
            diceAnimationText.innerHTML = `คุณทอยได้: <span class="text-yellow-300 text-5xl">${finalValue}</span>`;
            movementDieValueDisplay.textContent = finalValue;
            setTimeout(() => {
                diceAnimationOverlay.style.display = 'none';
                resolve(finalValue);
            }, 1500);
        }, duration);
    });
}

async function movePlayer(steps, isBonusMove = false) {
    if (!players[currentPlayerIndex]) return;
    const player = players[currentPlayerIndex];
    const move = OriginalGameRules.planMovement(player, steps, isBonusMove, boardConfig);
    const targetPosition = move.target;
    if (move.blocked) {
        showMessage(`<p class="text-2xl font-semibold text-green-600">${player.name} มีเกราะป้องกัน! ไม่ต้องถอยหลังครั้งนี้</p>`, 'success', 3000);
        updatePlayerInfo();
        switchTurn();
        return;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    const moveInterval = 350;
    let currentDisplayPosition = player.onBoardPosition;
    const stepDirection = (targetPosition > currentDisplayPosition) ? 1 : -1;
    function animateStep() {
        if (currentDisplayPosition !== targetPosition) {
            currentDisplayPosition += stepDirection;
            player.onBoardPosition = currentDisplayPosition;
            renderPlayerPieces();
            setTimeout(animateStep, moveInterval);
        } else {
            OriginalGameRules.commitMovement(player, targetPosition);
            renderPlayerPieces();
            updatePlayerInfo();
            window.MobileGameUI?.movementFinished(null, player.position);
            setTimeout(() => {
                const finalSquare = boardConfig[player.position];
                if (!isBonusMove) {
                    handleSquareAction(player.position);
                } else {
                    if (finalSquare.type === 'normal' || finalSquare.type === 'puzzle' || finalSquare.type === 'finish') {
                        isHandlingBonusMoveQuestion = true;
                        handleSquareAction(player.position);
                    } else {
                        switchTurn();
                    }
                }
            }, 500);
        }
    }
    if (player.onBoardPosition !== targetPosition) {
        animateStep();
    } else {
        if (!isBonusMove) handleSquareAction(player.position);
        else switchTurn();
    }
}

function generateAndShowReport() {
    const reportContent = document.getElementById('reportContent');
    let html = `<table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3">ผู้เล่น</th>
                <th scope="col" class="px-6 py-3 text-center">ความแม่นยำรวม</th>
                <th scope="col" class="px-6 py-3 text-center">การบวก</th>
                <th scope="col" class="px-6 py-3 text-center">การลบ</th>
                <th scope="col" class="px-6 py-3 text-center">การคูณ</th>
                <th scope="col" class="px-6 py-3 text-center">การหาร</th>
                <th scope="col" class="px-6 py-3 text-center">ลำดับ/โจทย์ปัญหา</th>
            </tr>
        </thead><tbody>`;
    const categories = ['addition', 'subtraction', 'multiplication', 'division', 'order_of_operations', 'word_problem'];
    players.forEach(player => {
        const stats = {};
        categories.forEach(cat => stats[cat] = {
            correct: 0,
            total: 0
        });
        let totalCorrect = 0;
        let totalAnswered = 0;
        player.performanceLog.forEach(log => {
            totalAnswered++;
            if (log.correct) totalCorrect++;
            const logCategory = (log.category === 'order_of_operations' || log.category === 'word_problem') ? 'order_of_operations' : log.category;
            if (stats[logCategory]) {
                stats[logCategory].total++;
                if (log.correct) stats[logCategory].correct++;
            }
        });
        const overallAccuracy = totalAnswered > 0 ? ((totalCorrect / totalAnswered) * 100).toFixed(0) : 'N/A';
        html += `<tr class="bg-white border-b">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${escapeGameText(player.emoji)} ${escapeGameText(player.name)}</th>
            <td class="px-6 py-4 text-center font-bold">${overallAccuracy}%</td>`;
        categories.forEach(cat => {
            if (cat === 'word_problem') return;
            const catStat = (cat === 'order_of_operations') ? {
                correct: stats.order_of_operations.correct + stats.word_problem.correct,
                total: stats.order_of_operations.total + stats.word_problem.total
            } : stats[cat];
            html += `<td class="px-6 py-4 text-center">${catStat.correct}/${catStat.total}</td>`;
        });
        html += `</tr>`;
    });
    html += `</tbody></table>`;
    reportContent.innerHTML = html;
    reportModal.style.display = 'flex';
}

function displayVictory(winner) {
    playSound('victory');
    gameActive = false;
    rollDiceButton.disabled = true;
    if (backgroundMusicElement) {
        backgroundMusicElement.pause();
        backgroundMusicElement.currentTime = 0;
    }
    if (isSinglePlayerMode) {
        winnerNameDisplay.innerHTML = `🎉 ยินดีด้วย! คุณพิชิตยอดเขาสำเร็จ! 🎉<br>คะแนนรวม: ${winner.score}<br>ใช้ไปทั้งหมด: ${currentRound} รอบ`;
    } else {
        winnerNameDisplay.innerHTML = `🎉 ยินดีด้วย ${escapeGameText(winner.name)} (${escapeGameText(winner.emoji)})! 🎉<br>คุณคือผู้พิชิตยอดเขา! (คะแนนรวม: ${winner.score})`;
    }
    victoryOverlay.style.display = 'flex';
    for (let i = 0; i < 20; i++) {
        const schedule = gameMode === 'online' ? window.GameCore.schedule : setTimeout;
        schedule(() => {
            createFireworkBurst();
        }, i * 150);
    }
}

function createFireworkBurst() {
    const numParticles = 30;
    const burstX = Math.random() * window.innerWidth;
    const burstY = Math.random() * (window.innerHeight * 0.7);
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle absolute w-2 h-2 rounded-full';
        particle.style.backgroundColor = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
        particle.style.left = burstX + 'px';
        particle.style.top = burstY + 'px';
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 100 + 40;
        particle.style.animation = `fireworks-explode 0.7s ease-out forwards`;
        particle.style.setProperty('--tx', Math.cos(angle) * radius + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * radius + 'px');
        fireworksContainer.appendChild(particle);
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `@keyframes fireworks-explode { from { transform: translate(0, 0) scale(1); opacity: 1; } to { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }`;
document.head.appendChild(styleSheet);

function updateTimerDisplay() {
    if (questionTimerDisplay) {
        questionTimerDisplay.textContent = `เวลา: ${timeLeft} วินาที`;
        if (timeLeft <= 5 && timeLeft > 0) questionTimerDisplay.classList.add('text-red-600', 'font-bold', 'animate-pulse');
        else questionTimerDisplay.classList.remove('text-red-600', 'font-bold', 'animate-pulse');
    }
}

function stopQuestionTimer() {
    if (questionTimerInterval) {
        clearInterval(questionTimerInterval);
        questionTimerInterval = null;
    }
    if (questionTimerDisplay) {
        questionTimerDisplay.classList.remove('text-red-600', 'font-bold', 'animate-pulse');
        questionTimerDisplay.textContent = '';
    }
    if (heartbeatOverlay) heartbeatOverlay.style.display = 'none';
}

function startQuestionTimer(onTimeUpCallback) {
    stopQuestionTimer();
    timeLeft = QUESTION_TIME_LIMIT;
    currentQuestionTimeoutCallback = onTimeUpCallback;
    updateTimerDisplay();
    questionTimerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 10 && timeLeft > 0) {
            heartbeatOverlay.style.display = 'block';
            playSound('countdownTick');
        }
        if (timeLeft <= 0) {
            stopQuestionTimer();
            if (currentQuestionTimeoutCallback) currentQuestionTimeoutCallback();
        }
    }, 1000);
}

function displayCardSelection(cardDeckType, titlePrefix = "เลือกการ์ด", customSourcePool = null, presentation = null) {
    playSound('cardSelect');
    cardsForSelection = [];
    const currentPlayer = players[currentPlayerIndex];
    let currentDynamicDifficulty = getCurrentDifficulty(currentPlayer.position);
    if (presentation) cardsForSelection = presentation.cards;
    else if (cardDeckType === 'mission' || cardDeckType === 'puzzle') {
        const pool = customSourcePool || currentGameQuestionPool[cardDeckType][currentDynamicDifficulty] || [];
        cardsForSelection = OriginalGameRules.selectCards(pool, 10);
    } else cardsForSelection = OriginalGameRules.selectCards(effectCards[cardDeckType] || [], 5);
    if (cardsForSelection.length === 0) {
        showMessage("การ์ดหมด! ข้ามไปตานต่อไป", "info", 3000);
        setTimeout(switchTurn, 1500);
        return;
    }
    cardSelectionGrid.innerHTML = '';
    cardSelectionTitle.textContent = `${titlePrefix}!`;
    cardsForSelection.forEach((cardData, index) => {
        const cardBackDiv = document.createElement('div');
        cardBackDiv.classList.add('card-back');
        cardBackDiv.innerHTML = `<i class="${cardData.icon || 'fas fa-question'}"></i>`;
        cardBackDiv.dataset.cardIndex = index;
        cardBackDiv.setAttribute('role', 'button'); cardBackDiv.tabIndex = 0;
        const select = e => presentation ? presentation.onSelect(index) : onCardSelected(e, cardDeckType);
        cardBackDiv.addEventListener('click', select);
        cardBackDiv.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select({currentTarget:cardBackDiv}); } });
        cardSelectionGrid.appendChild(cardBackDiv);
    });
    cardSelectionModal.style.display = 'flex';
}

function onCardSelected(event, cardDeckType) {
    playSound('cardSelect');
    const chosenCardIndex = parseInt(event.currentTarget.dataset.cardIndex);
    currentCardData = cardsForSelection[chosenCardIndex];
    if (currentCardData.question) {
        const difficulty = currentCardData.difficulty;
        let sourcePoolList;
        if ((cardDeckType === 'mission' || cardDeckType === 'puzzle') && difficulty && currentGameQuestionPool[cardDeckType] && currentGameQuestionPool[cardDeckType][difficulty]) {
            sourcePoolList = currentGameQuestionPool[cardDeckType][difficulty];
            OriginalGameRules.consumeQuestion(sourcePoolList, currentCardData);
        }
    }
    cardSelectionModal.style.display = 'none';
    if (cardDeckType === 'mission' || cardDeckType === 'puzzle') {
        const modalTitleText = cardDeckType === 'mission' ? 'การ์ดภารกิจ' : 'การ์ดปริศนา';
        showQuestionModal(`${modalTitleText}`, currentCardData.question, handleQuestionAnswer);
    } else {
        applyEffectCard(currentCardData);
    }
}

function applyEffectCard(effectCard) {
    showMessage(`<p class="text-xl font-semibold">คุณได้รับการ์ด: ${effectCard.text}!</p>`, "success", 3000);
    const player = players[currentPlayerIndex];
    if (effectCard.action.includes("move_forward") || effectCard.action === "get_shield" || effectCard.action === "roll_again") playSound('powerUp');
    if (effectCard.action.includes("move_backward") || effectCard.action === "go_to_start") playSound('setback');
    if (effectCard.action.includes("go_to_square")) playSound('bonus');
    setTimeout(() => {
        const result = OriginalGameRules.effectPlan(player, effectCard);
        if (result.kind === 'move') movePlayer(result.steps, true);
        else if (result.kind === 'roll') {
            showMessage("<p class='text-xl'>ทอยลูกเต๋าอีกครั้ง!</p>", 'info', 2000);
            rollDiceButton.disabled = false;
        } else {
            if (result.blocked) showMessage(`<p class='text-xl'>${player.name} ใช้เกราะป้องกัน! ไม่ต้องกลับไปจุดเริ่มต้น</p>`, 'success', 3000);
            renderPlayerPieces(); updatePlayerInfo(); switchTurn();
        }
    }, 1500);
}

// =================================================================
// ===== MODIFIED FUNCTIONS FOR DETAILED EXPLANATION =============
// =================================================================

function showExplanationModal(onAcknowledge = null) {
    playSound('incorrectAnswer');
    
    // สร้างโค้ด HTML สำหรับการเฉลยแบบละเอียดจากข้อมูลใน currentCardData
    let detailedExplanationHTML = `
        <div class='text-left w-full'>
            <p class='mb-2 font-semibold text-gray-600'>โจทย์คำถาม:</p>
            <p class='mb-4 p-3 bg-gray-100 rounded-lg text-lg font-mono'>${currentCardData.question}</p>

            <p class='mb-2 font-semibold text-gray-600'>ขั้นตอนการเฉลย:</p>
            <div class='mb-5 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg space-y-2'>
                ${currentCardData.explanation || 'ไม่มีคำอธิบายสำหรับข้อนี้'}
            </div>

            <p class='font-semibold text-gray-600'>คำตอบที่ถูกต้องคือ:</p>
            <p class='text-3xl font-bold text-green-600 text-center p-2'>${currentCardData.answer}</p>
        </div>
    `;

    explanationContent.innerHTML = detailedExplanationHTML;
    explanationModal.style.display = 'flex';

    // เมื่อผู้ใช้กดปุ่ม 'รับทราบ'
    closeExplanationBtn.onclick = () => {
        playSound('buttonClick');
        explanationModal.style.display = 'none';

        // หลังจากปิดหน้าต่างเฉลยแล้ว จึงเริ่มกระบวนการลงโทษ
        if (onAcknowledge) { onAcknowledge(); return; }
        if (isSinglePlayerMode) {
            applySinglePlayerPunishment();
        } else if (players.length > 1) {
            initiatePunishment();
        } else {
            switchTurn();
        }
    };
}

function handleQuestionAnswer(isCorrect, timedOut = false) {
    const currentPlayer = players[currentPlayerIndex];
    const outcome = OriginalGameRules.applyAnswer(currentPlayer, currentCardData, isCorrect, {
        isAnsweringFinalQuestion, isAnsweringSetbackSave, pendingAction, pendingSetbackCard, isHandlingBonusMoveQuestion
    });

    if (isAnsweringFinalQuestion) {
        isAnsweringFinalQuestion = false;
        if (isCorrect) {
            updatePlayerInfo();
            playSound('victory');
            displayVictory(players[currentPlayerIndex]);
        } else {
            playSound('incorrectAnswer');
            showExplanationModal(); // แสดงเฉลยละเอียด
        }
        return;
    }

    if (isAnsweringSetbackSave) {
        isAnsweringSetbackSave = false;
        if (isCorrect) {
            updatePlayerInfo();
            playSound('powerUp');
            showMessage('<p class="text-xl font-semibold">ตอบถูก! คุณรอดจากอุปสรรค!</p>', 'success', 3000);
            pendingSetbackCard = null;
            setTimeout(switchTurn, 3100);
        } else {
            playSound('incorrectAnswer');
            showExplanationModal(); // แสดงเฉลยละเอียดก่อนโดนลงโทษ
        }
        return;
    }

    if (pendingAction) {
        const actionToRun = pendingAction;
        pendingAction = null;
        if (isCorrect) {
            updatePlayerInfo();
            playSound('correctAnswer');
            showMessage('<p class="text-xl font-semibold">ตอบถูก! คุณได้รับสิทธิ์เปิดการ์ดพิเศษ!</p>', 'success', 2500);
            setTimeout(() => actionToRun(), 2600);
        } else {
            playSound('incorrectAnswer');
            showExplanationModal(); // แสดงเฉลยละเอียด
        }
        return;
    }

    if (isHandlingBonusMoveQuestion) {
        isHandlingBonusMoveQuestion = false;
        if (isCorrect) {
            playSound('correctAnswer');
            showMessage('<p class="text-xl font-semibold">ตอบถูก!</p>', 'success', 2000);
        } else {
            playSound('incorrectAnswer');
             showExplanationModal(); // แสดงเฉลยละเอียด
        }
        setTimeout(switchTurn, 2500);
        return;
    }

    if (isCorrect) {
        playSound('correctAnswer');
        const pointsEarned = outcome.points;
        showMessage(`<p class="text-xl font-semibold">ตอบถูก! ได้รับ ${pointsEarned} คะแนน!</p>`, 'success', 3000);
        updatePlayerInfo();
        if (isSinglePlayerMode) {
            setTimeout(offerSelfBonus, 1000);
        } else if (players.length > 1) {
            setTimeout(offerPrankChoice, 1000);
        } else {
            setTimeout(switchTurn, 3100);
        }
    } else {
        // เมื่อตอบผิด ให้เรียกใช้ Modal เฉลยแบบละเอียด
        showExplanationModal();
    }
}


// =================================================================
// ========= The rest of the functions are unchanged =============
// =================================================================


function offerSelfBonus() {
    prankTitle.textContent = "ตอบถูก! เลือกรับโบนัส:";
    prankOptionsContainer.innerHTML = '';
    prankButtonsContainer.innerHTML = '';
    const bonuses = [{
        text: "รับ +10 คะแนน",
        action: 'score',
        value: 10,
        icon: 'fa-star'
    }, {
        text: "เดินหน้า 1 ช่อง",
        action: 'move',
        value: 1,
        icon: 'fa-shoe-prints'
    }, {
        text: "รับเกราะป้องกัน",
        action: 'shield',
        icon: 'fa-shield-alt'
    }];
    bonuses.forEach(bonus => {
        const btn = document.createElement('button');
        btn.className = 'bonus-choice-btn';
        btn.innerHTML = `<i class="fas ${bonus.icon} mr-2"></i> ${bonus.text}`;
        btn.onclick = () => {
            playSound('powerUp');
            prankModal.style.display = 'none';
            const player = players[currentPlayerIndex];
            if (bonus.action === 'score') player.score += bonus.value;
            if (bonus.action === 'shield') player.hasShield = true;
            updatePlayerInfo();
            if (bonus.action === 'move') movePlayer(bonus.value, true);
            else switchTurn();
        };
        prankOptionsContainer.appendChild(btn);
    });
    prankButtonsContainer.innerHTML = `<button id="skipBonusBtn" class="modal-button bg-gray-300 hover:bg-gray-400 text-gray-700">ไม่รับโบนัส</button>`;
    document.getElementById('skipBonusBtn').onclick = () => {
        playSound('buttonClick');
        prankModal.style.display = 'none';
        switchTurn();
    };
    prankModal.style.display = 'flex';
}

function applySinglePlayerPunishment() {
    playSound('setback');
    const player = players[currentPlayerIndex];
    const penalty = 2; // Fixed penalty
    showMessage(`<p class="text-xl">ตอบผิด! คุณต้องถอยหลัง ${penalty} ช่อง</p>`, 'error', 3000);
    setTimeout(() => {
        movePlayer(-penalty, true);
    }, 1500);
}

function offerPrankChoice(presentation = null) {
    if (!OriginalGameRules.canOfferPrank(players, currentPlayerIndex, currentRound)) {
        switchTurn();
        return;
    }
    prankTitle.textContent = "เลือกผู้เล่นที่จะแกล้ง:";
    prankOptionsContainer.innerHTML = ``;
    prankButtonsContainer.innerHTML = '';
    const validTargets = OriginalGameRules.validTargets(players, currentPlayerIndex);
    if (validTargets.length === 0) {
        switchTurn();
        return;
    }
    validTargets.forEach(targetData => {
        const pIndex = players.findIndex(p => p.id === targetData.id);
        const btn = document.createElement('button');
        btn.className = 'prank-target-btn';
        btn.textContent = `${targetData.name} (${targetData.emoji})`;
        btn.onclick = () => {
            playSound('buttonClick');
            if (presentation) presentation.onTarget(targetData.uid); else selectPrankEffect(pIndex);
        };
        prankOptionsContainer.appendChild(btn);
    });
    prankButtonsContainer.innerHTML = `<button id="skipPrankBtn" class="modal-button bg-gray-300 hover:bg-gray-400 text-gray-700">ไม่แกล้ง</button>`;
    document.getElementById('skipPrankBtn').onclick = () => {
        playSound('buttonClick');
        prankModal.style.display = 'none';
        if (presentation) presentation.onSkip(); else switchTurn();
    };
    prankModal.style.display = 'flex';
}

function selectPrankEffect(targetPlayerIndex, presentation = null) {
    prankTitle.textContent = `เลือกวิธีแกล้ง ${players[targetPlayerIndex].name}:`;
    prankOptionsContainer.innerHTML = '';
    const currentPlayer = players[currentPlayerIndex];
    prankEffects.forEach((effect, index) => {
        const btn = document.createElement('button');
        btn.className = 'prank-effect-btn';
        btn.innerHTML = `<i class="${effect.icon} mr-2"></i> ${effect.text}${effect.cost ? ` (ใช้ ${effect.cost} คะแนน)` : ''}`;
        if (effect.cost && currentPlayer.score < effect.cost) btn.disabled = true;
        btn.onclick = () => {
            playSound('buttonClick');
            prankModal.style.display = 'none';
            if (presentation) presentation.onEffect(index); else applyPrankToTarget(targetPlayerIndex, effect);
        };
        prankOptionsContainer.appendChild(btn);
    });
    prankButtonsContainer.innerHTML = `<button id="cancelPrankEffectBtn" class="modal-button bg-gray-300 hover:bg-gray-400 text-gray-700">ยกเลิก</button>`;
    document.getElementById('cancelPrankEffectBtn').onclick = () => {
        playSound('buttonClick');
        prankModal.style.display = 'none';
        if (presentation) presentation.onSkip(); else switchTurn();
    };
}

function applyPrankToTarget(targetPlayerIndex, prankEffect) {
    playSound('prank');
    const targetPlayer = players[targetPlayerIndex];
    OriginalGameRules.beginPrank(players, currentPlayerIndex, targetPlayerIndex, prankEffect);
    if (prankEffect.cost) {
        const currentPlayer = players[currentPlayerIndex];
        showMessage(`<p class="text-xl">${currentPlayer.name} ใช้ ${prankEffect.cost} คะแนนเพื่อแกล้ง ${targetPlayer.name}!</p>`, 'info', 3000);
        updatePlayerInfo();
    } else {
        showMessage(`<p class="text-xl">${players[currentPlayerIndex].name} แกล้ง ${targetPlayer.name} โดย ${prankEffect.text}!</p>`, 'info', 3000);
    }
    setTimeout(() => {
        OriginalGameRules.finishPrank(targetPlayer, prankEffect);
        renderPlayerPieces();
        updatePlayerInfo();
        switchTurn();
    }, 1500);
}

function initiatePunishment(presentation = null) {
    const playerToPunish = players[currentPlayerIndex];
    prankTitle.textContent = `${playerToPunish.name} ตอบผิด! เลือกบทลงโทษเลย!`;
    prankOptionsContainer.innerHTML = '';
    prankButtonsContainer.innerHTML = '';
    let availablePunishments = punishmentEffects.filter(p => p.for3plusPlayers ? players.length >= 3 : true);
    availablePunishments.forEach(effect => {
        const btn = document.createElement('button');
        btn.className = 'punishment-btn';
        btn.textContent = effect.text;
        btn.onclick = () => {
            playSound('buttonClick');
            if (presentation) presentation.onSelect(punishmentEffects.indexOf(effect)); else applyPunishment(effect);
        };
        prankOptionsContainer.appendChild(btn);
    });
    prankModal.style.display = 'flex';
}

function applyPunishment(punishmentEffect) {
    prankModal.style.display = 'none';
    playSound('setback');
    const player = players[currentPlayerIndex];
    showMessage(`<p class="text-xl">${player.name} โดนลงโทษให้... ${punishmentEffect.text}!</p>`, 'error', 3000);
    setTimeout(() => {
        movePlayer(-punishmentEffect.value, true);
    }, 1500);
}

function initiateSetbackSelectionByOpponents(presentation = null) {
    const player = players[currentPlayerIndex];
    prankTitle.textContent = `${player.name} ตกช่องอุปสรรค! เลือกการ์ดให้เพื่อนเลย`;
    prankOptionsContainer.innerHTML = '';
    prankButtonsContainer.innerHTML = '';
    const setbackCards = effectCards.setback;
    setbackCards.forEach(card => {
        const btn = document.createElement('button');
        btn.className = 'setback-choice-btn';
        btn.innerHTML = `<i class="${card.icon} mr-2"></i> ${card.text}`;
        btn.onclick = () => {
            prankModal.style.display = 'none';
            if (presentation) { presentation.onSelect(setbackCards.indexOf(card)); return; }
            pendingSetbackCard = card;
            askSetbackSaveQuestion();
        };
        prankOptionsContainer.appendChild(btn);
    });
    prankModal.style.display = 'flex';
}

function initiateSinglePlayerSetbackChallenge() {
    pendingSetbackCard = null;
    askSetbackSaveQuestion();
}

function askSetbackSaveQuestion() {
    isAnsweringSetbackSave = true;
    const challengePool = OriginalGameRules.challengePool(currentGameQuestionPool.mission);
    if (challengePool.length === 0) {
        showMessage('<p class="text-xl">การ์ดคำถามยากหมด! คุณโชคดี รอดตัวไป!</p>', 'success', 3000);
        pendingSetbackCard = null;
        isAnsweringSetbackSave = false;
        setTimeout(switchTurn, 3100);
        return;
    }
    const questionCard = OriginalGameRules.randomCard(challengePool);
    currentCardData = questionCard;
    showQuestionModal('ตอบให้ถูกเพื่อรอดจากอุปสรรค!', questionCard.question, handleQuestionAnswer);
}

function askFinalQuestion() {
    isAnsweringFinalQuestion = true;
    const hardQuestionPool = currentGameQuestionPool.mission.hard;
    if (hardQuestionPool.length === 0) {
        showMessage('<p class="text-xl">สุดยอด! การ์ดคำถามยากหมดแล้ว คุณชนะเลย!</p>', 'success', 3000);
        setTimeout(() => displayVictory(players[currentPlayerIndex]), 3100);
        return;
    }
    const finalQuestionCard = OriginalGameRules.randomCard(hardQuestionPool);
    currentCardData = finalQuestionCard;
    showQuestionModal('คำถามสุดท้ายเพื่อพิชิตยอดเขา!', finalQuestionCard.question, handleQuestionAnswer);
}

async function handleSquareAction(squareIndex) {
    if (!players[currentPlayerIndex]) return;
    const square = boardConfig[squareIndex];
    showMessage(`<p class="text-xl">${square.text}: ${square.instruction}</p>`, 'info', 2000);
    setTimeout(() => {
        const plan = OriginalGameRules.squareAction(square.type, isSinglePlayerMode);
        if (plan.kind === 'cards') {
            if (plan.pendingDeck) pendingAction = () => displayCardSelection(plan.pendingDeck, plan.pendingDeck==='powerUp'?'เลือกการ์ดพลังเสริม':'เลือกการ์ดโบนัส');
            displayCardSelection(plan.deck, plan.title, plan.challenge ? OriginalGameRules.challengePool(currentGameQuestionPool.mission) : null);
        } else if (plan.kind === 'setback') initiateSetbackSelectionByOpponents();
        else if (plan.kind === 'singleSetback') initiateSinglePlayerSetbackChallenge();
        else if (plan.kind === 'final') askFinalQuestion();
        else if (plan.kind === 'event') {
            const randomEvent = OriginalGameRules.randomCard(groupEvents);
            showMessage(`<p class="text-xl">เกิดอีเวนต์: ${randomEvent.text}</p>`, 'info', 4000);
            setTimeout(() => {
                groupEventResolvers[randomEvent.id](players, currentPlayerIndex, isSinglePlayerMode);
                renderPlayerPieces(); updatePlayerInfo(); switchTurn();
            }, 4100);
        } else switchTurn();
    }, 2100);
}

function showQuestionModal(titleHTML, question, answerCallback, presentation = null) {
    modal.answerCallback = answerCallback;
    modalTitle.innerHTML = titleHTML;
    modalQuestion.textContent = question;
    modalAnswerInput.value = '';
    modalFeedback.textContent = '';
    modalSubmitButton.disabled = false;
    modalCloseButton.disabled = false;
    modalCloseButton.textContent = "ปิด";
    const oldContainer = document.getElementById('modalChoicesContainer');
    if (oldContainer) oldContainer.remove();
    if (currentCardData && currentCardData.choices) {
        modalAnswerInput.style.display = 'none';
        modalSubmitButton.style.display = 'none';
        const answerButtonContainer = document.createElement('div');
        answerButtonContainer.id = 'modalChoicesContainer';
        currentCardData.choices.forEach(choice => {
            const choiceBtn = document.createElement('button');
            choiceBtn.textContent = choice;
            choiceBtn.className = 'modal-button modal-submit-button';
            choiceBtn.onclick = () => {
                playSound('buttonClick');
                stopQuestionTimer();
                const isCorrect = OriginalGameRules.answerMatches(choice, currentCardData);
                modal.style.display = 'none';
                if (presentation) presentation.onAnswer(String(choice)); else if (modal.answerCallback) modal.answerCallback(isCorrect, false);
            };
            answerButtonContainer.appendChild(choiceBtn);
        });
        modalFeedback.insertAdjacentElement('beforebegin', answerButtonContainer);
    } else {
        modalAnswerInput.style.display = 'block';
        modalSubmitButton.style.display = 'inline-block';
    }
    modal.style.display = 'flex';
    if (modalAnswerInput.style.display === 'block') modalAnswerInput.focus();
    if (!presentation) startQuestionTimer(() => {
        if (modal.style.display === 'flex' && modal.answerCallback) modal.answerCallback(false, true);
    });
    modalSubmitButton.onclick = () => {
        playSound('buttonClick');
        stopQuestionTimer();
        let isCorrect = currentCardData ? OriginalGameRules.answerMatches(modalAnswerInput.value, currentCardData) : false;
        modalSubmitButton.disabled = true;
        modalCloseButton.disabled = true;
        modal.style.display = 'none';
        if (presentation) presentation.onAnswer(modalAnswerInput.value); else if (modal.answerCallback) modal.answerCallback(isCorrect, false);
    };
    modalCloseButton.onclick = () => {
        playSound('buttonClick');
        stopQuestionTimer();
        modal.style.display = 'none';
        if (presentation) presentation.onAnswer(''); else if (modal.answerCallback) modal.answerCallback(false, false);
    };
}

function switchTurn() {
    if (!gameActive || players.length === 0) {
        rollDiceButton.disabled = true;
        return;
    }
    const played = players[currentPlayerIndex];
    const next = OriginalGameRules.advanceTurn(players, currentPlayerIndex, currentRound, isSinglePlayerMode);
    currentPlayerIndex = next.index; currentRound = next.round;
    if (next.extra) showMessage(`<p class="text-xl">${played.name} ได้เล่นตาพิเศษ!</p>`, 'info', 3000);
    next.skipped.forEach(name => showMessage(`<p class="text-xl">${name} โดนแกล้ง! ข้ามตานี้</p>`, 'error', 2000));
    if (next.newRound) showMessage(`รอบที่ ${currentRound} เริ่มขึ้นแล้ว!`, 'turn_info');
    updatePlayerInfo();
    if (players.length > 0 && players[currentPlayerIndex]) {
        document.getElementById('messageArea').textContent = `ตาของ ${players[currentPlayerIndex].name}`;
    }
    rollDiceButton.disabled = false;
    movementDieValueDisplay.textContent = '-';
}
