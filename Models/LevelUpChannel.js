const { model, Schema } = require("mongoose");

module.exports = model(
	"levelsUpChannel",
	new Schema({
		Guild: String,
		Channel: String,
	})
);
