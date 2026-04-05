const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve HTML, JS, images

// REST API endpoint that returns stadium data
app.get('/api/stadiums', (req, res) => {
    const stadiums = [
        { title: "Melbourne Cricket Ground", city: "Melbourne", image: "images/mcg.jpg", link: "About MCG", description: "Australia’s largest stadium and home of cricket and AFL." },
        { title: "Optus Stadium", city: "Perth", image: "images/optus.jpg", link: "About Optus Stadium", description: "A modern multi-purpose stadium in Western Australia." },
        { title: "Accor Stadium", city: "Sydney", image: "images/accor.jpg", link: "About Accor Stadium", description: "Major venue for rugby and events." },
        { title: "Marvel Stadium", city: "Melbourne", image: "images/marvel.jpg", link: "About Marvel Stadium", description: "Indoor stadium with a retractable roof." },
        { title: "The Gabba", city: "Brisbane", image: "images/gabba.jpg", link: "About The Gabba", description: "Historic cricket ground in Queensland." }
    ];
    res.json(stadiums); // Send the stadiums as a JSON response
});

app.listen(port, () => {
    console.log("App listening to: " + port)
});