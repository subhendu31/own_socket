let number = 12
let f1 = 0; 
let f2 =1;
let sum

for (i=0;i<number;i++){
    sum =f1+f2
    //1+2=3//2+3//3
    // console.log("number",i);
    f1 =f2
    //2//3
    f2 =sum
    //1/2/3/5
    // console.log(f2);
}
// console.log(sum);


const pal = 12312
let pal1 = pal.toString()
let new1 = pal1.split('').reverse().join('')
// console.log(new1.reverse);

// console.log(pal1);
let reverse =0
for (let i = pal1.length -1; i>=0; i--) {
    console.log(pal1[i]);
    reverse = (parseInt(reverse*10) + parseInt(pal1[i]))
    console.log(reverse);
}

const srring = "lalal"
// srring.forEach(element=>{
//     console.log(element);
// })
let total =''
for(let i=srring.length-1; i>=0;i--){
    console.log("111-->",srring[i]);
    total = (total + srring[i])
    console.log(total);
}
console.log(total);