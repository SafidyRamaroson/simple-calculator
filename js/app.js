// on va afficher les valeurs numeriques sur div.affichage

window.onload=function (){

    const btnNums= document.querySelectorAll('.btnNum')
    const btnDel=document.querySelector('.btnDel')
    const btnClear=document.querySelector('.btnClear')
    const btnOps=document.querySelectorAll('.btnOps')
    const btnEgal=document.querySelector('.btnEgal')
    const btnPoint=document.querySelector('.btnPoint')
    const initVar=0
    let premierMembre=""
    let deuxiemeMembre=""
    let varAfficher=document.getElementById('varAfficher')
    let stockVarClick=new Array();
    let j=0



   btnNums.forEach(btnNum => {
        btnNum.addEventListener('click', ()=>{
         if (varAfficher.innerHTML ==0) {
            varAfficher.innerHTML="";
            varAfficher.innerHTML+=btnNum.textContent
            stockVarClick.push(btnNum.textContent)
         }else{
            stockVarClick.push(btnNum.textContent)
            varAfficher.innerHTML+=btnNum.textContent
         }
        })
   });

   btnOps.forEach(btnOp => {
      
      btnOp.addEventListener('click', ()=>{
        
         if (varAfficher.innerText==0 || stockVarClick.length==0) {

            varAfficher.innerHTML=initVar;      
      
         }else if(stockVarClick[stockVarClick.length-1]== '+'||stockVarClick[stockVarClick.length-1]== '-'
         || stockVarClick[stockVarClick.length-1]== '/' ||stockVarClick[stockVarClick.length-1]== '*')
         {

           stockVarClick[stockVarClick.length-1]= btnOp.textContent
           varAfficher.innerHTML=""
            stockVarClick.forEach(element => {
               varAfficher.innerHTML += element
            });
         }else{
            stockVarClick.push(btnOp.innerText)
            varAfficher.innerHTML +=btnOp.innerText;
         }
      })
   });

    btnClear.addEventListener('click', ()=>{
        varAfficher.innerHTML= initVar
      })

   btnDel.addEventListener('click', ()=>{

      if (stockVarClick.length ==1 || stockVarClick.length ==0) {
         varAfficher.innerHTML = initVar;
      
      }else{
         varAfficher.innerHTML= " "
         stockVarClick.pop()

         stockVarClick.forEach(element => {

             if(stockVarClick.length ===0){
              varAfficher.innerHTML = initVar
             }else{
              varAfficher.innerHTML +=element
             }
             
         });
      }
   })

}


