
const users = [
  {id: 1, username: 'ulla', password: '1234'},
  {id: 2, username: 'test', password: 'test'},
];

export function getUsers(req, res) {
  res.json(users.map(u => ({id: u.id, username: u.username})));
}

export function postUser(req, res) {
  const newUser = {
    id: users.length + 1,
    username: req.body.username,
    password: req.body.password,
  };
  users.push(newUser);
  res.status(201).json({id: newUser.id, username: newUser.username});
}

export function postLogin(req, res) {
  const user = users.find(
    u => u.username === req.body.username && u.password === req.body.password
  );
  if (!user) {
    return res.status(401).json({message: 'invalid credentials'});
  }
  res.json({message: 'login ok'});
}

// 🔹 SINUN LISÄYS PÄÄTTYY TÄHÄN
// 🔹 SINUN LISÄYKSET (viikko 2 TODOt)

export function getUserById(req, res) {
  const user = users.find(u => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({message: 'user not found'});
  }
  res.json({id: user.id, username: user.username});
}

export function putUserById(req, res) {
  const user = users.find(u => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({message: 'user not found'});
  }

  if (req.body.username) {
    user.username = req.body.username;
  }
  if (req.body.password) {
    user.password = req.body.password;
  }

  res.json({id: user.id, username: user.username});
}

export function deleteUserById(req, res) {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({message: 'user not found'});
  }
  users.splice(index, 1);
  res.sendStatus(204);
}
