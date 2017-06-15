/*  PLANNING A PROJECT:
-----------------------------------------------
1. What do you want to make?:
-----------------------------------------------

I want to create a zombie text adventure game where the player 
starts with a random scenario. They search for a weapon and fight a zombie.
The player has a 33% chance of getting bitten and losing, or killing the zombie and winning.

-----------------------------------------------
2. What steps do you think are necessary?
-----------------------------------------------

Beginning:
1. Write scenarios
2. Store a list of possible scenarios
3. Alert a random scenario from the list of possible scenarios 

Weapon:
1. Create a list of weapons 
2. Save the list of weapons
3. Alert which weapon the player finds

-----------------------------------------------
3. What syntax or coding patterns might you use?
-----------------------------------------------

Arrays for lists
Need multiple random numbers so a randomNumber function

-----------------------------------------------
Remember: There are many ways to create things with code! The most important part is to write it and get it working.  If you can't get something to work, try making it simpler.  
After, look for ways you might improve your code! 
*/

var beginningScenarios = ["You wake up in the hospital and it's super quiet","You are standing in an open field west of a white house with boarded doors and windows","Desperate, you see a store and must loot it to survive."];

function randomNumber(range){
    return Math.round( Math.random() * range );
}

alert( beginningScenarios[ randomNumber(beginningScenarios.length - 1 ) ] );

var weaponList = ["shovel", "crossbow", "baseballbat","rubber chicken"]

var weapon = weaponList [ randomNumber(weaponList.length -1)];

alert("Seeing as that it's the zombie apocalypse, you decide to search for a weapon first. After suveying you surrounds you notice and grab a " + weapon + ".");

alert("Suddenly a zombie bursts throught the door! You ready you " + weapon + " and advance towards the zombie.");

var survival = randomNumber(2);

if (survival === 0){
    alert("The zombie bites you. You lose!!!");
}else if(survival > 0){
    alert("You kill the zombie with your" + " " + weapon + ". You win!");
}