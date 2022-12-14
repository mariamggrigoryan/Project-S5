export default async function getStylistCertificate(id) {
	const response = await fetch(`http://localhost:7070/stylist?id=${id}`);
	var data = await response.json();
	console.log("data1", data);
	const replace = document.getElementById("replace");
	replace.innerHTML += `
    <div class="headerBottom">
        <div>
            <ul class="menu"> 
                <li>Delete Stylist</li>
            </ul>
        </div>
    </div>
    </div>
    <div id="main">
    <div id="certificateBody">
    </div>
    <div id="delete"><button onclick="deleteFunct(${id})"> <i class="fa fa-trash fa-lg" aria-hidden="true">  Delete Stylist</i></button></div>
    </div>`;
	// Certificate

	// certificate img
	document.getElementById(
		"certificateBody"
	).innerHTML += `<img src="${data.certificate}" alt="certificate img" id = "certificate" >
    `;
	document.getElementById("certificate").width = "inherit";
	document.getElementById("certificate").height = "inherit";
	document.getElementById("certificate").objectFit = "contain";
}

window.logout = () => {
	localStorage.removeItem("token");
	window.location.href = "../../Main/Html/login.html";
};

const deleteUser = async (id) => {
	const URL = `http://localhost:7070/delete?id=${id}`;
	const response = await fetch(URL, {
		method: "DELETE",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"X-token": localStorage.token,
		},
	});
	var data = await response.json();
	console.log("data", data);
};

window.deleteFunct = (id) => {
	if (confirm("Are you sure you want to delete?") == true) {
		deleteUser(id);
		window.location.href = "adminMain.html";
	}
};
