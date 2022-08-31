const loadPhone=async(search,dataLimit)=>{

 const url=`https://openapi.programming-hero.com/api/phones?search=${search}`
 const res=await fetch(url)
 const data= await res.json()
 displayPhone(data.data,dataLimit);

}

const displayPhone =(phones,dataLimit)=>{
    console.log(phones);
    const phoneContainer=document.getElementById("phone-container");
    phoneContainer.innerHTML='';
    const showAll= document.getElementById('showAll');
   if(dataLimit && phones.length>10){
    phones=phones.slice(0,10);
   showAll.classList.remove('d-none')
   }else{

           showAll.classList.add('d-none');
   }

    const noPhone=document.getElementById('no-phone');

    if(phones.length === 0){
        noPhone.classList.remove('d-none');

    }else{
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone=>{
    phoneContainer.classList.add('col');
    const div=document.createElement('div');
    div.innerHTML=`
    <div class="card p-4">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Brand:${phone.brand}</h5>
      <p class="card-text">Phone Name ${phone.phone_name}</p>
      <button onclick="loadonDtails('${phone.slug}')" class="btn btn-primary">show Dtails</button>
    </div>
  </div>          
    
    `
    phoneContainer.appendChild(div);
    //stope spinner
    trogolSpinner(false);

   });
   

}
const processSerch=(dataLimit)=>{

    trogolSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    loadPhone(searchText,dataLimit);
}
document.getElementById("btn-serch").addEventListener('click',function(){

  //start spinner
    processSerch(10);

})
// enter 
document.getElementById('search-field').addEventListener('keypress', function (e) {
   // console.log(e.key);
    if (e.key === 'Enter') {
      // code for enter
      processSerch(10);
    }
});

const trogolSpinner=(isLoding)=>{
    const spinner=document.getElementById("spenner");
    if(isLoding){
        spinner.classList.remove('d-none')
    }else{
        spinner.classList.add('d-none')
    }
}

document.getElementById('btn-all').addEventListener('click',function(){

    processSerch();

})
const loadonDtails = async(id)=>{
    const url=` https://openapi.programming-hero.com/api/phone/${id}`
    const res=await fetch(url)
    const data=await res.json()
    console.log(data.data);
}
loadPhone('phone');