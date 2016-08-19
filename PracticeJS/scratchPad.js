//Functions





//Say hello function
var name = "Mark";
console.log("Oh hi " + name);

var name2 = "Lisa";
console.log("Oh hi " + name2);

alert("Hi!!");
//Just use a function to simplify!
function sayHello(name){
    console.log("Oh hi " + name)
}
sayHello("mark");
sayHello("Jennifer");
sayHello("Joseph");
sayHello() //undefined

//WhileLoops

var i = 0;
do{
    console.log(i);
    i++;
}while(i <= 11);

//Fizzbuzz

for(i = 1; i < 101; i++){
    if(i % 3 === 0){
        console.log("Fizz " + i);
    };
    if(i % 5 === 0){
        console.log("buzz " + i);
    };
    if(i % 3 === 0 && i % 5 === 0){
        console.log("FizzBuzz " + i);
    };
};

//if div by 3 fizz
//if div by 5 print buzz
//if div by 3 and 5 print fizzbuzz

//Switch

var sign = prompt("What is your astological sign?");
alert("Sensing your future!")

switch(sign){
    case "Taurus":
        alert("You chose Taurus");
        break;
    case "Virgo":
        alert("You chose Virgo");
        break;
    case "Leo":
        alert("You really want leo??")
        break;
    default:
        alert("Please chose valid sign")
        break;
}

//ForLoops

for(i=0; i < 11; i++){
    console.log(i);
}
