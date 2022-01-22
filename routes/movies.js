 const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
 
router.get('/', async function(req, res, next) {


    const skip=req.query.skip  ? req.query.skip: 0 ;
    const take=req.query.take ? req.query.take : 10;
    const movies = await prisma.movies.findMany({skip: parseInt(skip) ,take: parseInt(take)})
    const countTotal = await (await prisma.movies.aggregate({_count:{id:true}}))._count
    res.send({
      data: movies,
      pagination : {
          count : countTotal, // Total des enregistrements
          take: take,   // Nombre d'éléments sélectionnés
          skip: skip   // Décalage à partir duquel on prend les  données
      }
  });

});

 
module.exports = router;
 
