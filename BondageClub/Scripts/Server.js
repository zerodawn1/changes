"use strict";
var ServerSocket = null;
var ServerURL = "http://localhost:4288";
var ServerRelog = null;
var ServerBeep = {};
var ServerBeepAudio = new Audio();

// Loads the server events
function ServerInit() {
	ServerSocket = io(ServerURL);
	ServerSocket.on("ServerMessage", function (data) { console.log(data); });
	ServerSocket.on("ServerInfo", function (data) { ServerInfo(data); });
	ServerSocket.on("CreationResponse", function (data) { CreationResponse(data); });
	ServerSocket.on("LoginResponse", function (data) { LoginResponse(data); });
	ServerSocket.on("disconnect", function (data) { ServerDisconnect(); });
	ServerSocket.on("ForceDisconnect", function (data) { ServerDisconnect(data); });
	ServerSocket.on("ChatRoomSearchResult", function (data) { ChatSearchResult = data; });
	ServerSocket.on("ChatRoomSearchResponse", function (data) { ChatSearchResponse(data); });
	ServerSocket.on("ChatRoomCreateResponse", function (data) { ChatCreateResponse(data); });
	ServerSocket.on("ChatRoomUpdateResponse", function (data) { ChatAdminResponse(data); });
	ServerSocket.on("ChatRoomSync", function (data) { ChatRoomSync(data); });
	ServerSocket.on("ChatRoomSyncSingle", function (data) { ChatRoomSyncSingle(data); });
	ServerSocket.on("ChatRoomSyncExpression", function (data) { ChatRoomSyncExpression(data); });
	ServerSocket.on("ChatRoomSyncPose", function (data) { ChatRoomSyncPose(data); });
	ServerSocket.on("ChatRoomSyncArousal", function (data) { ChatRoomSyncArousal(data); });
	ServerSocket.on("ChatRoomSyncItem", function (data) { ChatRoomSyncItem(data); });
	ServerSocket.on("ChatRoomMessage", function (data) { ChatRoomMessage(data); });
	ServerSocket.on("ChatRoomAllowItem", function (data) { ChatRoomAllowItem(data); });
	ServerSocket.on("ChatRoomGameResponse", function (data) { ChatRoomGameResponse(data); });
	ServerSocket.on("PasswordResetResponse", function (data) { PasswordResetResponse(data); });
	ServerSocket.on("AccountQueryResult", function (data) { ServerAccountQueryResult(data); });
	ServerSocket.on("AccountBeep", function (data) { ServerAccountBeep(data); });
	ServerSocket.on("AccountOwnership", function (data) { ServerAccountOwnership(data); });
	ServerSocket.on("AccountLovership", function(data) { ServerAccountLovership(data); });
	ServerBeepAudio.src = "Audio/BeepAlarm.mp3";
}

// When the server sends some information to the client, we keep it in variables
function ServerInfo(data) {
	if (data.OnlinePlayers != null) CurrentOnlinePlayers = data.OnlinePlayers;
	if (data.Time != null) CurrentTime = data.Time;
}

// When the server disconnects, we enter in "Reconnect Mode"
function ServerDisconnect(data) {
	if (Player.Name != "") {
		if (CurrentScreen != "Relog") {

			// Exits out of the chat room or a sub screen of the chatroom, so we'll be able to get in again when we log back
			if (
				(CurrentScreen == "ChatRoom")
				|| (CurrentScreen == "ChatAdmin")
				|| (CurrentScreen == "GameLARP")
				|| ((CurrentScreen == "Appearance") && (CharacterAppearanceReturnRoom == "ChatRoom"))
				|| ((CurrentScreen == "InformationSheet") && (InformationSheetPreviousScreen == "ChatRoom"))
				|| ((CurrentScreen == "Title") && (InformationSheetPreviousScreen == "ChatRoom"))
				|| ((CurrentScreen == "OnlineProfile") && (InformationSheetPreviousScreen == "ChatRoom"))
				|| ((CurrentScreen == "FriendList") && (InformationSheetPreviousScreen == "ChatRoom") && (FriendListReturn == null))
				|| ((CurrentScreen == "Preference") && (InformationSheetPreviousScreen == "ChatRoom"))
			) {
				RelogChatLog = document.getElementById("TextAreaChatLog").cloneNode(true);
				RelogChatLog.id = "RelogChatLog";
				RelogChatLog.name = "RelogChatLog";
				ElementRemove("InputChat");
				ElementRemove("TextAreaChatLog");
				CurrentScreen = "ChatSearch";
				CurrentModule = "Online";
				CurrentCharacter = null;
			} else RelogChatLog = null;

			// Keeps the relog data
			RelogData = { Screen: CurrentScreen, Module: CurrentModule, Character: CurrentCharacter };
			CurrentCharacter = null;
			CommonSetScreen("Character", "Relog");

		}
	}
	else if (CurrentScreen == "Login") LoginMessage = TextGet((data != null) ? data : "ErrorDisconnectedFromServer");
}

// Sends a message to the server
function ServerSend(Message, Data) {
	ServerSocket.emit(Message, Data);
}

// Syncs some player information to the server
function ServerPlayerSync() {
	var D = { Money: Player.Money, Owner: Player.Owner, Lover: Player.Lover };
	ServerSend("AccountUpdate", D);
	delete Player.Lover;
}

// Syncs the full player inventory to the server, it's compressed as a stringify array using LZString
function ServerPlayerInventorySync() {
	var Inv = [];
	for (var I = 0; I < Player.Inventory.length; I++)
		if (Player.Inventory[I].Asset != null)
			Inv.push([ Player.Inventory[I].Asset.Name, Player.Inventory[I].Asset.Group.Name ]);
	ServerSend("AccountUpdate", { Inventory: LZString.compressToUTF16(JSON.stringify(Inv)) });
}

// Syncs the full player log to the server
function ServerPlayerLogSync() {
	var D = {};
	D.Log = Log;
	ServerSend("AccountUpdate", D);
}

// Syncs the full player reputation to the server
function ServerPlayerReputationSync() {
	var D = {};
	D.Reputation = Player.Reputation;
	ServerSend("AccountUpdate", D);
}

// Syncs the full player reputation to the server
function ServerPlayerSkillSync() {
	var D = {};
	D.Skill = Player.Skill;
	ServerSend("AccountUpdate", D);
}

// Prepares an appearance bundle that we can push to the server (removes the assets, only keep the main information)
function ServerAppearanceBundle(Appearance) {
	var Bundle = [];
	for (var A = 0; A < Appearance.length; A++) {
		var N = {};
		N.Group = Appearance[A].Asset.Group.Name;
		N.Name = Appearance[A].Asset.Name;
		if ((Appearance[A].Color != null) && (Appearance[A].Color != "Default")) N.Color = Appearance[A].Color;
		if ((Appearance[A].Difficulty != null) && (Appearance[A].Difficulty != 0)) N.Difficulty = Appearance[A].Difficulty;
		if (Appearance[A].Property != null) N.Property = Appearance[A].Property;
		Bundle.push(N);
	}
	return Bundle;
}

// Make sure the properties are valid for the item (to prevent griefing in multi-player)
function ServerValidateProperties(C, Item) {

	// No validations for NPCs
	if ((C.AccountName.substring(0, 4) == "NPC_") || (C.AccountName.substring(0, 4) == "NPC-")) return;

	// For each effect on the item
	if ((Item.Property != null) && (Item.Property.Effect != null)) {
		for (var E = 0; E < Item.Property.Effect.length; E++) {

			// Make sure the item can be locked, remove any lock that's invalid
			var Effect = Item.Property.Effect[E];
			if ((Effect == "Lock") && ((Item.Asset.AllowLock == null) || (Item.Asset.AllowLock == false) || (InventoryGetLock(Item) == null) || (InventoryIsPermissionBlocked(C, Item.Property.LockedBy, "ItemMisc")))) {
				delete Item.Property.LockedBy;
				delete Item.Property.LockMemberNumber;
				delete Item.Property.CombinationNumber;
				delete Item.Property.RemoveTimer;
				delete Item.Property.MaxTimer;
				delete Item.Property.RemoveItem;
				delete Item.Property.ShowTimer;
				delete Item.Property.EnableRandomInput;
				delete Item.Property.MemberNumberList;
				Item.Property.Effect.splice(E, 1);
				E--;
			}

			// If the item is locked by a lock
			if ((Effect == "Lock") && (InventoryGetLock(Item) != null)) {

				// Make sure the combination number on the lock is valid, 4 digits only
				var Lock = InventoryGetLock(Item);
				if ((Item.Property.CombinationNumber != null) && (typeof Item.Property.CombinationNumber == "string")) {
					var E = /^[0-9]+$/;
					if (!Item.Property.CombinationNumber.match(E) || (Item.Property.CombinationNumber.length != 4)) {
						Item.Property.CombinationNumber = "0000";
					}
				} else delete Item.Property.CombinationNumber;

				// Make sure the remove timer on the lock is valid
				if ((Lock.Asset.RemoveTimer != null) && (Lock.Asset.RemoveTimer != 0)) {
					var CurrentTimeDelay = 5000;
					// As CurrentTime can be slightly different, we accept a small delay in ms
					if ((typeof Item.Property.RemoveTimer !== "number") || (Item.Property.RemoveTimer - CurrentTimeDelay > CurrentTime + Lock.Asset.MaxTimer * 1000)) {
						Item.Property.RemoveTimer = Math.round(CurrentTime + Lock.Asset.RemoveTimer * 1000);
					}
				} else delete Item.Property.RemoveTimer;

				// Make sure the owner lock is valid
				if (Lock.Asset.OwnerOnly && ((C.Ownership == null) || (C.Ownership.MemberNumber == null) || (Item.Property.LockMemberNumber == null) || ((C.Ownership.MemberNumber != Item.Property.LockMemberNumber) && (C.MemberNumber != Item.Property.LockMemberNumber)))) {
					delete Item.Property.LockedBy;
					delete Item.Property.LockMemberNumber;
					delete Item.Property.CombinationNumber;
					delete Item.Property.RemoveTimer;
					delete Item.Property.MaxTimer;
					delete Item.Property.RemoveItem;
					delete Item.Property.ShowTimer;
					delete Item.Property.EnableRandomInput;
					delete Item.Property.MemberNumberList;
					Item.Property.Effect.splice(E, 1);
					E--;
				}

				// Make sure the lover lock is valid
				if (Lock.Asset.LoverOnly && ((Item.Property.LockMemberNumber == null) || ((C.GetLoversNumbers().indexOf(Item.Property.LockMemberNumber) < 0) && (C.MemberNumber != Item.Property.LockMemberNumber)))) {
					delete Item.Property.LockedBy;
					delete Item.Property.LockMemberNumber;
					delete Item.Property.CombinationNumber;
					delete Item.Property.RemoveTimer;
					delete Item.Property.MaxTimer;
					delete Item.Property.RemoveItem;
					delete Item.Property.ShowTimer;
					delete Item.Property.EnableRandomInput;
					delete Item.Property.MemberNumberList;
					Item.Property.Effect.splice(E, 1);
					E--;
				}

			}

			// Other effects can be removed
			if (Effect != "Lock") {

				// Check if the effect is allowed for the item
				var MustRemove = true;
				if (Item.Asset.AllowEffect != null)
					for (var A = 0; A < Item.Asset.AllowEffect.length; A++)
						if (Item.Asset.AllowEffect[A] == Effect)
							MustRemove = false;

				// Remove the effect if it's not allowed
				if (MustRemove) {
					Item.Property.Effect.splice(E, 1);
					E--;
				}

			}
		}
	}

	// For each block on the item
	if ((Item.Property != null) && (Item.Property.Block != null)) {
		for (var B = 0; B < Item.Property.Block.length; B++) {

			// Check if the effect is allowed for the item
			var MustRemove = true;
			if (Item.Asset.AllowBlock != null)
				for (var A = 0; A < Item.Asset.AllowBlock.length; A++)
					if (Item.Asset.AllowBlock[A] == Item.Property.Block[B])
						MustRemove = false;

			// Remove the effect if it's not allowed
			if (MustRemove) {
				Item.Property.Block.splice(B, 1);
				B--;
			}
		}
	}

	// Removes any type that's not allowed on the item
	if ((Item.Property != null) && (Item.Property.Type != null))
		if ((Item.Asset.AllowType == null) || (Item.Asset.AllowType.indexOf(Item.Property.Type) < 0))
			delete Item.Property.Type;

	// Remove impossible combinations
	if ((Item.Property != null) && (Item.Property.Type == null) && (Item.Property.Restrain == null))
		["SetPose", "Difficulty", "SelfUnlock", "Hide"].forEach(P => delete Item.Property[P]);
}

// Loads the appearance assets from a server bundle that only contains the main info (no assets)
function ServerAppearanceLoadFromBundle(C, AssetFamily, Bundle, SourceMemberNumber) {

	// Removes any invalid data from the appearance bundle
	for (var B = 0; B < Bundle.length; B++)
		if ((Bundle[B] == null) || (typeof Bundle[B] !== "object") || (Bundle[B].Name == null) || (typeof Bundle[B].Name != "string") || (Bundle[B].Name == null) || (typeof Bundle[B].Name != "string")) {			
			Bundle.splice(B, 1);
			B--;
		}

	// Clears the appearance to begin
	var Appearance = [];

	// Reapply any item that was equipped and isn't enable, same for owner locked items if the source member isn't the owner
	if ((SourceMemberNumber != null) && (C.ID == 0))
		for (var A = 0; A < C.Appearance.length; A++) {
			if (!C.Appearance[A].Asset.Enable && !C.Appearance[A].Asset.OwnerOnly && !C.Appearance[A].Asset.LoverOnly) {
				Appearance.push(C.Appearance[A]);
			} else {
				if ((C.Ownership != null) && (C.Ownership.MemberNumber != null) && (C.Ownership.MemberNumber != SourceMemberNumber) && InventoryOwnerOnlyItem(C.Appearance[A])) {
					var NA = C.Appearance[A];
					if (!C.Appearance[A].Asset.OwnerOnly) {

						// If the owner-locked item is sent back from a non-owner, we allow to change some properties and lock it back with the owner lock
						for (var B = 0; B < Bundle.length; B++)
							if ((C.Appearance[A].Asset.Name == Bundle[B].Name) && (C.Appearance[A].Asset.Group.Name == Bundle[B].Group) && (C.Appearance[A].Asset.Group.Family == AssetFamily))
								NA.Property = Bundle[B].Property;

						// Some Properties should not be changed
						if (C.Appearance[A].Property) {
							if (C.Appearance[A].Property.LockedBy != null) NA.Property.LockedBy = C.Appearance[A].Property.LockedBy;
							if (C.Appearance[A].Property.LockMemberNumber != null) NA.Property.LockMemberNumber = C.Appearance[A].Property.LockMemberNumber; else delete NA.Property.LockMemberNumber;
							if (C.Appearance[A].Property.CombinationNumber != null) NA.Property.CombinationNumber = C.Appearance[A].Property.CombinationNumber; else delete NA.Property.CombinationNumber;
							if (C.Appearance[A].Property.RemoveItem != null) NA.Property.RemoveItem = C.Appearance[A].Property.RemoveItem; else delete NA.Property.RemoveItem;
							if (C.Appearance[A].Property.ShowTimer != null) NA.Property.ShowTimer = C.Appearance[A].Property.ShowTimer; else delete NA.Property.ShowTimer;
							if (C.Appearance[A].Property.EnableRandomInput != null) NA.Property.EnableRandomInput = C.Appearance[A].Property.EnableRandomInput; else delete NA.Property.EnableRandomInput;
							if (!NA.Property.EnableRandomInput || NA.Property.LockedBy != "OwnerTimerPadlock") {
								if (C.Appearance[A].Property.MemberNumberList != null) NA.Property.MemberNumberList = C.Appearance[A].Property.MemberNumberList; else delete NA.Property.MemberNumberList;
								if (C.Appearance[A].Property.RemoveTimer != null) NA.Property.RemoveTimer = Math.round(C.Appearance[A].Property.RemoveTimer); else delete NA.Property.RemoveTimer;
							}
						}
						ServerValidateProperties(C, NA);
						if (C.Appearance[A].Property.LockedBy == "OwnerPadlock") InventoryLock(C, NA, { Asset: AssetGet(AssetFamily, "ItemMisc", "OwnerPadlock") }, NA.Property.LockMemberNumber);

					}
					Appearance.push(NA);
				}
				if ((C.GetLoversNumbers().indexOf(SourceMemberNumber) < 0) && InventoryLoverOnlyItem(C.Appearance[A])) {
					var NA = C.Appearance[A];
					if (!C.Appearance[A].Asset.LoverOnly) {

						// If the lover-locked item is sent back from a non-lover, we allow to change some properties and lock it back with the lover lock
						for (var B = 0; B < Bundle.length; B++)
							if ((C.Appearance[A].Asset.Name == Bundle[B].Name) && (C.Appearance[A].Asset.Group.Name == Bundle[B].Group) && (C.Appearance[A].Asset.Group.Family == AssetFamily))
								NA.Property = Bundle[B].Property;

						// Some Properties should not be changed
						if (C.Appearance[A].Property) {
							if (C.Appearance[A].Property.LockedBy != null) NA.Property.LockedBy = C.Appearance[A].Property.LockedBy;
							if (C.Appearance[A].Property.LockMemberNumber != null) NA.Property.LockMemberNumber = C.Appearance[A].Property.LockMemberNumber; else delete NA.Property.LockMemberNumber;
							if (C.Appearance[A].Property.CombinationNumber != null) NA.Property.CombinationNumber = C.Appearance[A].Property.CombinationNumber; else delete NA.Property.CombinationNumber;
							if (C.Appearance[A].Property.RemoveItem != null) NA.Property.RemoveItem = C.Appearance[A].Property.RemoveItem; else delete NA.Property.RemoveItem;
							if (C.Appearance[A].Property.ShowTimer != null) NA.Property.ShowTimer = C.Appearance[A].Property.ShowTimer; else delete NA.Property.ShowTimer;
							if (C.Appearance[A].Property.EnableRandomInput != null) NA.Property.EnableRandomInput = C.Appearance[A].Property.EnableRandomInput; else delete NA.Property.EnableRandomInput;
							if (!NA.Property.EnableRandomInput || NA.Property.LockedBy != "LoversTimerPadlock") {
								if (C.Appearance[A].Property.MemberNumberList != null) NA.Property.MemberNumberList = C.Appearance[A].Property.MemberNumberList; else delete NA.Property.MemberNumberList;
								if (C.Appearance[A].Property.RemoveTimer != null) NA.Property.RemoveTimer = Math.round(C.Appearance[A].Property.RemoveTimer); else delete NA.Property.RemoveTimer;
							}
						}
						ServerValidateProperties(C, NA);
						if (C.Appearance[A].Property.LockedBy == "LoversPadlock") InventoryLock(C, NA, { Asset: AssetGet(AssetFamily, "ItemMisc", "LoversPadlock") }, NA.Property.LockMemberNumber);
					}
					Appearance.push(NA);
				}
			}
		}

	// For each appearance item to load
	for (var A = 0; A < Bundle.length; A++) {

		// Skip blocked items
		if ((InventoryIsPermissionBlocked(C, Bundle[A].Name, Bundle[A].Group) || InventoryIsPermissionLimited(C,Bundle[A].Name, Bundle)) && OnlineGameAllowBlockItems()) continue;

		// Cycles in all assets to find the correct item to add (do not add )
		for (var I = 0; I < Asset.length; I++)
			if ((Asset[I].Name == Bundle[A].Name) && (Asset[I].Group.Name == Bundle[A].Group) && (Asset[I].Group.Family == AssetFamily)) {

				// OwnerOnly items can only get update if it comes from owner
				if (Asset[I].OwnerOnly && (C.ID == 0)) {
					if ((C.Ownership == null) || (C.Ownership.MemberNumber == null) || ((C.Ownership.MemberNumber != SourceMemberNumber) && (SourceMemberNumber != null))) break;
				}

				// LoverOnly items can only get update if it comes from lover
				if (Asset[I].LoverOnly && (C.ID == 0)) {
					if ((C.GetLoversNumbers().indexOf(SourceMemberNumber) < 0) && (SourceMemberNumber != null)) break;
				}

				// Creates the item and colorize it
				var NA = {
					Asset: Asset[I],
					Difficulty: parseInt((Bundle[A].Difficulty == null) ? 0 : Bundle[A].Difficulty),
					Color: ((Bundle[A].Color == null) || (typeof Bundle[A].Color !== 'string')) ? Asset[I].Group.ColorSchema[0] : Bundle[A].Color
				}

				// Validate color string, fallback to default in case of an invalid color
				if ((NA.Color !=  NA.Asset.Group.ColorSchema[0]) && (/^#(?:[0-9a-f]{3}){1,2}$/i.test(NA.Color) == false) && (NA.Asset.Group.ColorSchema.indexOf(NA.Color) < 0)) {
					NA.Color = NA.Asset.Group.ColorSchema[0];
				}

				// Sets the item properties and make sure a non-owner cannot add an owner lock
				if (Bundle[A].Property != null) {
					NA.Property = Bundle[A].Property;
					if ((SourceMemberNumber != null) && (C.ID == 0) && (C.Ownership != null) && (C.Ownership.MemberNumber != null) && (C.Ownership.MemberNumber != SourceMemberNumber) && InventoryOwnerOnlyItem(NA)) {
						var Lock = InventoryGetLock(NA);
						if ((Lock != null) && (Lock.Property != null)) delete Item.Property.LockMemberNumber;
					}
					if ((SourceMemberNumber != null) && (C.ID == 0) && (C.GetLoversNumbers().indexOf(SourceMemberNumber) < 0) && InventoryLoverOnlyItem(NA)) {
						var Lock = InventoryGetLock(NA);
						if ((Lock != null) && (Lock.Property != null)) delete Item.Property.LockMemberNumber;
					}
					ServerValidateProperties(C, NA);
				}

				// Make sure we don't push an item if there's already an item in that slot
				var CanPush = true;
				for (var P = 0; P < Appearance.length; P++)
					if (Appearance[P].Asset.Group.Name == NA.Asset.Group.Name) {
						CanPush = false;
						break;
					}

				// Make sure we don't push an item that's disabled, coming from another player
				if (CanPush && !NA.Asset.Enable && !NA.Asset.OwnerOnly && !NA.Asset.LoverOnly && (SourceMemberNumber != null) && (C.ID == 0)) CanPush = false;
				if (CanPush) Appearance.push(NA);
				break;

			}

	}

	// Adds any critical appearance asset that could be missing, adds the default one
	for (var G = 0; G < AssetGroup.length; G++)
		if ((AssetGroup[G].Category == "Appearance") && !AssetGroup[G].AllowNone) {

			// Check if we already have the item
			var Found = false;
			for (var A = 0; A < Appearance.length; A++)
				if (Appearance[A].Asset.Group.Name == AssetGroup[G].Name)
					Found = true;

			// Adds the missing appearance part
			if (!Found)
				for (var I = 0; I < Asset.length; I++)
					if (Asset[I].Group.Name == AssetGroup[G].Name) {
						Appearance.push({ Asset: Asset[I], Color: Asset[I].Group.ColorSchema[0] });
						break;
					}

		}
	return Appearance;

}

// Syncs the player appearance with the server
function ServerPlayerAppearanceSync() {

	// Creates a big parameter string of every appearance items and sends it to the server
	if (Player.AccountName != "") {
		var D = {};
		D.AssetFamily = Player.AssetFamily;
		D.Appearance = ServerAppearanceBundle(Player.Appearance);
		ServerSend("AccountUpdate", D);
	}

}

// Syncs the private character with the server
function ServerPrivateCharacterSync() {
	if (PrivateVendor != null) {
		var D = {};
		D.PrivateCharacter = [];
		for (var ID = 1; ID < PrivateCharacter.length; ID++) {
			var C = {
				Name: PrivateCharacter[ID].Name,
				Love: PrivateCharacter[ID].Love,
				Title: PrivateCharacter[ID].Title,
				Trait: PrivateCharacter[ID].Trait,
				Cage: PrivateCharacter[ID].Cage,
				Owner: PrivateCharacter[ID].Owner,
				Lover: PrivateCharacter[ID].Lover,
				AssetFamily: PrivateCharacter[ID].AssetFamily,
				Appearance: ServerAppearanceBundle(PrivateCharacter[ID].Appearance),
				AppearanceFull: ServerAppearanceBundle(PrivateCharacter[ID].AppearanceFull),
				ArousalSettings: PrivateCharacter[ID].ArousalSettings,
				Event: PrivateCharacter[ID].Event
			};
			D.PrivateCharacter.push(C);
		}
		ServerSend("AccountUpdate", D);
	}
};

// Parse the query result and sends it to the right screen
function ServerAccountQueryResult(data) {
	if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.Query != null) && (typeof data.Query === "string") && (data.Result != null)) {
		if (data.Query == "OnlineFriends") FriendListLoadFriendList(data.Result);
		if (data.Query == "EmailStatus") document.getElementById(data.Result ? "InputEmailOld" : "InputEmailNew").placeholder = TextGet(data.Result ? "UpdateEmailLinked" : "UpdateEmailEmpty");
		if (data.Query == "EmailUpdate") ElementValue("InputEmailNew", TextGet(data.Result ? "UpdateEmailSuccess" : "UpdateEmailFailure"));
	}
}

// When the server sends a beep from another account
function ServerAccountBeep(data) {
	if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.MemberNumber != null) && (typeof data.MemberNumber === "number") && (data.MemberName != null) && (typeof data.MemberName === "string")) {
		ServerBeep.MemberNumber = data.MemberNumber;
		ServerBeep.MemberName = data.MemberName;
		ServerBeep.ChatRoomName = data.ChatRoomName;
		ServerBeep.Timer = CurrentTime + 10000;
		if (Player.AudioSettings && Player.AudioSettings.PlayBeeps) {
			ServerBeepAudio.volume = Player.AudioSettings.Volume;
			ServerBeepAudio.play();
		}
		ServerBeep.Message = DialogFind(Player, "BeepFrom") + " " + ServerBeep.MemberName + " (" + ServerBeep.MemberNumber.toString() + ")";
		if (ServerBeep.ChatRoomName != null)
			ServerBeep.Message = ServerBeep.Message + " " + DialogFind(Player, "InRoom") + " \"" + ServerBeep.ChatRoomName + "\" " + (data.ChatRoomSpace === "Asylum" ? DialogFind(Player, "InAsylum") : data.ChatRoomSpace === "LARP" ? DialogFind(Player, "InLarp") : '');
		FriendListBeepLog.push({ MemberNumber: data.MemberNumber, MemberName: data.MemberName, ChatRoomName: data.ChatRoomName, ChatRoomSpace: data.ChatRoomSpace, Sent: false, Time: new Date() });
		if (CurrentScreen == "FriendList") ServerSend("AccountQuery", { Query: "OnlineFriends" });
	}
}

// Draws the beep sent by the server
function ServerDrawBeep() {
	if ((ServerBeep.Timer != null) && (ServerBeep.Timer > CurrentTime)) DrawButton((CurrentScreen == "ChatRoom") ? 0 : 500, 0, 1000, 50, ServerBeep.Message, "Pink", "");
}

// Gets the account ownership result from the query sent to the server
function ServerAccountOwnership(data) {

	// If we get a result for a specific member number, we show that option in the online dialog
	if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.MemberNumber != null) && (typeof data.MemberNumber === "number") && (data.Result != null) && (typeof data.Result === "string"))
		if ((CurrentCharacter != null) && (CurrentCharacter.MemberNumber == data.MemberNumber))
			ChatRoomOwnershipOption = data.Result;

	// If we must update the character ownership data
	if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.Owner != null) && (typeof data.Owner === "string") && (data.Ownership != null) && (typeof data.Ownership === "object")) {
		Player.Owner = data.Owner;
		Player.Ownership = data.Ownership;
		LoginValidCollar();
	}

	// If we must clear the character ownership data
	if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.ClearOwnership != null) && (typeof data.ClearOwnership === "boolean") && (data.ClearOwnership == true)) {
		Player.Owner = "";
		Player.Ownership = null;
		LoginValidCollar();
	}

}

// Gets the account lovership result from the query sent to the server
function ServerAccountLovership(data) {

	// If we get a result for a specific member number, we show that option in the online dialog
	if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.MemberNumber != null) && (typeof data.MemberNumber === "number") && (data.Result != null) && (typeof data.Result === "string"))
		if ((CurrentCharacter != null) && (CurrentCharacter.MemberNumber == data.MemberNumber))
			ChatRoomLovershipOption = data.Result;

	// If we must update the character lovership data
	if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.Lovership != null) && (typeof data.Lovership === "object")) {
		Player.Lovership = data.Lovership;
		LoginLoversItems();
	}
}