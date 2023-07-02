import Laptime from '../models/Laptime'
import Timeboard from '../models/Timeboard';
import Car from '../models/Car';

class LaptimeController {

    async store(req, res){
        const new_laptime = await Laptime.create(req.body);
        
        return res.json(new_laptime);
    }

    async index(req, res){
        const laptimes = await Laptime.findAll();

        return res.json(laptimes);
    }

    async show(req, res){
        const { id } = req.params;

        const laptime = await Laptime.findOne({
            where: { id }
        });

        return res.json(laptime);
    }

    async update(req, res){
        const { car_id, round_number, championship_id} = req.body;

        const timeboard = await Timeboard.findOne({
            where:{
                car_id,
                round_number,
                championship_id
            }
        });

        if(!timeboard){
            return res.status(400).json({ error: "This car is not on track or not in this championship" })
        }

        const laptime = await Laptime.findByPk(timeboard.laptime_id);

        if(!laptime.lap_1){
            laptime.lap_1 = req.body.laptime
        }else if(!laptime.lap_2){
            laptime.lap_2 = req.body.laptime
        }else if(!laptime.lap_3){
            laptime.lap_3 = req.body.laptime
        }else if(!laptime.lap_4){
            laptime.lap_4 = req.body.laptime
        }else if(!laptime.lap_5){
            laptime.lap_5 = req.body.laptime
            
            const car = await Car.findByPk(timeboard.car_id)
            car.on_track = false
            await car.save()

            const laps = [Number(laptime.lap_1), Number(laptime.lap_2), Number(laptime.lap_3), Number(laptime.lap_4), Number(laptime.lap_5)]
            timeboard.best_time = Math.min(...laps);
            timeboard.finished_round = true

            await timeboard.save();
        }else {
            return res.status(400).json({ error: "This round is already finished" })
        }

        await laptime.save()

        return res.json({message: "Lap time registered"})
    }

}

export default new LaptimeController();
