const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        try{
            const { latitude, longitude, techs } = request.query;
            const techsArray = parseStringAsArray(techs);
            //Buscar todos os devs num raio de 10km
            //Filtrar por tecnologias
        
            const devs = await Dev.find({
                techs: {
                    $in: techsArray,
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 10000,
                    },
                },
            });

            return response.json({ devs });
            
        }catch (error){
            return response.status(500).json({ status: 'Internal Server Error', error: true, message: 'Resource could not be searched' })
        }
        

        
    }
}