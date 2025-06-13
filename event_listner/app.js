document.addEventListener("keydown",function(event){
    let key = event.key.toLowerCase();

    if(key>='a' && key<='h'){
        alert("You pressed the key: " + key);
    }
    else{
        alert("No event for this key: " + key);
    }

})