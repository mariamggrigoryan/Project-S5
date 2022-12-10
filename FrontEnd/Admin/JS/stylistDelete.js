// Html for certificate img
var certificate = document.createElement("img");
certificate.src ="https://img.freepik.com/free-vector/doodle-elegant-fashion-certificates_23-2148891206.jpg?w=2000";
document.getElementById("certificate").appendChild(certificate);
// CSS
certificate.style.width  = "inherit";
certificate.style.height = "inherit";
certificate.style.objectFit = "contain";


function logout() {
    window.location.href = "../../Main/Html/login.html";
  }

function deleteFunct(){
    if(confirm("Are you sure you want to delete?") == true){
        window.location.href = "adminMain.html";
    }
}

