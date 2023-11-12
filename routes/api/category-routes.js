const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: {model: Product},
  }).catch ((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  const categoryData = await Category.findByPk(req.params.id, {
    include: {model:Product},
  }).catch((err) => {
    res.json(err);
  });
    res.json(categoryData);
});

router.post('/', async (req, res) => {
  // create a new category

  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {
    const updateCategory = await Category.update(
      {category_name: req.body.category_name},
      {where: {id: req.params.id}}
    );
    res.status(200).json(updateCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {
    const deleteCateory = await Category.destroy(
      {where: {id: req.params.id}}
    );
    res.status(200).json(deleteCateory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

module.exports = router;
