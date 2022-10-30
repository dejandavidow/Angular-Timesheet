import { Client } from "src/app/clients/model/client";
import { Member } from "src/app/members/model/member";

export class Project {
    constructor(public id:string,public projectName:string,public description:string,public archive:string,public status:string,public clientDTO:Client,public memberDTO:Member){

    }
}
