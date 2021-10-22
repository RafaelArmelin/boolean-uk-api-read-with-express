const db = require("../../utils/database");

const getOneById = async (req, res) => {
  console.log("hereeee");
  const getOneByIdSQL = "SELECT * FROM pets WHERE id = $1";

  try {
    const result = await db.query(getOneByIdSQL, [req.params.id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("[ERROR] getOneById: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const createOne = async (req, res) => {
  console.log("Pets Router [CREATE]", { body: req.body });

  const petToCreate = {
    ...req.body,
  };

  const createOneSQL = `
    INSERT INTO pets
      (name, age, type, breed, microchip)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const { name, age, type, microchip } = petToCreate;

  try {
    const result = await db.query(createOneSQL, [name, age, type, microchip]);

    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error("[ERROR] createOne: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  const { microship } = req.query;
  let getAllSQL = "SELECT * FROM pets";

  if (microship) {
    getAllSQL = "${getAllSQL} WHERE microship = false";
  }

  try {
    const result = await db.query(getAllSQL);
    res.json(result.rows);
  } catch (error) {
    console.error("[ERROR] getAll: ", { error: error.message });
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOne,
  getOneById,
  getAll,
};
