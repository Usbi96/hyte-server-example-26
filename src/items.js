// 🔹 SINUN LISÄYS ALKAA TÄSTÄ

const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Appelsiini'},
  {id: 3, name: 'Banaaneja'},
];

export function getItems(req, res) {
  res.json(items);
}

export function getItemById(req, res) {
  const item = items.find(i => i.id == req.params.id);
  if (!item) {
    return res.status(404).json({message: 'item not found'});
  }
  res.json(item);
}

export function postNewItem(req, res) {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
}

export function putItemById(req, res) {
  const item = items.find(i => i.id == req.params.id);
  if (!item) {
    return res.status(404).json({message: 'item not found'});
  }
  item.name = req.body.name ?? item.name;
  res.json(item);
}

export function deleteItemById(req, res) {
  const index = items.findIndex(i => i.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({message: 'item not found'});
  }
  items.splice(index, 1);
  res.sendStatus(204);
}

// 🔹 SINUN LISÄYS PÄÄTTYY TÄHÄN
