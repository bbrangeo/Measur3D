let mongoose = require("mongoose");

let Buildings = require("./building.js");

let CityModelSchema = new mongoose.Schema({
  type: { type: String, default: "CityJSON", required: true },
  version: { type: String, default: "1.0", required: true },
  CityObjects: { type: {}, required: true },
  vertices: {
    type: Array,
    required: true,
    index: true
  },
  extension: { type: {}, required: false },
  metadata: {
    geographicalExtent: [Number],
    referenceSystem: {
      type: String,
      default: "urn:ogc:def:crs:EPSG::4326",
      required: true
    }
  },
  transform: {
    scale: [],
    translate: []
  },
  appearance: { type: {}, required: false },
  "geometry-templates": { type: {}, required: false }
});

CityModel = mongoose.model("CityModel", CityModelSchema);

module.exports = {
  insertCity: async object => {
    var new_object = {};

    for ([key, element] of Object.entries(object.CityObjects)) {
      try {
        switch (element.type) {
          case "Building":
            var element_id = await Buildings.insertBuilding(element);

            break;
          case "Bridge":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "CityObjectGroup":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "CityFurniture":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "GenericCityObject":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "LandUse":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "PlantCover":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "Railway":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "Road":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "SolitaryVegetationObject":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "TINRelief":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "TransportSquare":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "Tunnel":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          case "WaterBody":
            throw new Error(
              element.type + " are not supported in the current version."
            );
            break;
          default:
            throw new Error("insertCity: object is not a CityObject.");
        }
      } catch (err) {
        console.warn(err.message);
      }

      new_object[key] = element_id;
    }

    object.CityObjects = new_object;

    var city = new CityModel(object);

    try {
      if (mongoose.connection.readyState == 0) {
        throw "insertCity: disconnected from server.";
      }
    } catch (err) {
      console.error(err);
    }

    city.save(function(err, element) {
      if (err) return console.error(err.message);

      return console.log("SUCCESS - insertCity: CityModel inserted.");
    });
  },
  Model: CityModel,
  Schema: CityModelSchema
};