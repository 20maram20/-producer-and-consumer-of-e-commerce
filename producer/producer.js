import OfferDTO from "./OfferDTO.js";
import Kafka from "kafka-node";

const client = new Kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const producer = new Kafka.Producer(client)

export const addoffer = (request, response) => {
  const offerDTO = new OfferDTO(request.body.name, request.body.price, request.body.quantity);
  const message = {
    topic: 'testtopic',
    messages: JSON.stringify(OfferDTO),
  };

  producer.send([message], (err, data) => {
    if (err) {
      console.error(err);
      response.send(`Error adding offer`);
    } else {
      console.log(`Message sent: ${message.messages}`);

      offers.push(OfferDTO);
      response.send(`Offer has been added`);
    }
  });
};

export const deleteoffer =  (request, response) => {
    const name = request.params.name;
    console.log (offers.filter((offer) => offer.name !== name));
     response.send(`offer has been deleted`);
  };
  