
console.log("window Location:", window.location);
const keyValues=window.location.search;
console.log("keys and values:",keyValues);
const urlParams= new URLSearchParams(keyValues)
 const slotnumber=urlParams.get('slotNumber');
 const rateperhour=urlParams.get('rate');
 const index=urlParams.get('index');
 console.log(slotnumber, rateperhour);
 document.getElementById("slotnumber").value=slotnumber;
 document.getElementById("rateperhour").value=rateperhour;



function onFormSubmit(){
 
    var slotinfo={};
     slotinfo["slotnumber"] = document.getElementById("slotnumber").value;
     slotinfo["rateperhour"] = document.getElementById("rateperhour").value;
     slotinfo["slotstatus"]="1";
     slotinfo["starting"]="0";
     slotinfo["stopping"]="0";
     sendInfotostorage(slotinfo);

}


function resetForm(){
 
}

function getPreviousData(){
    let slotinfo=localStorage.getItem("slots");
    slotinfo=JSON.parse(slotinfo);
    return slotinfo;
    }



function sendInfotostorage(slotinfo){
    let dataTobeSaved = [];
    let previousData = getPreviousData();

        if (previousData && previousData.length) {
            previousData.forEach((data) => {
              dataTobeSaved.push(data);
            });
          }
       var flag=0;
       dataTobeSaved.forEach((data)=>{
        if(data.slotnumber==slotinfo.slotnumber){
          flag=1;
        }

         
       });   

          if(slotnumber){
              dataTobeSaved[index]=slotinfo;
          }
          else if(flag==0){
            dataTobeSaved.push(slotinfo);

          }
          else{
            alert("No Duplicate Slot is allowed");
          }
    
    console.log(slotinfo);
    localStorage.setItem("slots",JSON.stringify(dataTobeSaved));
    resetForm();
}

