import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePublicationDTO {
    @IsString()
    @IsNotEmpty()
    image: string;
    
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    text: string;
    
    @IsNotEmpty()
    @IsDateString()
    dateToPublish: string;

    published: boolean = false;
    
    @IsString()
    @IsNotEmpty()
    socialMedia: string;

}