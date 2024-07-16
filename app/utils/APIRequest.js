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

        if(token){
            this.headers["Authorization"]  = "Bearer "  + token
        }
        
        let result = await fetch(`http://localhost:3000/${this.endpoint}`,{
            method:this.method,
            body:this.body,
            headers:this.headers
        })

        return await result.json();
    }

}

export default APIRequest