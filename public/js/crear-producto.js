window.addEventListener("load",function(){
    console.log("codigo enlazado")
    let form=document.querySelector(".formCrear");
    form.addEventListener("submit",function(e){
        let errors=[];
    
        let nombreGuarderia=document.querySelector("#nombreGuarderia");
        let descripcion=document.querySelector("#descripcion");   
        
      
        if (nombreGuarderia.value==""){
            errors.push(" El campo Nombre de la Guarderia no puede estar vacío");
            nombreGuarderia.classList.remove("is-valid")
            nombreGuarderia.classList.add("is-invalid");

        }else if(nombreGuarderia.value.length<5){
            errors.push("El campo Nombre de la Guarderia debe tener mínimo 5 caracteres");
            nombreGuarderia.classList.add("is-invalid")
         
        }else{
            nombreGuarderia.classList.add("is-valid");
            nombreGuarderia.classList.remove("is-invalid");
            form.descripcion.focus(); 

        }  
        if (descripcion.value==""){
            errors.push(" El campo Caracteristicas no puede estar vacío");
            nombreGuarderia.classList.remove("is-valid")
            nombreGuarderia.classList.add("is-invalid");

        }else if(nombreGuarderia.value.length<20){
            errors.push("El campo Caracteristicas debe tener mínimo 20 caracteres");
            nombreGuarderia.classList.add("is-invalid")
         
        }else{
            nombreGuarderia.classList.add("is-valid");
            nombreGuarderia.classList.remove("is-invalid");
            form.descripcion.focus(); 

        }  

// Validación de errores

          
        if (errors.length>0){
            e.preventDefault();
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
