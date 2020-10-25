const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 8080);

const workshop_model = require('./workshop_model');

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/hello', (req, res) => {
  // console log the request query json object
  console.log(req.query);
  // console log the person parameter
  console.log(req.query.person);
  // now send a response back to the client
  res.json({response: `Hello, ${req.query.person}`});
});

//get all workshops
app.get('/api',  (req, res) => {

  if(!req.query.workshop){
  workshop_model.getWorkshops()
    .then( response => {
      res.status(200).send({workshops: response});
    })
    .catch( error => {
      res.status(500).send(error);
    });
  }else{//if the workshop key is not null then do this
  workshop_model.getAttendees(req.query.workshop)
    .then( response => {
    res.status(200).send(response);
  })
  .catch( error => {
    res.status(500).send(error);
  });
}
  
});

//add attendees
app.post('/api', (req, res) => {
  workshop_model.addAttendee(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.post('/create-user', (req, res) => {
  workshop_model.createUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });

});

app.delete('/delete-user', (req, res) =>{
  workshop_model.deleteUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});


app.get('/list-users', (req, res) => {

  if(req.query.type == 'full'){
  workshop_model.verboseUsers()
  .then(response => {
    console.log("WTFfff");
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
}
  if(req.query.type == 'summary'){
    workshop_model.sumUsers(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
  
   }
});

app.post('/add-workshop', (req, res) => {
  workshop_model.addWorkshop(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });

});

app.post('/enroll', (req, res) => {
  workshop_model.enroll(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.get('/list-workshops',  (req, res) => {
  workshop_model.listWorkshops()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.get('/attendees', (req, res) => {
  workshop_model.getEnrollments(req.query.title,req.query.date,req.query.location)
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


