$(document).ready(function() {
    $("button").hide();
    $("button").css("visibility", "visible");
});



var notes=document.querySelector(".notes");
var save = document.querySelector("#cart"); //get #cart
var created = document.querySelector("#created"); // get created
var load = document.querySelector(".load"); //get load
const list = document.getElementsByClassName("inputed"); //All checkboxes
const hiden = document.getElementsByClassName("hiden"); //Look for the Elements to Hide
const scart = document.getElementsByClassName("scart"); //All items to buy
const cart = document.getElementById("cart");
let mytotal = document.getElementById("mytotal"); //get p element
let mytotalq = document.querySelector("#mytotal");
let iv = document.getElementsByClassName("iv");
let it = document.getElementsByClassName("it");
let shop = document.getElementsByClassName("shop");
let mylist = document.getElementsByClassName("mylist");
var regex = /[+-]?\d+(?:\.\d+)?/g;
let costs = [];
let dcost = [];
let ph = []

//!Start notes
notes.addEventListener("keyup", function(e) {//update textarea every stroke
   var notesText=document.createTextNode(String.fromCharCode(e.which)); //get pressed key
   notes.appendChild(notesText); //add pressed key to textarea
   saveState();
});
notes.addEventListener("keydown", function(e) {//update localStorage on delete
    saveState();
});
//?End notes


//!Start saveState
function saveState() {
    window.localStorage.setItem("myitems", JSON.stringify(save.innerHTML))  ; // get and save #cart innerHTML to myitems
    window.localStorage.setItem("rtotal" , JSON.stringify(mytotalq.innerHTML)); //get and save #mytotalq to rtotal
    window.localStorage.setItem("notes" , JSON.stringify(notes.value)); //set notes key to localStorage add notes value
}
//!End SaveState




//!Start loading
function loading() {    
  var regexNotes= /[\\|"*]/ig; //regex to eliminates \ and "
  var storedn = JSON.parse(window.localStorage.notes);// read notes localStorage 
  storedn=storedn.replace(regexNotes,""); // replace regex matches with empty
  notes.innerHTML=storedn;// add notes
    try { //Success
        var stored = JSON.parse(window.localStorage.myitems); //get and save (ls)myitems to var stored
        var storedt = JSON.parse(window.localStorage.rtotal); //get and save (ls)rtotal to var storedt      
        save.innerHTML = stored; // add saved list to #cart
        mytotalq.innerHTML = storedt; //add saved total to cart
        var num = regex.exec(storedt); //check if
        costs = []; //reset costs
        dcost = [] //reset dcosts
        dcost.push(num[0]); //push saved total for calc
        costs.push(num[0]); //push saved total for calc
        costs.push("+") //push sign for calc

        $("#mytotal").addClass("fadeIn").show(); //fadeIn mytotal properly
        for (var a = 0; a < list.length; a++) { //Start loop throught all items
            (function(a) { // full Scope loop 
                for (var b = 0; b < iv.length; b++) { //loop throught cart items
                    if ($(iv[b]).hasClass("line")) {
                        iv[b].previousSibling.firstChild.firstChild.checked = true;
                    }
                    if (list[a].value.includes(iv[b].value)) { //if list items on cart items 
                        list[a].checked = true; //check list items
                        setTimeout(function() { //start timeOut
                            $("button").addClass("fadeIn").show(); //fadeIn button properly 
                        }, 100) //!end timeOut
                    } //!End if
                } //!End b loop

            }(a)); //!End function (a)
        } //!End (a) loop

    } catch (e) { //!Fail

        return; //!exit

    } //!End Fail

}; //!End Loading



function line() {
    for (var y = 0; y < scart.length; y++) {
      if (scart[y].childNodes[0].childNodes[0].childNodes[0].checked === false) {
            scart[y].childNodes[1].classList.remove("line");
        }
        if (scart[y].childNodes[0].childNodes[0].childNodes[0].checked === true) {
            scart[y].childNodes[1].className += " line";
        }
        
    }
    saveState();
    return;
}

//!


document.querySelector(".shop").addEventListener("keypress", function(e) { //Listen to enter
    let key = e.which || e.keycode; // Key detect
    if (key === 13) {
        e.preventDefault();

        var li = document.createElement("li");
        li.setAttribute("id", "created"); 
        li.className = "scart fadeIn";

        var article = document.createElement("article");

        var label = document.createElement("label");
        label.className = "label input--checkbox";

        var input2 = document.createElement("input");
        input2.setAttribute("type", "text");
        input2.className = "iv";


        var checkb = document.createElement("input");
        checkb.className = "input--checkbox it";
        checkb.setAttribute("type", "checkbox");
        checkb.setAttribute("onclick", "line()");

        var span = document.createElement("span");
        span.className = "input__box";

        li.appendChild(article);
        article.appendChild(label);
        label.appendChild(checkb);
        label.appendChild(span);
        li.appendChild(input2);

        document.getElementById("cart").appendChild(li)
        $(".iv").focus();
        $(".iv").css("outline", "none").css("border", "none");
        saveState();
    }

});


//?

//!




let parentCheck = document.getElementsByClassName("mylist");

for (let g = 0; g < parentCheck.length; g++) {
    parentCheck[g].addEventListener("click", function(event) {


        if (parentCheck[g].childNodes[1].childNodes[1].firstChild.checked === true) {
            parentCheck[g].childNodes[1].childNodes[1].firstChild.checked = false;
            var lessele = eval(this.childNodes[1].childNodes[1].firstChild.name - dcost.join("")).toString().split("").slice(1).join(""); //slice extra ele
            lessele = Number(lessele);
            lessele = lessele.toFixed(2);

            dcost = []; //dcost Reset
            costs = []; //cost Reset
            dcost.push(lessele); //push fixed costs
            costs.push(lessele)
            costs.push("+"); //
            mytotal.innerHTML = ""; //reset mytotal
            let ditem = document.createTextNode("Approx " + "$" + lessele); //Create Approx $
            console.log("ditem", lessele, ditem)
            $("#mytotal").hide(); //mytotal hide
            mytotal.appendChild(ditem);
            $("#mytotal").hide().fadeIn(); //mytotal fadeIn
            if (scart.length === 1 || scart.length === 0) { //if no list item
                $("#mytotal").fadeOut(); //mytotal fadeOut
            }
                //? console.log(costs,"cost removed");
                //? console.log(dcost,"dcost removed");
                //? console.log(parentCheck[g].childNodes[1].childNodes[1].firstChild.value, parentCheck[g].childNodes[1].childNodes[1].firstChild.name)

            for (let c = 0; c < iv.length; c++) { //Loop thought all items to buy 
                (function(c) {
                    if (iv[c].value.includes(parentCheck[g].childNodes[1].childNodes[1].firstChild.value)) { // if unchecked is on items to buy
                        iv[c].parentNode.className = "fadeOut"; // fadeOut Delete unchecked from items to buy   
                        setTimeout(function() {
                            iv[c].parentNode.remove();
                            console.log(dcost, "remove dcost")
                            console.log(costs, "remove costs")
                            saveState();
                        }, 100);

                    }; //!End if
                })(c)
            }; //!End for
                
        } else if (parentCheck[g].childNodes[1].childNodes[1].firstChild.checked === false) {
            //console.log(event)
            event.preventDefault()
            parentCheck[g].childNodes[1].childNodes[1].firstChild.checked = true;
            if (parentCheck[g].childNodes[1].childNodes[1].firstChild.checked === true) {
                let li = document.createElement("li"); //Create element
                var article = document.createElement("article");
                var label = document.createElement("label");
                let input2 = document.createElement("input");
                let checkb = document.createElement("input");
                var span = document.createElement("span");
                li.className = "scart"; //Create Class
                label.className = "label input--checkbox";
                input2.className = "iv"; //Create  input2 Class
                checkb.className = "input--checkbox it"; //Create checkb Class
                span.className = "input__box";
                let item = document.createTextNode(parentCheck[g].childNodes[1].childNodes[1].firstChild.value); //Grab checked names
                input2.setAttribute("value", parentCheck[g].childNodes[1].childNodes[1].firstChild.value); //Copy Value from checkbox to new li    
                input2.setAttribute("name", parentCheck[g].childNodes[1].childNodes[1].firstChild.name); //add name to textarea
                input2.setAttribute("type", "text");
                //li.setAttribute("onclick", "liT()")
                input2.readOnly = false;
                checkb.setAttribute("type", "checkbox"); //create checkbox
                input2.setAttribute("name", parentCheck[g].childNodes[1].childNodes[1].firstChild.name); //add name to textarea
                li.appendChild(article);
                article.appendChild(label);
                label.appendChild(checkb);
                label.appendChild(span);
                li.appendChild(input2);
                cart.appendChild(li); //Add new element to HTML         
                costs.push(parentCheck[g].childNodes[1].childNodes[1].firstChild.name, "+"); //collect clicked costs for sum
                var ncosts = costs.slice(0, -1); //eliminate last + extra sign
                nncosts = eval(ncosts.join("")); //sum all costs joining 'em
                dcost = []; //Reset 
                dcost.push(nncosts); //push new nncosts  
                dcost.join(""); //Join prices
                var temp = dcost[0].toFixed(2);
                dcost = [];
                dcost.push(temp);
                // console.log("testttt", temp)
                let currentTotal = document.createTextNode("Approx " + "$" + dcost); //text
                mytotal.innerHTML = ""; //Empty p ele for refresh
                mytotal.appendChild(currentTotal); //p display current total
                $("#mytotal").hide().fadeIn();
                $("button").addClass("fadeIn").show();
                $(".scart:last").addClass("fadeIn"); //scart:last hide then fadeIn
                if (scart.length > 0) { //if no list item
                    $("#mytotal").fadeIn().show(); //mytotal fadeOut
                    // console.log(dcost, "check dcost")
                    // console.log(costs, "check cost")
                    // console.log(parentCheck[g]);
                    // saveState();
                    // }
                }
                 console.log("cost/suma added =",costs);
                 console.log("dcost/total added =",dcost);
               // let mycart = []




                //console.log(parentCheck[g])
                saveState();
            }

        }

    });
}


//!





//!Button Start

const mybt = document.getElementById("mybt"); //Look for the Button by id
mybt.addEventListener("click", function() { //Listen for Button Click      
    let myshop = document.getElementsByClassName("shop"); //Get shop div
    for (let z = 0; z < iv.length; z++) {
        (function(z) {


            //Animation is fucked up in and out


            //On-Green Start
            if (iv[z].readOnly === false) { //Switch 
                // scart.after(notes);

                for (let k = 0; k < hiden.length; k++) { //Loop throught all elements
                    $(hiden[k]).addClass("fadeOut").hide(); //Hide elements
                    $("#animation").addClass("fadeOut");

                    setTimeout(function() {
                        $("#animation").hide().removeClass("fadeOut");
                        $(hiden[k]).hide();
                        $(".hiden").addClass("hidden");
                    }, 290);

                    setTimeout(function() {
                        document.getElementById("animation").className = "col-xs-4"
                        $("#animation").addClass("fadeIn").show();
                    }, 290);; //Move div to original pos
                
                } //!On-Green End      
//$(".hiden").addClass("hidden");
//$(".hiden").removeClass("hidden")

                //!Off-Red Start              
/*Off switch*/  iv[z].readOnly = true; 
                for (let o = 0; o < scart.length; o++) {
                    scart[o].addEventListener("click", function check() { 
                        if (scart[o].childNodes[0].childNodes[0].childNodes[0].checked === true) {
                            scart[o].childNodes[0].childNodes[0].childNodes[0].checked = false;
                            line();

                        } else if (scart[o].childNodes[0].childNodes[0].childNodes[0].checked === false) {
                            scart[o].childNodes[0].childNodes[0].childNodes[0].checked = true;
                            line();
                        }

                    });
                }



/* On switch*/  } else {
                    $("#animation").removeClass("fadeOut");
                    $("#animation").addClass("fadeOut")
                    setTimeout(function(){
                        iv[z].readOnly = false; 
                        document.getElementById("animation").className = "col-xs-3"; // Move div right

                            for (let j = 0; j < hiden.length; j++) { //Loop all hidden ele
                                $(".hiden").removeClass("hidden"); 
                                $(hiden[j]).removeClass("fadeOut"); 
                                $("#animation").removeClass("fadeOut");
                                $(hiden[j]).addClass("fadeIn").show(); //Restore hidden ele
                           //  $("#animation").addClass("fadeIn");

                            }


                    },290)
                
                
            }
            //!Off-red End
        })(z);
    }
});




//!Button End

function less() {

    var less = dcost[0] - 1;
    less = less.toFixed(2);
    less.toString();
    var tot = document.createTextNode("Approx " + "$" + less); //text
    mytotal.innerHTML = ""; //Empty p ele for refresh
    $("#mytotal").hide().fadeIn(600); //mytotal hide then fadeIN
    mytotal.appendChild(tot); //p display current total
    dcost = [];
    costs = [];
    dcost.push(less);
    costs.push(less)
    costs.push("+");
    saveState();
}

//!Plus btn
function plus() {

    var plus = Number(dcost[0]) + 1;
    plus = plus.toFixed(2);
    plus.toString();
    //slice extra ele
    var tot = document.createTextNode("Approx " + "$" + plus); //text
    mytotal.innerHTML = ""; //Empty p ele for refresh
    $("#mytotal").hide().fadeIn(600); //mytotal hide then fadeIN
    mytotal.appendChild(tot); //p display current total
    dcost = [];
    costs = [];
    dcost.push(plus);
    costs.push(plus)
    costs.push("+");
    saveState();
}

//!Delete created ele
function keyfunc(event) {

    let mykey = event.which || event.keyCode;
    let temp = document.activeElement; //get
    temp.setAttribute("value", temp.value);
    if (temp.value === "") {
        if (mykey === 8) {
            temp.parentNode.remove()
        }
    }

    saveState();
}

//!


function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
};


function clean() {
     var tempNotes= notes.value;// reSave notes to var   
     window.localStorage.clear();//Delete
       window.localStorage.setItem("notes" , JSON.stringify(tempNotes));// resave notes to localStorage 

   
    for (let g = 0; g < scart.length; g++) {
        $(scart[g]).addClass("fadeOut");
        $("#mytotal").removeClass("fadeIn");

        $("#mytotal").addClass("fadeOut");
        $("button").addClass("fadeOut");
    }

    setTimeout(function() {
        $("button").hide();
        $("button").removeClass("fadeOut");



        for (var f = 0; f < list.length; f++) {
            if (list[f].checked === true) {
                //console.log(list[f]);

                list[f].checked = false
                while (cart.hasChildNodes()) {
                    cart.firstChild.className += "fadeOut" //.addClass("fadeOut");
                    cart.removeChild(cart.firstChild);
                }
                dcost = [];
                costs = [];
                mytotal.innerHTML = "";
                $("#mytotal").removeClass("fadeOut");
            }

        }
    }, 400);





}
var eqh=document.getElementsByClassName("eqh").offsetHeight;

//! Background Animation
var w = c.width = window.innerWidth,
        h = c.height = window.innerHeight,
        ctx = c.getContext( '2d' ),
        
        opts = {
            particles: 250,
            baseSize: 20,
            addedSize: 20,
            baseSpeed: 1,
            addedSpeed: 2,
            colors: [ "#ff3300","#00cc00","#3366ff","#ff3399" ]
            
        },
        
        
        particles = [],
        tick = 0;

function Particle(){
    
    this.x = w / 0.1;
    this.y = h / 0.1;
    
    this.size = opts.baseSize + opts.addedSize * Math.random();
    
    var speed = opts.baseSpeed + opts.addedSpeed * Math.random(),
            rad = Math.random() * Math.PI * 1;
    
    this.vx = speed * Math.cos( rad );
    this.vy = speed * Math.sin( rad );
    
    this.color = opts.colors[ ( opts.colors.length * Math.random() ) |0 ];
}
Particle.prototype.step = function(){
    
    this.x += this.vx;
    this.y += this.vy;
    
    var flipX = true,
            flipY = true;
    
    if( this.x < 0 )
        this.x = 0;
    else if( this.x > w )
        this.x = w;
    else
        flipX = false;
    
    if( this.y < 0 )
        this.y = 0;
    else if( this.y > h )
        this.y = h;
    else
        flipY = false;
    
    if( flipX )
        this.vx *= -1;
    if( flipY )
        this.vy *= -1;
    
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.size, 0, Math.PI * 1 );
    ctx.fill();
}
function anim(){
    
    window.requestAnimationFrame( anim );
    
    ++tick;
    
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect( 0, 0, w, h );
    ctx.globalCompositeOperation = 'lighter';
    
    if( particles.length < opts.particles && Math.random() < 1 )
        particles.push( new Particle );
    
    particles.map( function( particle ){ particle.step(); } );
}
anim();

window.addEventListener( 'resize', function(){
    
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
})


//!End Backdround Animation

loading();


//var clipboard = new Clipboard('.btn');


// .scart.after(notes)
// #last.after(notes) | lastChild =to make it auto not manual by id
//red green botton