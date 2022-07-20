window.addEventListener("load",function(){
    console.log("codigo enlazado")
    let form=document.querySelector(".form-login");
 
    form.addEventListener("submit",function(e){
        let errors=[];
    
        let email=document.querySelector("#email");
        let password=document.querySelector("#password");   
        
        
        //validación email
        // Regex simple
        let reg1 = /\S+@\S+\.\S+/;
        console.log(reg1.test(email.value)); 

        // Regex complejo
        let reg2 = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        console.log(reg2.test(email.value)); 

        let regEmail = /\S+@\S+\.\S+/;
        if (!regEmail.test(email.value)) {
            errors.push("Debe ingresar un email válido");
            email.classList.add("is-invalid");
        } else {
            email.classList.add("is-valid");
            email.classList.remove("is-invalid");
            form.password.focus();
        };
 
        // Valición password
        if (password.value==""){
            errors.push(" El campo Contraseña no puede estar vacío");
            password.classList.remove("is-valid")
            password.classList.add("is-invalid");

        }else if(password.value.length<8){
            errors.push("El campo Contraseña debe tener mínimo 8 caracteres");
            password.classList.add("is-invalid")
         
        }else{
            password.classList.add("is-valid");
            password.classList.remove("is-invalid");
            form.password.focus(); 

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
