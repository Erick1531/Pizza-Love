document.addEventListener('DOMContentLoaded', () => {

    fetch("../Nav/nav.html")
        .then(Response => Response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;
            
            const script = document.createElement('script');
            script.src = '../Nav/nav.js';
            document.body.appendChild(script);
        })
        .catch(err => console.log(err));
});