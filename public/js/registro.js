window.addEventListener("load",function(){
    console.log("codigo enlazado")
    let form=document.querySelector(".form-registro");
    form.name.focus()
    form.addEventListener("submit",function(e){
        let errors=[];

        let firstname=document.querySelector("#first_name");
        let lastname=document.querySelector("#last_name"); 
        //let date=document.querySelector("#date");
        //let adress=document.querySelector("#adress");
        let email=document.querySelector("#email");
        //let image=document.querySelector("#imagenUsuario");//
        let password=document.querySelector("#elige_contraseña");   
      
        if (firstname.value==""){
            errors.push("El campo Nombre no puede estar vacío");
            firstname.classList.remove("is-valid")
            firstname.classList.add("is-invalid");
            

        }else if(firstname.value.length<2){
            errors.push("El campo Nombre debe tener mínimo 2 caracteres");
            firstname.classList.add("is-invalid")
             

        }else{
            firstname.classList.add("is-valid");
            firstname.classList.remove("is-invalid");
            form.lastname.focus();

        }
        if (lastname.value==""){
            errors.push(" El campo Apellido no puede estar vacío");
            lastname.classList.remove("is-valid")
            lastname.classList.add("is-invalid");

        }else if(lastname.value.length<2){
            errors.push("El campo Apellido debe tener mínimo 2 caracteres");
            lastname.classList.add("is-invalid")
                 

        }else{
            lastname.classList.add("is-valid");
            lastname.classList.remove("is-invalid");
            form.email.focus();

        }  
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