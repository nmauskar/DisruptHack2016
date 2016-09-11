{
  "intents": [
    {
      "intent": "GetMealsIntent"
    },
    {
      "intent": "GoneBadIntent"
    },
    {
      "intent": "AlmostBadIntent"
    },
    {
      "intent": "PurchaseIntent"
    },
    {
      "intent": "TellAmountIntent",
      "slots": [
        {
          "name": "IngredientName",
          "type": "LIST_OF_INGREDIENTS"
        }
      ]
    },
    {
      "intent": "MakeIntent",
      "slots": [
        {
          "name": "RecipeName",
          "type": "LIST_OF_RECIPES"
        }
      ]
    },
    {
      "intent": "TossIntent",
      "slots": [
        {
          "name": "IngredientName",
          "type": "LIST_OF_INGREDIENTS"
        }
      ]
    }
  ]
}