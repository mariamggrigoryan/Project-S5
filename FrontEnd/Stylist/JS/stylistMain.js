
 export async function stylistMain(){

  const response = await fetch(`http://localhost:7070/signIn`);
  var data = await response.json();
  console.log(77777,data);


//sidenav 
// profile pic
var profilePic = document.createElement("img");
document.getElementById("profile").prepend(profilePic);
profilePic.src = "../../Pics/avatar.jpg";

// Full Name
var fullName = document.getElementById("name");
const full = "Ani ";
fullName.innerHTML = full;

// Job Description
var job = document.getElementById("job");
const jobDesc = "Fashion Stylist";
job.innerHTML = jobDesc;


// main Identity

// first name
var fname = document.getElementById("fname");
var td = document.createElement("td");
const firstName = "Ani";
td.innerHTML = firstName;
fname.appendChild(td);

// Last name
var lname = document.getElementById("lname");
var td = document.createElement("td");
const lastName = "Henderson";
td.innerHTML = lastName;
lname.appendChild(td);

// Profile name 
const profileIcon = `<i class="fa fa-user-circle" aria-hidden="true"></i>`;
 

document.getElementById("fullname").innerHTML = profileIcon + " " + firstName;

// Email
var mail = document.getElementById("email");
var td = document.createElement("td");
const email = "ani1001@gmail.com";
td.innerHTML = email;
mail.appendChild(td);

// Gender
var gend = document.getElementById("gender");
var td = document.createElement("td");
const gender = "Female";
td.innerHTML = gender;
gend.appendChild(td);

// aboutMe
var tdabout = document.createElement("td");
var textarea = document.createElement("textarea");
textarea.placeholder = "Tell about yourself...";
var about = document.getElementById("aboutme");
var insertButton = document.createElement("button");
insertButton.type = "submit";
insertButton.innerHTML = "Insert";
const aboutme = "Contact with me via email";

if(aboutme == null || aboutme == ""){
    about.appendChild(textarea);
    about.appendChild(insertButton);
}
else{
    tdabout.innerHTML = aboutme;
    about.appendChild(tdabout);
}

// Certificate 

// certificate img
var certificate = document.createElement("img");
certificate.src = "https://img.freepik.com/free-vector/doodle-elegant-fashion-certificates_23-2148891206.jpg?w=2000";
document.getElementById("certificateBody").appendChild(certificate);


// CSS for sidenav
profilePic.style.width = "125px";
profilePic.style.height = "125px";
profilePic.style.borderRadius = "50%";
profilePic.style.boxShadow = "0px 0px 5px 2px #634F40";
// // CSS for main
tdabout.style.padding = "3px";
tdabout.style.boxShadow = "1px 1px 2px 1px rgb(117, 86, 86)";
tdabout.style.borderRadius = "10px";
// CSS Textarea
textarea.style.border = "none";
textarea.style.outline = "none";
textarea.style.resize = "none";
textarea.style.height = "60px";
textarea.style.width = "150px";
textarea.style.padding = "5px";
textarea.style.boxShadow = "1px 1px 2px 1px rgb(117, 86, 86)";
textarea.style.borderRadius = "10px";
// CSS Button
insertButton.style.width = "60px";
insertButton.style.height = "20px";
insertButton.style.marginLeft = "7px";
insertButton.style.color = "#F4EEDAFF";
insertButton.style.backgroundColor = "#634F40";
insertButton.style.borderWidth = "0ch";
insertButton.style.borderRadius = "6px";
insertButton.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.1)";
insertButton.style.transition = "all 0.3s ease 0s";





//Carousel
for(i = 0; i<= 4; i++){
    //HTML Slide Item
    var slideItem = document.createElement("div");
    slideItem.classList.add = "slides-item";
    var portfolioImg = document.createElement("img");
    portfolioImg.src = "../../Pics/Style.png";
    slideItem.appendChild(portfolioImg);
    document.getElementById("slides").appendChild(slideItem);


   ;


    // css for SlideItem
    slideItem.style.alignItems = "center";
    slideItem.style.borderRadius = "10px";
    slideItem.style.display = "flex";
    slideItem.style.flexShrink = 0;
    slideItem.style.fontSize = "20px";
    slideItem.style.height = "300px";
    slideItem.style.justifyContent = "center";
    slideItem.style.margin = "0 1rem";
    slideItem.style.position = "relative";
    slideItem.style.scrollSnapAlign = "start";
    slideItem.style.transform = "scale(1)";
    slideItem.style.transformOrigin = "center center";
    slideItem.style.transition = "transform .5s";
    slideItem.style.width = "100%";
    portfolioImg.style.objectFit = "contain";
    portfolioImg.style.width = "100%";
    portfolioImg.style.height = "100%";


}
  

function logout() {
    window.location.href = "../../Main/Html/login.html";
  }


  

//   Add portfolio
let input = document.getElementById("inputTag");
let imageName = document.getElementById("imageName")

input.addEventListener("change", ()=>{
    let inputImage = document.querySelector("input[type=file]").files[0];

    imageName.innerText = inputImage.name;
})

 }