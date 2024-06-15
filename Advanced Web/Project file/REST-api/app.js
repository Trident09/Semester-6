const express = require("express");
const { format } = require("date-fns");

const app = express();
const port = 6969;

app.get("/day-of-week", (req, res) => {
	const { day, month, year } = req.query;

	try {
		const date = new Date(year, month - 1, day); // month - 1 because months are 0-indexed in JavaScript

		if (isNaN(date)) {
			throw new Error("Invalid date format.");
		}
		const dayOfWeek = format(date, "EEEE");

		res.json({ dayOfWeek });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
