const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {
    async index(request, response){
        const devs = await Dev.find(); 
        
        return response.json(devs);
    },

    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            } 

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        
        

        return response.json(dev);
    }
};    

// router.delete('/:id', controller.delete)

// async function delete(req, res) {
//     try {
//       const { descontrucao } = req.body
//       await db.TABELA.update({ active: false }, { where: { id: resourceId } })

//       return res.status(204).send()
//     } catch (error) {
//       return res.status(500).json({ status: 'Internal Server Error', error: true, message: 'Resource could not be deleted' })
//     }
//   }