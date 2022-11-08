 //loginfunction
 function onlogin(){
    console.log("function is entering");
     var credentials=readCredentials();
     verifyCredentials(credentials);
 }




//reading credentials

function readCredentials(){
    var credentials={};
    credentials["username"] = document.getElementById("username").value;
    credentials["password"]= document.getElementById("password").value;
    console.log(credentials);
    return credentials;
}


//varifying credentials and naviagting according to it

function verifyCredentials(credentials){

    if(credentials["username"]=="ADMIN"&&credentials["password"]=="1234"){
        //go to admin page
        console.log("Going to admin page");
        location.href="Admin.html"

    }
    else if(credentials["username"]=="GATEMAN"&&credentials["password"]=="1234"){
        //goto Gate man page.
        location.href="Gateman.html"
    }
    else{
    //show pop up message
    console.log("not verifeid");
    alert("Wrong password");
}
}

function getPreviousData(){
    let slotinfo=localStorage.getItem("slots");
    slotinfo=JSON.parse(slotinfo);
    return slotinfo;
}


//Admin page script
function addSlot(){
    console.log("Button have been pressed");
    location.href="Addnewslot.html"
}


//selection
var infos={};
/*const loadAllData = () =>{
    infos=getPreviousData();

    infos.forEach((post) => {
        
        console.log(post);
        const postElement=document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML=`<p id="slotserial" class="post-title">Slot:${post.slotnumber}</p> 
        <p class="Post-body">Rate:${post.rateperhour} tk/h</p>
        <button   onclick="onRemoveSlot(this,${infos.indexOf(post)})">Remove</button>
        <button  onclick="onEditSlot(this)">Edit</button>`

        postsElement.appendChild(postElement);
        
    });
};*/

const loadAllData = () => {
  infos = getPreviousData();
  var text =""
  text = '<div class="grid-container4" >'
  infos.map((slot, index) => {
      strSlot = JSON.stringify(slot);
      text +=
          `<div class="post">
           <p id="slotserial" class="post-title">Slot Number:${slot.slotnumber}</p>
                      <p class="Post-body">Slot Rate:${slot.rateperhour} Per Hour</p>
                
                <button   onclick="onRemoveSlot(this,${infos.indexOf(slot)})">Remove</button>
                  <button  onclick="onEditSlot(this,${infos.indexOf(slot)},${slot.slotnumber},${slot.rateperhour})">Edit</button>
                  </div>
          `
  })
  text += '</div>'

  document.getElementById("postContainer").innerHTML = text
};


function onEditSlot(pt,index,slotnumber,rateperhour){
    let url=new URL('file:///E:/parking%20system/Car%20Parking%20Project/Addnewslot.html');
    url.searchParams.append("slotNumber",slotnumber);
    url.searchParams.append("rate",rateperhour);
    url.searchParams.append("index",index);
    location.href=url;
}


var selectedpost;

function onRemoveSlot(pt,index){
    let answer=confirm('Want to remove the slot?');

    if(answer==true){
    selectedpost=pt.parentElement;
    //console.log(selectedpost.getElementById("slotserial").value);
    console.log("On remove pressed")
    console.log(index);
    let dataTobeSaved=[];
    let previousData=getPreviousData();
    previousData.forEach((data)=>{
     dataTobeSaved.push(data);
    });
    var removed=dataTobeSaved.splice(index,1);
    console.log(removed);

    localStorage.setItem("slots",JSON.stringify(dataTobeSaved));
    loadAllData();
}

    }

loadAllData();