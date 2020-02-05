require('dotenv').config();
const getEvent = require('./getEvent').getEventById;

const { q, client } = require('./setup');

module.exports = async (req, res) => {
  const id = req.query.id;
  const data = req.body.payload;
  const event = {
    data: data
  };
  try {
    const eventQuery = await getEvent(id);
    console.log(eventQuery);
    const response = await client.query(q.Update(eventQuery.ref, event));

    console.log(response.data);
    return res.json({
      status: "OK",
      success: true
    });
  } catch (error) {
    return res.json({
      error: error.message,
      status: "NOK"
    });    
  }  
};