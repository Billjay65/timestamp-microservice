// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Unix timestamp date api using route parameter
// The ? makes the :date parameter optional.
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;
  let utcDateStr;
  
  // If no date param, return current time
  if (!dateParam) {
    date = new Date();

    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }
  // Check if dateParam is a valid integer
  else if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
    // Convert to date string
    date = new Date(parseInt(dateParam));
    utcDateStr = date.toUTCString();

    // Check if date is invalid and return error
    if (isNaN(date.getTime())) {
      return res.json({
        error: "Invalid Date"
      });
    }
    
    // Return unix integer and not date parameter
    return res.json({
      unix: parseInt(dateParam), 
      utc: utcDateStr
    });
  }
  // Otherwise treat it as a date string
  else {
    date = new Date(dateParam);
  }

  // Check if date is invalid and return error
  if (isNaN(date.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  const unixTimestampMillisecs = new Date(dateParam).getTime();
  utcDateStr = new Date(dateParam).toUTCString();

  res.json({
    unix: unixTimestampMillisecs,
    utc: utcDateStr
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
