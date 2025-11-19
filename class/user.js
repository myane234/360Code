export default class user {
    constructor(nama, umur) {
        this.nama = nama; //user.nama
        this.umur = umur; //user.umur
    }

    console() {
        return `${this.nama}, ${this.umur}`;
    }
}