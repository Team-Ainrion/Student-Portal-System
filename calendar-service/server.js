const app = require("./app");
const PORT = process.env.PORT || 5011;

app.listen(PORT, () => {
  console.log(`Calendar Service running on port ${PORT}`);
});