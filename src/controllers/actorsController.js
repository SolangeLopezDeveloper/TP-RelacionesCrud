const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


module.exports = {
    list: (req, res) => {
        db.Actor.findAll()
            .then(actors => {
                res.render('actorsList.ejs', { actors })
            })
    },
    detail:  (req, res) => {
        const actor = db.Actor.findByPk(req.params.id)
        const allMovies = db.Movie.findAll();

          Promise.all([actor, allMovies])
            .then(([actor, allMovies]) => {
                return res.render('actorsDetail.ejs', {
                    actor: {
                        ...actor.dataValues,
                     
                    },
                    allMovies,
             
                })
            })
           
        },
    add: function (req, res) {
        const { allMovies } = req.body;
        db.Movie.findAll()
            .then(allMovies => {
                res.render('actorsAdd.ejs', { allMovies })
            })
            .catch(error => console.log(error))
    },
    create: function (req, res) {
        const { first_name,last_name } = req.body
        db.Actor.create({
            ...req.body,
            first_name,
            last_name
        })
            .then(newActor => {
                return res.redirect('actorsList.ejs')
            })
            .catch(error => console.log(error))
    },
    edit: function (req, res) {

        const actor = db.Actor.findByPk(req.params.id)
        const allMovies = db.Movie.findAll();
       
        Promise.all([actor, allMovies])
            .then(([actor, allMovies]) => {
                return res.render('actorsEdit', {
                    actor: {
                        ...actor.dataValues,
                     
                    },
                    allMovies,
             
                })
            })
            .catch(error => console.log(error))

    },
    update: function (req, res) {
  const id = req.params.id;
        db.Actor.update({
            ...req.body

        }, {
            where: { id }
        })
            .then(() => res.redirect('actors'))
            .catch((error) => console.log(error));
    },
    deleted: function (req, res) {

        db.Actor.findByPk(req.params.id)
            .then((actor) => {
                return res.render('actorsDelete', {
                    actor: actor
                })
            })
            .catch(error => console.log(error))
    },
    destroy: function (req, res) {
        let actorId = req.params.id;
        db.Actor_Movie.destroy({ where: { actor_id: actorId } })
          .then(() => {
            db.Actor.destroy({ where: { id: actorId }, force: true })
              .then(() => {
                res.redirect('/actors');
              })
              .catch(error => res.send(error));
          })
          .catch(error => res.send(error));
      } 
}


