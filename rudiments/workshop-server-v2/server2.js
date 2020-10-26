const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 8080);

const workshop_model2 = require('./workshop_model2');

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/create-user', (req, res) => {
    workshop_model2.createUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
  
  });
  
  app.delete('/delete-user', (req, res) =>{
    workshop_model2.deleteUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
  });
  
  
  app.get('/list-users', (req, res) => {
  
    if(req.query.type == 'full'){
    workshop_model2.verboseUsers()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
  }
    if(req.query.type == 'summary'){
      workshop_model2.sumUsers(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });
    
     }
  });
  
  app.post('/add-workshop', (req, res) => {
    workshop_model2.addWorkshop(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
  
  });
  
  app.post('/enroll', (req, res) => {
    workshop_model2.enroll(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
  });
  
  app.get('/list-workshops',  (req, res) => {
    workshop_model2.listWorkshops()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
  });
  
  app.get('/attendees', (req, res) => {
    workshop_model2.getEnrollments(req.query.title,req.query.date,req.query.location)
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
  
  
  