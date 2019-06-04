//let values = []; //[i] pushed values
var cart = document.querySelector('#cart');
let ls = document.getElementsByClassName("saved"); //get inputs text
let ele = document.getElementById("save");
//for(var i=0;i<5;i++){
  //  console.log([i]);
//}


 //ele.addEventListener("click", guardarDatos);

//////////
    function guardarDatos() { //function to save
        window.localStorage.myitems=cart.innerHTML
        console.log(window.localStorage.myitems);
       
   // console.log(ls[i].value,"ls");   
            //  values.push(ls[i].value) //push [i] to values var
           //  console.log(values,"values");
           //  localStorage.saved = JSON.stringify(ls[i].value); //Stingify  then SAVE 
           //  document.getElementById("datos").innerHTML = "Saved"+ ls[i].value;  
           // document.getElementById("datos").innerHTML = "No has introducido tu nombre y tu password";
         
     //end save func
    }; //end for callback
    //
   




//////////
     function recuperarDatos() { //Load func     //Start duplicating values

var storedValues = window.localStorage.myitems;
cart.innerHTML = storedValues;
    //     //if ((Object.values != undefined) && (Object.values != [])) {
    //     let slot = Object.values(JSON.parse(localStorage.saved)) //get the stored names
    //     console.log(slot,"3");

    //     for (let e = 0; e < slot.length; e++) { //stored names loop                    //Problem starts here <---- for loop
    //        console.log(slot[1],"slot[e]");
    //         if (slot[e] === "") {
    //             document.getElementById("datos").innerHTML = "No saved data";
    //         }

    //         // if(ls.indexOf(ls[j])=== slot.indexOf(slot[e])){;//input value = stored name val
    //         ls[i].value = slot[e++]; //Value only saving first.
    //         //console.log(slot[e])
    //         //}  
    //         //console.log(slot[e],"slot[e]");//log saved names
    //         //console.log(ls[j]);//log inputs 
    //         document.getElementById("datos").innerHTML = "";
    //         // console.log(slot.indexOf(slot[e]),slot[e],ls[j]);

    //         document.getElementById("datos").innerHTML = "Nombre: " + slot[e]; //text

                //let load = document.getElementById("load");
                //load.addEventListener("click", recuperarDatos);
    //     } //end slot

     }
    ////////////}







$("#demo").fadeIn();