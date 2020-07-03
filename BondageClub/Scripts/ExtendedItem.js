"use strict";

/**
 * Utility file for handling extended items
 *
 * Item option format:
 *
 * Option.Name:				The name of the type - used for the preview icon and the translation key in the CSV
 * Option.BondageLevel:		The required bondage skill level for this type (optional)
 * Option.SelfBondageLevel:	The required self-bondage skill level for this type when using it on yourself (optional)
 * Option.Property:			The Property object to be applied when this option is used
 *
 */

/**
 * A lookup for the current pagination offset for all extended item options. Offsets are only recorded if the extended item requires
 * pagination
 *
 * Example format:
 * {
 *     "ItemArms/HempRope": 4,
 *     "ItemArms/Web": 0
 * }
 *
 * @type {Object.<string, number>}
 */
var ExtendedItemOffsets = {};

/**
 * Loads the item extension properties
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type
 * @param {string} Options[].Name - The name of the type - used for the preview icon and the translation key in the CSV
 * @param {number} [Options[].BondageLevel] - The required bondage skill level for this type (optional)
 * @param {number} [Options[].SelfBondageLevel] - The required self-bondage skill level for this type when using it on yourself (optional)
 * @param {Object} [Options[].Property] - The Property object to be applied when this type is used
 * @param {string} DialogKey - The dialog key for the message to display prompting the player to select an extended type
 */
function ExtendedItemLoad(Options, DialogKey) {
	if (!DialogFocusItem.Property) {
		DialogFocusItem.Property = Options[0].Property;
	}

	if (Options.length > 2) {
		ExtendedItemSetOffset(0);
	}

	DialogExtendedMessage = DialogFind(Player, DialogKey);
}

/**
 * Draws the extended item type selection screen
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type (as defined in ExtendedItemLoad)
 * @param {string} DialogPrefix - The prefix to the dialog keys for the display strings describing each extended type. The full dialog key
 *     will be <Prefix><Option.Name>
 */
function ExtendedItemDraw(Options, DialogPrefix) {
	var IsSelfBondage = CharacterGetCurrent().ID === 0;
	var Asset = DialogFocusItem.Asset;

	// If we have to paginate, draw the next button
	if (Options.length > 4) {
		DrawButton(1775, 25, 90, 90, "", "White", "Icons/Next.png");
	}

	// Draw the header and item
	DrawRect(1387, 55, 225, 275, "white");
	DrawImageResize("Assets/" + Asset.Group.Family + "/" + Asset.Group.Name + "/Preview/" + Asset.Name + ".png", 1389, 57, 221, 221);
	DrawTextFit(Asset.Description, 1500, 310, 221, "black");
	DrawText(DialogExtendedMessage, 1500, 375, "white", "gray");

	if (Options.length === 2) {
		ExtendedItemDrawTwo(Options, DialogPrefix, IsSelfBondage);
	} else {
		ExtendedItemDrawGrid(Options, DialogPrefix, IsSelfBondage);
	}
}

/**
 * Handles clicks on the extended item type selection screen
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type (as defined in ExtendedItemLoad)
 */
function ExtendedItemClick(Options) {
	// Exit button
	if (MouseX >= 1885 && MouseX <= 1975 && MouseY >= 25 && MouseY <= 110) {
		DialogFocusItem = null;
		return;
	}

	var IsSelfBondage = CharacterGetCurrent().ID === 0;

	if (Options.length === 2) {
		ExtendedItemClickTwo(Options, IsSelfBondage);
	} else {
		ExtendedItemClickGrid(Options, IsSelfBondage);
	}
}

/**
 * Handler function for setting the type of an extended item
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type (as defined in ExtendedItemLoad)
 * @param {Object} Option - The selected type definition (as defined in ExtendedItemLoad)
 */
function ExtendedItemSetType(Options, Option) {
	var C = CharacterGetCurrent();
	var FunctionPrefix = ExtendedItemFunctionPrefix();

	// An extendable item may provide a validation function. Returning false from the validation function will drop out of
	// this function, and the new type will not be applied.
	if (CommonCallFunctionByName(FunctionPrefix + "Validate", Option) === false) {
		return;
	}

	DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
	if (CurrentScreen == "ChatRoom") {
		// Call the item's load function
		CommonCallFunctionByName(FunctionPrefix + "Load");
	}
	var PreviousType = DialogFocusItem.Property.Type;

	DialogFocusItem.Property = Option.Property;
	CharacterRefresh(C);
	ChatRoomCharacterUpdate(C);

	var PreviousOption = Options.find(O => O.Property.Type === PreviousType);
	if (CurrentScreen === "ChatRoom") {
		// If we're in a chatroom, call the item's publish function to publish a message to the chatroom
		CommonCallFunctionByName(FunctionPrefix + "PublishAction", C, Option, PreviousOption);
	} else {
		DialogFocusItem = null;
		if (C.ID === 0) {
			// Player is using the item on herself
			DialogMenuButtonBuild(C);
		} else {
			// Otherwise, call the item's NPC dialog function, if one exists
			CommonCallFunctionByName(FunctionPrefix + "NpcDialog", C, Option, PreviousOption);
			C.FocusGroup = null;
		}
	}
}

/**
 * Draws the extended item type selection screen when there are only two options
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type (as defined in ExtendedItemLoad)
 * @param {string} DialogPrefix - The prefix to the dialog keys for the display strings describing each extended type. The full dialog key
 *     will be <Prefix><Option.Name>
 * @param {boolean} IsSelfBondage - Whether or not the player is applying the item to themselves
 */
function ExtendedItemDrawTwo(Options, DialogPrefix, IsSelfBondage) {
	var Asset = DialogFocusItem.Asset;

	for (var I = 0; I < Options.length; I++) {
		var X = 1175 + I * 425;
		var Y = 550;
		var Option = Options[I];
		var FailSkillCheck = !!ExtendedItemRequirementCheckMessage(Option, IsSelfBondage);

		DrawButton(X, Y, 225, 225, "", ((DialogFocusItem.Property.Type == Option.Property.Type)) ? "#888888" : FailSkillCheck ? "Pink" : "White");
		DrawImage("Screens/Inventory/" + Asset.Group.Name + "/" + Asset.Name + "/" + Option.Name + ".png", X, Y);
		DrawText(DialogFind(Player, DialogPrefix + Option.Name), X + 113, Y + 250, "white", "gray");
	}
}

/**
 * Draws the extended item type selection screen when there are more than two options. Options will be paginated if necessary, with four
 * options drawn per page in a 2x2 grid
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type (as defined in ExtendedItemLoad)
 * @param {string} DialogPrefix - The prefix to the dialog keys for the display strings describing each extended type. The full dialog key
 *     will be <Prefix><Option.Name>
 * @param {boolean} IsSelfBondage - Whether or not the player is applying the item to themselves
 */
function ExtendedItemDrawGrid(Options, DialogPrefix, IsSelfBondage) {
	var Asset = DialogFocusItem.Asset;
	var ItemOptionsOffset = ExtendedItemGetOffset();
	// Draw the possible variants and their requirements, 4 at a time in a 2x2 grid
	for (var I = ItemOptionsOffset; I < Options.length && I < ItemOptionsOffset + 4; I++) {
		var PageOffset = I - ItemOptionsOffset;
		var X = 1200 + (PageOffset % 2 * 387);
		var Y = 450 + (Math.floor(PageOffset / 2) * 300);
		var Option = Options[I];
		var FailSkillCheck = !!ExtendedItemRequirementCheckMessage(Option, IsSelfBondage);

		DrawButton(X, Y, 225, 225, "", ((DialogFocusItem.Property.Type == Option.Property.Type)) ? "#888888" : FailSkillCheck ? "Pink" : "White");
		DrawImage("Screens/Inventory/" + Asset.Group.Name + "/" + Asset.Name + "/" + Option.Name + ".png", X, Y);
		DrawText(DialogFind(Player, DialogPrefix + Option.Name), X + 113, Y - 20, "white", "gray");
	}
}

/**
 * Handles clicks on the extended item type selection screen when there are only two options
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type (as defined in ExtendedItemLoad)
 * @param {boolean} IsSelfBondage - Whether or not the player is applying the item to themselves
 */
function ExtendedItemClickTwo(Options, IsSelfBondage) {
	for (var I = 0; I < Options.length; I++) {
		var X = 1175 + I * 425;
		var Y = 550;
		var Option = Options[I];
		if (MouseX >= X && MouseX <= X + 225 && MouseY >= Y && MouseY <= Y + 225 && DialogFocusItem.Property.Type !== Option.Property.Type) {
			ExtendedItemHandleOptionClick(Options, Option, IsSelfBondage);
		}
	}
}

/**
 * Handles clicks on the extended item type selection screen when there are more than two options
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type (as defined in ExtendedItemLoad)
 * @param {boolean} IsSelfBondage - Whether or not the player is applying the item to themselves
 */
function ExtendedItemClickGrid(Options, IsSelfBondage) {
	// Pagination button
	if (Options.length > 4 && MouseX >= 1775 && MouseX <= 1865 && MouseY >= 25 && MouseY <= 110) {
		ExtendedItemNextPage(InventoryItemArmsWebOptions);
	}

	var ItemOptionsOffset = ExtendedItemGetOffset();

	for (var I = ItemOptionsOffset; I < Options.length && I < ItemOptionsOffset + 4; I++) {
		var offset = I - ItemOptionsOffset;
		var X = 1200 + (offset % 2 * 387);
		var Y = 450 + (Math.floor(offset / 2) * 300);
		var Option = Options[I];
		if (MouseX >= X && MouseX <= X + 225 && MouseY >= Y && MouseY <= Y + 225 && DialogFocusItem.Property.Type !== Option.Property.Type) {
			ExtendedItemHandleOptionClick(Options, Option, IsSelfBondage);
		}
	}
}

/**
 * Handler function called when an option on the type selection screen is clicked
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type (as defined in ExtendedItemLoad)
 * @param {Object} Option - The selected type definition (as defined in ExtendedItemLoad)
 * @param {boolean} IsSelfBondage - Whether or not the player is applying the item to themselves
 */
function ExtendedItemHandleOptionClick(Options, Option, IsSelfBondage) {
	var requirementMessage = ExtendedItemRequirementCheckMessage(Option, IsSelfBondage);
	if (requirementMessage) {
		DialogExtendedMessage = requirementMessage;
	} else {
		ExtendedItemSetType(Options, Option);
	}
}

/**
 * Checks whether the player meets the requirements for an extended type option. This will check against their Bondage skill if applying
 * the item to another character, or their Self Bondage skill if applying the item to themselves.
 *
 * @param {Object} Option - The selected type definition (as defined in ExtendedItemLoad)
 * @param {boolean} IsSelfBondage - Whether or not the player is applying the item to themselves
 * @return {string|null} null if the player meets the option requirements. Otherwise a string message informing them of the requirements
 *     they do not meet
 */
function ExtendedItemRequirementCheckMessage(Option, IsSelfBondage) {
	if (IsSelfBondage && SkillGetLevelReal(Player, "SelfBondage") < Option.SelfBondageLevel) {
		return DialogFind(Player, "RequireSelfBondage" + Option.SelfBondageLevel);
	} else if (!IsSelfBondage && SkillGetLevelReal(Player, "Bondage") < Option.BondageLevel) {
		return DialogFind(Player, "RequireBondageLevel").replace("ReqLevel", Option.BondageLevel);
	}
	return null;
}

/**
 * Simple getter for the function prefix used for the currently focused extended item - used for calling standard extended item functions
 * (e.g. if the currently focused it is the hemp rope arm restraint, this will return "InventoryItemArmsHempRope", allowing functions like
 * InventoryItemArmsHempRopeLoad to be called)
 *
 * @return {string} The extended item function prefix for the currently focused item
 */
function ExtendedItemFunctionPrefix() {
	var Asset = DialogFocusItem.Asset;
	return "Inventory" + Asset.Group.Name + Asset.Name;
}

/**
 * Simple getter for the key of the currently focused extended item in the ExtendedItemOffsets lookup
 *
 * @return {string} The offset lookup key for the currently focused extended item
 */
function ExtendedItemOffsetKey() {
	var Asset = DialogFocusItem.Asset;
	return Asset.Group.Name + "/" + Asset.Name;
}

/**
 * @return {number} The pagination offset for the currently focused extended item
 */
function ExtendedItemGetOffset() {
	return ExtendedItemOffsets[ExtendedItemOffsetKey()];
}

/**
 * Sets the pagination offset for the currently focused extended item
 *
 * @param {number} Offset - The new offset to set
 */
function ExtendedItemSetOffset(Offset) {
	ExtendedItemOffsets[ExtendedItemOffsetKey()] = Offset;
}

/**
 * Switches the pagination offset to the next page for the currently focused extended item. If the new offset is greater than the number of
 * available options, the offset will be reset to zero, wrapping back to the first page.
 *
 * @param {Object[]} Options - An Array of type definitions for each allowed extended type (as defined in ExtendedItemLoad)
 */
function ExtendedItemNextPage(Options) {
	var OffsetKey = ExtendedItemOffsetKey();
	ExtendedItemOffsets[OffsetKey] += 4;
	if (ExtendedItemOffsets[OffsetKey] >= Options.length) {
		ExtendedItemOffsets[OffsetKey] = 0;
	}
}
