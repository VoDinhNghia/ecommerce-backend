import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ServicesUsModule } from './modules/services-us/services-us.module';
import { SlideImagesModule } from './modules/slide-images/slide-images.module';
import { StoreGeneralInfoModule } from './modules/store-general-info/store-general-info.module';
import { TutorialsModule } from './modules/tutorials/tutorials.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './src/public/products'),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: parseInt(config.get('MYSQL_PORT')),
        username: config.get('MYSQL_USER'),
        password: config.get('MYSQL_PASS'),
        database: config.get('MYSQL_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ContactsModule,
    OrdersModule,
    ProductsModule,
    QuestionsModule,
    ServicesUsModule,
    SlideImagesModule,
    StoreGeneralInfoModule,
    TutorialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
