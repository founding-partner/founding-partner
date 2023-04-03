const ghpages = require("gh-pages")

ghpages.publish("ui/dist", () => console.log("done"));