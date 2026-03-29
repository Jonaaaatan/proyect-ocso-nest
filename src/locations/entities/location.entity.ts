import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Location {
@PrimaryGeneratedColumn('increment')
locationId: number;
@Column('text')
locationName: string;
@Column('text') 2
locationAdress: string;
@Column('array')
locationLatLng: number[];
}