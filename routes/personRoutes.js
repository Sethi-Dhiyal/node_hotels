const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

// Route to add a single person
router.post("/", async (req, res) => {
  try {
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
    console.log("Data saved successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all persons
router.get("/", async (req, res) => {
  try {
    const Persons = await Person.find();
    res.json(Persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add multiple persons
router.post("/Persons", async (req, res) => {
  try {
    // Check if the request body is an array
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Request body must be an array" });
    }

    // Insert multiple records
    const savedPersons = await Person.insertMany(req.body);
    res.status(201).json(savedPersons);
    console.log("Multiple records saved successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// workType parameterized route

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extracting workType from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the update against the schema,run mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    } 
    console.log("data deleted successfully");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
);

// export the router
module.exports = router;
