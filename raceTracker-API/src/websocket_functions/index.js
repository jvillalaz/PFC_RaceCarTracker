import Car from "../models/Car";
import Timeboard from "../models/Timeboard";
import Laptime from "../models/Laptime";

const registerLap = async (body, callback) => {
    const { car_id, round_number, championship_id} = body;

    try{
        const timeboard = await Timeboard.findOne({
            where:{
                car_id,
                round_number,
                championship_id
            }
        });

        if(!timeboard){
            callback("This car is not on track or not in this championship")
            return
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
            callback("This round is already finished")
            return
        }

        await laptime.save()

        callback("Lap time registered")
    } catch(error){
        console.log(error)
        callback(error.message)
    }
};

export default registerLap;
