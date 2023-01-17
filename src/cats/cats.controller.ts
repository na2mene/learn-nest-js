import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Redirect,
  Query,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

// e.g. `/cats`
@Controller({ path: 'cats' })
// @UseGuards(RolesGuard) // NOTE: ガードもコントローラ・メソッド・グローバルのいずれかにスコープ化できる
export class CatsController {
  constructor(private catsService: CatsService) {}

  //
  // NOTE: index的な
  //
  @Get() // e.g. `/cats`
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  // @Get() // e.g. `/cats`
  // findAll(@Query() query: ListAllEntities): string {
  //   const { page, limit } = query;
  //   return `This action returns all cats (page: ${page}) (limit: ${limit} items)`;
  // }

  //
  // NOTE: パスを追加してみたサンプル
  //
  @Get('identity') // e.g. `/cats/identity`
  identity(): string {
    return 'This action returns identity';
  }

  //
  // NOTE: 条件によってデフォルトのリダイレクト先を変更する方法
  //
  @Get('simpleRedirector') // e.g. `/cats/simpleRedirector`
  @Redirect('http://localhost:3000/cats', 301) // NOTE: ステータスコードのデフォは、302
  // NOTE: シンプルなリダイレクト
  simpleRedirector() {
    console.log(1);
  }

  //
  // NOTE: 条件によってデフォルトのリダイレクト先を変更する方法
  //
  @Get('overrideRedirector') // e.g. `/cats/overrideRedirector`
  @Redirect('http://localhost:3000/cats', 301)
  overrideRedirector(@Query('neko') neko: string) {
    if (neko && neko === 'michael') {
      return { url: 'http://localhost:3000/cats/identity', statusCode: 302 };
    }
  }

  //
  // NOTE: ↑と↓ はこの順番でないとダメ、ルーティングなので順番大事
  //       ↓と↓を入れ替えると、 `/cats/:id` で一致してしまう
  //

  //
  // NOTE: 動的パスパラメータのサンプル
  //
  @Get(':id') // e.g. `/cats/:id`
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  //
  // NOTE: Postのシンプルサンプル
  //
  @Post() // e.g. `POST /cats`
  @Roles('admin')
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    // return `This action adds a new cat (createCatDto: ${Object.values(
    //   createCatDto,
    // )})`;
  }

  //
  // NOTE: @Reqオブジェクトのよく使いそうなパラメータチェックと以下のチェック
  //       @Paramオブジェクトの違いチェック
  //       @Queryオブジェクトの違いチェック
  //
  @Post('testing/:id/hoge/:name') // e.g. `POST /cats/testing/:id/hoge/:name`
  testing(
    @Req() request: Request,
    @Param() params: string[],
    @Query() query: string[],
  ): string {
    console.log(`@Req ------------------- `);
    console.log(`request.params`);
    console.log(request.params); // NOTE: パスパラメータ (`{ id: 'abcdef', name: 'michael' }`)
    console.log(`request.query`);
    console.log(request.query); // NOTE: クエリパラメータ取得 (`{ neko: 'dayo', inu: 'inai' }`)
    console.log(`request.url`);
    console.log(request.url); // NOTE: url (`/cats/testing/abcdef/hoge/michael?neko=dayo&inu=inai`)
    console.log(`request.body`);
    console.log(request.body); // NOTE: リクエストボディ取得 (`{ obj: 'neko', obj2: 3 }`)
    console.log(`request.routes`);
    console.log(request.route);
    //
    // NOTE: ↑ routeオブジェクト取得
    // Route {
    //   path: '/cats/testing/:id/hoge/:name',
    //   stack: [
    //     Layer {
    //       handle: [AsyncFunction (anonymous)],
    //       name: '<anonymous>',
    //       params: undefined,
    //       path: undefined,
    //       keys: [],
    //       regexp: /^\/?$/i,
    //       method: 'post'
    //     }
    //   ],
    //   methods: { post: true }
    // }
    //
    console.log(`@Param ------------------- `);
    console.log(`params`);
    console.log(params); // NOTE: パスパラメータ (`{ id: 'abcdef', name: 'michael' }`)
    console.log(`@Query ------------------- `);
    console.log(`query`);
    console.log(query); // NOTE: クエリパラメータ取得 (`{ neko: 'dayo', inu: 'inai' }`)

    return 'This action returns @Req and @Param Check!!';
  }

  //
  // NOTE: シンプルな更新
  //
  @Put(':id') // e.g. `PUT /cats/:id`
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  //
  // NOTE: シンプルな削除
  //
  @Delete(':id') // e.g. `DELETE /cats/:id`
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
