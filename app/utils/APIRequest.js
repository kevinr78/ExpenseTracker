class APIRequest{
    headers = {
        "Content-Type": "application/json",
      }
    constructor(method, body,endpoint){
        this.method=method
        this.body=body===null?null:JSON.stringify(body)

        this.endpoint=endpoint
    }

     async sendRequest(){
        const token = localStorage.getItem('token')|| null
        const payload ={}
        

        if(token){
            this.headers["Authorization"]  = "Bearer "  + token
        }

        payload.method=this.method
        payload.headers=this.headers
        if(this.body!==null){
            payload.body=this.body
        }
        
        let result = await fetch(`http://localhost:3000/${this.endpoint}`,payload)

        return await result.json();
    }

}

export default APIRequest