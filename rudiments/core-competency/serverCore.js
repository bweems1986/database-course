const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 8080);

const workshop_model = require('./workshop_model');

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({extended: true}));




app.post('/restaurant', (req, res) => {
  workshop_model.addRestaurant(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });

});

app.post('/review', (req, res) => {
  workshop_model.addReview(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });

});

app.get('/reviews', (req, res) => {
  workshop_model.getReview(req.query.name, req.query.zip)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });

});

app.get('/find', (req, res) => {
  workshop_model.getType(req.query.type)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });

});

app.get('/restaurant', (req, res) => {
  workshop_model.getType(req.query.name, req.query.zip)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });

});





app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); 
});


