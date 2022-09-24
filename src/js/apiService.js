const API = '29920184-cb57a37281186e19b397ef599';
const URL = 'https://pixabay.com/api';

export default class fetchApi {
    constructor() {
        this.valueImg = '';
        this.page = 1;
    }

    async fetchApiUrl() {
        try {
            const response = await fetch(`${URL}/?image_type=photo&orientation=horizontal&q=${this.valueImg}&page=${this.page}&per_page=12&key=${API}`);
            const users = await response.json();
            return users;
        } catch (error) { 
            console.log(error, 'goodbuy');
        }
       
    }
    
    set searchQuery(valueImg) {
       this.valueImg = valueImg;
    }
    
    get searchQuery() {
        return this.valueImg;
    }

    increment() {
        this.page += 1;
    }

    reset() {
        this.page = 1;
    }
    
}