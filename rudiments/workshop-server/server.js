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
//TODO: this is currently working to return all rows, but not specific attendees by workshop
//TODO: ADD LOGIC TO CHECK FOR A WORKSHOP IN CLIENT REQUEST BODY, OTHERWISE RETURN ALL WORKSHOPS
app.get('/api',  (req, res) => {

  if(!req.query.workshop){
  workshop_model.getWorkshops()
    .then( response => {
      const output = [];
      for(const workshop of response ){
        output.push(workshop.workshop);
      }
      res.status(200).send({workshops: output});//this needs to be tweaked for correct output
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

//create workshops
//WHOOPSIE is in our model file
app.post('/api', (req, res) => {
  workshop_model.addAttendee(req.body)
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





// pool
//         .query(template, [req.query.q])
//         .then(res => console.log(res.rows[0].q)) // brianc
//         .catch(err => console.error('Error executing query', err.stack))
//   }
//   else{
//     //return all workshops
//     pool
//       .query(template, [req.query.q]) //sql query for data
//       .then(res => response.rows[0].q) //we got a successful response from the DB
//       .catch(res.json({ status: "error" })); //w