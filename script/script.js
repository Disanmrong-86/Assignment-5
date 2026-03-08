document.getElementById('sign-btn')
.addEventListener('click',()=>{
    const userInput = document.getElementById('user-input')
    const userValue = userInput.value
    console.log(userValue);
    const passwordInput = document.getElementById("password-input")
    const passwordValue = passwordInput.value
    console.log(passwordValue)
    if(userValue == 'admin' && passwordValue == 'admin123'){
        alert`sign in succesfull`
         window.location.assign("/index.html")
        return;
    }
    else{
        alert`you information is incoreect 
        plz check again`
    }
});

