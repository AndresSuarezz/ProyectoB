const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());


mercadopago.configure({
  access_token: "TEST-6674557449922741-111718-9a2857f5d1925305aaeddaaed6e55c9e-1061780119"
});

app.get("/", (req, res) => {
    res.send("El servidor de mercado pago esta corriendo");
})

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:5173",
      failure: "http://localhost:5173",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});


app.listen(8080, () => {
    console.log("The server is now running on port 8080");
})