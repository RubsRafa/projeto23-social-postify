import { IsDateString, IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdatePublicationDTO {
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
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    dateToPublish: string;

    published?: boolean;
    
    @IsString()
    @IsNotEmpty()
    socialMedia: string;

}