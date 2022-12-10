
 for(let i = 0; i < 10; i++){
    var container = document.createElement("div");
   container.classList.add("container");
   var getAll = document.createElement("a");
   getAll.href = "stylistDelete.html";
   container.appendChild(getAll);
   var  mainCard = document.createElement("div");
   mainCard.classList.add("main-card");
   getAll.appendChild(mainCard);
   var  cards = document.createElement("div");
   mainCard.classList.add("cards");
   mainCard.appendChild(cards);
   var  card = document.createElement("div");
   mainCard.classList.add("card");
   cards.appendChild(card);
   var  content  = document.createElement("div");
   mainCard.classList.add("content");
   card.appendChild(content);
   var img = document.createElement("div");
   img.classList.add("img");
   content.appendChild(img);
   // var img = document.getElementById("image");
   const profile = `<img src='../../Pics/main_girl.png'  style="width: 100%; height: 100%; border: 3px solid #ffff; border-radius: 50%; object-fit: cover;">`;
   img.innerHTML = profile;
   var details = document.createElement("div");
   details.classList.add("details");
   content.appendChild(details);
   var fname = document.createElement("div");
   fname.classList.add("name");
   // var fname = document.getElementById("name");
   const fullName = "Andrew Neil";
   fname.innerHTML = fullName;
   details.appendChild(fname);
 
 var job = document.createElement("div");
   job.classList.add("job");
   // var job = document.getElementById("job");
   const profession = "Web Designer";
   job.innerHTML = profession;
   details.appendChild(job);
   var mediaIcon = document.createElement("div");
   mediaIcon.classList.add("media-icons");
   content.appendChild(mediaIcon);
   // var mediaIcon = document.getElementById("media-icons");
 
   const envelope = `<i class="fa fa-envelope-o" aria-hidden="true"> mariam@gmil.com</i>`;
   mediaIcon.innerHTML = envelope;
 
   var main = document.getElementById("main");
  main.appendChild(container);
 
  // Css for stylist list 
  // container
   container.style.maxWidth = "300px";
   container.style.width = "100%";
   container.style.overflow = "hidden";
   container.style.padding = "80px 0";
 //   // main-card
   mainCard.style.display = "flex";
   // mainCard.style.justifyContent = "space-evenly";
   mainCard.style.width = "175%";
   mainCard.style.transition = "1s";
 //   // cards
   // cards.style.width = "calc(100% / 2 - 10px)";
   card.style.display = "flex";
   card.style.flexWrap = "wrap";
   card.style.margin = "0 20px";
   card.style.justifyContent = "space-between";
 //   // card
   // card.style.width = "calc(100% / 3 - 10px)";
   card.style.background = "#fff";
   card.style.borderRadius = "12px";
   card.style.padding = "30px";
   card.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.25)";
   card.style.transition = "all 0.4s ease";
 // // content
   content.style.width = "100%";
   content.style.display = "flex";
   content.style.flexDirection = "column";
   content.style.justifyContent = "center";
   content.style.alignItems ="center";
   content.style.textAlign = "center";
 //   // img
   img.style.height = "130px";
   img.style.width = "130px";
   img.style.borderRadius = "50%";
   img.style.padding = "3px";
   img.style.marginBottom = "14px";
 //   // full name
   fname.style.fontSize = "20px";
   fname.style.fontWeight = "500";
   fname.style.color = "#634F40";
 //   // profession
   job.style.fontSize = "18px";
   job.style.color = "#746049";
 //   // envelope
   mediaIcon.style.margin = "10px";
   mediaIcon.style.display = "flex";
   mediaIcon.style.color = "#B3A482FF";
 
  }
   
 // HTML creating divs with classes
          
   // }
   function logout() {
    window.location.href = "../../Main/Html/login.html";
    localStorage.clear();
  }
  // Profile name 
 const profileIcon = `<i class="fa fa-user-circle" aria-hidden="true"></i>`;
 const lastName = "Nails";
 const firstName = "Andrew";

 document.getElementById("fullname").innerHTML = profileIcon + " " + lastName + " " + firstName;