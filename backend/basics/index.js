const express = require("express")
const app = express()


const products = [
    { id: 1, name: "Wireless Mouse", category: "Electronics", price: 499 },
    { id: 2, name: "Notebook", category: "Stationery", price: 99 },
    { id: 3, name: "Coffee Mug", category: "Kitchen", price: 199 },
    { id: 4, name: "Bluetooth Speaker", category: "Electronics", price: 1299 },
    { id: 5, name: "Running Shoes", category: "Footwear", price: 2499 },
    { id: 6, name: "Desk Lamp", category: "Furniture", price: 899 },
    { id: 7, name: "Backpack", category: "Accessories", price: 1499 },
    { id: 8, name: "Water Bottle", category: "Fitness", price: 299 }
];

// catrgory , maxPrice , minPrice , search
// https://localhost:3000/products?category=Electornics
// http://localhost:3000/products?category=Electronics&search=Bluetooth%20Speaker
app.get("/products",(req,res)=>{
    const {category,maxPrice,minPrice,search} = req.query;

    let filtered = products;
    if(category){
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase())
    }

    if(maxPrice){
        filtered = filtered.filter(p => p.price <= parseInt(maxPrice))
    }
    
    if(minPrice){
        filtered = filtered.filter(p => p.price >= parseInt(minPrice))
    }

    if(search){
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }

    res.json({products:filtered});
});

app.listen(3000,function(){
    console.log("server is running on port 3000");
})