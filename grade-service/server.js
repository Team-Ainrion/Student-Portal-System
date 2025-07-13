const app = require("./app");
const PORT = process.env.PORT || 5015;

app.listen(PORT, () => {
  console.log(`Grade service running on port ${PORT}`);
});