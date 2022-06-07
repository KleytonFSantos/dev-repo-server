import User from "../models/User";
import Repository from "../models/Repository";

class RepositoriesController {
    async index(req, res) {
        try {
            const { user_id } = req.params
            const user = await User.find({ user_id });

            if(!user){
                return res.status(404).json();
            }

            const repositories = await Repository.find({
                userId: user_id,
            });

            return res.json(repositories);
        } catch (error){
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) {
        try {
            const { user_id } = req.params
            const { name, url } = req.body

            const user = await User.find({ user_id });

            if(!user){
                return res.status(404).json();
            }

            const repository = await Repository.findOne({
                userId: user_id,
                url,
            })

            if (repository){
                return res.status(422).json({ message: `Repository ${name} already exists.`});
            }
            
            const newRepository = await Repository.create({
                name,
                url,
                userId: user_id,
            });

            return res.status(201).json({ message: `Repository ${name} was created successfully.`})
        } catch (error){
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async destroy(req, res){
        try {
            const { user_id, id } = req.params

            const user = await User.find({ user_id });

            if(!user){
                return res.status(404).json();
            }

            const repository = await Repository.findOne({
                id,
                userId: user_id
            });

            if(!repository){
                return res.status(404).json();
            }
            
            await repository.deleteOne()

            return res.status(200).json({ message: `Repository ${repository.name} was deleted successfully.`});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new RepositoriesController();