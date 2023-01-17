import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  // NOTE: インスタンス化された、このモジュールで宣言されるコントローラ一覧
  controllers: [CatsController],
  // NOTE: Nestのインジェクタによってインスタンス化され、少なくともこのモジュールで共有される可能性のあるプロパイダ一覧
  providers: [CatsService],
  // NOTE: このモジュールで必要なプロパイダをエクスポートしているモジュールの一覧
  //       要は、他のモジュール から 使いたいプロバイダがある場合は、ここに指定する
  imports: [],
  // NOTE: このモジュールをインポートしている別のモジュールで使用されるプロバイダ一覧（このモジュールが提供しているプロバイダ一覧）
  //       要は、他のモジュール で 使いたいプロバイダがある場合は、ここに指定する
  exports: [CatsService],
})
export class CatsModule {}
