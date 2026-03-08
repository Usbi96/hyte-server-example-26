const items = [
  {id: 1, name: 'Apple', weight: 120},
  {id: 2, name: 'Banana', weight: 110},
  {id: 3, name: 'Orange', weight: 130},
];

export const getItems = (req, res) => {
  res.json(items);
};

export const getItemById = (req, res) => {
  const item = items.find((item) => item.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({message: 'item not found'});
  }

  res.json(item);
};

export const postNewItem = (req, res) => {
  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name: req.body.name,
    weight: req.body.weight,
  };

  items.push(newItem);

  res.status(201).json({
    message: 'item created',
    item: newItem,
  });
};

export const putItemById = (req, res) => {
  const item = items.find((item) => item.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({message: 'item not found'});
  }

  item.name = req.body.name ?? item.name;
  item.weight = req.body.weight ?? item.weight;

  res.json({
    message: 'item updated',
    item,
  });
};

export const deleteItemById = (req, res) => {
  const index = items.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({message: 'item not found'});
  }

  items.splice(index, 1);
  res.sendStatus(204);
};
