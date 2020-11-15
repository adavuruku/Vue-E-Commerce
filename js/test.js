const number = 123456.789;

// console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number));
nums = [{
    "price":50,
    "name":"Mumin"
},{
    "price":10,
    "name":"Abbas"
},{
    "price":25,
    "name":"Zainab"
}]
// nums.sort((a, b) => a.name - b.name);

nums.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 

console.log(nums.reverse())