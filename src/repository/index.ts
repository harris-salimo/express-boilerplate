export interface IRepository<T> {
    save(): any;
    findAll(): any;
    findOne(): any;
}