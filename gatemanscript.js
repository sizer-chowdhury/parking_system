function getPreviousData(){
    let slotinfo=localStorage.getItem("slots");
    slotinfo=JSON.parse(slotinfo);
    return slotinfo;
}

const postsElement=document.querySelector(".posts");
var infos={};
infos=getPreviousData();


const loadAllData = () => {
    infos = getPreviousData();
    var text =""
    text = '<div class="grid-container4" >'
    infos.map((slot, index) => {
        strSlot = JSON.stringify(slot);
        if(slot.slotstatus=="1"){
        text +=
            `<div class="post">
             <p id="slotserial" class="post-title">Slot Number:${slot.slotnumber}</p>
                        <p class="Post-body">Slot Rate:${slot.rateperhour} tk/h</p>
                        <p class="status">Available</p>
                  
                        <button   onclick="onStartRenting(this,${slot.ratepenStartRenrhour},${slot.slotnumber})">Start Renting</button>
                    </div>
            `
        }
        else{
           text+=
             `<div class="post">
             <p id="slotserial" class="post-title">Slot Number:${slot.slotnumber}</p>
                       <p class="Post-body">Slot Rate:${slot.rateperhour} Per Hour</p>
                       <p>Starting time:${slot.starting}</p>
                       <p class="booked">Booked</p>
                 
                       <button   onclick="onStopRenting(this,${slot.rateperhour},${slot.slotnumber},${slot.starting})">Stop renting</button>
                   </div>
           `
        }
    })
    text += '</div>'
  
    document.getElementById("postContainer").innerHTML = text
  };

var selectedpost;
const d = new Date();
function onStartRenting(pt,rateperhour,slotnumber){

    let answer=confirm('Are you sure?');
    if(answer==true){
    selectedpost=pt.parentElement;
    console.log(rateperhour);
    var h=d.getHours();
    var m=d.getMinutes();
    console.log(h*24+m);

    
    changeStatus(slotnumber,h*24+m);
    loadAllData();
    }
    
}



function onStopRenting(pt,rateperhour,slotnumber,starting){

    let answer=confirm('Are you sure?');
    
    if(answer==true){
    var h=d.getHours();
    var m=d.getMinutes();
    var stopping=(h*24+m);
    var timespan=Math.abs(stopping- starting);
    console.log(stopping);
    var cost=(timespan/60)*rateperhour;
    console.log(cost);
    alert("Total Cost:"+cost);
     
    resetSlot(slotnumber);
    loadAllData();
    }

}

/*function changeHtmlView(selectedpost){
   var parser=new DOMParser();
   var htmlstring=JSON.stringify(selectedpost);
   //console.log(typeof htmlstring);
   var htmlDoc=parser.parseFromString(htmlstring,"text/html");
   console.log(htmlDoc.getElementById("slotserial"));
   //console.log(typeof htmlDoc);
    htmlDoc.innerHTML=`<h4 id="slotserial" class="post-title">${post.slotnumber}</h4> 
    <p class="Post-body">${post.rateperhour}</p>
    <p>starting Time: +${post.starting}</p>
    <button   onclick="onStopRenting(this,${post.rateperhour},${post.slotnumber},${post.starting})">Stop renting</button>
    <button  onclick="onEditSlot(this)"></button>`
}*/


function resetSlot(slotnumber){
    let dataTobeSaved=[];
    let previousData=getPreviousData();
    previousData.forEach((data)=>{
        if(data.slotnumber==slotnumber){
            data.slotstatus="1";
            data.starting="0";
            data.stopping="0"
        }
        dataTobeSaved.push(data);
    });
    localStorage.setItem("slots",JSON.stringify(dataTobeSaved));

}




function changeStatus(slotnumber,starting){
    let dataTobeSaved=[];
    let previousData=getPreviousData();
    previousData.forEach((data)=>{
        if(data.slotnumber==slotnumber){
            data.slotstatus="0";
            data.starting=starting;
        }
        dataTobeSaved.push(data);
    });
    localStorage.setItem("slots",JSON.stringify(dataTobeSaved));

}

loadAllData();