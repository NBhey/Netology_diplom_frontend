class API {
    private baseUrl: string;
    constructor(){
        this.baseUrl = 'https://shfe-diplom.neto-server.ru'
    }

    async get<T>(endpoint:string){
        const response = await fetch(`${this.baseUrl}${endpoint}`)
        return response.json() as Promise<T>;
    }

    async post<T, D>(endpoint:string, data: D) {
        const response = await fetch(`${this.baseUrl}${endpoint}`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: typeof data !== 'string' ? JSON.stringify(data) : data,
        })

        return response.json() as Promise<T>
    }
}

export const api = new API()

