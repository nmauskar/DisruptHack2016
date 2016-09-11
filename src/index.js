/**
    Code built upon Minecraft example provided by Amazon
    at https://github.com/amzn/alexa-skills-kit-js/blob/master/samples/minecraftHelper/src/index.js
 */

'use strict';

var AlexaSkill = require('./AlexaSkill'),
    amounts = require('./amounts');

var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var FridgeTech = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
FridgeTech.prototype = Object.create(AlexaSkill.prototype);
FridgeTech.prototype.constructor = FridgeTech;

FridgeTech.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to Fridge Tech. You can ask a question like, what should I make? ... Now, what can I help you with.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

FridgeTech.prototype.intentHandlers = {
    "TellAmountIntent": function (intent, session, response) {
        var itemSlot = intent.slots.IngredientName,
            itemName;
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = "Amount for " + itemName,
            amount = amounts[itemName],
            speechOutput,
            repromptOutput;
        if (amount) {
            speechOutput = {
                speech: amount,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, amount);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the ammount for " + itemName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that amount. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions such as, what's about to go bad, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, what's about to go bad, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var fridgeTech = new FridgeTech();
    fridgeTech.execute(event, context);
};