window.onload= () =>{
    
    // zone d'affichage
    const zoneAffichage = document.querySelector('.affichage');
    // button item
    const elementsBtn =document.querySelectorAll('.btn');
    // historique de calcul 
    const contenuHistorique = document.querySelector('.contenuHistorique');

    //nomDeLaClass 
    let ElementHistorique = "historiqueEl"

    //affiche chaque valeur cliquee par l'utilisateur
    elementsBtn.forEach(elementBtn => {
        elementBtn.addEventListener('click', () =>{
            if(zoneAffichage.innerHTML.length == 1 && zoneAffichage.innerHTML =='0'){
                //testons si le contenu de btn clique ne contient que de chiffre 
                    if(elementBtn.innerHTML =="%" || elementBtn.innerHTML =="/" || elementBtn.innerHTML =="x" 
                        || elementBtn.innerHTML =="+" || elementBtn.innerHTML =="-"  || elementBtn.innerHTML == 'C' || elementBtn.innerHTML =='.' 
                        || elementBtn.innerHTML =='1/x' || elementBtn.innerHTML == "DEL" || elementBtn.innerHTML=="="){
                        zoneAffichage.innerHTML ='0'
                    }else {
                        zoneAffichage.innerHTML ="";
                        zoneAffichage.innerHTML =elementBtn.innerHTML;
                    }
            }else if(elementBtn.innerHTML =="DEL"){
                    //Supprimer le dernier caractere de la zone d'affichage
                    if(zoneAffichage.innerHTML.length == 1){
                        zoneAffichage.innerHTML = 0
                    }else{
                        zoneAffichage.innerHTML = zoneAffichage.innerHTML.substring(0,zoneAffichage.innerHTML.length-1)
                    }
            }else if(elementBtn.innerHTML == "C"){
                 //effacer le contenu de la zone lorque un utilisateur clique sur btn Clear
                    zoneAffichage.innerHTML = 0
            }else if(elementBtn.innerHTML == "."){
                        //testons si le contenu  de la zone contient déjà de .
                        dernierCar =zoneAffichage.innerHTML.substring(zoneAffichage.innerHTML.length -1) 
                        if(zoneAffichage.innerHTML.indexOf(".") == -1 && dernierCar !="%" && dernierCar !="+" && 
                             dernierCar !="." && dernierCar !="-" && dernierCar !="/" && dernierCar !="1/x" ){
                            zoneAffichage.innerHTML +=elementBtn.innerHTML

                        }else if ( zoneAffichage.innerHTML.indexOf(".") != -1  && dernierCar !="%" && dernierCar !="+" && 
                        dernierCar !="." && dernierCar !="-" && dernierCar !="/" && dernierCar !="1/x" ){
                            //Pour eviter cela x.y op z.
                            if( zoneAffichage.innerHTML.indexOf('+') != -1 ||  zoneAffichage.innerHTML.indexOf('-') != -1 ||
                                zoneAffichage.innerHTML.indexOf('%') != -1 ||  zoneAffichage.innerHTML.indexOf('/') != -1 ||
                                zoneAffichage.innerHTML.indexOf('x') != -1){
                                    zoneAffichage.innerHTML += elementBtn.innerHTML
                                }
                        }
            }else if(elementBtn.innerHTML =="%" || elementBtn.innerHTML =="/" || elementBtn.innerHTML =="x" 
                            || elementBtn.innerHTML =="+" || elementBtn.innerHTML =="-" || elementBtn.innerHTML =="1/x"){
                            // testons si le dernier est different de +,-,x,%,/,.
                        dernierCar =zoneAffichage.innerHTML.substring(zoneAffichage.innerHTML.length -1)
                        let  operateur =["+","-","/","1/x","%"];

                        if(dernierCar !="."){
                            if (dernierCar !="+" && dernierCar !="-" && dernierCar !="x" && dernierCar !="%" && dernierCar !="/"){
                               tabStr = zoneAffichage.innerHTML.split("")
                            let i =0;
                            let op =""

                               while( i< tabStr.length){
                                 if(operateur.indexOf(tabStr[i]) != -1){
                                    op = tabStr[i]
                                    if(elementBtn.innerHTML != "1/x"){
                                        zoneAffichageApresRs = zoneAffichage.innerHTML;
                                        contenuHistorique.innerHTML = "<p class="+ElementHistorique+">"+zoneAffichageApresRs +"="+traitementAvantResultat()+"</p>" +contenuHistorique.innerHTML;
                                        zoneAffichage.innerHTML = traitementAvantResultat() + elementBtn.innerHTML;
                                        break;
                                    }else{
                                        zoneAffichageApresRs = zoneAffichage.innerHTML;
                                        zoneAffichage.innerHTML = (1/ traitementAvantResultat()).toFixed(6);
                                        contenuHistorique.innerHTML ="<p class="+ElementHistorique+">"+ zoneAffichageApresRs + elementBtn.innerHTML +"="+ zoneAffichage.innerHTML+"</p>" +contenuHistorique;
                                    }
                                 }
                                 i++
                               }
                               if( op == "" && elementBtn.innerHTML !="1/x"){
                                    zoneAffichage.innerHTML += elementBtn.innerHTML
                               }else if(op == "" && elementBtn.innerHTML == "1/x"){
                                    zoneAffichageApresRs = zoneAffichage.innerHTML;
                                    zoneAffichage.innerHTML = (1/ parseFloat(zoneAffichage.innerHTML)).toFixed(6);
                                    contenuHistorique.innerHTML = "<p class="+ElementHistorique+"> 1/"+zoneAffichageApresRs+"="+zoneAffichage.innerHTML+"</p>"+contenuHistorique.innerHTML;
                               }
                            }else if (dernierCar =="+" || dernierCar =="-" || dernierCar =="x" || dernierCar =="%" || dernierCar =="/"){
                                zoneAffichage.innerHTML = zoneAffichage.innerHTML.substring(0,zoneAffichage.innerHTML.length-1) + elementBtn.innerHTML
                            }
                        }
            }else if(elementBtn.innerHTML == '='){
                contenuHistorique.innerHTML ="<p class="+ElementHistorique+">"+ zoneAffichage.innerHTML +"="+ traitementAvantResultat()+"</p>"+contenuHistorique.innerHTML;
                traitementAvantResultat()
            }else{
                zoneAffichage.innerHTML += elementBtn.innerHTML
            }
        })
    })  

    function traitementAvantResultat(){
       let indexOfOp = "";
                            if(zoneAffichage.innerHTML.indexOf('+') != -1) indexOfOp =zoneAffichage.innerHTML.lastIndexOf('+');
                            if(zoneAffichage.innerHTML.indexOf('-') != -1) indexOfOp =zoneAffichage.innerHTML.lastIndexOf('-');
                            if(zoneAffichage.innerHTML.indexOf('/') != -1) indexOfOp =zoneAffichage.innerHTML.lastIndexOf('/');
                            if(zoneAffichage.innerHTML.indexOf('%') != -1) indexOfOp =zoneAffichage.innerHTML.lastIndexOf('%');
                            if(zoneAffichage.innerHTML.indexOf('x') != -1) indexOfOp =zoneAffichage.innerHTML.lastIndexOf('x');

                            if(indexOfOp !=""){
                                let premierOperande = 0 ; let deuxiemeOperande = 0

                                premierOperande = parseFloat(zoneAffichage.innerHTML.substring(0,indexOfOp));
                                deuxiemeOperande =parseFloat(zoneAffichage.innerHTML.substring(indexOfOp+1,zoneAffichage.innerHTML.length))

                                if(isNaN(premierOperande) || isNaN(deuxiemeOperande)){
                                    console.log("NaN");
                                }else{
                                    switch (zoneAffichage.innerHTML[indexOfOp]) {
                                        case"+":
                                            zoneAffichage.innerHTML = premierOperande + deuxiemeOperande;
                                            break;
                                        case "-":
                                            zoneAffichage.innerHTML = premierOperande - deuxiemeOperande;
                                            break;
                                        case "%":
                                            zoneAffichage.innerHTML = premierOperande % deuxiemeOperande;
                                            break;
                                        case "/":
                                            zoneAffichage.innerHTML = premierOperande / deuxiemeOperande;
                                            break;
                                        case "x":
                                            zoneAffichage.innerHTML = premierOperande * deuxiemeOperande;
                                            break;
                                    }
                                }
                            }  
             return zoneAffichage.innerHTML 
    } 

}