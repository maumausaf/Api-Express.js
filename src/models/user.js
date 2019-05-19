const db = require('../database');
const { base64encode, base64decode } = require('nodejs-base64');
const validator = require('validator');

const getUser = (req,res) => {
  
    db.query('SELECT * FROM "users"',(error,results) => {
        if(error){
            throw error
        }
        res.status(200).json(results.rows);
    })
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query('SELECT * FROM "users" WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
};

const createUser = (request, response) => {
  const { name, email, senha } = request.body;
  if(!validator.isEmail(email)){
    throw 'emial invalido';    
  }
  db.query(
    'INSERT INTO "users" (name, email,senha) VALUES ($1, $2, $3)', 
    [ name, email, base64encode(senha) ],
      (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send('Salvo')
  })
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, senha } = request.body
  if(!validator.isEmail(email)){
    throw 'emial invalido';
  }
  db.query(
    'UPDATE users SET name = $1, email = $2 , senha = $4 WHERE id = $3',
    [name, email, id, base64encode(senha)],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('Atualizado')
    }
  )
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })  
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};