export class Marcador {

    public lat: number;
    public lng: number;

    public title: string;
    public desc: string;

    constructor(lat: number, lng: number, title: string, description: string) {
        this.lat = lat;
        this.lng = lng;
        this.title = title;
        this.desc = description;
    }
}