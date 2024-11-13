fetch('pictures/')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        const images = htmlDoc.getElementsByTagName('a');

        for (let i = 0; i < images.length; i++) {
            if (images[i].href.match(/\.(jpeg|png|gif)$/)) {
                const card = document.createElement('div');
                card.className = 'card';

                const img = document.createElement('img');
                img.className = 'card-img-top';
                img.src = 'pictures/' + images[i].href;

                card.appendChild(img);
                document.getElementById('card-container').appendChild(card);
            }
        }
    });
