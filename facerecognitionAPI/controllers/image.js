const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: 'c92dd00a506846aca37df09b4e0be95e'
});

const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = 'c92dd00a506846aca37df09b4e0be95e';
    const USER_ID = 'abdulalkout';
    const APP_ID = 'face-Recognition'; 
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl;
  
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
  
    const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    return requestOptions;
  
}

const handleAPICall = (req, res) => {
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .catch(err => res.state(400).json('bad API requist', err))
}


const handleImage = (req, res, db) =>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('errore with entries'))
}

module.exports = {
    handleImage : handleImage,
    handleAPICall 
}