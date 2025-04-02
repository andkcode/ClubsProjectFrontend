export default class Clubs {
    id!: number;
    content!: string;
    created_on!: Date;
    photo_url!: string;
    title!: string;
    updated_on!: Date;
    created_by!: number;


constructor (data:any) {
    this.id = data.id;
    this.content = data.content;
    this.created_on = data.created_on;
    this.photo_url = data.photo_url;
    this.title = data.title;
    this.updated_on = data.updated_on;
    this.created_by = data.created_by;
}
}