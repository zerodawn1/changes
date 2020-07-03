"use strict";
var PlayerCollaringBackground = "Management";
var PlayerCollaringMistress = null;
var PlayerCollaringMistressLeft = null;
var PlayerCollaringMistressRight = null;
var PlayerCollaringGirlLeft = null;
var PlayerCollaringGirlRight = null;

// Loads the collaring Mistresses
function PlayerCollaringLoad() {
	CutsceneStage = 0;
	PlayerCollaringMistressLeft = CharacterLoadNPC("NPC_PlayerCollaring_MistressLeft");
	PlayerCollaringMistressRight = CharacterLoadNPC("NPC_PlayerCollaring_MistressRight");
	PlayerCollaringGirlLeft = CharacterLoadNPC("NPC_PlayerCollaring_GirlLeft");
	PlayerCollaringGirlRight = CharacterLoadNPC("NPC_PlayerCollaring_GirlRight");
}

// Runs the collaring cutscene
function PlayerCollaringRun() {
	DrawCharacter(PlayerCollaringMistress, 900, 0, 1);
	DrawCharacter(PlayerCollaringMistressLeft, 200, 0, 1);
	DrawCharacter(PlayerCollaringMistressRight, 1300, 0, 1);
	if (CutsceneStage > 0) DrawCharacter(Player, 600, 0, 1);
	if (CutsceneStage > 0) DrawCharacter(PlayerCollaringGirlLeft, -200, 100, 1);
	if (CutsceneStage > 0) DrawCharacter(PlayerCollaringGirlRight, 1700, 100, 1);
	DrawText(TextGet("PlayerCollaring" + CutsceneStage.toString()), 1000, 980, "White", "Black");
}

// When the user clicks in the management room
function PlayerCollaringClick() {
	CutsceneStage++;
	if (CutsceneStage == 2) CharacterNaked(Player);
	if (CutsceneStage == 4) CharacterSetActivePose(Player, "Kneel");
	if (CutsceneStage == 6) InventoryWear(Player, "SlaveCollar", "ItemNeck");
	if (CutsceneStage > 8) {
		CommonSetScreen("Room", "Private");
		CharacterSetCurrent(PlayerCollaringMistress);
		PlayerCollaringMistress.CurrentDialog = DialogFind(PlayerCollaringMistress, "MistressVow");
	}
}