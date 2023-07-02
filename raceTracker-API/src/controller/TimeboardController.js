import Timeboard from '../models/Timeboard';
import Car from '../models/Car';
import Championship from '../models/Championship';
import Laptime from '../models/Laptime';
import Category from '../models/Category';

class TimeboardController {

    async store(req, res){
        const car = await Car.findOne({
            where: {
                id: req.body.car_id
            }
        });

        const championship = await Championship.findOne({
            where: {
                id: req.body.championship_id
            }
        });

        if(!car){
            return res.status(400).json({ error: "This car does not exists" });
        }else if(car.on_track){
            return res.status(400).json({ error: "This car is already on track" });
        }

        if(!championship){
            return res.status(400).json({ error: "This championship does not exists" });
        }

        const new_laptime = await Laptime.create();
        
        const new_timeboard = await Timeboard.create({
            car_id: req.body.car_id,
            laptime_id: new_laptime.id,
            round_number: req.body.round_number,
            championship_id: req.body.championship_id
        });

        car.on_track = true;
        await car.save();

        const timeboard_created = await Timeboard.findOne({
            where: {
                id: new_timeboard.id
            },
            include: [
                {
                    model: Car,
                    as: 'car',
                    include: [
                        {
                            model: Category,
                            as: 'category'
                        }
                    ]
                },
                {
                    model: Laptime,
                    as: 'laptime'
                },
                {
                    model: Championship,
                    as: 'championship'
                }
            ]
        });

        return res.json(timeboard_created);
    }

    async index(req, res){
        const timeboard = await Timeboard.findAll({
            include: [
                {
                    model: Car,
                    as: 'car',
                    include: [
                        {
                            model: Category,
                            as: 'category'
                        }
                    ]
                },
                {
                    model: Laptime,
                    as: 'laptime'
                },
                {
                    model: Championship,
                    as: 'championship'
                }
            ]
        });

        return res.json(timeboard);
    }

    async show(req, res){
        const { id, car_id, championship_id } = req.params;

        var timeboard = null

        if(id){
            timeboard = await Timeboard.findAll({
                where: {
                    id
                },
                include: [
                    {
                        model: Car,
                        as: 'car',
                        include: [
                            {
                                model: Category,
                                as: 'category'
                            }
                        ]
                    },
                    {
                        model: Laptime,
                        as: 'laptime'
                    },
                    {
                        model: Championship,
                        as: 'championship'
                    }
                ]
            });
        }else if(car_id){
            timeboard = await Timeboard.findAll({
                where: {
                    car_id
                },
                include: [
                    {
                        model: Car,
                        as: 'car',
                        include: [
                            {
                                model: Category,
                                as: 'category'
                            }
                        ]
                    },
                    {
                        model: Laptime,
                        as: 'laptime'
                    },
                    {
                        model: Championship,
                        as: 'championship'
                    }
                ]
            });
        }else if(championship_id){

            if(req.body.plate){

                const car = await Car.findOne({
                    where: {
                        plate: req.body.plate
                    }
                })

                timeboard = await Timeboard.findAll({
                    where: {
                        championship_id,
                        car_id: car.id
                    },
                    include: [
                        {
                            model: Car,
                            as: 'car',
                            include: [
                                {
                                    model: Category,
                                    as: 'category'
                                }
                            ]
                        },
                        {
                            model: Laptime,
                            as: 'laptime'
                        },
                        {
                            model: Championship,
                            as: 'championship'
                        }
                    ],
                    order: [
                        ['best_time']
                    ]
                });
            }else{
                timeboard = await Timeboard.findAll({
                    where: {
                        championship_id,
                    },
                    include: [
                        {
                            model: Car,
                            as: 'car',
                            include: [
                                {
                                    model: Category,
                                    as: 'category'
                                }
                            ]
                        },
                        {
                            model: Laptime,
                            as: 'laptime'
                        },
                        {
                            model: Championship,
                            as: 'championship'
                        }
                    ],
                    order: [
                        ['best_time']
                    ]
                });
            }
        }else {
            return res.status(400).json({ error: "Need some parameter to filter timeboards (id, car_id or championship_id)" })
        }

        return res.json(timeboard);
    }

}

export default new TimeboardController();
