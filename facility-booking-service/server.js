const app = require("./app");
const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
  console.log(`🏫 Facility Booking Service running on port ${PORT}`);
});
