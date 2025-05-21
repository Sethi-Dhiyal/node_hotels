const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

// post method to get menu items
router.post("/", async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedMenuItem = await menuItem.save();
    res.status(201).json(savedMenuItem);
    console.log("Data saved in menu.");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get method to get menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    console.log("Menu items retrieved successfully");
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//tasteType parameterized route

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; //extracting workType from the URL parameter
    if (tasteType == "spicy" || tasteType == "sweet" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Invalid taste type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const MenuItemId = req.params.id;
    const updatedMenuItemData = req.body;

    const response = await MenuItem.findByIdAndUpdate(
      MenuItemId,
      updatedMenuItemData,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the update against the schema,run mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Item not found" });
    }
    console.log("data updated successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const MenuItemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(MenuItemId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted successfully");
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//export thr router
module.exports = router;
