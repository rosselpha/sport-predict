import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pick, PickDocument } from './schemas/picks.schema';

@Injectable()
export class SportPicksService {
  constructor(@InjectModel(Pick.name) private readonly pickModel: Model<PickDocument>) {}

  async create(game: string, pick: string, confidence:number ): Promise<PickDocument> {
    const createdPick = new this.pickModel({ game, pick, confidence });
    return await createdPick.save();
  }
  async findAll(): Promise<PickDocument[]> {
    return await this.pickModel.find().exec();
  }

  async findOne(id: string): Promise<PickDocument> {
    return await this.pickModel.findById(id).exec();
  }

  async update(id: string, newGame: string, newPick: string, newConfidence:number ) :Promise<PickDocument>  {
    let existingPick = await this.findOne(id);
    existingPick.game = newGame ?? existingPick.game;
    existingPick.pick = newPick  ?? existingPick.pick;
    existingPick.confidence = newConfidence ?? existingPick.confidence;

    return existingPick.save();
  }

  async delete(id: string) {

    return await this.pickModel.deleteOne({ _id:id}).exec();
  }

  async getGamesFromRapidAPI(): Promise<any> { 

      const config = {
        year:  'numeric',
        month: 'short',
        day:   '2-digit'
      }as const;
    
      function formatDate(date:any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    const dateTimeFormat = new Intl.DateTimeFormat('Default',config );
    const today = new Date()
    const tomorrow = new Date(today)
    const alsoTmw = tomorrow.setDate(tomorrow.getDate() + 1)
    const formatedTmw = formatDate(alsoTmw)
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.SOCCER_RAPID_API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    } 
    const data = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${formatedTmw}`, options)

      let response = await data.json();
      const res = response.response;
      res.map((res) => {
        console.log(res)
      })

    return res;
  }

}
