const username = document.getElementById("username");
const password = document.getElementById("password");



const singinbtn =document.getElementById("singinbtn");
singinbtn.addEventListener('click',function(){
    const newUserName = username.value;
const newPassword = password.value;
    if(newPassword==='admin123' && newUserName ==="admin"){
       window.location.href='home.html';
    }else{
        alert('Wrong Trying');
    }
})