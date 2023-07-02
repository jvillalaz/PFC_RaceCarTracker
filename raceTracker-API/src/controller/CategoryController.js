import Category from '../models/Category'

class CategoryController {

    async store(req, res){
        const new_category = await Category.create(req.body);

        return res.json(new_category);
    }

    async index(req, res){
        const categories = await Category.findAll();

        return res.json(categories);
    }

    async show(req, res){
        const { id } = req.params;

        const category = await Category.findOne({
            where: { id }
        });

        return res.json(category);
    }

}

export default new CategoryController();
