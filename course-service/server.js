const app = require("./app");
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Course Service running on port ${PORT}`);
});