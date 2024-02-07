document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

    // Evénement de clic pour fermer le menu lorsqu'un lien est cliqué
    const navLinksList = document.querySelectorAll('.nav-links li a');
    navLinksList.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('show');
        });
    });
});

function getUserIpToMainPageButton() {
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log("L'adresse IP de l'utilisateur est : " + data.ip);
        })
}

let onFirstImage = true

function modifImageToNewImage() {
    if (onFirstImage === true) {
        onFirstImage = false
        console.log("Génération d'une autre image");
        const imgKy = document.querySelector('#mainImage');
        imgKy.src = "assets/images/image2.jpeg";
    } else {
        console.log("Génération d'une l'ancienne image");
        const imgKy = document.querySelector('#mainImage');
        imgKy.src = "assets/images/image1.jpeg";
        onFirstImage = true
    }
}

// Fonction de filtrage et tri
function filtrerEtTrier(ev) {
    const sortType = ev.target.value;

    // Récupérer les éléments de la liste
    const articlesList = document.querySelectorAll(".article");
    const articlesArray = Array.from(articlesList);

    let newList;

    console.log(sortType)
    if (sortType === "note") {
        newList = articlesArray.sort((a, b) => {
            const noteA = parseInt(a.querySelector(".note").dataset.note);
            const noteB = parseInt(b.querySelector(".note").dataset.note);
            return noteB - noteA;
        });
    } else if (sortType === "prix") {
        newList = articlesArray.sort((a, b) => {
            const prixA = parseInt(a.querySelector(".price").dataset.price);
            const prixB = parseInt(b.querySelector(".price").dataset.price);
            return prixA - prixB;
        });
    } else if (sortType === "alpha") {
        newList = articlesArray.sort((a, b) => {
            const titleA = a.querySelector("a").innerText.toLowerCase();
            const titleB = b.querySelector("a").innerText.toLowerCase();
            return titleA.localeCompare(titleB);
        });
    } else if (sortType === "date") {
        newList = articlesArray.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateA - dateB;
        });
    } else {
        // Si aucun tri spécifique n'est sélectionné, conservez l'ordre initial
        newList = articlesArray;
    }

    newList.forEach((articleEl, i) => {
        articleEl.style.order = i;
    });
}

document.getElementById('filter-button').addEventListener('click', function () {
    // Récupérer la valeur de l'input
    var filterValue = parseInt(document.getElementById('filter').value, 10) || 0;

    // Récupérer tous les éléments avec la classe "article"
    var articles = document.querySelectorAll('.article');

    // Parcourir les articles et les masquer ou afficher en fonction de la note
    articles.forEach(function (article) {
        var note = parseInt(article.getAttribute('data-note'), 10) || 0;

        if (note < filterValue) {
            article.style.display = 'none'; // Masquer l'article
        } else {
            article.style.display = 'block'; // Afficher l'article
        }
    });

    // Rétablir la largeur initiale des articles
    resetArticleWidth();
});

document.getElementById('filter-button-resp').addEventListener('click', function () {
    // Récupérer la valeur de l'input
    var filterValue = parseInt(document.getElementById('filter-resp').value, 10) || 0;

    // Récupérer tous les éléments avec la classe "article"
    var articles = document.querySelectorAll('.article');

    // Parcourir les articles et les masquer ou afficher en fonction de la note
    articles.forEach(function (article) {
        var note = parseInt(article.getAttribute('data-note'), 10) || 0;

        if (note < filterValue) {
            article.style.display = 'none'; // Masquer l'article
        } else {
            article.style.display = 'block'; // Afficher l'article
        }
    });

    // Rétablir la largeur initiale des articles
    resetArticleWidth();
});

// Fonction pour réinitialiser la largeur des articles
function resetArticleWidth() {
    var articles = document.querySelectorAll('.article');

    // Réinitialiser la largeur à la valeur initiale
    articles.forEach(function (article) {
        article.style.width = 'calc(33.33% - 50px)'
    });
}


