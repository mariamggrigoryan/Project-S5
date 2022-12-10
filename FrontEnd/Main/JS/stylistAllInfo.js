export async function getStylist(id) {
	const response = await fetch(`http://localhost:7070/stylist?id=${id}`);
	var data = await response.json();

	console.log(77777, data);
	// window.location = "../Html/stylistAllInfo.html";

  const replace = document.getElementById("replace");
	replace.innerHTML += `<div class="headerBottom">
  <div>
    <ul class="menu">
      <li><a href="stylists.html"> Stylists</a></li>
    </ul>
  </div>
</div>
</div>
<div class="sidenav">
<div class="profile" id="profile">
  <div class="name" id="name"></div>
  <div class="job" id="job"></div>
</div>

<div class="sidenav-url">
  <div class="url">
    <a class="active">Profile</a>
  </div>
</div>
</div>
<div class="main">
<h2>IDENTITY</h2>
<div class="card">
  <div class="card-body">
    <i class="fa fa-pen fa-xs edit"></i>
    <table>
      <tbody>
        <tr id="fname">
          <td class="bolding">First Name</td>
        </tr>
        <tr id="lname">
          <td class="bolding">Last Name</td>
        </tr>
        <tr id="email">
          <td class="bolding">Email</td>
        </tr>
        <tr id="gender">
          <td class="bolding">Gender</td>
        </tr>
        <tr id="aboutme">
          <td class="bolding">About Me</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div class="certificate">
  <h2>CERTIFICATE</h2>
  <div class="certificateBody" id="certificateBody"></div>
</div>
</div>
<div class="portfolio">
<h2>PORTFOLIO</h2>
</div>
<div class="carousel">
<div class="slides" id="slides">
  <div class="slides-item"></div>
</div>
<div class="carousel__nav">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
</div>

<div class="footer">
<div class="footer1">
  <p class="firstFooter">STAY CONNECTED</p>
  <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
  <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
  <a href="#"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a>
  <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
</div>
<div class="footer3" id="2">
  <p class="firstFooter">NEED ASSISTANCE?</p>
  <p><a href="tel:123-456-7890">123-456-7890</a></p>
  <p><a href="mailto:info@mysite.com">info@mysite.com</a></p>
</div>
</div>`;

console.log(123)


	//sidenav
	// profile pic
	var x = data.id;
	var profilePic = document.createElement("img");
	document.getElementById("profile").prepend(profilePic);
	profilePic.src = `${data.avatarUrl}`;

	// Full Name
	var fullName = document.getElementById("name");
	var Name = `${data.name}`;
	var surname = `${data.surname}`;

	const full = Name + " " + surname;
	fullName.innerHTML = full;

	// Job Description
	var job = document.getElementById("job");
	const jobDesc = "Fashion Stylist";
	job.innerHTML = jobDesc;

	// main Identity

	// first name
	var fname = document.getElementById("fname");
	var td = document.createElement("td");
	const firstName = `${data.name}`;
	td.innerHTML = firstName;
	fname.appendChild(td);

	// Last name
	var lname = document.getElementById("lname");
	var td = document.createElement("td");
	const lastName = `${data.surname}`;
	td.innerHTML = lastName;
	lname.appendChild(td);

	// Email
	var mail = document.getElementById("email");
	var td = document.createElement("td");
	const email = `${data.email}`;
	td.innerHTML = email;
	mail.appendChild(td);

	// Gender
	var gend = document.getElementById("gender");
	var td = document.createElement("td");
	const gender = `${data.gender}`;
	td.innerHTML = gender;
	gend.appendChild(td);

	// aboutMe
	var about = document.getElementById("aboutme");
	var td = document.createElement("td");
	const aboutme = `${data.aboutMe}`;
	td.innerHTML = aboutme;
	about.appendChild(td);

	// Certificate

	// certificate img
	var certificate = document.createElement("img");
	certificate.src = `${data.certificate}`;
	document.getElementById("certificateBody").appendChild(certificate);

	// CSS for sidenav
	profilePic.style.width = "125px";
	profilePic.style.height = "125px";
	profilePic.style.borderRadius = "50%";
	profilePic.style.boxShadow = "0px 0px 5px 2px #634F40";
	// CSS for main
	td.style.padding = "3px";
	td.style.boxShadow = "1px 1px 2px 1px rgb(117, 86, 86)";
	td.style.borderRadius = "10px";

	//Carousel
	for (i = 0; i <= data.portfolios.length; i++) {
		//HTML Slide Item
		var slideItem = document.createElement("div");
		slideItem.classList.add = "slides-item";
		var portfolioImg = document.createElement("img");
		portfolioImg.src = `${data[i].portfolios}`;
		slideItem.appendChild(portfolioImg);
		document.getElementById("slides").appendChild(slideItem);

		// HTML Slider nav
		var sliderNav = document.createElement("a");
		sliderNav.classList.add = "slider-nav";
		const newLocal = "$i";
		sliderNav.innerHTML = newLocal;

		sliderNav.href = slideItem;

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
}
