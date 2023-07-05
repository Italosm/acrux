/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '@shared/infra/typeorm';

dataSource
  .initialize()
  .then(() => {
    const server = app.listen(3333, () => {
      console.log('Server started on port 3333!');
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });
