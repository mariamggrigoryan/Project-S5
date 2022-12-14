import { getStylist } from "./stylistAllInfo.js";
const URL = "http://localhost:7070/stylists";

export async function getStylists() {
	const response = await fetch(URL);
	var data = await response.json();

	const replace = document.getElementById("temp");

	for (let i = 0; i < data.length; i++) {
		if (data[i].id != 8) {
			var container = document.createElement("div");
			container.classList.add("container");
			var getAll = document.createElement("a");
			container.appendChild(getAll);
			var mainCard = document.createElement("div");
			mainCard.classList.add("main-card");
			getAll.appendChild(mainCard);
			var cards = document.createElement("div");
			mainCard.classList.add("cards");
			mainCard.appendChild(cards);
			var card = document.createElement("div");
			mainCard.classList.add("card");
			card.onclick = () => {
				replace.remove();
				getStylist(data[i].id);
			};

			cards.appendChild(card);
			var content = document.createElement("div");
			mainCard.classList.add("content");
			card.appendChild(content);
			var img = document.createElement("div");

			if (`${data[i].avatarUrl}` == "null") {
				img.innerHTML += `<img src='../../Pics/avatarurl.jpg'  style="width: 100%; height: 100%; border: 3px solid #ffff; border-radius: 50%; object-fit: cover;">`;
			} else {
				img.innerHTML += `<img src='${data[i].avatarUrl}'  style="width: 100%; height: 100%; border: 3px solid #ffff; border-radius: 50%; object-fit: cover;">`;
			}
			content.appendChild(img);

			var details = document.createElement("div");
			details.classList.add("details");
			content.appendChild(details);
			var fname = document.createElement("div");
			fname.classList.add("name");
			const first_name = `${data[i].name}`;
			const last_name = `${data[i].surname}`;
			fname.innerHTML = first_name + " " + last_name;
			details.appendChild(fname);

			var job = document.createElement("div");
			job.classList.add("job");
			const profession = "Fashion Stylist";
			job.innerHTML = profession;
			details.appendChild(job);
			var mediaIcon = document.createElement("div");
			mediaIcon.classList.add("media-icons");
			content.appendChild(mediaIcon);

			const envelope = `<i class="fa fa-envelope-o" aria-hidden="true"> ${data[i].email}</i>`;
			mediaIcon.innerHTML = envelope;

			var main = document.getElementById("main");
			main.appendChild(container);

			// Css for stylist list
			// container
			container.style.maxWidth = "300px";
			container.style.width = "100%";
			container.style.overflow = "hidden";
			container.style.padding = "80px 0";
			// main-card
			mainCard.style.display = "flex";
			mainCard.style.width = "175%";
			mainCard.style.transition = "1s";
			// cards
			card.style.display = "flex";
			card.style.flexWrap = "wrap";
			card.style.margin = "0 20px";
			card.style.justifyContent = "space-between";
			//   // card
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
			content.style.alignItems = "center";
			content.style.textAlign = "center";
			//   // img
			img.style.height = "130px";
			img.style.width = "130px";
			img.style.borderRadius = "50%";
			img.style.padding = "3px";
			img.style.marginBottom = "14px";
			// full name
			fname.style.fontSize = "20px";
			fname.style.fontWeight = "500";
			fname.style.color = "#634F40";
			// profession
			job.style.fontSize = "18px";
			job.style.color = "#746049";
			// envelope
			mediaIcon.style.margin = "10px";
			mediaIcon.style.display = "flex";
			mediaIcon.style.color = "#B3A482FF";
		}
	}
}

getStylists();
