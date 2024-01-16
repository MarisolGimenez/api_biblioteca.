const Libro = require("../models/libroModel");

exports.getAllLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Libros obtenidos con éxito",
        data: libros,
      });
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

exports.getLibroById = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Libro" });
  }
};

exports.createLibro = async (req, res) => {
  try {
    const nuevoLibro = await Libro.create(req.body);
    await nuevoLibro.save();
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el Libro" });
  }
};

exports.updateLibro = async (req, res) => {
  try {
    const libroId = req.params.id;
    const libroActualizado = req.body;

    const libro = await Libro.findByIdAndUpdate(libroId, libroActualizado, {
      new: true,
    });

    if (libro) {
      res.status(200).json(libro);
    } else {
      res.status(404).json({ error: "Libro no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el libro", error);

    if (
      res &&
      typeof res.status === "function" &&
      typeof res.json === "function"
    ) {
      res.status(500).json({ error: "Error al actualizar el Libro" });
    }
  }
};

exports.deleteLibro = async (req, res) => {
  try {
    const libroId = req.params.id;

    const libroEliminado = await Libro.findByIdAndRemove(libroId);

    res.status(200).json(libroEliminado);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Libro" });
  }
};
