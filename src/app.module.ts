import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoggerFunctionMiddleware } from './common/middleware/logger-function.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // NOTE: LoggerMiddleWareはexclude()メソッドに渡された３つのパスを除いた状態でCatsController()のルートに従う
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, LoggerFunctionMiddleware)
      // NOTE: 特定のルートをミドルウェアの対象外にしたいユースケース
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      // NOTE: 複数のコントローラー クラスを受け取ることができる
      .forRoutes(CatsController);
  }

  // NOTE: アスタリスクはワイルドカードとして使用され、任意の文字の組み合わせに一致させるときはコレ
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
  // }

  // NOTE: 特定のパスとHTTP METHODで縛るとコレ
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({ path: 'cats', method: RequestMethod.GET });
  // }

  // NOTE: 一番シンプルに書くとコレ
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('cats');
  // }
}
