let a=5;
let b=8;

console.log(a+b);
console.log(a-b);
console.log(a*b);
console.log(a/b);

const first_name ="Semenchuk ";
const last_name= "Denis";
let full_name = first_name+last_name;
console.log(full_name);

const age = 18;
if(age >= 18){
    console.log("Доступ Дозволено");
}
else{
    console.log("Доступ Заборонено");
}

for(let i=0; i<=10; i++){
    console.log(i);
}


function square(number){
    return number*number;
}
console.log(square(5));

const fruits = ["banana", "apple", "cherry"];
fruits.push("watermelon");
for(let i=0; i<fruits.length; i++){
    console.log(fruits[i]);
}