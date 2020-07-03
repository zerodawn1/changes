"use strict";

// Loads the item extension properties
function InventoryItemArmsWristShacklesLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Restrain: null };
}

// Draw the item extension screen
function InventoryItemArmsWristShacklesDraw() {
	
	// Draw the header and item
	DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the possible poses
	DrawText(DialogFind(Player, "SelectBondagePosition"), 1500, 500, "white", "gray");
	DrawButton(1250, 550, 225, 225, "", (DialogFocusItem.Property.Restrain == null) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/InFront.png", 1250, 550);
	DrawText(DialogFind(Player, "WristShacklesPoseInFront"), 1375, 800, "white", "gray");
	DrawButton(1500, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Behind")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Behind.png", 1500, 550);
	DrawText(DialogFind(Player, "WristShacklesPoseBehind"), 1625, 800, "white", "gray");
}

// Catches the item extension clicks
function InventoryItemArmsWristShacklesClick() {
	if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogFocusItem = null;
	if ((MouseX >= 1250) && (MouseX <= 1475) && (MouseY >= 550) && (MouseY <= 775) && (DialogFocusItem.Property.Restrain != null)) InventoryItemArmsWristShacklesSetPose(null);
	if ((MouseX >= 1500) && (MouseX <= 1725) && (MouseY >= 550) && (MouseY <= 775) && (DialogFocusItem.Property.Restrain == null)) InventoryItemArmsWristShacklesSetPose("Behind");
}

// Sets the cuffs pose (InFront, Behind)
function InventoryItemArmsWristShacklesSetPose(NewPose) {

	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemArmsWristShacklesLoad();
	}

	// Sets the new pose with it's effects
	DialogFocusItem.Property.Restrain = NewPose;
	if (NewPose == null) {
		delete DialogFocusItem.Property.SetPose;
		delete DialogFocusItem.Property.Effect;
		delete DialogFocusItem.Property.Difficulty;
	} else {
		DialogFocusItem.Property.SetPose = ["BackCuffs"];
		DialogFocusItem.Property.Effect = ["Block", "Prone"];
		if (NewPose == "Wrist") DialogFocusItem.Property.Difficulty = 3;
	}

	// Adds the lock effect back if it was padlocked
	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
		DialogFocusItem.Property.Effect.push("Lock");
	}

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "WristShacklesRestrain" + ((NewPose == null) ? "InFront" : NewPose);
	var Dictionary = [];
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	ChatRoomPublishCustomAction(msg, true, Dictionary);

	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}

}