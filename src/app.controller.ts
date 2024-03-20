import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

@Controller({
  path: 'api',
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly configService: ConfigService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create')
  createHello(): string {
    return `User was created`;
  }

  @Get('/user/:name')
  findUser(@Param('name') personName: string): string {
    return `This is your user ${personName}`;
  }

  @Put('/user/:name')
  updateUser(@Param('name') personName: string): string {
    return `Success update ${personName}`;
  }

  @Delete('/user/:name')
  deleteUser(@Param('name') personName: string): string {
    return `Success delete ${personName}`;
  }

  @Get('/users')
  getUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: object,
  ): Response<any> {
    return res.status(HttpStatus.OK).send({
      users: ['fateer', 'ahmed', 'uhuy'],
      request: req.url,
    });
  }

  @Get('/userStatus')
  getStatusUser(@Res() res: Response): Response<any> {
    const users = this.appService.findUserStatus(true);
    return res.status(HttpStatus.OK).send({
      data: users,
    })
  }

  @Get('/userName')
  getUsername(@Res() res: Response): Response<any> {
    const users = this.appService.findByName('achmed');
    return res.status(HttpStatus.OK).send({
      data: users,
    })
  }

  @Get('/config')
  getConfig(@Req() req: Request, @Res() res: Response): Response<any> {
    return res.status(HttpStatus.OK).send({
      data: {
        appName: this.configService.get<string>('APP_NAME'), //menggunakan .env
        port: this.configService.get<number>('PORT'),
      }
    })
  }

  @Post('/create/userDTO')
  regisUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() userData: CreateUserDto,
  ): Response<any> {
    const result = this.appService.saveNewUser(userData);
    return res.status(HttpStatus.CREATED).send({
      message: `User has been created`,
      data: result,
    })
  }
}
