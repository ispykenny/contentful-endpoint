require('dotenv').config();
const contentful = require('contentful');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000

const contentful_client = contentful.createClient({
  space: process.env.APISPACE,
  accessToken: process.env.APIKEY
})

app.use(cors({origin: '*'}));

app.use('/articles', (req, res, err) => {
  contentful_client
  .getEntries({content_type: 'article'})
  .then((response) => res.json(response))
  .catch((error) => res.json(error))
})

app.use('/post/:id', (req, res, err) => {
  const {params} = req;
  contentful_client
  .getEntries({content_type: 'article'})
  .then((response) => {
    let foundAPost;
    response.items.find((item) => {
      if(item.fields.title.toLowerCase().split(' ').join('-') === params.id) {
        res.json(item)
        foundAPost = true
      }
    })
    if(!foundAPost) {
      res.json({status: 404})
    }
  })
  .catch((error) => res.json(error))
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})