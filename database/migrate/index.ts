import { Container } from 'typedi';
import 'reflect-metadata';
import DatabaseConnection from '..';

const dbInstance = Container.get(DatabaseConnection);
dbInstance.connect(true).then(async () => {
    await dbInstance.autoMigrate();
    return;
});
