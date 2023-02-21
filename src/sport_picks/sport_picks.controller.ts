import { Controller, Body, Post, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { PickDocument } from './schemas/picks.schema';
import { SportPicksService } from './sport_picks.service';

import { JwtGuard } from 'src/auth/guards/jwt.gaurd';


@Controller('sport-picks')
export class SportPicksController {
    constructor(private sportPickService: SportPicksService ) {}

    @Post()
    createPicks(@Body('game') game: string, @Body('pick') pick: string, @Body('confidence') confidence: number): Promise<PickDocument> {
        console.log(game, pick, confidence)

        return this.sportPickService.create(game, pick, confidence)
    }

    @Get()
    findAllPicks(): Promise<PickDocument[]> {
        this.sportPickService.getGamesFromRapidAPI();
        return this.sportPickService.findAll()
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findOnePick(@Param('id') id: string): Promise<PickDocument> {
        return this.sportPickService.findOne(id)
    }
    
    @Patch(':id')
    updatePick(@Param('id') id: string, @Body('game') game: string, @Body('pick') pick: string, @Body('confidence') confidence: number): Promise<PickDocument> {
        return this.sportPickService.update(id, game, pick, confidence)
    }
    @Delete(':id')
    deletePick(@Param('id') id: string) {
        return this.sportPickService.delete(id)
    }
}
