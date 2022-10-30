import { Category } from "src/app/categories/model/category";
import { Client } from "src/app/clients/model/client";
import { Project } from "src/app/projects/model/project";

export class GetTimesheet {
    constructor(public id:string,public description:string,public time:string,
        public overTime:string,public date:Date,public clientDTO:Client,public projectDTO:Project,public categoryDTO:Category){

    }
}
