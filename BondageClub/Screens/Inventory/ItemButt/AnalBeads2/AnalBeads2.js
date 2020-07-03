"use strict";

// Loads the item extension properties
function InventoryItemButtAnalBeads2Load() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { InsertedBeads: 1, ShowText: true, Type: "Base" };
	if (DialogFocusItem.Property.InsertedBeads == null){
		DialogFocusItem.Property.Type = DialogFocusItem.Property.Type || "Base";
		DialogFocusItem.Property.InsertedBeads = DialogFocusItem.Property.Type == "Base" ? 1 : DialogFocusItem.Property.Type.split('')[1];
	}
	if (DialogFocusItem.Property.ShowText == null) DialogFocusItem.Property.ShowText = true;
	var beadsNum = DialogFocusItem.Property.InsertedBeads;
	if (DialogFocusItem.Property.Type == null)
		DialogFocusItem.Property.Type = beadsNum > 1 ? "_" + beadsNum + "in" : ["Base"];
}

// Draw the item extension screen
function InventoryItemButtAnalBeads2Draw() {
	DrawRect(1387, 225, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");
	DrawText(DialogFind(Player, "BeadsCount") + DialogFocusItem.Property.InsertedBeads.toString(), 1500, 600, "White", "Gray");
	if (DialogFocusItem.Property.InsertedBeads > 1) DrawButton(1200, 700, 250, 65, DialogFind(Player, "RemoveBead"), "White");
	if (DialogFocusItem.Property.InsertedBeads < 5) DrawButton(1550, 700, 250, 65, DialogFind(Player, "InsertBead"), "White");
	if (DialogFocusItem.Property.InsertedBeads < 5) DrawButton(1550, 800, 250, 65, DialogFind(Player, "MaximumBeads"), "White");
	if (DialogFocusItem.Property.InsertedBeads > 1) DrawButton(1200, 800, 250, 65, DialogFind(Player, "MinimumBeads"), "White");
}

// Catches the item extension clicks
function InventoryItemButtAnalBeads2Click() {
	if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogFocusItem = null;
	if ((MouseX >= 1200) && (MouseX <= 1450) && (MouseY >= 700) && (MouseY <= 765) && (DialogFocusItem.Property.InsertedBeads > 1)) InventoryItemButtAnalBeads2SetBeads(-1);
	if ((MouseX >= 1550) && (MouseX <= 1800) && (MouseY >= 800) && (MouseY <= 865) && (DialogFocusItem.Property.InsertedBeads < 5)) InventoryItemButtAnalBeads2SetBeads(5);
	if ((MouseX >= 1200) && (MouseX <= 1450) && (MouseY >= 800) && (MouseY <= 865) && (DialogFocusItem.Property.InsertedBeads > 1)) InventoryItemButtAnalBeads2SetBeads(-5);
	if ((MouseX >= 1550) && (MouseX <= 1800) && (MouseY >= 700) && (MouseY <= 765) && (DialogFocusItem.Property.InsertedBeads < 5)) InventoryItemButtAnalBeads2SetBeads(1);
}

// Sets the amount of beads
function InventoryItemButtAnalBeads2SetBeads(Modifier) {
	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemButtAnalBeads2Load();
	}
	
	// Set the new amount of beads
	DialogFocusItem.Property.InsertedBeads = DialogFocusItem.Property.InsertedBeads + Modifier;
	if (DialogFocusItem.Property.InsertedBeads > 5)
		DialogFocusItem.Property.InsertedBeads = 5;
	if (DialogFocusItem.Property.InsertedBeads < 1)
		DialogFocusItem.Property.InsertedBeads = 1;
		
	var beadsNum = DialogFocusItem.Property.InsertedBeads;	
		
	// Loads the correct type/asset	
	DialogFocusItem.Property.Type = beadsNum > 1 ? "_" + beadsNum + "in" : ["Base"];
	CharacterRefresh(C);
		
	// Push Chatroom Event	
	var Dictionary = [];
	Dictionary.push({ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
	Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
	
	if (Modifier == 5)
		ChatRoomPublishCustomAction("AnalBeads2SetMax", true, Dictionary);
	else if (Modifier == -5)
		ChatRoomPublishCustomAction("AnalBeads2SetMin", true, Dictionary);
	else
		ChatRoomPublishCustomAction("AnalBeads2Set" + (Modifier > 0 ? "UpTo" + beadsNum : "Down"), true, Dictionary);
		
	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}
}