"use strict";
var MiniGameType = "";
var MiniGameVictory = false;
var MiniGamePerfect = true;
var MiniGameDifficulty = "";
var MiniGameDifficultyRatio = 1;
var MiniGameAdvancedPayment = 0;
var MiniGameReturnFunction = "";
var MiniGameProgress = -1;
var MiniGameTimer = 0;
var MiniGameEnded = false;

// Starts a given mini game at a set difficulty and keeps a return function
function MiniGameStart(GameType, Difficulty, ReturnFunction) {
	CurrentCharacter = null;
	MiniGameType = GameType;
	MiniGameDifficulty = Difficulty;
	MiniGameDifficultyRatio = 1;
	MiniGameReturnFunction = ReturnFunction;
	MiniGameVictory = (Math.random() > 0.5);
	MiniGamePerfect = true;
	MiniGameProgress = -1;
	MiniGameTimer = 0;
	MiniGameEnded = false;
	CommonSetScreen("MiniGame", GameType);
}