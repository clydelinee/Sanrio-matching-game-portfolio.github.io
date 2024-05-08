# Portfolio Project: Match Game
## Contents
- Introduction
- Deliverable
- Included Function

## Introduction	
Your task is to code out the game's functionality by completing the functions we've outlined below. We've left you plenty of comments as well as a suite of tests that will help you get the job done. Keep in mind that the functions build upon each other so **you should complete each function in order!**

## Deliverable
### 1. **`createNewCard()`**
This function should create and return a new DOM element that represents a card. The structure of the card should be as follows: 
```html
	<div class="card">
		<div class="card-down"></div>
		<div class="card-up"></div>
	</div>
``` 
We aren't "attaching" this element to the DOM yet. When we do (in the `appendNewCard()` function), the included CSS will display this HTML structure as a card. 

**TEST:** `createNewCardTest()`
<hr>

### 2. **`appendNewCard(parentElement)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `parentElement` | DOM Element | `document.getElementById("card-container")` |

This function will call `createNewCard()` and attach the returned card to the DOM so it actually shows up on the page (without a picture for now). 

The card should be attached as a "child" of the parameter `parentElement`.  Here is what `parentElement` will look like at the beginning of the function:

```html
<div id="card-container">
</div>
```

And here is what it should look like at the end:

```html
<div id="card-container">
	<div class="card">
		<div class="card-down"></div>
		<div class="card-up"></div>
	</div>
</div>
```

**TEST:** `appendNewCardTest()`
<hr>

### 3. **`shuffleCardImageClasses()`**
The `style.css` file has styles for six classes named `image-1` through `image-6`. When applied to a card, these classes will make the card face show the corresponding image when flipped. 
	
This function is all about returning a "shuffled" array with two of each of these class names as strings. In the next function, we'll combine this and `appendNewCard()` to create and assign random pictures to cards.

You'll use a library called "underscore.js" to shuffle the array. The library is called underscore because it uses an `_` character as an object to contain helper methods. You'll need to load underscore.js in your HTML via a CDN link then open up the documentation linked below to learn how to use the `_.shuffle()` method. Make sure to paste the CDN script tag **ABOVE** the other scripts in `index.html`— otherwise it won't work! 

- [Underscore.js CDN Link](https://cdnjs.com/libraries/underscore.js/1.4.1) 
- [_.shuffle Documentation](https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm)

> **🗒 Note:** Ignore the "require" syntax shown in the documentation as this is for non-browser environments. The `_` variable will automatically be available to you when you link the CDN in your project.

**TEST:** `shuffleCardImageClassesTest()`
<hr>

### 4. **`createCards(parentElement, shuffledImageClasses)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `parentElement` | DOM Element | `document.getElementById("card-container")` |
| `shuffledImageClasses` | Array | `["image-5", "image-1", "image-3"...]` |

This function will: 

1. Create all twelve cards with random images and append each one to the DOM
2. Return an array of custom card objects that we can use to organize our cards on the JavaScript side, separate from the HTML document / DOM. 

To complete part 1 we'll loop 12 times. Each iteration we'll create a card that is a child of `parentElement` (using `appendNewCard()`) and add an image class name to the element from the **already shuffled** `shuffledImageClasses` parameter.

To complete part 2 we'll create a new variable to store an array of custom card objects. Then we'll push a new object to the array each iteration of the loop. The custom card object should have the following properties: 

- `index` — Which iteration of the loop this is.
- `element` — The DOM element for the card.
- `imageClass` — The string of the image class on the card. 

Finally, we'll need return the array so we can use the data elsewhere in our program.  

**TEST:** `createCardsTest()`
<hr>

### 5. **`doCardsMatch(cardObject1, cardObject2)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `cardObject1` | Object | `{index: 3, imageClass: "image-5", element: cardElement}` |
| `cardObject2` | Object | `{index: 7, imageClass: "image-1", element: cardElement}` |

Once we know what our card objects look like, we'll write a function to determine if two cards match. Remember the properties of our card objects from the `createCards()` function: `index`, `element`, and `imageClass`.

This function should return `true` when `cardObject1` and `cardObject2` have the same image class name and `false` otherwise. 

**TEST:** `doCardsMatchTest()`
<hr>

### 6. **`incrementCounter(counterName, parentElement)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `counterName` | String | `"flips"` |
| `parentElement` | DOM Element | `document.getElementById("flip-count")` |

This function will add one to a counter being displayed on the webpage (either the number of cards flipped or the number of cards matched)—the trick is that we use an "object dictionary" to store the two counters (flips/matches).

Essentially, `counters["flips"]` will store the flip count and `counters["matches"]` will store the match count. The name `"flips"`, `"matches"`, or something else will be supplied as an argument to the `counterName` parameter. The `counters` object is a global variable declared in the starter code.

The `parentElement` parameter is the DOM element that shows the counter in the HTML (e.g. `<span id="flip-count">`). The `innerText` of this element determines what value is displayed for the counter.

**TEST:** `incrementCounterTest()`
<hr>

### 7. **`onCardFlipped(newlyFlippedCard)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `newlyFlippedCard` | Object | `{index: 9, imageClass: "image-1", element: cardElement}` |

This function will be invoked each time the user flips a card. It has one parameter: `newlyFlippedCard` which is the custom card object associated with whichever card has just been flipped. This function should handle the majority of our game's logic: 

- Is this the first or second card flipped in a sequence?
- Do the cards match? 
- Is the game over?

First off, you'll use the `incrementCounter` function to add one to the flip counter's UI. 

Once the flip counter is incremented, you should check if this is the first card that has been flipped (if `lastCardFlipped` is null). If this is the first card flipped, reassign the value of `lastCardFlipped` to the card object that was just flipped and exit the function with a `return`. 

If two cards are flipped but they *DON'T* match, remove the "flipped" class from each card's DOM element, set `lastCardFlipped` back to null, and return. **Remember that `newlyFlippedCard` and `lastCardFlipped` are both objects made with the `createCards` function. This means that, to access each card's class list, you must access each card object's `.element` property first!**

If two cards are flipped and they match, you should increment the match counter and optionally add a "glow" effect to the matching cards. Play either the win audio or match audio based on whether the user has the number of matches needed to win or not. Both audio files have been loaded in `provided.js` and are stored in variables you can use in your script. You can access them with `matchAudio` and `winAudio`, respectively.

Finally, reset `lastCardFlipped` to null.

**No testing is provided for this function.**
<hr>

### 8. **`resetGame()`**
This function will be called when the user clicks the Reset button at the bottom of the page. 

Start by removing all children from the card-container `<div>`. There are a few different ways you can accomplish this. For one approach, see the Example section of the [MDN removeChild documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild#examples). Keep an eye out for "To remove all children from an element".

Next, reset the flip and match counts displayed in the HTML to zero. Then, reset the `counters` dictionary to an empty object.

Lastly, you should set `lastCardFlipped` back to `null` and use the included `setUpGame()` function to set up a new game.

**No testing is provided for this function.**

## Included Function
**`setUpGame()`** - This function sets up the game by calling the `createCards()` function and adding an `onclick` to new each card created.