
window.addEventListener("load",function(){
    console.log("codigo enlazado")
    let form=document.querySelector(".form-producto");
   /*  form.name.focus() */
    form.addEventListener("submit",function(e){
        let errors=[];
    
        let guarderia=document.querySelector("#nombreGuarderia");
   /*      let descripcion=document.querySelector("#descripcion");  */  
        
      
        if (guarderia.value==""){
            errors.push(" El campo Nombre de la Guarderia no puede estar vacío");
            guarderia.classList.remove("is-valid")
            guarderia.classList.add("is-invalid");

        }else if(guarderia.value.length<5){
            errors.push("El campo Nombre de la Guarderia debe tener mínimo 5 caracteres");
            guarderia.classList.add("is-invalid")
         
        }else{
            guarderia.classList.add("is-valid");
            guarderia.classList.remove("is-invalid");
            form.descripcion.focus(); 

        }  
        if (descripcion.value==""){
            errors.push(" El campo Caracteristicas no puede estar vacío");
            descripcion.classList.remove("is-valid")
            descripcion.classList.add("is-invalid");

        }else if(descripcion.value.length<20){
            errors.push("El campo Caracteristicas debe tener mínimo 20 caracteres");
           descripcion.classList.add("is-invalid")
         
        }else{
            descripcion.classList.add("is-valid");
            descripcion.classList.remove("is-invalid");
            form.descripcion.focus(); 

        }  

// Validación de errores

;
        if (errors.length>0){
            e.preventDefault()
            let ulErrors=document.querySelector(".errores");
            ulErrors.classList.add("alert-warning");
            ulErrors.innerHTML="";
            for (let i=0; i <errors.length; i++){
                ulErrors.innerHTML += "<li>"+ errors[i] + "</li>";

            };
        }else{
            alert("Validación exitosa");
            form.submit()
        }



    })

})
