const URL1 = "http://localhost:7070/stylist";
async function loadUser() {
	fetch(URL1, {
		method: "GET",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"X-token": localStorage.token,
		},
	})
		.then((response) => response.json())
		.then(
			(data) => {
				if (data.error) {
					console.log("Error from getting User");
				}
				console.log("data", data);

				var profilePic = document.createElement("div");
				document.getElementById("profile").prepend(profilePic);

				console.log("data.avatarUrl", data.avatarUrl);
				if (`${data.avatarUrl}` === "null") {
					profilePic.innerHTML += `  
                            <label for="fileAvatar"> 
                            <i class="fa fa-2x  fa-camera"></i>
                            <input type="file" id="fileAvatar" name="file" class="fileAvatar" onchange="handleFileInputAvatar()" />
                            </label>
                            `;
				} else {
					profilePic.innerHTML += `<img src="${data.avatarUrl}"  id="prof" >`;
				}

				// Full Name
				var fullName = document.getElementById("name");
				const full = `${data.name}`;
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

				// Profile name
				const profileIcon = `<i class="fa fa-user-circle" aria-hidden="true"></i>`;

				document.getElementById("fullname").innerHTML =
					profileIcon + " " + firstName;

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
				var tdabout = document.createElement("td");
				var textarea = document.createElement("textarea");
				textarea.id = "textarea";
				textarea.placeholder = "Tell about yourself...";
				var about = document.getElementById("aboutme");
				var insertButton = document.createElement("button");
				insertButton.type = "submit";
				insertButton.innerHTML = "Insert";
				const aboutme = `${data.aboutMe}`;
				insertButton.addEventListener("click", () => addAboutMe());

				if (aboutme === "null" || aboutme == "") {
					about.appendChild(textarea);
					about.appendChild(insertButton);
				} else {
					tdabout.innerHTML = aboutme;
					about.appendChild(tdabout);
				}

				// Certificate

				// certificate img
				var certificate = document.createElement("img");
				certificate.src = `${data.certificate}`;
				document.getElementById("certificateBody").appendChild(certificate);

				// Portfolio
				for (let i = 0; i < data.portfolios.length; i++) {
					//HTML Slide Item
					var slideItem = document.createElement("div");
					slideItem.classList.add = "slides-item";
					var portfolioImg = document.createElement("img");
					portfolioImg.src = `${data.portfolios[i].imgUrl}`;
					slideItem.appendChild(portfolioImg);
					document.getElementById("slides").appendChild(slideItem);

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

				// CSS for sidenav

				profilePic.style.height = "125px";
				profilePic.style.display = "flex";

				profilePic.style.justifyContent = "center";
				profilePic.style.alignItems = "center";

				document.getElementById("prof").style.width = "125ox";
				document.getElementById("prof").style.height = "inherit";
				document.getElementById("prof").style.borderRadius = "50%";

				document.getElementById("prof").style.boxShadow =
					"0px 0px 5px 2px #634F40";

				// CSS for main
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

				//   Add portfolio
				let input = document.getElementById("inputTagPortfolio");
				const submit = document.getElementById("submit");
				// let imageName = document.getElementById("imageName");

				input.addEventListener("change", () => {
					let inputImage = document.querySelector("input[type=file]").files[0];
					imageName.innerText = inputImage.name;
				});
			}
			//sidenav
			// profile pic
		);
}
loadUser();

function logout() {
	localStorage.removeItem("token");
	window.location.href = "../../Main/Html/login.html";
}

async function addPortfolio(selectedImage) {
	const url = `http://localhost:7070/portfolio`;
	const formData = new FormData();
	formData.append("img", selectedImage);

	const response = await fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			type: "formData",
			"X-token": localStorage.token,
		},
		body: formData,
	});

	location.reload();
}

async function addAvatar(selectedImage) {
	const url = `http://localhost:7070/avatar`;
	const formData = new FormData();
	formData.append("avatar", selectedImage);

	const response = await fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			type: "formData",
			"X-token": localStorage.token,
		},
		body: formData,
	});

	location.reload();
}

async function addAboutMe() {
	const form = {
		text: document.querySelector("#textarea"),
	};
	const url = `http://localhost:7070/aboutMe`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"X-token": localStorage.token,
		},
		body: JSON.stringify({
			text: form.text.value,
		}),
	});
	location.reload();
}

window.handleFileInputPortfolio = () => {
	let inputImage = document.querySelector(".filePortfolio").files[0];
	addPortfolio(inputImage);
};

window.handleFileInputAvatar = () => {
	let inputImage = document.querySelector(".fileAvatar").files[0];
	addAvatar(inputImage);
};
