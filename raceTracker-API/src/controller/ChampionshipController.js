import Championship from '../models/Championship'

class ChampionshipController {

    async store(req, res){
        const new_championship = await Championship.create(req.body);

        return res.json(new_championship);
    }

    async index(req, res){
        const championships = await Championship.findAll();

        return res.json(championships);
    }

    async show(req, res){
        const { id } = req.params;

        const championship = await Championship.findOne({
            where: { id }
        });

        return res.json(championship);
    }

}

export default new ChampionshipController();
