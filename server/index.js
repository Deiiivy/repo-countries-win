const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./graphql/resolvers.js');
const typeDefs = require('./graphql/typeDefs.js');
const Country = require('./models/country.js');
const Continent = require('./models/continent.js')


const app = express();
const PORT = 5000;

mongoose.connect('mongodb://127.0.0.1:27017/practice_countries', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());


app.post('/api/create-country', async (req, res) => {
  try {
    const { code, name, language, continent } = req.body;

    let continentObject = await Continent.findOne({ name: continent });

    if (!continentObject) {
      continentObject = new Continent({ name: continent });
      await continentObject.save();
    }

    const newCountry = new Country({
      code,
      name,
      language,
      continent: continentObject._id,
    });

    await newCountry.save();
    res.status(201).json({ message: 'Country created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.put('/api/update-country/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, language, continent } = req.body;

    const updatedCountry = await Country.findByIdAndUpdate(
      id,
      { code, name, language, continent },
      { new: true }
    );

    res.status(200).json({ message: 'Country updated successfully', country: updatedCountry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.send('Hola Mundo');
  });

  app.listen(PORT, () => {
    console.log(`Escuchando en el puerto localhost:${PORT}`);
  }).on('error', (err) => {
    console.error('Error en el servidor:', err.message);
  });
}

startServer();
